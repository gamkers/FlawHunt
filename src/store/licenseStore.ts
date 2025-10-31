import { create } from 'zustand';
import { LicenseKey, UserPlan, PaymentRecord, PLAN_LIMITS } from '../types/license';
import { supabase } from '../lib/supabase';

interface LicenseState {
  licenses: LicenseKey[];
  userPlan: UserPlan | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  generateLicenseKey: (deviceName?: string) => Promise<boolean>;
  revokeLicenseKey: (licenseId: string) => Promise<boolean>;
  validateLicenseKey: (key: string, macAddress: string) => Promise<boolean>;
  upgradeToPremium: () => Promise<boolean>;
  fetchUserLicenses: () => Promise<void>;
  fetchUserPlan: () => Promise<void>;
}

export const useLicenseStore = create<LicenseState>((set, get) => ({
  licenses: [],
  userPlan: null,
  loading: false,
  error: null,

  generateLicenseKey: async (deviceName?: string) => {
    set({ loading: true, error: null });
    
    try {
      const { userPlan, licenses } = get();
      
      if (!userPlan) {
        set({ error: 'No active plan found', loading: false });
        return false;
      }

      if (licenses.length >= userPlan.max_licenses) {
        set({ 
          error: `Maximum licenses reached for ${userPlan.plan_type} plan (${userPlan.max_licenses})`, 
          loading: false 
        });
        return false;
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        set({ error: 'User not authenticated', loading: false });
        return false;
      }

      console.log('🔑 Generating license key for user:', user.id, 'plan:', userPlan.plan_type);

      // Generate new license key using Supabase function
      const { data, error } = await supabase.rpc('generate_license_key', {
        p_user_id: user.id,
        p_plan_type: userPlan.plan_type,
        p_device_name: deviceName || 'Unknown Device'
      });

      if (error) {
        console.error('❌ RPC Error:', error);
        throw error;
      }

      console.log('✅ RPC Response:', data);

      // Check if the function returned an error
      if (data && !data.success) {
        throw new Error(data.error || 'Failed to generate license key');
      }

      // Refresh licenses
      await get().fetchUserLicenses();

      set({ loading: false });
      return true;
    } catch (error) {
      console.error('❌ License generation error:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to generate license key',
        loading: false 
      });
      return false;
    }
  },

  revokeLicenseKey: async (licenseId: string) => {
    set({ loading: true, error: null });
    
    try {
      const { error } = await supabase
        .from('license_keys')
        .update({ status: 'revoked' })
        .eq('id', licenseId);

      if (error) throw error;

      // Update local state
      const { licenses } = get();
      const updatedLicenses = licenses.map(license => 
        license.id === licenseId 
          ? { ...license, status: 'revoked', is_active: false }
          : license
      );

      set({ 
        licenses: updatedLicenses,
        loading: false 
      });

      return true;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to revoke license key',
        loading: false 
      });
      return false;
    }
  },

  validateLicenseKey: async (key: string, macAddress: string) => {
    set({ loading: true, error: null });
    
    try {
      // Use Supabase function for validation
      const { data, error } = await supabase.rpc('validate_license_key', {
        p_license_key: key,
        p_mac_address: macAddress
      });

      if (error) throw error;

      if (!data.is_valid) {
        set({ error: data.message || 'Invalid license key', loading: false });
        return false;
      }

      set({ loading: false });
      return true;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to validate license key',
        loading: false 
      });
      return false;
    }
  },

  upgradeToPremium: async () => {
    set({ loading: true, error: null });
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        set({ error: 'User not authenticated', loading: false });
        return false;
      }

      // Mock payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update user plan to premium
      const { error } = await supabase
        .from('user_plans')
        .update({ 
          plan_type: 'premium',
          max_licenses: PLAN_LIMITS.premium.max_licenses,
          expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      // Create payment record
      await supabase
        .from('payment_records')
        .insert({
          user_id: user.id,
          amount: 99.99,
          currency: 'USD',
          payment_method: 'demo',
          status: 'completed'
        });

      // Refresh user plan
      await get().fetchUserPlan();

      set({ loading: false });
      return true;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to upgrade to premium',
        loading: false 
      });
      return false;
    }
  },

  fetchUserLicenses: async () => {
    set({ loading: true, error: null });
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        set({ error: 'User not authenticated', loading: false });
        return;
      }

      const { data, error } = await supabase
        .from('license_keys')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform the data to match the expected interface
      const transformedLicenses = (data || []).map(license => ({
        ...license,
        key: license.license_key, // Map license_key to key for UI compatibility
        is_active: license.status === 'active' // Transform status to is_active boolean
      }));

      set({ 
        licenses: transformedLicenses,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch licenses',
        loading: false 
      });
    }
  },

  fetchUserPlan: async () => {
    set({ loading: true, error: null });
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log('⚠️ User not authenticated, skipping fetchUserPlan');
        set({ loading: false });
        return;
      }

      console.log('🔍 Fetching user plan for user:', user.id);

      const { data: userPlan, error } = await supabase
        .from('user_plans')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('❌ Error fetching user plan:', error);
        
        // If no user plan exists (PGRST116), create a basic plan
        if (error.code === 'PGRST116') {
          console.log('📝 No user plan found, creating basic plan...');
          
          const { data: newPlan, error: insertError } = await supabase
            .from('user_plans')
            .insert({
              user_id: user.id,
              plan_type: 'basic',
              max_licenses: PLAN_LIMITS.basic.max_licenses,
              is_active: true
            })
            .select()
            .single();

          if (insertError) {
            console.error('❌ Error creating basic plan:', insertError);
            // Don't throw here, just set error state and continue
            set({ 
              error: 'Failed to create user plan. Please try again.',
              loading: false 
            });
            return;
          }

          console.log('✅ Basic plan created successfully:', newPlan);
          set({ userPlan: newPlan, loading: false });
          return;
        }
        
        // For other errors, set error state but don't throw
        set({ 
          error: error.message || 'Failed to fetch user plan',
          loading: false 
        });
        return;
      }

      // Check if existing plan has invalid max_licenses and fix it
      if (userPlan && (userPlan.max_licenses === null || userPlan.max_licenses === 0 || userPlan.max_licenses === 1)) {
        console.log('🔧 Fixing invalid max_licenses for existing plan...');
        
        const correctMaxLicenses = userPlan.plan_type === 'premium' 
          ? PLAN_LIMITS.premium.max_licenses 
          : PLAN_LIMITS.basic.max_licenses;
          
        const { data: updatedPlan, error: updateError } = await supabase
          .from('user_plans')
          .update({ max_licenses: correctMaxLicenses })
          .eq('user_id', user.id)
          .select()
          .single();
          
        if (updateError) {
          console.error('❌ Error updating plan max_licenses:', updateError);
          // Still use the original plan but log the error
          set({ userPlan, loading: false });
          return;
        }
        
        console.log('✅ Plan max_licenses updated successfully:', updatedPlan);
        set({ userPlan: updatedPlan, loading: false });
        return;
      }

      console.log('✅ User plan fetched successfully:', userPlan);
      set({ userPlan, loading: false });
    } catch (error) {
      console.error('❌ Error in fetchUserPlan:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch user plan',
        loading: false 
      });
    }
  }
}));

// Helper function to generate random license keys
function generateRandomKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segments = [];
  
  for (let i = 0; i < 4; i++) {
    let segment = '';
    for (let j = 0; j < 4; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    segments.push(segment);
  }
  
  return segments.join('-');
}