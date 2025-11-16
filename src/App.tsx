import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PerformanceProvider } from './contexts/PerformanceContext';
import { useAuthStore } from './store/authStore';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Documentation from './components/Documentation';
import Community from './components/Community';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const { checkUser, handleOAuthCallback } = useAuthStore();
  const [isHandlingCallback, setIsHandlingCallback] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
          // Force navigation to /dashboard after successful OAuth
          window.location.href = '/#/dashboard';
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
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Completing sign in...</p>
        </div>
      </div>
    );
  }

  return (
    <PerformanceProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 dark relative">
          {/* Animated Background - Only show on home page */}
          <Routes>
          <Route path="/" element={
            <>
              {/* Animated Background */}
              <div className="fixed inset-0 z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-gray-900 to-blue-900/20">
                  {/* Floating particles animation */}
                  <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-emerald-400/30 rounded-full animate-pulse"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 3}s`,
                          animationDuration: `${3 + Math.random() * 2}s`
                        }}
                      />
                    ))}
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-gray-900/40" />
                </div>
              </div>
              
              {/* Content with higher z-index */}
              <div className="relative z-20 pointer-events-none">
                <Header />
                <main className="pointer-events-auto">
                  <Hero />
                  <Features />
                  <Testimonials />
                  <CTA />
                </main>
                <Footer />
              </div>
            </>
          } />
          <Route path="/docs" element={
            <>
              <Header />
              <Documentation />
              <Footer />
            </>
          } />
          <Route path="/community" element={
            <>
              <Header />
              <Community />
              <div className="relative z-10">
                <Footer />
              </div>
            </>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
    </PerformanceProvider>
   );
}

export default App;