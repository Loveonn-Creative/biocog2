export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_conversations: {
        Row: {
          created_at: string
          id: string
          language: string | null
          query: string
          response: string
          satisfaction_rating: number | null
          session_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          language?: string | null
          query: string
          response: string
          satisfaction_rating?: number | null
          session_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          language?: string | null
          query?: string
          response?: string
          satisfaction_rating?: number | null
          session_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          created_at: string
          event_data: Json | null
          event_type: string
          id: string
          ip_address: unknown
          page_url: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_data?: Json | null
          event_type: string
          id?: string
          ip_address?: unknown
          page_url?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          ip_address?: unknown
          page_url?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      carbon_credits: {
        Row: {
          created_at: string
          credit_value: number | null
          credits_earned: number
          earned_date: string
          emission_id: string | null
          id: string
          payout_date: string | null
          status: Database["public"]["Enums"]["credit_status"] | null
          user_id: string
        }
        Insert: {
          created_at?: string
          credit_value?: number | null
          credits_earned: number
          earned_date?: string
          emission_id?: string | null
          id?: string
          payout_date?: string | null
          status?: Database["public"]["Enums"]["credit_status"] | null
          user_id: string
        }
        Update: {
          created_at?: string
          credit_value?: number | null
          credits_earned?: number
          earned_date?: string
          emission_id?: string | null
          id?: string
          payout_date?: string | null
          status?: Database["public"]["Enums"]["credit_status"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "carbon_credits_emission_id_fkey"
            columns: ["emission_id"]
            isOneToOne: false
            referencedRelation: "carbon_emissions"
            referencedColumns: ["id"]
          },
        ]
      }
      carbon_emissions: {
        Row: {
          calculation_method: string | null
          co2_emissions: number
          created_at: string
          emission_category: Database["public"]["Enums"]["emission_category"]
          emission_factor: number | null
          energy_used: number | null
          id: string
          scan_id: string
          user_id: string
        }
        Insert: {
          calculation_method?: string | null
          co2_emissions: number
          created_at?: string
          emission_category: Database["public"]["Enums"]["emission_category"]
          emission_factor?: number | null
          energy_used?: number | null
          id?: string
          scan_id: string
          user_id: string
        }
        Update: {
          calculation_method?: string | null
          co2_emissions?: number
          created_at?: string
          emission_category?: Database["public"]["Enums"]["emission_category"]
          emission_factor?: number | null
          energy_used?: number | null
          id?: string
          scan_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "carbon_emissions_scan_id_fkey"
            columns: ["scan_id"]
            isOneToOne: false
            referencedRelation: "invoice_scans"
            referencedColumns: ["id"]
          },
        ]
      }
      carbon_market_rates: {
        Row: {
          created_at: string | null
          effective_date: string
          id: string
          rate_per_credit: number
          source: string | null
        }
        Insert: {
          created_at?: string | null
          effective_date: string
          id?: string
          rate_per_credit: number
          source?: string | null
        }
        Update: {
          created_at?: string | null
          effective_date?: string
          id?: string
          rate_per_credit?: number
          source?: string | null
        }
        Relationships: []
      }
      certifications: {
        Row: {
          certification_name: string
          created_at: string
          description: string | null
          earned_date: string | null
          expires_at: string | null
          id: string
          progress_percentage: number | null
          requirements: Json | null
          status: Database["public"]["Enums"]["cert_status"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          certification_name: string
          created_at?: string
          description?: string | null
          earned_date?: string | null
          expires_at?: string | null
          id?: string
          progress_percentage?: number | null
          requirements?: Json | null
          status?: Database["public"]["Enums"]["cert_status"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          certification_name?: string
          created_at?: string
          description?: string | null
          earned_date?: string | null
          expires_at?: string | null
          id?: string
          progress_percentage?: number | null
          requirements?: Json | null
          status?: Database["public"]["Enums"]["cert_status"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      compliance_standards: {
        Row: {
          applicable_sectors: Json | null
          created_at: string
          description: string | null
          id: string
          is_mandatory: boolean | null
          requirements: Json
          standard_name: string
          updated_at: string
        }
        Insert: {
          applicable_sectors?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          is_mandatory?: boolean | null
          requirements: Json
          standard_name: string
          updated_at?: string
        }
        Update: {
          applicable_sectors?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          is_mandatory?: boolean | null
          requirements?: Json
          standard_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      credit_redemptions: {
        Row: {
          bank_details: Json | null
          created_at: string | null
          credit_amount: number
          id: string
          monetary_value: number
          processed_at: string | null
          redemption_type: string | null
          status: string | null
          transaction_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          bank_details?: Json | null
          created_at?: string | null
          credit_amount: number
          id?: string
          monetary_value: number
          processed_at?: string | null
          redemption_type?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bank_details?: Json | null
          created_at?: string | null
          credit_amount?: number
          id?: string
          monetary_value?: number
          processed_at?: string | null
          redemption_type?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      esg_metrics: {
        Row: {
          created_at: string
          date: string
          emissions_reduced: number | null
          energy_consumed: number | null
          environmental_score: number | null
          governance_score: number | null
          id: string
          renewable_energy_used: number | null
          social_score: number | null
          total_emissions: number | null
          user_id: string
          waste_generated: number | null
          waste_recycled: number | null
        }
        Insert: {
          created_at?: string
          date: string
          emissions_reduced?: number | null
          energy_consumed?: number | null
          environmental_score?: number | null
          governance_score?: number | null
          id?: string
          renewable_energy_used?: number | null
          social_score?: number | null
          total_emissions?: number | null
          user_id: string
          waste_generated?: number | null
          waste_recycled?: number | null
        }
        Update: {
          created_at?: string
          date?: string
          emissions_reduced?: number | null
          energy_consumed?: number | null
          environmental_score?: number | null
          governance_score?: number | null
          id?: string
          renewable_energy_used?: number | null
          social_score?: number | null
          total_emissions?: number | null
          user_id?: string
          waste_generated?: number | null
          waste_recycled?: number | null
        }
        Relationships: []
      }
      esg_reports: {
        Row: {
          compliance_standards: Json | null
          created_at: string
          environmental_score: number | null
          esg_score: number | null
          file_url: string | null
          generated_at: string
          governance_score: number | null
          id: string
          period_end: string
          period_start: string
          report_type: Database["public"]["Enums"]["report_type"]
          social_score: number | null
          user_id: string
        }
        Insert: {
          compliance_standards?: Json | null
          created_at?: string
          environmental_score?: number | null
          esg_score?: number | null
          file_url?: string | null
          generated_at?: string
          governance_score?: number | null
          id?: string
          period_end: string
          period_start: string
          report_type: Database["public"]["Enums"]["report_type"]
          social_score?: number | null
          user_id: string
        }
        Update: {
          compliance_standards?: Json | null
          created_at?: string
          environmental_score?: number | null
          esg_score?: number | null
          file_url?: string | null
          generated_at?: string
          governance_score?: number | null
          id?: string
          period_end?: string
          period_start?: string
          report_type?: Database["public"]["Enums"]["report_type"]
          social_score?: number | null
          user_id?: string
        }
        Relationships: []
      }
      ewaste_items: {
        Row: {
          brand: string | null
          category: Database["public"]["Enums"]["ewaste_category"]
          condition: string | null
          created_at: string
          description: string | null
          estimated_value: number | null
          id: string
          images: Json | null
          item_name: string
          model: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["pickup_status"] | null
          updated_at: string
          user_id: string
          weight: number | null
        }
        Insert: {
          brand?: string | null
          category: Database["public"]["Enums"]["ewaste_category"]
          condition?: string | null
          created_at?: string
          description?: string | null
          estimated_value?: number | null
          id?: string
          images?: Json | null
          item_name: string
          model?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["pickup_status"] | null
          updated_at?: string
          user_id: string
          weight?: number | null
        }
        Update: {
          brand?: string | null
          category?: Database["public"]["Enums"]["ewaste_category"]
          condition?: string | null
          created_at?: string
          description?: string | null
          estimated_value?: number | null
          id?: string
          images?: Json | null
          item_name?: string
          model?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["pickup_status"] | null
          updated_at?: string
          user_id?: string
          weight?: number | null
        }
        Relationships: []
      }
      financial_metrics: {
        Row: {
          created_at: string
          credits_redeemed: number | null
          green_investments: number | null
          id: string
          loan_eligibility_score: number | null
          month_year: string
          savings_from_efficiency: number | null
          total_credits_earned: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          credits_redeemed?: number | null
          green_investments?: number | null
          id?: string
          loan_eligibility_score?: number | null
          month_year: string
          savings_from_efficiency?: number | null
          total_credits_earned?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          credits_redeemed?: number | null
          green_investments?: number | null
          id?: string
          loan_eligibility_score?: number | null
          month_year?: string
          savings_from_efficiency?: number | null
          total_credits_earned?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      green_loans: {
        Row: {
          applied_date: string | null
          approved_date: string | null
          created_at: string
          disbursed_date: string | null
          documents: Json | null
          esg_score_at_application: number | null
          id: string
          interest_rate: number | null
          loan_amount: number
          monthly_emi: number | null
          purpose: string | null
          status: Database["public"]["Enums"]["loan_status"] | null
          tenure_months: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          applied_date?: string | null
          approved_date?: string | null
          created_at?: string
          disbursed_date?: string | null
          documents?: Json | null
          esg_score_at_application?: number | null
          id?: string
          interest_rate?: number | null
          loan_amount: number
          monthly_emi?: number | null
          purpose?: string | null
          status?: Database["public"]["Enums"]["loan_status"] | null
          tenure_months?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          applied_date?: string | null
          approved_date?: string | null
          created_at?: string
          disbursed_date?: string | null
          documents?: Json | null
          esg_score_at_application?: number | null
          id?: string
          interest_rate?: number | null
          loan_amount?: number
          monthly_emi?: number | null
          purpose?: string | null
          status?: Database["public"]["Enums"]["loan_status"] | null
          tenure_months?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      green_score_audit_log: {
        Row: {
          calculation_details: Json | null
          change_reason: string | null
          created_at: string | null
          id: string
          new_score: number | null
          old_score: number | null
          user_id: string | null
        }
        Insert: {
          calculation_details?: Json | null
          change_reason?: string | null
          created_at?: string | null
          id?: string
          new_score?: number | null
          old_score?: number | null
          user_id?: string | null
        }
        Update: {
          calculation_details?: Json | null
          change_reason?: string | null
          created_at?: string | null
          id?: string
          new_score?: number | null
          old_score?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      invoice_scans: {
        Row: {
          created_at: string
          file_name: string | null
          file_size: number | null
          file_url: string
          id: string
          invoice_data: Json | null
          ocr_data: Json | null
          processing_status:
            | Database["public"]["Enums"]["processing_status"]
            | null
          scan_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          file_name?: string | null
          file_size?: number | null
          file_url: string
          id?: string
          invoice_data?: Json | null
          ocr_data?: Json | null
          processing_status?:
            | Database["public"]["Enums"]["processing_status"]
            | null
          scan_date?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          file_name?: string | null
          file_size?: number | null
          file_url?: string
          id?: string
          invoice_data?: Json | null
          ocr_data?: Json | null
          processing_status?:
            | Database["public"]["Enums"]["processing_status"]
            | null
          scan_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          data: Json | null
          id: string
          message: string | null
          read: boolean | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          message?: string | null
          read?: boolean | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          message?: string | null
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      payment_history: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          payment_method: string | null
          status: string
          stripe_invoice_id: string | null
          stripe_payment_intent_id: string | null
          subscription_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          payment_method?: string | null
          status?: string
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
          subscription_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          payment_method?: string | null
          status?: string
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
          subscription_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_history_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      pickup_schedules: {
        Row: {
          actual_earnings: number | null
          created_at: string
          id: string
          item_id: string
          pickup_address: Json
          pickup_notes: string | null
          recycler_id: string
          scheduled_date: string
          status: Database["public"]["Enums"]["pickup_status"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          actual_earnings?: number | null
          created_at?: string
          id?: string
          item_id: string
          pickup_address: Json
          pickup_notes?: string | null
          recycler_id: string
          scheduled_date: string
          status?: Database["public"]["Enums"]["pickup_status"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          actual_earnings?: number | null
          created_at?: string
          id?: string
          item_id?: string
          pickup_address?: Json
          pickup_notes?: string | null
          recycler_id?: string
          scheduled_date?: string
          status?: Database["public"]["Enums"]["pickup_status"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pickup_schedules_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "ewaste_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pickup_schedules_recycler_id_fkey"
            columns: ["recycler_id"]
            isOneToOne: false
            referencedRelation: "recyclers"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          ai_preferences: Json | null
          avatar_url: string | null
          bank_account_holder: string | null
          bank_account_number: string | null
          bank_ifsc: string | null
          bank_verified: boolean | null
          business_name: string
          business_type: Database["public"]["Enums"]["business_type"] | null
          created_at: string
          green_score: number | null
          green_score_factors: Json | null
          green_score_history: Json | null
          green_score_last_updated: string | null
          gstin: string | null
          id: string
          language_preference: string | null
          last_active_at: string | null
          location: Json | null
          onboarding_completed: boolean | null
          onboarding_data: Json | null
          pan_number: string | null
          pan_verified: boolean | null
          phone: string | null
          preferences: Json | null
          profile_completion_percentage: number | null
          profile_views: number | null
          total_co2_reduced: number | null
          total_credits_earned: number | null
          total_scans: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_preferences?: Json | null
          avatar_url?: string | null
          bank_account_holder?: string | null
          bank_account_number?: string | null
          bank_ifsc?: string | null
          bank_verified?: boolean | null
          business_name: string
          business_type?: Database["public"]["Enums"]["business_type"] | null
          created_at?: string
          green_score?: number | null
          green_score_factors?: Json | null
          green_score_history?: Json | null
          green_score_last_updated?: string | null
          gstin?: string | null
          id?: string
          language_preference?: string | null
          last_active_at?: string | null
          location?: Json | null
          onboarding_completed?: boolean | null
          onboarding_data?: Json | null
          pan_number?: string | null
          pan_verified?: boolean | null
          phone?: string | null
          preferences?: Json | null
          profile_completion_percentage?: number | null
          profile_views?: number | null
          total_co2_reduced?: number | null
          total_credits_earned?: number | null
          total_scans?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_preferences?: Json | null
          avatar_url?: string | null
          bank_account_holder?: string | null
          bank_account_number?: string | null
          bank_ifsc?: string | null
          bank_verified?: boolean | null
          business_name?: string
          business_type?: Database["public"]["Enums"]["business_type"] | null
          created_at?: string
          green_score?: number | null
          green_score_factors?: Json | null
          green_score_history?: Json | null
          green_score_last_updated?: string | null
          gstin?: string | null
          id?: string
          language_preference?: string | null
          last_active_at?: string | null
          location?: Json | null
          onboarding_completed?: boolean | null
          onboarding_data?: Json | null
          pan_number?: string | null
          pan_verified?: boolean | null
          phone?: string | null
          preferences?: Json | null
          profile_completion_percentage?: number | null
          profile_views?: number | null
          total_co2_reduced?: number | null
          total_credits_earned?: number | null
          total_scans?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      recyclers: {
        Row: {
          certifications: Json | null
          contact_info: Json
          created_at: string
          id: string
          is_verified: boolean | null
          location: Json
          name: string
          pickup_radius: number | null
          rating: number | null
          specialities: Json | null
          updated_at: string
        }
        Insert: {
          certifications?: Json | null
          contact_info: Json
          created_at?: string
          id?: string
          is_verified?: boolean | null
          location: Json
          name: string
          pickup_radius?: number | null
          rating?: number | null
          specialities?: Json | null
          updated_at?: string
        }
        Update: {
          certifications?: Json | null
          contact_info?: Json
          created_at?: string
          id?: string
          is_verified?: boolean | null
          location?: Json
          name?: string
          pickup_radius?: number | null
          rating?: number | null
          specialities?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_type: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_ends_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_type: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_type?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      usage_metrics: {
        Row: {
          count: number
          created_at: string
          date: string
          id: string
          metric_type: string
          user_id: string
        }
        Insert: {
          count?: number
          created_at?: string
          date?: string
          id?: string
          metric_type: string
          user_id: string
        }
        Update: {
          count?: number
          created_at?: string
          date?: string
          id?: string
          metric_type?: string
          user_id?: string
        }
        Relationships: []
      }
      user_compliance: {
        Row: {
          compliance_percentage: number | null
          created_at: string
          evidence_documents: Json | null
          id: string
          last_audit_date: string | null
          next_audit_date: string | null
          standard_id: string
          status: Database["public"]["Enums"]["compliance_status"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          compliance_percentage?: number | null
          created_at?: string
          evidence_documents?: Json | null
          id?: string
          last_audit_date?: string | null
          next_audit_date?: string | null
          standard_id: string
          status?: Database["public"]["Enums"]["compliance_status"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          compliance_percentage?: number | null
          created_at?: string
          evidence_documents?: Json | null
          id?: string
          last_audit_date?: string | null
          next_audit_date?: string | null
          standard_id?: string
          status?: Database["public"]["Enums"]["compliance_status"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_compliance_standard_id_fkey"
            columns: ["standard_id"]
            isOneToOne: false
            referencedRelation: "compliance_standards"
            referencedColumns: ["id"]
          },
        ]
      }
      user_queries: {
        Row: {
          context_data: Json | null
          created_at: string | null
          id: string
          language: string | null
          query_text: string
          query_type: string | null
          response_text: string | null
          satisfaction_rating: number | null
          user_id: string | null
        }
        Insert: {
          context_data?: Json | null
          created_at?: string | null
          id?: string
          language?: string | null
          query_text: string
          query_type?: string | null
          response_text?: string | null
          satisfaction_rating?: number | null
          user_id?: string | null
        }
        Update: {
          context_data?: Json | null
          created_at?: string | null
          id?: string
          language?: string | null
          query_text?: string
          query_type?: string | null
          response_text?: string | null
          satisfaction_rating?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_uuid: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      get_user_subscription: {
        Args: { user_uuid: string }
        Returns: {
          current_period_end: string
          plan_type: string
          status: string
          trial_ends_at: string
        }[]
      }
      is_admin: { Args: { user_uuid: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "msme_owner" | "accountant"
      business_type:
        | "manufacturing"
        | "trading"
        | "services"
        | "agriculture"
        | "other"
      cert_status: "not_started" | "in_progress" | "completed" | "expired"
      compliance_status:
        | "compliant"
        | "non_compliant"
        | "pending_review"
        | "needs_action"
      credit_status: "pending" | "approved" | "paid" | "expired"
      emission_category:
        | "electricity"
        | "fuel"
        | "transport"
        | "waste"
        | "other"
      ewaste_category:
        | "computers"
        | "phones"
        | "printers"
        | "batteries"
        | "cables"
        | "other"
      loan_status:
        | "draft"
        | "submitted"
        | "under_review"
        | "approved"
        | "rejected"
        | "disbursed"
      pickup_status: "scheduled" | "picked_up" | "completed" | "cancelled"
      processing_status: "pending" | "processing" | "completed" | "failed"
      report_type: "monthly" | "quarterly" | "annual" | "custom"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "msme_owner", "accountant"],
      business_type: [
        "manufacturing",
        "trading",
        "services",
        "agriculture",
        "other",
      ],
      cert_status: ["not_started", "in_progress", "completed", "expired"],
      compliance_status: [
        "compliant",
        "non_compliant",
        "pending_review",
        "needs_action",
      ],
      credit_status: ["pending", "approved", "paid", "expired"],
      emission_category: ["electricity", "fuel", "transport", "waste", "other"],
      ewaste_category: [
        "computers",
        "phones",
        "printers",
        "batteries",
        "cables",
        "other",
      ],
      loan_status: [
        "draft",
        "submitted",
        "under_review",
        "approved",
        "rejected",
        "disbursed",
      ],
      pickup_status: ["scheduled", "picked_up", "completed", "cancelled"],
      processing_status: ["pending", "processing", "completed", "failed"],
      report_type: ["monthly", "quarterly", "annual", "custom"],
    },
  },
} as const
