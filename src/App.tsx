import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import SplineViewer from './components/SplineViewer';
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
          window.location.href = '/FlawHunt/dashboard';
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
      <Router basename="/FlawHunt/">
        <div className="min-h-screen bg-gray-900 dark relative">
          {/* Global Spline Background - Only show on home page */}
          <Routes>
          <Route path="/" element={
            <>
              <div className="fixed inset-0 z-10 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <SplineViewer 
                    url="https://prod.spline.design/rV6Jmc853U2mtqN5/scene.splinecode"
                    className="w-full h-full"
                    style={{position: 'absolute', width: '150%', height: '150%', left: '-35%', top: '-30%', transform: 'scale(1.0)', zIndex: 1}}
                    opacity="60"
                    darkOpacity="40"
                    enableOnMobile={true}
                    quality={isMobile ? 'low' : 'medium'}
                    lazy={true}
                    fallbackBackground="bg-gradient-to-br from-matrix-500/10 to-matrix-700/20"
                  />
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