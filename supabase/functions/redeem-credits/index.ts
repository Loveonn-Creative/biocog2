import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RedemptionRequest {
  redemption_id: string;
  action: "approve" | "reject";
  transaction_id?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing authorization header");
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace("Bearer ", "")
    );

    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    // Check if user is admin
    const { data: userRole } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (userRole?.role !== "admin") {
      throw new Error("Admin access required");
    }

    const { redemption_id, action, transaction_id }: RedemptionRequest = await req.json();

    // Get redemption details
    const { data: redemption, error: redemptionError } = await supabase
      .from("credit_redemptions")
      .select("*")
      .eq("id", redemption_id)
      .single();

    if (redemptionError || !redemption) {
      throw new Error("Redemption not found");
    }

    if (redemption.status !== "pending") {
      throw new Error("Redemption already processed");
    }

    const now = new Date().toISOString();

    if (action === "approve") {
      // Update redemption status
      const { error: updateError } = await supabase
        .from("credit_redemptions")
        .update({
          status: "completed",
          processed_at: now,
          transaction_id: transaction_id || `TXN-${Date.now()}`,
        })
        .eq("id", redemption_id);

      if (updateError) throw updateError;

      // Deduct credits from user's balance
      // Note: In production, implement proper credit balance tracking
      // For now, we rely on aggregating carbon_credits table

      // Create notification
      await supabase.from("notifications").insert({
        user_id: redemption.user_id,
        type: "redemption_completed",
        title: "Credits Redeemed Successfully!",
        message: `Your ${redemption.credit_amount} credits (₹${redemption.monetary_value.toLocaleString(
          "en-IN"
        )}) have been processed`,
        data: {
          redemption_id,
          amount: redemption.credit_amount,
          value: redemption.monetary_value,
          type: redemption.redemption_type,
        },
      });

      console.log("Redemption approved:", redemption_id);

      return new Response(
        JSON.stringify({
          success: true,
          message: "Redemption approved and processed",
          redemption_id,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } else if (action === "reject") {
      const { error: updateError } = await supabase
        .from("credit_redemptions")
        .update({
          status: "failed",
          processed_at: now,
        })
        .eq("id", redemption_id);

      if (updateError) throw updateError;

      // Create notification
      await supabase.from("notifications").insert({
        user_id: redemption.user_id,
        type: "redemption_failed",
        title: "Redemption Request Failed",
        message: "Your redemption request could not be processed. Please contact support.",
        data: {
          redemption_id,
          amount: redemption.credit_amount,
        },
      });

      console.log("Redemption rejected:", redemption_id);

      return new Response(
        JSON.stringify({
          success: true,
          message: "Redemption rejected",
          redemption_id,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    throw new Error("Invalid action");
  } catch (error: any) {
    console.error("Error processing redemption:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Internal server error",
      }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
