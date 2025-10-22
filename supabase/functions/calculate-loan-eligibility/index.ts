import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      throw new Error('Unauthorized');
    }

    // Get user profile
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // Get carbon credits data
    const { data: credits } = await supabaseClient
      .from('carbon_credits')
      .select('credits_earned, credit_value')
      .eq('user_id', user.id)
      .eq('status', 'verified');

    const totalCredits = credits?.reduce((sum, c) => sum + Number(c.credits_earned), 0) || 0;
    const totalCreditValue = credits?.reduce((sum, c) => sum + Number(c.credit_value || 0), 0) || 0;

    // Get ESG metrics
    const { data: esgMetrics } = await supabaseClient
      .from('esg_metrics')
      .select('environmental_score, social_score, governance_score')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .limit(1)
      .single();

    const avgESGScore = esgMetrics
      ? (Number(esgMetrics.environmental_score || 0) + 
         Number(esgMetrics.social_score || 0) + 
         Number(esgMetrics.governance_score || 0)) / 3
      : 50;

    // Calculate base loan amount (mock calculation based on business type)
    const baseLoanAmounts: Record<string, number> = {
      manufacturing: 500000,
      services: 300000,
      retail: 250000,
      agriculture: 400000,
      technology: 350000,
      other: 200000,
    };

    const baseLoan = baseLoanAmounts[profile?.business_type || 'other'] || 200000;

    // Calculate carbon credit boost (₹15 per credit)
    const creditBoost = totalCredits * 15;

    // Calculate ESG multiplier (1.0 to 1.5 based on score)
    const esgMultiplier = 1 + ((avgESGScore - 50) / 100);

    // Final loan amount
    const finalLoanAmount = Math.round((baseLoan + creditBoost) * esgMultiplier);

    // Calculate interest rate (8% to 12% based on ESG score)
    const baseInterestRate = 12;
    const interestReduction = (avgESGScore / 100) * 4; // Max 4% reduction
    const finalInterestRate = Math.max(8, baseInterestRate - interestReduction);

    // Determine tenure options
    const tenureOptions = [12, 24, 36, 48, 60];

    // Calculate EMI for each tenure
    const loanOffers = tenureOptions.map(months => {
      const monthlyRate = finalInterestRate / 12 / 100;
      const emi = (finalLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                  (Math.pow(1 + monthlyRate, months) - 1);
      
      return {
        tenure_months: months,
        monthly_emi: Math.round(emi),
        total_payment: Math.round(emi * months),
        total_interest: Math.round((emi * months) - finalLoanAmount),
      };
    });

    const eligibilityData = {
      user_id: user.id,
      base_loan_amount: baseLoan,
      carbon_credit_boost: creditBoost,
      esg_score: avgESGScore,
      esg_multiplier: esgMultiplier,
      final_loan_amount: finalLoanAmount,
      interest_rate: finalInterestRate,
      total_credits: totalCredits,
      total_credit_value: totalCreditValue,
      loan_offers: loanOffers,
      eligibility_status: finalLoanAmount >= 50000 ? 'eligible' : 'ineligible',
      improvement_suggestions: [
        totalCredits < 5 ? 'Earn more carbon credits to increase your loan amount' : null,
        avgESGScore < 60 ? 'Improve your ESG score for better interest rates' : null,
        !profile?.gstin ? 'Complete your GST registration for higher loan limits' : null,
      ].filter(Boolean),
    };

    return new Response(
      JSON.stringify(eligibilityData),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error calculating loan eligibility:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
