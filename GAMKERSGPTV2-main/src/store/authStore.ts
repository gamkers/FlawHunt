import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

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
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'signup',
      });

      if (error) throw error;

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
      // Check if we have hash parameters (OAuth callback)
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      
      if (accessToken) {
        // Wait a moment for Supabase to process the session
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error handling OAuth callback:", error);
          set({ loading: false });
          return false;
        }

        if (data.session) {
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
      
      set({ loading: false });
      return false;
    } catch (error) {
      console.error("Error in OAuth callback:", error);
      set({ loading: false });
      return false;
    }
  },
}));

useAuthStore.getState().checkUser();

// Handle auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  

  switch (event) {
    case 'INITIAL_SESSION':
    case 'SIGNED_IN':
      if (session) {
        useAuthStore.setState({ 
          user: session.user, 
          session: session, 
          loading: false 
        });
      }
      break;
    case 'SIGNED_OUT':
      useAuthStore.setState({ 
        user: null, 
        session: null, 
        loading: false 
      });
      break;
    case 'TOKEN_REFRESHED':
      if (session) {
        useAuthStore.setState({ 
          user: session.user, 
          session: session, 
          loading: false 
        });
      }
      break;
  }
});
