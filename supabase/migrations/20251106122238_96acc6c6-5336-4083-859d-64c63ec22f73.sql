-- Fix handle_new_user() trigger to properly handle empty/null business_type
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
    COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data->>'business_name'), ''), 'My Business'),
    CASE 
      WHEN NULLIF(TRIM(NEW.raw_user_meta_data->>'business_type'), '') IS NULL THEN 'other'::business_type
      ELSE (NEW.raw_user_meta_data->>'business_type')::business_type
    END
  );
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'msme_owner');
  
  RETURN NEW;
END;
$$;