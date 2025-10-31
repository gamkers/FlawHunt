import React from 'react';
import { Shield } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 font-mono">
      {/* Terminal scanlines effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-pulse"></div>
      </div>
      
      <div className="w-full max-w-lg relative">
        {/* Terminal header */}
        <div className="bg-gray-900 border border-green-500/30 rounded-t-lg p-3 flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-green-400 text-sm">flawhunt@terminal:~$</div>
        </div>
        
        {/* Terminal content */}
        <div className="bg-black border-x border-b border-green-500/30 rounded-b-lg p-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-green-400" />
              <span className="text-xl font-bold text-green-400">
                FLAW_HUNT_SYSTEM
              </span>
            </div>
            <div className="text-green-400 mb-2">
              <span className="text-green-500">$</span> {title.toLowerCase().replace(/\s+/g, '_')}
            </div>
            <div className="text-green-300/70 text-sm">
              {subtitle}
            </div>
          </div>
          
          <div className="space-y-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;