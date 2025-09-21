-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE public.app_role AS ENUM ('admin', 'msme_owner', 'accountant');
CREATE TYPE public.business_type AS ENUM ('manufacturing', 'trading', 'services', 'agriculture', 'other');
CREATE TYPE public.processing_status AS ENUM ('pending', 'processing', 'completed', 'failed');
CREATE TYPE public.emission_category AS ENUM ('electricity', 'fuel', 'transport', 'waste', 'other');
CREATE TYPE public.credit_status AS ENUM ('pending', 'approved', 'paid', 'expired');
CREATE TYPE public.report_type AS ENUM ('monthly', 'quarterly', 'annual', 'custom');
CREATE TYPE public.cert_status AS ENUM ('not_started', 'in_progress', 'completed', 'expired');
CREATE TYPE public.ewaste_category AS ENUM ('computers', 'phones', 'printers', 'batteries', 'cables', 'other');
CREATE TYPE public.pickup_status AS ENUM ('scheduled', 'picked_up', 'completed', 'cancelled');
CREATE TYPE public.loan_status AS ENUM ('draft', 'submitted', 'under_review', 'approved', 'rejected', 'disbursed');
CREATE TYPE public.compliance_status AS ENUM ('compliant', 'non_compliant', 'pending_review', 'needs_action');

-- Create user profiles table
CREATE TABLE public.profiles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    business_name TEXT NOT NULL,
    business_type business_type DEFAULT 'other',
    location JSONB, -- {city, state, country, coordinates}
    language_preference TEXT DEFAULT 'en',
    phone TEXT,
    gstin TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user roles table
CREATE TABLE public.user_roles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role app_role NOT NULL DEFAULT 'msme_owner',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(user_id, role)
);

-- Create invoice scans table
CREATE TABLE public.invoice_scans (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    file_url TEXT NOT NULL,
    file_name TEXT,
    file_size INTEGER,
    scan_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    processing_status processing_status DEFAULT 'pending',
    ocr_data JSONB, -- Raw OCR extracted data
    invoice_data JSONB, -- Structured invoice data
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create carbon emissions table
CREATE TABLE public.carbon_emissions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    scan_id UUID NOT NULL REFERENCES public.invoice_scans(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    co2_emissions DECIMAL(10,3) NOT NULL, -- in kg
    energy_used DECIMAL(10,3), -- in kWh
    emission_category emission_category NOT NULL,
    calculation_method TEXT,
    emission_factor DECIMAL(10,6), -- CO2 per unit
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create carbon credits table
CREATE TABLE public.carbon_credits (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    emission_id UUID REFERENCES public.carbon_emissions(id) ON DELETE SET NULL,
    credits_earned DECIMAL(10,3) NOT NULL,
    credit_value DECIMAL(10,2), -- Value in INR
    status credit_status DEFAULT 'pending',
    earned_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    payout_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ESG reports table
CREATE TABLE public.esg_reports (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    report_type report_type NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    esg_score DECIMAL(5,2), -- Score out of 100
    environmental_score DECIMAL(5,2),
    social_score DECIMAL(5,2),
    governance_score DECIMAL(5,2),
    file_url TEXT, -- Generated report file
    compliance_standards JSONB, -- Array of standards met
    generated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ESG metrics table
CREATE TABLE public.esg_metrics (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    environmental_score DECIMAL(5,2),
    social_score DECIMAL(5,2),
    governance_score DECIMAL(5,2),
    total_emissions DECIMAL(10,3), -- Total CO2 in kg
    emissions_reduced DECIMAL(10,3), -- Reduced CO2 in kg
    energy_consumed DECIMAL(10,3), -- in kWh
    renewable_energy_used DECIMAL(10,3), -- in kWh
    waste_generated DECIMAL(10,3), -- in kg
    waste_recycled DECIMAL(10,3), -- in kg
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(user_id, date)
);

-- Create certifications table
CREATE TABLE public.certifications (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    certification_name TEXT NOT NULL,
    description TEXT,
    requirements JSONB, -- What's needed to earn this
    earned_date TIMESTAMP WITH TIME ZONE,
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    status cert_status DEFAULT 'not_started',
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create e-waste items table
CREATE TABLE public.ewaste_items (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    category ewaste_category NOT NULL,
    item_name TEXT NOT NULL,
    brand TEXT,
    model TEXT,
    weight DECIMAL(8,3), -- in kg
    quantity INTEGER DEFAULT 1,
    estimated_value DECIMAL(10,2), -- in INR
    condition TEXT, -- working, non-working, damaged
    description TEXT,
    images JSONB, -- Array of image URLs
    status pickup_status DEFAULT 'scheduled',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create recyclers table
CREATE TABLE public.recyclers (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    location JSONB NOT NULL, -- {address, city, state, coordinates}
    rating DECIMAL(3,2) DEFAULT 4.0 CHECK (rating >= 0 AND rating <= 5),
    certifications JSONB, -- Array of certifications
    contact_info JSONB NOT NULL, -- {phone, email, website}
    specialities JSONB, -- Array of ewaste categories they handle
    pickup_radius INTEGER DEFAULT 50, -- in km
    is_verified BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create pickup schedules table
CREATE TABLE public.pickup_schedules (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    recycler_id UUID NOT NULL REFERENCES public.recyclers(id) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES public.ewaste_items(id) ON DELETE CASCADE,
    scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
    pickup_address JSONB NOT NULL,
    status pickup_status DEFAULT 'scheduled',
    actual_earnings DECIMAL(10,2), -- Final amount earned
    pickup_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create green loans table
CREATE TABLE public.green_loans (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    loan_amount DECIMAL(15,2) NOT NULL,
    interest_rate DECIMAL(5,2), -- Annual percentage
    tenure_months INTEGER,
    status loan_status DEFAULT 'draft',
    purpose TEXT, -- solar, energy efficiency, etc.
    esg_score_at_application DECIMAL(5,2),
    applied_date TIMESTAMP WITH TIME ZONE,
    approved_date TIMESTAMP WITH TIME ZONE,
    disbursed_date TIMESTAMP WITH TIME ZONE,
    monthly_emi DECIMAL(10,2),
    documents JSONB, -- Array of required documents
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create financial metrics table
CREATE TABLE public.financial_metrics (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    month_year DATE NOT NULL, -- First day of the month
    total_credits_earned DECIMAL(10,2) DEFAULT 0,
    credits_redeemed DECIMAL(10,2) DEFAULT 0,
    savings_from_efficiency DECIMAL(10,2) DEFAULT 0,
    loan_eligibility_score DECIMAL(5,2),
    green_investments DECIMAL(15,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(user_id, month_year)
);

-- Create AI conversations table
CREATE TABLE public.ai_conversations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id UUID NOT NULL,
    query TEXT NOT NULL,
    response TEXT NOT NULL,
    language TEXT DEFAULT 'en',
    satisfaction_rating INTEGER CHECK (satisfaction_rating >= 1 AND satisfaction_rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create analytics events table
CREATE TABLE public.analytics_events (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    event_type TEXT NOT NULL,
    event_data JSONB,
    page_url TEXT,
    user_agent TEXT,
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create compliance standards table
CREATE TABLE public.compliance_standards (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    standard_name TEXT NOT NULL UNIQUE,
    description TEXT,
    requirements JSONB NOT NULL,
    applicable_sectors JSONB, -- Array of business types
    is_mandatory BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user compliance table
CREATE TABLE public.user_compliance (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    standard_id UUID NOT NULL REFERENCES public.compliance_standards(id) ON DELETE CASCADE,
    status compliance_status DEFAULT 'pending_review',
    compliance_percentage INTEGER DEFAULT 0 CHECK (compliance_percentage >= 0 AND compliance_percentage <= 100),
    last_audit_date DATE,
    next_audit_date DATE,
    evidence_documents JSONB, -- Array of document URLs
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(user_id, standard_id)
);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES
('invoices', 'invoices', false),
('reports', 'reports', false),
('documents', 'documents', false),
('certificates', 'certificates', true),
('ewaste-images', 'ewaste-images', false);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carbon_emissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carbon_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esg_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esg_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ewaste_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recyclers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pickup_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.green_loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_standards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_compliance ENABLE ROW LEVEL SECURITY;

-- Create security definer function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS app_role
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT role FROM public.user_roles WHERE user_id = user_uuid LIMIT 1;
$$;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = user_uuid AND role = 'admin'
  );
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR SELECT USING (public.is_admin(auth.uid()));

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" ON public.user_roles
FOR ALL USING (public.is_admin(auth.uid()));

-- RLS Policies for invoice_scans
CREATE POLICY "Users can manage own scans" ON public.invoice_scans
FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all scans" ON public.invoice_scans
FOR SELECT USING (public.is_admin(auth.uid()));

-- RLS Policies for carbon_emissions
CREATE POLICY "Users can view own emissions" ON public.carbon_emissions
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert emissions" ON public.carbon_emissions
FOR INSERT WITH CHECK (true); -- Allow system inserts

CREATE POLICY "Admins can view all emissions" ON public.carbon_emissions
FOR SELECT USING (public.is_admin(auth.uid()));

-- RLS Policies for carbon_credits
CREATE POLICY "Users can view own credits" ON public.carbon_credits
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage credits" ON public.carbon_credits
FOR ALL WITH CHECK (true); -- Allow system management

-- RLS Policies for esg_reports
CREATE POLICY "Users can manage own reports" ON public.esg_reports
FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all reports" ON public.esg_reports
FOR SELECT USING (public.is_admin(auth.uid()));

-- RLS Policies for esg_metrics
CREATE POLICY "Users can view own metrics" ON public.esg_metrics
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage metrics" ON public.esg_metrics
FOR ALL WITH CHECK (true);

-- RLS Policies for certifications
CREATE POLICY "Users can manage own certifications" ON public.certifications
FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for ewaste_items
CREATE POLICY "Users can manage own ewaste items" ON public.ewaste_items
FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for recyclers (public read)
CREATE POLICY "Everyone can view recyclers" ON public.recyclers
FOR SELECT USING (true);

CREATE POLICY "Admins can manage recyclers" ON public.recyclers
FOR ALL USING (public.is_admin(auth.uid()));

-- RLS Policies for pickup_schedules
CREATE POLICY "Users can manage own pickups" ON public.pickup_schedules
FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for green_loans
CREATE POLICY "Users can manage own loans" ON public.green_loans
FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for financial_metrics
CREATE POLICY "Users can view own financial metrics" ON public.financial_metrics
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage financial metrics" ON public.financial_metrics
FOR ALL WITH CHECK (true);

-- RLS Policies for ai_conversations
CREATE POLICY "Users can view own conversations" ON public.ai_conversations
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert conversations" ON public.ai_conversations
FOR INSERT WITH CHECK (true);

-- RLS Policies for analytics_events
CREATE POLICY "System can manage analytics" ON public.analytics_events
FOR ALL WITH CHECK (true);

-- RLS Policies for compliance_standards (public read)
CREATE POLICY "Everyone can view standards" ON public.compliance_standards
FOR SELECT USING (true);

CREATE POLICY "Admins can manage standards" ON public.compliance_standards
FOR ALL USING (public.is_admin(auth.uid()));

-- RLS Policies for user_compliance
CREATE POLICY "Users can view own compliance" ON public.user_compliance
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage compliance" ON public.user_compliance
FOR ALL WITH CHECK (true);

-- Storage policies for invoices bucket
CREATE POLICY "Users can upload invoices" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'invoices' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view own invoices" ON storage.objects
FOR SELECT USING (
  bucket_id = 'invoices' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Storage policies for reports bucket
CREATE POLICY "Users can access own reports" ON storage.objects
FOR ALL USING (
  bucket_id = 'reports' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Storage policies for documents bucket
CREATE POLICY "Users can access own documents" ON storage.objects
FOR ALL USING (
  bucket_id = 'documents' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Storage policies for certificates bucket (public)
CREATE POLICY "Certificates are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'certificates');

CREATE POLICY "Users can upload certificates" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'certificates' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Storage policies for ewaste-images bucket
CREATE POLICY "Users can manage ewaste images" ON storage.objects
FOR ALL USING (
  bucket_id = 'ewaste-images' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, business_name, business_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'business_name', 'My Business'),
    COALESCE((NEW.raw_user_meta_data->>'business_type')::business_type, 'other')
  );
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'msme_owner');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_invoice_scans_updated_at BEFORE UPDATE ON public.invoice_scans
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON public.certifications
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ewaste_items_updated_at BEFORE UPDATE ON public.ewaste_items
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_recyclers_updated_at BEFORE UPDATE ON public.recyclers
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pickup_schedules_updated_at BEFORE UPDATE ON public.pickup_schedules
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_green_loans_updated_at BEFORE UPDATE ON public.green_loans
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_financial_metrics_updated_at BEFORE UPDATE ON public.financial_metrics
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_compliance_standards_updated_at BEFORE UPDATE ON public.compliance_standards
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_compliance_updated_at BEFORE UPDATE ON public.user_compliance
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();