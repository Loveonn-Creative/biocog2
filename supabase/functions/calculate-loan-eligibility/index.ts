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

    // Base loan amounts by business type (risk-weighted)
    const baseLoanAmounts: Record<string, number> = {
      manufacturing: 800000,   // Higher capital needs
      services: 400000,        // Lower capital intensity
      trading: 600000,         // Medium risk
      agriculture: 700000,     // Seasonal working capital
      other: 300000,          // Conservative estimate
    };

    // Business risk weights (lower is better creditworthiness)
    const businessRiskWeights: Record<string, number> = {
      manufacturing: 0.85,
      services: 0.90,
      trading: 0.88,
      agriculture: 0.82,
      other: 0.80,
    };

    const baseLoan = baseLoanAmounts[profile?.business_type || 'other'] || 300000;
    const riskWeight = businessRiskWeights[profile?.business_type || 'other'] || 0.80;

    // Payment history factor (GST compliance - mock for now, would check actual GST returns)
    const paymentHistoryFactor = profile?.gstin ? 1.15 : 1.0;

    // Carbon benefit factor: Credits reduce environmental risk
    // Formula: 1 + (totalCredits * 0.002) capped at 1.25
    const carbonBenefitFactor = Math.min(1.25, 1 + (totalCredits * 0.002));

    // ESG Score Factor: Based on carbon intensity reduction
    // Formula: 0.85 + (avgESGScore / 100) * 0.35, range: 0.85 to 1.20
    const esgScoreFactor = 0.85 + ((avgESGScore / 100) * 0.35);

    // Final loan eligibility calculation
    // Formula: Base × Payment History × ESG Factor × Carbon Benefit × Risk Weight
    const finalLoanAmount = Math.round(
      baseLoan * paymentHistoryFactor * esgScoreFactor * carbonBenefitFactor * riskWeight
    );

    // Interest rate calculation: 9.5% base, reduced by ESG performance
    // Formula: 9.5% - (ESG Score / 100) * 3.5%, range: 6% to 9.5%
    const baseInterestRate = 9.5;
    const esgDiscount = (avgESGScore / 100) * 3.5;
    const finalInterestRate = Math.max(6.0, baseInterestRate - esgDiscount);

    // Approval probability based on multiple factors
    const approvalProbability = Math.min(95, 
      50 + 
      (avgESGScore * 0.3) + 
      (totalCredits > 0 ? 15 : 0) + 
      (profile?.gstin ? 10 : 0)
    );

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
      payment_history_factor: paymentHistoryFactor,
      esg_score: Math.round(avgESGScore),
      esg_score_factor: esgScoreFactor,
      carbon_benefit_factor: carbonBenefitFactor,
      risk_weight: riskWeight,
      final_loan_amount: finalLoanAmount,
      interest_rate: Number(finalInterestRate.toFixed(2)),
      approval_probability: Math.round(approvalProbability),
      total_credits: totalCredits,
      total_credit_value: totalCreditValue,
      loan_offers: loanOffers,
      eligibility_status: finalLoanAmount >= 100000 ? 'eligible' : 'needs_improvement',
      methodology: 'ESG-linked lending using ISO 14064-1 carbon accounting',
      improvement_suggestions: [
        totalCredits < 10 ? 'Generate carbon credits to boost loan eligibility by up to 25%' : null,
        avgESGScore < 65 ? 'Improve ESG score for interest rate reduction up to 3.5%' : null,
        !profile?.gstin ? 'Register GSTIN for 15% payment history factor boost' : null,
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
