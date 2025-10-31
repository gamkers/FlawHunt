import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';
import { PLAN_LIMITS } from '../types/license';

// Helper function to create a basic user plan for new users
const createBasicUserPlan = async (userId: string) => {
  try {
    console.log('🔄 Attempting to create user plan for user:', userId);
    
    // First, check if user plan already exists
    const { data: existingPlan, error: checkError } = await supabase
      .from('user_plans')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('❌ Error checking existing user plan:', checkError);
      return null;
    }

    if (existingPlan) {
      console.log('✅ User plan already exists:', existingPlan);
      return existingPlan;
    }

    console.log('📝 Creating new user plan...');
    
    // Use RPC call to bypass RLS if needed, or direct insert
    const { data, error } = await supabase
      .from('user_plans')
      .insert([
        {
          user_id: userId,
          plan_type: 'basic',
          max_licenses: PLAN_LIMITS.basic.max_licenses,
          is_active: true
          // Remove created_at and updated_at as they have DEFAULT values
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('❌ Error creating user plan:', error);
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      
      // If RLS is blocking, try to create via service role or handle differently
      if (error.code === '42501' || error.message?.includes('policy')) {
        console.log('🔄 RLS policy blocking insert, this is expected during signup');
        console.log('💡 User plan will be created when user is fully authenticated');
        return null;
      }
      
      return null;
    }

    console.log('✅ Basic user plan created successfully:', data);
    return data;
  } catch (error) {
    console.error('❌ Exception in createBasicUserPlan:', error);
    return null;
  }
};

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ user: User; session: Session }>;
  signInWithGoogle: () => Promise<{ provider: string; url: string }>;
  signUp: (username: string, email: string, password: string) => Promise<{ user: User | null; session: Session | null; error: any | null }>;
  verifyOTP: (email: string, token: string) => Promise<{ user: User | null; session: Session | null; error: any | null }>;
  signOut: () => Promise<void>;
  checkUser: () => Promise<void>;
  handleOAuthCallback: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  loading: true,
  signIn: async (email, password) => {
    set({ loading: true });
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      set({ loading: false });
      throw error;
    }
    if (data.user && data.session) {
      set({ user: data.user, session: data.session, loading: false });
      return { user: data.user, session: data.session };
    }
    set({ loading: false });
    throw new Error("Sign in failed: No user or session data returned.");
  },
  signInWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/app`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    });
    if (error) throw error;
    return data;
  },
  signUp: async (username, email, password) => {
    set({ loading: true });
    try {
      // First, create the user
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (signUpError) throw signUpError;

      // Then send OTP
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        },
      });

      if (otpError) throw otpError;

      set({ loading: false });
      return { 
        user: signUpData.user, 
        session: signUpData.session, 
        error: null 
      };
    } catch (error: any) {
      set({ loading: false });
      return { user: null, session: null, error };
    }
  },
  verifyOTP: async (email, token) => {
    set({ loading: true });
    try {
      console.log('🔄 Verifying OTP for email:', email);
      
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'signup',
      });

      if (error) {
        console.error('❌ OTP verification failed:', error);
        throw error;
      }

      console.log('✅ OTP verified successfully, user:', data.user?.id);

      // Create a basic user plan for the new user
      if (data.user) {
        console.log('🔄 Creating user plan after OTP verification...');
        await createBasicUserPlan(data.user.id);
      }

      set({ 
        user: data.user, 
        session: data.session, 
        loading: false 
      });

      return { 
        user: data.user, 
        session: data.session, 
        error: null 
      };
    } catch (error: any) {
      console.error('❌ Error in verifyOTP:', error);
      set({ loading: false });
      return { user: null, session: null, error };
    }
  },
  signOut: async () => {
    set({ loading: true });
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    }
    set({ user: null, session: null, loading: false });
  },
  checkUser: async () => {
    if (get().session !== null && !get().loading) {
      return;
    }
    
    set({ loading: true });
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Error getting session:", error.message);
      set({ user: null, session: null, loading: false });
      return;
    }

    if (session) {
      set({
        user: session.user ?? null,
        session: session,
        loading: false
      });
    } else {
      set({ user: null, session: null, loading: false });
    }
  },
  handleOAuthCallback: async () => {
    set({ loading: true });
    try {
      console.log('🔄 Handling OAuth callback...');
      
      // Check if we have hash parameters (OAuth callback)
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      
      if (accessToken) {
        console.log('✅ Access token found, processing session...');
        
        // Wait a moment for Supabase to process the session
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("❌ Error handling OAuth callback:", error);
          set({ loading: false });
          return false;
        }

        if (data.session) {
          console.log('✅ Session found for user:', data.session.user.id);
          
          // Check if this is a new user by looking for existing user plan
          console.log('🔄 Checking for existing user plan...');
          const { data: existingPlan } = await supabase
            .from('user_plans')
            .select('id')
            .eq('user_id', data.session.user.id)
            .single();

          // If no existing plan, create a basic plan for the new user
          if (!existingPlan) {
            console.log('📝 No existing plan found, creating new plan...');
            await createBasicUserPlan(data.session.user.id);
          } else {
            console.log('✅ Existing plan found, skipping creation');
          }

          set({
            user: data.session.user,
            session: data.session,
            loading: false
          });
          
          // Clean up the URL by removing the hash
          window.history.replaceState({}, document.title, window.location.pathname);
          
          return true; // Indicate successful callback handling
        }
      }
      
      console.log('❌ No access token found in OAuth callback');
      set({ loading: false });
      return false;
    } catch (error) {
      console.error("❌ Error in OAuth callback:", error);
      set({ loading: false });
      return false;
    }
  },
}));

useAuthStore.getState().checkUser();

// Handle auth state changes
supabase.auth.onAuthStateChange(async (event, session) => {
  console.log('🔄 Auth state change event:', event, 'Session:', !!session);
  
  switch (event) {
    case 'INITIAL_SESSION':
    case 'SIGNED_IN':
      if (session) {
        console.log('✅ User signed in:', session.user.id);
        
        useAuthStore.setState({ 
          user: session.user, 
          session: session, 
          loading: false 
        });
        
        // Try to create user plan after successful authentication (non-blocking)
        console.log('🔄 Checking/creating user plan after authentication...');
        createBasicUserPlan(session.user.id).catch(error => {
          console.error('❌ Error in background user plan creation:', error);
        });
      }
      break;
    case 'SIGNED_OUT':
      console.log('👋 User signed out');
      useAuthStore.setState({ 
        user: null, 
        session: null, 
        loading: false 
      });
      break;
    case 'TOKEN_REFRESHED':
      if (session) {
        console.log('🔄 Token refreshed for user:', session.user.id);
        useAuthStore.setState({ 
          user: session.user, 
          session: session, 
          loading: false 
        });
      }
      break;
  }
});