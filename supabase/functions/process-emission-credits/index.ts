import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmissionData {
  emission_id: string;
  user_id: string;
  co2_emissions: number;
  emission_category: string;
  energy_used?: number;
  calculation_method?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const emissionData: EmissionData = await req.json();
    const { emission_id, user_id, co2_emissions, emission_category } = emissionData;

    console.log("Processing emission for credit generation:", emission_id);

    // Get baseline emission for the category (industry average)
    const baselineEmissions: Record<string, number> = {
      energy: 500, // kg CO2
      transport: 300,
      waste: 150,
      manufacturing: 800,
      other: 250,
    };

    const baseline = baselineEmissions[emission_category] || baselineEmissions.other;

    // Calculate carbon reduction
    const reduction = Math.max(0, baseline - co2_emissions);

    if (reduction <= 0) {
      console.log("No reduction achieved, no credits generated");
      return new Response(
        JSON.stringify({
          success: true,
          credits_earned: 0,
          message: "No emission reduction achieved",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Calculate credits (1 credit per 100 kg CO2 reduced)
    let creditsEarned = reduction / 100;

    // Get user profile for quality multipliers
    const { data: profile } = await supabase
      .from("profiles")
      .select("business_type, location")
      .eq("user_id", user_id)
      .single();

    // Quality multipliers
    let qualityMultiplier = 1.0;

    // IoT verified (check if calculation_method indicates IoT)
    if (emissionData.calculation_method?.includes("iot")) {
      qualityMultiplier *= 1.2;
    }

    // Business type multiplier
    const businessMultipliers: Record<string, number> = {
      manufacturing: 1.15,
      agriculture: 1.1,
      textile: 1.12,
      retail: 1.05,
      services: 1.0,
      other: 1.0,
    };

    if (profile?.business_type) {
      qualityMultiplier *= businessMultipliers[profile.business_type] || 1.0;
    }

    // Apply quality multiplier
    creditsEarned *= qualityMultiplier;

    // Get current market rate
    const { data: marketRate } = await supabase
      .from("carbon_market_rates")
      .select("rate_per_credit")
      .order("effective_date", { ascending: false })
      .limit(1)
      .single();

    const creditValue = creditsEarned * (marketRate?.rate_per_credit || 2500);

    // Create credit record
    const { data: credit, error: creditError } = await supabase
      .from("carbon_credits")
      .insert({
        user_id,
        emission_id,
        credits_earned: creditsEarned,
        credit_value: creditValue,
        status: "completed",
        earned_date: new Date().toISOString(),
        payout_date: null,
      })
      .select()
      .single();

    if (creditError) throw creditError;

    // Update financial metrics
    const currentMonth = new Date().toISOString().slice(0, 7) + "-01";
    const { data: existingMetrics } = await supabase
      .from("financial_metrics")
      .select("*")
      .eq("user_id", user_id)
      .eq("month_year", currentMonth)
      .single();

    if (existingMetrics) {
      await supabase
        .from("financial_metrics")
        .update({
          total_credits_earned: existingMetrics.total_credits_earned + creditsEarned,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingMetrics.id);
    } else {
      await supabase.from("financial_metrics").insert({
        user_id,
        month_year: currentMonth,
        total_credits_earned: creditsEarned,
        credits_redeemed: 0,
        savings_from_efficiency: creditValue,
      });
    }

    // Notification will be created automatically by the database trigger

    console.log(
      `Credits generated: ${creditsEarned.toFixed(2)} (₹${creditValue.toLocaleString("en-IN")})`
    );

    return new Response(
      JSON.stringify({
        success: true,
        credit_id: credit.id,
        credits_earned: creditsEarned,
        credit_value: creditValue,
        reduction_kg: reduction,
        quality_multiplier: qualityMultiplier,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error processing emission credits:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Internal server error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
