import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import AuthLayout from '../components/AuthLayout';
import { Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Rate limiting states
  const [resendAttempts, setResendAttempts] = useState(0);
  const [canResend, setCanResend] = useState(true);
  const [cooldownEndTime, setCooldownEndTime] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');

  const navigate = useNavigate();
  const { signUp, verifyOTP } = useAuthStore();

  // Rate limit intervals in milliseconds
  const RATE_LIMITS = [
    30 * 1000,      // 30 seconds for first attempt
    5 * 60 * 1000,  // 5 minutes for second attempt
    12 * 60 * 60 * 1000 // 12 hours for third and subsequent attempts
  ];

  // Check if user exists
  const checkUserExists = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        }
      });
      
      if (error) {
        if (error.message.includes('Email not confirmed')) {
          return { exists: true, needsVerification: true };
        }
        if (error.message.includes('User already registered')) {
          return { exists: true, needsVerification: false };
        }
      }
      
      return { exists: false, needsVerification: false };
    } catch (err) {
      console.error('Error checking user:', err);
      return { exists: false, needsVerification: false };
    }
  };

  // Update countdown timer
  useEffect(() => {
    if (!canResend && cooldownEndTime > 0) {
      const interval = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, Math.ceil((cooldownEndTime - now) / 1000));
        
        if (remaining === 0) {
          setCanResend(true);
          setTimeRemaining('');
          clearInterval(interval);
        } else {
          const minutes = Math.floor(remaining / 60);
          const seconds = remaining % 60;
          
          if (minutes > 60) {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            setTimeRemaining(`${hours}h ${remainingMinutes}m`);
          } else if (minutes > 0) {
            setTimeRemaining(`${minutes}m ${seconds}s`);
          } else {
            setTimeRemaining(`${seconds}s`);
          }
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [canResend, cooldownEndTime]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!showOtpInput) {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match.");
        }

        // Check if user exists before proceeding
        const { exists, needsVerification } = await checkUserExists(email);
        
        if (exists) {
          if (needsVerification) {
            throw new Error("This email is already registered but not verified. Please check your email for the verification link or try signing in.");
          } else {
            throw new Error("This email is already registered. Please sign in instead.");
          }
        }

        await signUp(username, email, password);
        setShowOtpInput(true);
        setError('');
        // Reset rate limiting when moving to OTP step
        setResendAttempts(0);
        setCanResend(true);
        setCooldownEndTime(0);
        setTimeRemaining('');
      } else {
        await verifyOTP(email, otp);
        navigate('/login');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to process request');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      const now = Date.now();
      
      // Check if user is still in cooldown period
      if (!canResend && now < cooldownEndTime) {
        const remainingTime = Math.ceil((cooldownEndTime - now) / 1000);
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        
        if (minutes > 60) {
          const hours = Math.floor(minutes / 60);
          const remainingMinutes = minutes % 60;
          setError(`Please wait ${hours}h ${remainingMinutes}m before requesting another OTP`);
        } else if (minutes > 0) {
          setError(`Please wait ${minutes}m ${seconds}s before requesting another OTP`);
        } else {
          setError(`Please wait ${seconds}s before requesting another OTP`);
        }
        return;
      }

      setLoading(true);
      setError('');

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false
        }
      });

      if (error) throw error;

      // Update rate limiting state
      const newAttempts = resendAttempts + 1;
      const rateLimitIndex = Math.min(newAttempts - 1, RATE_LIMITS.length - 1);
      const cooldownDuration = RATE_LIMITS[rateLimitIndex];
      const newCooldownEndTime = now + cooldownDuration;

      setResendAttempts(newAttempts);
      setCooldownEndTime(newCooldownEndTime);
      setCanResend(false);

      setError('OTP has been resent to your email');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title={showOtpInput ? "Verify Your Email" : "Create an Account"}
      subtitle={showOtpInput ? "Enter the OTP sent to your email" : "Join GamkersGPT to get started"}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className={`p-3 rounded-lg ${
            error.includes('resent') ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-red-500/10 border-red-500/50 text-red-400'
          } border text-sm`}>
            {error}
          </div>
        )}

        {!showOtpInput ? (
          <>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Choose a username"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Choose a password"
                required
                minLength={6}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Confirm your password"
                required
                minLength={6}
              />
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-300 mb-2">
                Enter OTP
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Enter the OTP from your email"
                required
              />
            </div>
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={loading || !canResend}
              className={`text-sm transition-colors duration-200 ${
                canResend 
                  ? 'text-emerald-400 hover:text-emerald-300' 
                  : 'text-gray-500 cursor-not-allowed'
              }`}
            >
              {loading 
                ? 'Sending...' 
                : canResend 
                  ? 'Resend OTP' 
                  : `Resend OTP (${timeRemaining})`
              }
            </button>
            {resendAttempts > 0 && (
              <p className="text-xs text-gray-500">
                Resend attempts: {resendAttempts}/∞ 
                {!canResend && ` • Next attempt in: ${timeRemaining}`}
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              {showOtpInput ? 'Verifying...' : 'Creating account...'}
            </>
          ) : (
            showOtpInput ? 'Verify OTP' : 'Create Account'
          )}
        </button>

        <p className="text-center text-gray-400 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default SignupPage;
