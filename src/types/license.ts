export interface LicenseKey {
  id: string;
  key: string;
  license_key?: string; // Database field name for compatibility
  user_id: string;
  plan_type: 'basic' | 'premium';
  mac_address: string | null;
  created_at: string;
  expires_at: string;
  is_active: boolean;
  device_name?: string;
}

export interface UserPlan {
  id: string;
  user_id: string;
  plan_type: 'basic' | 'premium';
  created_at: string;
  expires_at: string | null;
  is_active: boolean;
  max_licenses: number;
}

export interface PaymentRecord {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  plan_type: 'basic' | 'premium';
  payment_status: 'pending' | 'completed' | 'failed';
  payment_method: string;
  created_at: string;
}

export const PLAN_LIMITS = {
  basic: {
    max_licenses: 10,
    duration_days: 30,
    price: 0
  },
  premium: {
    max_licenses: 5,
    duration_days: 30,
    price: 29.99
  }
} as const;