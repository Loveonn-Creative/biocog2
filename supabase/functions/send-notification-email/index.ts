import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  userId: string;
  type: 'credit_earned' | 'redemption_completed' | 'loan_approved' | 'loan_rejected';
  data: any;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, type, data }: EmailRequest = await req.json();
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get user email
    const { data: userData, error: userError } = await supabase.auth.admin.getUserById(userId);
    if (userError || !userData?.user?.email) {
      throw new Error("User not found");
    }

    const email = userData.user.email;
    
    let subject = "";
    let html = "";

    switch (type) {
      case 'credit_earned':
        subject = "🌱 Carbon Credits Earned!";
        html = `
          <h1>Congratulations!</h1>
          <p>You've earned <strong>${data.credits} carbon credits</strong> worth <strong>₹${data.value}</strong>!</p>
          <p>Your sustainable practices are making a difference.</p>
          <p><a href="${supabaseUrl}/dashboard">View Dashboard</a></p>
        `;
        break;
      
      case 'redemption_completed':
        subject = "✅ Redemption Completed";
        html = `
          <h1>Redemption Successful!</h1>
          <p>Your redemption of <strong>${data.credits} credits</strong> for <strong>₹${data.value}</strong> has been processed.</p>
          <p>Transaction ID: ${data.transactionId}</p>
          <p><a href="${supabaseUrl}/dashboard">View Transaction History</a></p>
        `;
        break;
      
      case 'loan_approved':
        subject = "🎉 Green Loan Approved!";
        html = `
          <h1>Loan Approved!</h1>
          <p>Your green loan application for <strong>₹${data.amount}</strong> has been approved!</p>
          <p>Interest Rate: ${data.rate}% | Tenure: ${data.tenure} months</p>
          <p><a href="${supabaseUrl}/green-lending">View Loan Details</a></p>
        `;
        break;
      
      case 'loan_rejected':
        subject = "Loan Application Update";
        html = `
          <h1>Loan Application Status</h1>
          <p>We regret to inform you that your loan application could not be approved at this time.</p>
          <p>Reason: ${data.reason}</p>
          <p>Continue earning carbon credits to improve your eligibility!</p>
          <p><a href="${supabaseUrl}/green-lending">Check Eligibility</a></p>
        `;
        break;
    }

    const emailResponse = await resend.emails.send({
      from: "EcoFinance <onboarding@resend.dev>",
      to: [email],
      subject,
      html,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
