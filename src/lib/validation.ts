import { z } from "zod";

// Indian phone number validation (supports +91 and without)
export const phoneSchema = z
  .string()
  .regex(
    /^(\+91[\s]?)?[6-9]\d{9}$/,
    "Invalid phone number. Must be a valid 10-digit Indian mobile number"
  )
  .transform((val) => val.replace(/\s/g, "")); // Remove spaces

// GSTIN validation (15 alphanumeric characters)
export const gstinSchema = z
  .string()
  .regex(
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    "Invalid GSTIN format. Must be 15 characters (e.g., 22AAAAA0000A1Z5)"
  )
  .length(15, "GSTIN must be exactly 15 characters");

// Pincode validation (6 digits)
export const pincodeSchema = z
  .string()
  .regex(/^[1-9][0-9]{5}$/, "Invalid pincode. Must be a 6-digit number");

// Bank account number validation
export const bankAccountSchema = z
  .string()
  .min(9, "Bank account number must be at least 9 digits")
  .max(18, "Bank account number must not exceed 18 digits")
  .regex(/^[0-9]+$/, "Bank account number must contain only digits");

// IFSC code validation
export const ifscSchema = z
  .string()
  .regex(
    /^[A-Z]{4}0[A-Z0-9]{6}$/,
    "Invalid IFSC code format (e.g., SBIN0001234)"
  )
  .length(11, "IFSC code must be exactly 11 characters");

// PAN validation
export const panSchema = z
  .string()
  .regex(
    /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    "Invalid PAN format (e.g., ABCDE1234F)"
  )
  .length(10, "PAN must be exactly 10 characters");

// Profile setup validation schema
export const profileSetupSchema = z.object({
  business_name: z
    .string()
    .min(2, "Business name must be at least 2 characters")
    .max(100, "Business name must not exceed 100 characters"),
  business_type: z.enum([
    "manufacturing",
    "trading",
    "services",
    "agriculture",
    "other",
  ]),
  gstin: gstinSchema.optional().or(z.literal("")),
  phone: phoneSchema.optional().or(z.literal("")),
  location: z.object({
    city: z.string().min(2, "City name must be at least 2 characters").optional().or(z.literal("")),
    state: z.string().min(2, "State name must be at least 2 characters").optional().or(z.literal("")),
    pincode: pincodeSchema.optional().or(z.literal("")),
  }),
});

// Banking details validation schema
export const bankingDetailsSchema = z.object({
  bank_account_number: bankAccountSchema,
  bank_account_holder: z
    .string()
    .min(2, "Account holder name must be at least 2 characters")
    .max(100, "Account holder name must not exceed 100 characters"),
  bank_ifsc: ifscSchema,
  bank_name: z.string().min(2, "Bank name must be at least 2 characters"),
});

// Credit redemption validation
export const redemptionSchema = z.object({
  creditAmount: z
    .number()
    .positive("Amount must be positive")
    .min(0.1, "Minimum redemption is 0.1 credits"),
  redemptionType: z.enum(["bank_transfer", "loan_credit", "platform_credit"]),
});

// Helper function to sanitize error messages for user display
export function getSanitizedErrorMessage(error: z.ZodError): string {
  const firstError = error.issues[0];
  return firstError?.message || "Invalid input. Please check your data.";
}

// Type exports for TypeScript
export type ProfileSetupData = z.infer<typeof profileSetupSchema>;
export type BankingDetailsData = z.infer<typeof bankingDetailsSchema>;
export type RedemptionData = z.infer<typeof redemptionSchema>;
