import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PerformanceSettings {
  enable3D: boolean;
  quality: 'low' | 'medium' | 'high';
  enableAnimations: boolean;
  reducedMotion: boolean;
}

interface PerformanceContextType {
  settings: PerformanceSettings;
  updateSettings: (newSettings: Partial<PerformanceSettings>) => void;
  isLowPerformanceDevice: boolean;
}

const defaultSettings: PerformanceSettings = {
  enable3D: true,
  quality: 'medium',
  enableAnimations: true,
  reducedMotion: false
};

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export const PerformanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<PerformanceSettings>(defaultSettings);
  const [isLowPerformanceDevice, setIsLowPerformanceDevice] = useState(false);

  // Detect device performance capabilities
  useEffect(() => {
    const detectPerformance = () => {
      const isMobile = window.innerWidth < 768;
      const isSlowConnection = (navigator as any).connection?.effectiveType === 'slow-2g' || 
                              (navigator as any).connection?.effectiveType === '2g';
      const hasLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;
      const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      const isLowPerf = isMobile || isSlowConnection || hasLowMemory;
      setIsLowPerformanceDevice(isLowPerf);
      
      // Auto-adjust settings for low performance devices
      if (isLowPerf) {
        setSettings(prev => ({
          ...prev,
          enable3D: true, // Keep 3D enabled but with lower quality
          quality: 'low',
          enableAnimations: !hasReducedMotion,
          reducedMotion: hasReducedMotion
        }));
      }
    };

    detectPerformance();
    window.addEventListener('resize', detectPerformance);
    
    return () => window.removeEventListener('resize', detectPerformance);
  }, []);

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('performance-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.warn('Failed to parse saved performance settings');
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<PerformanceSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('performance-settings', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <PerformanceContext.Provider value={{
      settings,
      updateSettings,
      isLowPerformanceDevice
    }}>
      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (context === undefined) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};

export default PerformanceContext;