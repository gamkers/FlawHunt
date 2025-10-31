# Flaw Hunt Authentication System

This document describes the authentication system implemented in the Flaw Hunt project, based on the GamkersGPT authentication architecture.

## Features Implemented

### 🔐 Authentication Features
- **Email/Password Authentication**: Traditional sign-up and sign-in with email verification
- **Google OAuth**: One-click sign-in with Google accounts
- **OTP Verification**: Email-based OTP verification for new user registration
- **Protected Routes**: Route protection for authenticated users only
- **Session Management**: Automatic session handling and token refresh
- **Responsive UI**: Mobile-friendly authentication forms

### 📁 File Structure

```
src/
├── components/
│   ├── AuthLayout.tsx          # Shared layout for auth pages
│   ├── ProtectedRoute.tsx      # Route protection component
│   └── Header.tsx              # Updated with auth buttons
├── pages/
│   ├── LoginPage.tsx           # Sign-in page
│   ├── SignupPage.tsx          # Registration page with OTP
│   └── DashboardPage.tsx       # Protected dashboard
├── store/
│   └── authStore.ts            # Zustand authentication store
└── lib/
    └── supabase.ts             # Supabase client configuration
```

## Setup Instructions

### 1. Install Dependencies
The following packages have been added:
```bash
npm install @supabase/supabase-js zustand
```

### 2. Environment Configuration
Create a `.env.local` file in the project root:
```env
VITE_SUPABASE_URL=https://your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Supabase Setup
1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Enable Email authentication in Authentication > Settings
3. Configure Google OAuth provider (optional)
4. Set up email templates for OTP verification
5. Update the environment variables with your project credentials

### 4. Database Schema
The authentication system uses Supabase's built-in auth schema. No additional tables are required for basic functionality.

## Routes

- `/login` - Sign-in page
- `/signup` - Registration page with OTP verification
- `/dashboard` - Protected dashboard (requires authentication)
- All other routes remain unchanged

## Authentication Flow

### Sign Up Process
1. User enters username, email, and password
2. System checks if user already exists
3. If new user, sends OTP to email
4. User enters OTP to verify account
5. Account is activated and user is signed in

### Sign In Process
1. User enters email and password
2. System authenticates credentials
3. User is redirected to dashboard

### Google OAuth
1. User clicks "Continue with Google"
2. Redirected to Google OAuth consent screen
3. After approval, redirected back with tokens
4. System processes OAuth callback and signs user in

## State Management

The authentication state is managed using Zustand with the following structure:

```typescript
interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signInWithGoogle: () => Promise<void>;
  signUp: (username: string, email: string, password: string) => Promise<boolean>;
  verifyOTP: (email: string, otp: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  checkUser: () => Promise<void>;
  handleOAuthCallback: () => Promise<boolean>;
}
```

## UI Components

### AuthLayout
Provides consistent styling for authentication pages with:
- Dark theme with gradient background
- Centered form layout
- Responsive design
- Flaw Hunt branding

### Header Integration
The header component now includes:
- Sign In/Sign Up buttons for unauthenticated users
- Dashboard link and Sign Out button for authenticated users
- Mobile-responsive navigation menu

## Security Features

- **Protected Routes**: Automatic redirection to login for unauthenticated users
- **Session Validation**: Real-time session checking and token refresh
- **Secure Storage**: Tokens stored securely by Supabase client
- **Rate Limiting**: OTP resend cooldown to prevent abuse

## Development Notes

- The system uses placeholder Supabase credentials for development
- All authentication methods will fail gracefully without proper Supabase setup
- The UI and routing work independently of the backend authentication
- Error handling is implemented for all authentication operations

## Next Steps

1. Set up a real Supabase project
2. Configure email templates and SMTP settings
3. Set up Google OAuth credentials
4. Customize the dashboard with actual application features
5. Add user profile management
6. Implement password reset functionality

## Testing

To test the authentication system:

1. Start the development server: `npm run dev`
2. Navigate to `/login` or `/signup`
3. Test the UI and form validation
4. With proper Supabase setup, test actual authentication flows

The authentication system is now fully integrated and ready for production use with proper Supabase configuration.