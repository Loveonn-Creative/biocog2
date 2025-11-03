-- Phase 1: Enhanced Profile Architecture

-- Add new columns to profiles table for preferences and personalization
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{
  "theme": "system",
  "notifications": {
    "email": true,
    "push": true,
    "sms": false
  },
  "dashboard_widgets": ["credits", "emissions", "loans", "esg"],
  "default_currency": "INR",
  "measurement_units": "metric"
}'::jsonb,
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS onboarding_data JSONB,
ADD COLUMN IF NOT EXISTS profile_completion_percentage INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS ai_preferences JSONB DEFAULT '{
  "recommendation_types": ["carbon_optimization", "loan_suggestions", "green_incentives"],
  "interaction_style": "friendly",
  "expertise_level": "beginner"
}'::jsonb;

-- Add Green Score System columns
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS green_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS green_score_history JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS green_score_last_updated TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS green_score_factors JSONB DEFAULT '{
  "gstn_compliance": 0,
  "invoice_quality": 0,
  "carbon_reduction": 0,
  "sustainability_practices": 0,
  "certification_level": 0
}'::jsonb;

-- Add Profile Analytics columns
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS total_scans INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_credits_earned NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_co2_reduced NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS profile_views INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Create user_queries table for AI training and personalization
CREATE TABLE IF NOT EXISTS user_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  query_text TEXT NOT NULL,
  query_type TEXT,
  response_text TEXT,
  satisfaction_rating INTEGER CHECK (satisfaction_rating BETWEEN 1 AND 5),
  context_data JSONB,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on user_queries
ALTER TABLE user_queries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own queries" ON user_queries 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own queries" ON user_queries 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create green_score_audit_log table
CREATE TABLE IF NOT EXISTS green_score_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  old_score INTEGER,
  new_score INTEGER,
  change_reason TEXT,
  calculation_details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on green_score_audit_log
ALTER TABLE green_score_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own score history" ON green_score_audit_log 
  FOR SELECT USING (auth.uid() = user_id);

-- Create function to update profile completion percentage
CREATE OR REPLACE FUNCTION calculate_profile_completion()
RETURNS TRIGGER AS $$
DECLARE
  completion_score INTEGER := 0;
BEGIN
  -- Calculate completion based on key fields
  IF NEW.business_name IS NOT NULL AND NEW.business_name != '' THEN
    completion_score := completion_score + 15;
  END IF;
  
  IF NEW.business_type IS NOT NULL AND NEW.business_type != '' THEN
    completion_score := completion_score + 10;
  END IF;
  
  IF NEW.phone IS NOT NULL AND NEW.phone != '' THEN
    completion_score := completion_score + 10;
  END IF;
  
  IF NEW.location IS NOT NULL AND NEW.location != '' THEN
    completion_score := completion_score + 10;
  END IF;
  
  IF NEW.gstin IS NOT NULL AND NEW.gstin != '' THEN
    completion_score := completion_score + 15;
  END IF;
  
  IF NEW.bank_account_number IS NOT NULL AND NEW.bank_account_number != '' THEN
    completion_score := completion_score + 10;
  END IF;
  
  IF NEW.pan_number IS NOT NULL AND NEW.pan_number != '' THEN
    completion_score := completion_score + 10;
  END IF;
  
  IF NEW.avatar_url IS NOT NULL AND NEW.avatar_url != '' THEN
    completion_score := completion_score + 10;
  END IF;
  
  IF NEW.ifsc_code IS NOT NULL AND NEW.ifsc_code != '' THEN
    completion_score := completion_score + 5;
  END IF;
  
  IF NEW.bank_account_holder_name IS NOT NULL AND NEW.bank_account_holder_name != '' THEN
    completion_score := completion_score + 5;
  END IF;
  
  NEW.profile_completion_percentage := completion_score;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for profile completion calculation
DROP TRIGGER IF EXISTS update_profile_completion ON profiles;
CREATE TRIGGER update_profile_completion
  BEFORE INSERT OR UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION calculate_profile_completion();

-- Create function to check trial expiry
CREATE OR REPLACE FUNCTION check_trial_expiry()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'trial' AND NEW.trial_ends_at < NOW() THEN
    NEW.status = 'trial_expired';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for trial expiry check
DROP TRIGGER IF EXISTS trial_expiry_check ON subscriptions;
CREATE TRIGGER trial_expiry_check
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION check_trial_expiry();

-- Update last_active_at on profile updates
CREATE OR REPLACE FUNCTION update_last_active()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_active_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS update_profile_last_active ON profiles;
CREATE TRIGGER update_profile_last_active
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_last_active();