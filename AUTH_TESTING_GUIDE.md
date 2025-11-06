# Authentication Flow Testing Guide

## ✅ Visual Verification
- Auth page loads correctly at `/auth`
- "Forgot password?" link is visible in sign-in form
- Sign In/Sign Up tabs are functional
- Password visibility toggle (eye icon) is present

## Test Scenarios

### 1. New User Sign-Up Flow

**Steps:**
1. Navigate to `/auth`
2. Click "Sign Up" tab
3. Fill in the form:
   - Full Name: "Test User"
   - Business Name: "Test Business Pvt Ltd"
   - Email: "newuser@example.com"
   - Password: "Test123" (meets requirements: 6+ chars, 1 uppercase, 1 number)
4. Click "Create Account"

**Expected Results:**
- ✅ Form validates password strength
- ✅ Account is created successfully
- ✅ Toast notification: "Account created successfully! Setting up your profile..."
- ✅ Database trigger creates profile with `business_type: 'other'`
- ✅ Redirects to `/profile-setup` after 1.5 seconds
- ✅ No "Database error saving new user" error

**Email Confirmation Scenarios:**
- **If confirmation ENABLED:** Toast shows "A confirmation email has been sent"
- **If confirmation DISABLED:** Immediate redirect to profile setup

### 2. Profile Setup Integration

**Steps (continues from sign-up):**
1. Should arrive at `/profile-setup`
2. Form should be pre-filled with:
   - Business Name: "Test Business Pvt Ltd"
   - Business Type: "other" (default from trigger)
3. Complete additional fields:
   - Business Type: Select from dropdown (manufacturing/trading/services/agriculture/other)
   - GSTIN: "22AAAAA0000A1Z5" (optional, 15 chars)
   - Phone: "+91 9876543210" (optional, 10 digits)
   - Location: City, State, Pincode
4. Click "Complete Setup & Continue"

**Expected Results:**
- ✅ All fields validate correctly (see validation rules below)
- ✅ Profile updates successfully
- ✅ Toast: "Profile updated successfully!"
- ✅ Redirects to `/dashboard`
- ✅ User is now fully authenticated and profiled

**Validation Rules:**
- GSTIN: Optional, exactly 15 alphanumeric characters, uppercase
- Phone: Optional, 10-digit Indian mobile number (+91 prefix allowed)
- Pincode: 6 digits only
- Business Name: Required, min 2 characters
- Business Type: Required, enum value

### 3. Existing User Sign-In

**Steps:**
1. Navigate to `/auth`
2. Enter existing credentials:
   - Email: "existinguser@example.com"
   - Password: "Test123"
3. Click "Sign In"

**Expected Results:**
- ✅ Validates email format and password length (min 6)
- ✅ If credentials valid: Toast "Welcome back!" → Redirect to `/dashboard`
- ✅ If credentials invalid: Toast "Invalid email or password. Please try again."
- ✅ If email not confirmed: Toast "Please verify your email before signing in. Check your inbox."

### 4. Forgot Password Flow

**Steps:**
1. Navigate to `/auth` (Sign In tab)
2. Enter email in email field: "user@example.com"
3. Click "Forgot password?" link
4. Wait for email sending

**Expected Results:**
- ✅ If email field empty: Toast "Please enter your email first"
- ✅ If email valid: Toast "Password reset email sent! Check your inbox."
- ✅ Email contains link with format: `{site_url}/auth?reset=true`
- ✅ On clicking email link: User sees toast "Please check your email for password reset instructions"

### 5. Duplicate Email Prevention

**Steps:**
1. Try to sign up with email that already exists
2. Click "Create Account"

**Expected Results:**
- ✅ Toast: "This email is already registered. Please sign in instead."
- ✅ Auto-switches to "Sign In" tab
- ✅ Email field pre-filled with entered email

### 6. Password Strength Validation

**Test Cases:**
- "test" → ❌ Error: "Password must be at least 6 characters"
- "test123" → ❌ Error: "Password must contain at least one uppercase letter"
- "TEST123" → ✅ Valid (6+ chars, uppercase, number)
- "Password1" → ✅ Valid

### 7. Google OAuth (If Enabled)

**Steps:**
1. Click "Google" button
2. Complete Google sign-in flow

**Expected Results:**
- ✅ Redirects to Google OAuth consent screen
- ✅ After consent: Redirects back to app
- ✅ Creates profile via `handle_new_user()` trigger
- ✅ Redirects to `/dashboard` or `/profile-setup` if profile incomplete

**Note:** Google OAuth requires configuration in Supabase dashboard

### 8. Protected Routes

**Test unauthorized access:**
1. Sign out (if signed in)
2. Try to navigate to:
   - `/dashboard`
   - `/reports`
   - `/recycle`
   - `/gstn-carbon`
   - `/green-lending`
   - `/profile-setup`

**Expected Results:**
- ✅ All protected routes redirect to `/auth?redirect={attempted-route}`
- ✅ After successful sign-in, user is redirected to originally requested page
- ✅ Loading spinner shows while checking authentication

### 9. Session Persistence

**Steps:**
1. Sign in successfully
2. Navigate to `/dashboard`
3. Refresh page
4. Close browser and reopen

**Expected Results:**
- ✅ User remains signed in (session stored in localStorage)
- ✅ No need to sign in again
- ✅ Session auto-refreshes before expiration

### 10. Auto-Redirect When Already Signed In

**Steps:**
1. While signed in, navigate to `/auth`

**Expected Results:**
- ✅ Immediately redirects to `/dashboard`
- ✅ Cannot access auth page while authenticated

## Database Trigger Verification

### `handle_new_user()` Trigger Tests

**What it should do:**
1. Insert row into `profiles` table with:
   - `user_id`: New user's ID
   - `business_name`: From sign-up form OR default "My Business"
   - `business_type`: Default to `'other'::business_type` if empty/null
2. Insert row into `user_roles` table with:
   - `user_id`: New user's ID
   - `role`: Default `'msme_owner'`

**Database Queries to Verify:**
```sql
-- Check profile was created
SELECT user_id, business_name, business_type 
FROM profiles 
WHERE user_id = 'new-user-uuid';

-- Check role was assigned
SELECT user_id, role 
FROM user_roles 
WHERE user_id = 'new-user-uuid';
```

**Expected:**
- ✅ Profile exists with correct business_type (not empty string)
- ✅ Role is 'msme_owner'
- ✅ No errors in Supabase logs

## Common Issues & Fixes

### Issue: "Database error saving new user"
**Cause:** Empty string passed to `business_type` enum
**Fix:** ✅ Fixed in migration - trigger now uses `CASE` statement with `NULLIF()`

### Issue: "Invalid login credentials"
**Causes:**
1. Wrong email/password
2. Email not confirmed (if confirmation enabled)
3. User doesn't exist

**Fix:** Check error message for specific cause

### Issue: Redirect not working after sign-in
**Cause:** Missing redirect URL in query params
**Fix:** Ensure `navigate('/auth?redirect=' + attemptedPath)` is used

### Issue: Google sign-in shows "provider is not enabled"
**Fix:** Enable Google provider in Supabase dashboard:
- Go to: https://supabase.com/dashboard/project/zyjaqyxuapjngpvjqlcg/auth/providers
- Enable Google OAuth
- Add Client ID and Secret from Google Cloud Console

## Integration with Features

### Carbon Credits
- User must be authenticated to view/earn credits
- Profile must be complete to activate subscriptions
- Green score calculated based on profile data

### E-Waste Recycling
- Pickup scheduling requires authenticated user
- Items linked to `user_id` from profile

### Green Lending
- Loan applications require complete profile
- GSTIN and phone may be required for loan verification
- ESG score at application time is recorded

### Dashboard
- Displays personalized data based on user profile
- Shows metrics from profile table (green_score, total_credits, etc.)

## Supabase Configuration Checklist

### Email Settings
- [ ] Confirm Email: Enabled/Disabled based on environment
- [ ] Site URL: Set to production domain or lovable preview URL
- [ ] Redirect URLs: Include all valid redirect URLs

**Configuration Link:**
https://supabase.com/dashboard/project/zyjaqyxuapjngpvjqlcg/auth/url-configuration

### Auth Providers
- [x] Email/Password: Enabled
- [ ] Google OAuth: Configure if needed
- [ ] Other providers: Configure as required

**Providers Link:**
https://supabase.com/dashboard/project/zyjaqyxuapjngpvjqlcg/auth/providers

## Performance Benchmarks

- **Sign-up completion time:** < 2 seconds
- **Sign-in completion time:** < 1 second
- **Profile setup save time:** < 1 second
- **Page load with auth check:** < 500ms

## Security Checklist

- [x] Passwords validated on client (min 6 chars, uppercase, number)
- [x] Passwords validated on server (Supabase)
- [x] Email format validated
- [x] Input sanitization in validation schemas
- [x] Protected routes require authentication
- [x] Session tokens auto-refresh
- [x] RLS policies enforce user isolation
- [x] Sensitive errors don't expose system details

## Next Steps After Testing

1. **If issues found:** Document error messages and console logs
2. **If successful:** Deploy to production
3. **Post-deployment:** Test with real users
4. **Monitor:** Check Supabase logs for auth errors
5. **Optimize:** Reduce redirect delays, improve UX

## Support Resources

- **Supabase Auth Logs:** https://supabase.com/dashboard/project/zyjaqyxuapjngpvjqlcg/auth/users
- **Database Logs:** Check for trigger execution errors
- **Network Tab:** Monitor auth API calls
- **Console Logs:** Check for client-side errors

---

**Last Updated:** After database trigger fix and forgot password implementation
**Status:** ✅ Ready for comprehensive testing
