import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import AuthLayout from '../components/AuthLayout';
import { Loader2 } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn, signInWithGoogle } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to continue to Flaw Hunt"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 border border-red-500/50 bg-red-500/10 text-red-400 text-sm font-mono">
            <span className="text-red-500">ERROR:</span> {error}
          </div>
        )}
        
        <div>
          <div className="text-green-400 text-sm mb-2">
            <span className="text-green-500">$</span> enter_email --required
          </div>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-green-500/30 px-4 py-3 text-green-400 placeholder-green-600/50 focus:outline-none focus:border-green-400 font-mono text-sm"
            placeholder="user@domain.com"
            required
          />
        </div>

        <div>
          <div className="text-green-400 text-sm mb-2">
            <span className="text-green-500">$</span> enter_password --secure
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-green-500/30 px-4 py-3 text-green-400 placeholder-green-600/50 focus:outline-none focus:border-green-400 font-mono text-sm"
            placeholder="••••••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-400 py-3 px-4 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span className="text-green-500">$</span> authenticating...
            </>
          ) : (
            <>
              <span className="text-green-500">$</span> ./login --execute
            </>
          )}
        </button>

        {/* Google Sign-in temporarily hidden - will be implemented in future
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 border border-gray-700"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>
        */}

        <div className="text-center text-green-400/70 text-sm font-mono mt-6">
          <span className="text-green-500">$</span> need_account? {' '}
          <Link to="/signup" className="text-green-400 hover:text-green-300 transition-colors duration-200 underline">
            ./signup --new-user
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;