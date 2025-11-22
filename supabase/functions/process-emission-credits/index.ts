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

    // Baseline emissions by category (BEE/IPCC industry standards in kg CO2e)
    const baselineEmissions: Record<string, number> = {
      electricity: 700,    // Grid electricity baseline
      fuel: 450,          // Fossil fuel combustion
      transport: 350,     // Logistics and transport
      waste: 180,         // Waste management
      other: 280,        // General operations
    };

    const baseline = baselineEmissions[emission_category] || baselineEmissions.other;

    // Calculate emission reduction from baseline
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

    // Calculate credits: 1 tCO2e = 1 credit (ISO 14064-1 standard)
    let creditsEarned = reduction / 1000;

    // Get user profile for quality multipliers
    const { data: profile } = await supabase
      .from("profiles")
      .select("business_type, location")
      .eq("user_id", user_id)
      .single();

    // Quality multipliers (GHG Protocol verification tiers)
    let qualityMultiplier = 1.0;

    // IoT/Satellite verification bonus (Tier 2 verification)
    if (emissionData.calculation_method?.includes("iot") || 
        emissionData.calculation_method?.includes("satellite")) {
      qualityMultiplier *= 1.18; // Verified data premium
    }

    // MSME social impact premium (business type)
    const businessMultipliers: Record<string, number> = {
      manufacturing: 1.12,   // Industrial decarbonization priority
      agriculture: 1.15,     // Sustainable farming incentive
      trading: 1.08,         // Supply chain optimization
      services: 1.05,        // Service sector baseline
      other: 1.0,
    };

    if (profile?.business_type) {
      qualityMultiplier *= businessMultipliers[profile.business_type] || 1.0;
    }

    // Blockchain verification bonus (immutable audit trail)
    qualityMultiplier *= 1.08;

    // Apply quality multiplier
    creditsEarned *= qualityMultiplier;

    // Get current market rate (India CCTS benchmark Nov 2025)
    const { data: marketRate } = await supabase
      .from("carbon_market_rates")
      .select("rate_per_credit")
      .order("effective_date", { ascending: false })
      .limit(1)
      .single();

    // Credit value calculation (₹/tCO2e with quality premiums applied)
    const creditValue = creditsEarned * (marketRate?.rate_per_credit || 2800);

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
