import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: { Authorization: req.headers.get('Authorization')! },
      },
    });

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    console.log('Activating trial for user:', user.id);

    // Calculate trial end date (90 days from now)
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 90);

    // Check if user already has a subscription
    const { data: existingSub } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    let subscription;

    if (existingSub) {
      // Update existing subscription
      const { data, error } = await supabase
        .from('subscriptions')
        .update({
          status: 'trial',
          plan_type: 'trial',
          trial_ends_at: trialEndsAt.toISOString(),
          current_period_start: new Date().toISOString(),
          current_period_end: trialEndsAt.toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      subscription = data;
      console.log('Updated existing subscription:', subscription.id);
    } else {
      // Create new subscription
      const { data, error } = await supabase
        .from('subscriptions')
        .insert({
          user_id: user.id,
          status: 'trial',
          plan_type: 'trial',
          trial_ends_at: trialEndsAt.toISOString(),
          current_period_start: new Date().toISOString(),
          current_period_end: trialEndsAt.toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      subscription = data;
      console.log('Created new subscription:', subscription.id);
    }

    // Create notification
    await supabase.from('notifications').insert({
      user_id: user.id,
      type: 'trial_activated',
      title: '🎉 90-Day Free Trial Activated!',
      message: `Your free trial is now active until ${trialEndsAt.toLocaleDateString()}. Enjoy unlimited access to all features!`,
      data: {
        trial_ends_at: trialEndsAt.toISOString(),
        subscription_id: subscription.id,
      },
    });

    // Update profile preferences to mark trial as activated
    await supabase
      .from('profiles')
      .update({
        preferences: {
          trial_activated_at: new Date().toISOString(),
        },
      })
      .eq('user_id', user.id);

    // Try to send email notification
    try {
      await supabase.functions.invoke('send-notification-email', {
        body: {
          event_type: 'trial_activated',
          user_id: user.id,
          data: {
            trial_ends_at: trialEndsAt.toISOString(),
          },
        },
      });
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Don't fail the whole request if email fails
    }

    return new Response(
      JSON.stringify({
        success: true,
        subscription,
        trial_ends_at: trialEndsAt.toISOString(),
        days_remaining: 90,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error activating trial:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
