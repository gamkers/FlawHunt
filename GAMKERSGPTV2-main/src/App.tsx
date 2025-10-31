import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import IframePage from './pages/IframePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuthStore } from './store/authStore';

function App() {
  const { checkUser, handleOAuthCallback } = useAuthStore();
  const [isHandlingCallback, setIsHandlingCallback] = useState(false);

  useEffect(() => {
    // Check if we're handling an OAuth callback
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    
    if (accessToken && !isHandlingCallback) {
      setIsHandlingCallback(true);
      handleOAuthCallback().then((success) => {
        setIsHandlingCallback(false);
        if (success) {
          console.log('OAuth callback handled successfully');
          // Force navigation to /app after successful OAuth
          window.location.href = '/app';
        }
      });
    } else {
      // Normal app initialization
      checkUser();
    }
  }, [checkUser, handleOAuthCallback, isHandlingCallback]);

  // Show loading screen while handling OAuth callback
  if (isHandlingCallback) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Completing sign in...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route 
          path="/app" 
          element={
            <ProtectedRoute>
              <IframePage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;