import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PerformanceProvider } from './contexts/PerformanceContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Documentation from './components/Documentation';
import Community from './components/Community';
import SplineViewer from './components/SplineViewer';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
        </Routes>
      </div>
    </Router>
    </PerformanceProvider>
   );
}

export default App;