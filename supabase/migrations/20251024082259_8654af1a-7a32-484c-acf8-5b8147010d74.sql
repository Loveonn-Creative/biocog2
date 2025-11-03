-- Fix security warnings: Set search_path for all functions

-- Fix calculate_profile_completion function
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public';

-- Fix check_trial_expiry function
CREATE OR REPLACE FUNCTION check_trial_expiry()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'trial' AND NEW.trial_ends_at < NOW() THEN
    NEW.status = 'trial_expired';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public';

-- Fix update_last_active function
CREATE OR REPLACE FUNCTION update_last_active()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_active_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public';

-- Fix existing update_updated_at_column function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = 'public';