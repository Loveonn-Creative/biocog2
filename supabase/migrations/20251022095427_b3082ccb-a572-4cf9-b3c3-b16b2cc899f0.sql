-- Create credit redemptions table
CREATE TABLE IF NOT EXISTS public.credit_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  credit_amount NUMERIC(10,2) NOT NULL,
  monetary_value NUMERIC(10,2) NOT NULL,
  redemption_type TEXT CHECK (redemption_type IN ('bank_transfer', 'loan_credit', 'platform_credit')),
  status TEXT CHECK (status IN ('pending', 'processing', 'completed', 'failed')) DEFAULT 'pending',
  bank_details JSONB,
  transaction_id TEXT,
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  data JSONB,
  read BOOLEAN DEFAULT false,
  action_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create carbon market rates table
CREATE TABLE IF NOT EXISTS public.carbon_market_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rate_per_credit NUMERIC(10,2) NOT NULL,
  effective_date DATE NOT NULL,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add banking and verification fields to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS bank_account_number TEXT,
ADD COLUMN IF NOT EXISTS bank_ifsc TEXT,
ADD COLUMN IF NOT EXISTS bank_account_holder TEXT,
ADD COLUMN IF NOT EXISTS bank_verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS pan_number TEXT,
ADD COLUMN IF NOT EXISTS pan_verified BOOLEAN DEFAULT false;

-- Enable Row Level Security
ALTER TABLE public.credit_redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carbon_market_rates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for credit_redemptions
CREATE POLICY "Users can view own redemptions"
  ON public.credit_redemptions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own redemptions"
  ON public.credit_redemptions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "System can update redemptions"
  ON public.credit_redemptions
  FOR UPDATE
  USING (true);

-- RLS Policies for notifications
CREATE POLICY "Users can view own notifications"
  ON public.notifications
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications"
  ON public.notifications
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own notifications"
  ON public.notifications
  FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for carbon_market_rates
CREATE POLICY "Everyone can view market rates"
  ON public.carbon_market_rates
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage market rates"
  ON public.carbon_market_rates
  FOR ALL
  USING (is_admin(auth.uid()));

-- Insert initial market rate
INSERT INTO public.carbon_market_rates (rate_per_credit, effective_date, source)
VALUES (2500, CURRENT_DATE, 'Base Rate')
ON CONFLICT DO NOTHING;

-- Enable realtime for relevant tables
ALTER PUBLICATION supabase_realtime ADD TABLE carbon_emissions;
ALTER PUBLICATION supabase_realtime ADD TABLE carbon_credits;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE credit_redemptions;

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_credit_redemptions_updated_at
  BEFORE UPDATE ON public.credit_redemptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create function to notify on new credits
CREATE OR REPLACE FUNCTION notify_credit_earned()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.notifications (user_id, type, title, message, data)
  VALUES (
    NEW.user_id,
    'credit_earned',
    'Carbon Credits Earned!',
    format('You earned %.2f credits worth ₹%.2f', NEW.credits_earned, NEW.credit_value),
    jsonb_build_object('credit_id', NEW.id, 'amount', NEW.credits_earned, 'value', NEW.credit_value)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_credit_earned
  AFTER INSERT ON public.carbon_credits
  FOR EACH ROW
  EXECUTE FUNCTION notify_credit_earned();