import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ScoreFactors {
  gstn_compliance: number;
  invoice_quality: number;
  carbon_reduction: number;
  sustainability_practices: number;
  certification_level: number;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // Authenticate the user first
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Authorization header required');
    }

    // Use anon key for authentication check
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const authClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: authError } = await authClient.auth.getUser();
    
    if (authError || !user) {
      throw new Error('User not authenticated');
    }

    // Use authenticated user's ID only - don't accept from request body
    const user_id = user.id;
    
    console.log('Calculating Green Score for authenticated user:', user_id);

    // Use SERVICE_ROLE_KEY for database operations (bypasses RLS for system calculations)
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Calculating Green Score for user:', user_id);

    // Fetch user data
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user_id)
      .single();

    const { data: scans } = await supabase
      .from('invoice_scans')
      .select('*')
      .eq('user_id', user_id);

    const { data: emissions } = await supabase
      .from('carbon_emissions')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .limit(100);

    const { data: credits } = await supabase
      .from('carbon_credits')
      .select('*')
      .eq('user_id', user_id);

    const { data: certifications } = await supabase
      .from('certifications')
      .select('*')
      .eq('user_id', user_id);

    const factors: ScoreFactors = {
      gstn_compliance: 0,
      invoice_quality: 0,
      carbon_reduction: 0,
      sustainability_practices: 0,
      certification_level: 0,
    };

    // 1. GSTN Compliance (20 points)
    if (profile?.gstin && profile.gstin.length === 15) {
      factors.gstn_compliance = 20;
    } else if (profile?.gstin) {
      factors.gstn_compliance = 10; // Partial credit for having it
    }

    // 2. Invoice Quality & Frequency (25 points)
    if (scans && scans.length > 0) {
      const successfulScans = scans.filter(
        (s: any) => s.processing_status === 'completed'
      ).length;
      const scanQualityRatio = successfulScans / scans.length;
      const scanVolume = Math.min(scans.length / 50, 1); // Max score at 50 scans

      factors.invoice_quality = Math.round(
        scanQualityRatio * 15 + scanVolume * 10
      );
    }

    // 3. Carbon Reduction Performance (30 points)
    if (emissions && emissions.length > 0) {
      const totalEmissions = emissions.reduce(
        (sum: number, e: any) => sum + parseFloat(e.co2_emissions || 0),
        0
      );
      const avgEmission = totalEmissions / emissions.length;

      // Calculate trend (comparing recent vs older emissions)
      const recentEmissions = emissions.slice(0, 10);
      const olderEmissions = emissions.slice(-10);

      const recentAvg =
        recentEmissions.reduce(
          (sum: number, e: any) => sum + parseFloat(e.co2_emissions || 0),
          0
        ) / recentEmissions.length;
      const olderAvg =
        olderEmissions.reduce(
          (sum: number, e: any) => sum + parseFloat(e.co2_emissions || 0),
          0
        ) / olderEmissions.length;

      const reductionRate = olderAvg > 0 ? (olderAvg - recentAvg) / olderAvg : 0;

      // Score based on reduction trend
      if (reductionRate > 0.3) {
        factors.carbon_reduction = 30; // Excellent reduction
      } else if (reductionRate > 0.15) {
        factors.carbon_reduction = 22; // Good reduction
      } else if (reductionRate > 0) {
        factors.carbon_reduction = 15; // Some reduction
      } else {
        factors.carbon_reduction = 8; // At least tracking
      }
    }

    // 4. Sustainability Practices (15 points)
    let practicesScore = 0;

    // Has banking info (ready for redemptions)
    if (profile?.bank_account_number && profile?.ifsc_code) {
      practicesScore += 3;
    }

    // Has PAN verification
    if (profile?.pan_verified) {
      practicesScore += 3;
    }

    // Active credit earning
    if (credits && credits.length > 0) {
      practicesScore += 5;
    }

    // Profile completion
    if (profile?.profile_completion_percentage) {
      practicesScore += Math.round(
        (profile.profile_completion_percentage / 100) * 4
      );
    }

    factors.sustainability_practices = Math.min(practicesScore, 15);

    // 5. Certifications & Compliance (10 points)
    if (certifications && certifications.length > 0) {
      const earnedCerts = certifications.filter(
        (c: any) => c.status === 'earned'
      ).length;
      const inProgressCerts = certifications.filter(
        (c: any) => c.status === 'in_progress'
      ).length;

      factors.certification_level = Math.min(
        earnedCerts * 4 + inProgressCerts * 2,
        10
      );
    }

    // Calculate total score
    const totalScore = Math.min(
      Object.values(factors).reduce((sum, val) => sum + val, 0),
      100
    );

    // Determine grade
    let grade = 'C';
    if (totalScore >= 90) grade = 'A+';
    else if (totalScore >= 80) grade = 'A';
    else if (totalScore >= 70) grade = 'B+';
    else if (totalScore >= 60) grade = 'B';
    else if (totalScore >= 50) grade = 'C+';

    // Generate recommendations
    const recommendations = [];
    if (factors.gstn_compliance < 20) {
      recommendations.push({
        title: 'Complete GSTN Verification',
        action: 'Add your 15-digit GSTN to unlock +10 points',
        potential_points: 20 - factors.gstn_compliance,
      });
    }
    if (factors.invoice_quality < 20) {
      recommendations.push({
        title: 'Upload More Quality Invoices',
        action: 'Upload 20 more invoices to boost your score',
        potential_points: 10,
      });
    }
    if (factors.carbon_reduction < 25) {
      recommendations.push({
        title: 'Improve Carbon Reduction',
        action: 'Implement energy-saving measures to reduce emissions by 15%',
        potential_points: 12,
      });
    }
    if (factors.certification_level < 8) {
      recommendations.push({
        title: 'Earn Green Certifications',
        action: 'Complete sustainability certifications for +6 points',
        potential_points: 8,
      });
    }

    // Get old score for audit log
    const oldScore = profile?.green_score || 0;

    // Update profile with new score
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        green_score: totalScore,
        green_score_factors: factors,
        green_score_last_updated: new Date().toISOString(),
        green_score_history: [
          ...(profile?.green_score_history || []),
          {
            score: totalScore,
            date: new Date().toISOString(),
            factors,
          },
        ].slice(-12), // Keep last 12 records
      })
      .eq('user_id', user_id);

    if (updateError) throw updateError;

    // Create audit log entry
    await supabase.from('green_score_audit_log').insert({
      user_id,
      old_score: oldScore,
      new_score: totalScore,
      change_reason: 'Scheduled recalculation',
      calculation_details: {
        factors,
        grade,
        data_points: {
          scans: scans?.length || 0,
          emissions: emissions?.length || 0,
          credits: credits?.length || 0,
          certifications: certifications?.length || 0,
        },
      },
    });

    // Create notification if score improved significantly
    if (totalScore - oldScore >= 5) {
      await supabase.from('notifications').insert({
        user_id,
        type: 'green_score_updated',
        title: `🌱 Green Score Increased to ${totalScore}!`,
        message: `Your score improved by ${totalScore - oldScore} points. Grade: ${grade}`,
        data: {
          old_score: oldScore,
          new_score: totalScore,
          grade,
        },
      });
    }

    console.log('Green Score calculated:', {
      user_id,
      totalScore,
      grade,
      factors,
    });

    return new Response(
      JSON.stringify({
        success: true,
        score: totalScore,
        grade,
        factors,
        recommendations,
        previous_score: oldScore,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error calculating green score:', error);
    
    // Sanitize error messages to prevent information leakage
    let errorMessage = 'An error occurred while calculating your green score. Please try again later.';
    let statusCode = 500;
    
    if (error.message === 'User not authenticated' || error.message === 'Authorization header required') {
      errorMessage = 'Authentication required';
      statusCode = 401;
    }
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: statusCode,
      }
    );
  }
});
