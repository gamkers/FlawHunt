import React, { useState, useEffect, useRef, Suspense } from 'react';
import { usePerformance } from '../contexts/PerformanceContext';

interface SplineViewerProps {
  url: string;
  className?: string;
  style?: React.CSSProperties;
  opacity?: string;
  darkOpacity?: string;
  enableOnMobile?: boolean;
  quality?: 'low' | 'medium' | 'high';
  lazy?: boolean;
  fallbackBackground?: string;
}

const SplineViewer: React.FC<SplineViewerProps> = ({
  url,
  className = '',
  style = {},
  opacity = '30',
  darkOpacity = '20',
  enableOnMobile = false,
  quality = 'medium',
  lazy = true,
  fallbackBackground = 'bg-gradient-to-br from-matrix-500/10 to-matrix-700/20'
}) => {
  const { settings, isLowPerformanceDevice } = usePerformance();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(!lazy);
  const [isMobile, setIsMobile] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Override settings based on performance context
  const shouldRender3D = settings.enable3D && (enableOnMobile || !isMobile);
  const effectiveQuality = isLowPerformanceDevice ? 'low' : (settings.quality || quality);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isVisible]);

  // Handle Spline load with timeout
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000); // Assume loaded after 2 seconds

    return () => clearTimeout(timer);
  }, [isVisible]);

  // Don't render Spline if disabled by performance settings or mobile
  if (!shouldRender3D || (!isVisible && lazy)) {
    return (
      <div 
        ref={containerRef}
        className={`${className} ${fallbackBackground}`}
        style={style}
      />
    );
  }

  const getQualityProps = () => {
    switch (effectiveQuality) {
      case 'low':
        return {
          'render-mode': 'webgl1',
          'pixel-ratio': '0.5'
        };
      case 'high':
        return {
          'render-mode': 'webgl2',
          'pixel-ratio': '2'
        };
      default:
        return {
          'render-mode': 'webgl2',
          'pixel-ratio': '1'
        };
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`} style={style}>
      {/* Loading state */}
      {!isLoaded && !hasError && (
        <div className={`absolute inset-0 ${fallbackBackground} flex items-center justify-center`}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-matrix-500"></div>
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className={`absolute inset-0 ${fallbackBackground} flex items-center justify-center`}>
          <div className="text-matrix-400 text-sm opacity-60">3D Background Unavailable</div>
        </div>
      )}
      
      {/* Spline Viewer */}
      <Suspense fallback={
        <div className={`absolute inset-0 ${fallbackBackground} flex items-center justify-center`}>
          <div className="animate-pulse text-matrix-400 text-sm opacity-60">Loading 3D Scene...</div>
        </div>
      }>
        <spline-viewer
          url={url}
          className={`w-full h-full opacity-${opacity} dark:opacity-${darkOpacity} transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            pointerEvents: isMobile ? 'none' : 'auto',
            zIndex: 1
          }}
          events-target="global"
          mouse-controls={!isMobile ? 'true' : 'false'}
          render-mode={getQualityProps()['render-mode']}
          pixel-ratio={getQualityProps()['pixel-ratio']}
        />
      </Suspense>
    </div>
  );
};

export default SplineViewer;