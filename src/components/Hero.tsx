import React from 'react';
import { ArrowRight, FileText, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  
  const handleViewDocs = () => {
    navigate('/docs');
  };
  
  const handleGetStartedClick = () => {
    // Find the CTA section and scroll to it
    const allSections = document.querySelectorAll('section');
    
    // Find the CTA section (it should be the last section before footer)
    let targetSection = null;
    for (let i = allSections.length - 1; i >= 0; i--) {
      const section = allSections[i];
      if (section.textContent?.includes('Ready to Supercharge Your Terminal?')) {
        targetSection = section;
        break;
      }
    }
    
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 bg-gradient-to-br from-light-50/80 to-light-100/80 dark:from-dark-200/80 dark:to-dark-950/80 lg:bg-transparent relative overflow-hidden">
      {/* Content overlay */}
      <div className="w-full flex flex-col lg:flex-row justify-center lg:justify-between items-center relative z-10 max-w-7xl mx-auto gap-8 lg:gap-12">
        {/* Content */}
        <div className="max-w-lg lg:max-w-xl space-y-6 sm:space-y-8 text-center lg:text-left lg:order-2">
          <div className="space-y-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight text-center lg:text-left">
              FlawHunt AI The{' '}
              <span className="bg-gradient-to-r from-matrix-400 to-matrix-600 bg-clip-text text-transparent">
                Smart AI Shell
              </span>{' '}
              for Hackers
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed text-center lg:text-left">
              AI-powered terminal to simplify commands, automate workflows, and secure your environment. 
              Built for cybersecurity professionals and ethical hackers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards] justify-center lg:justify-start">
            <button 
              onClick={handleGetStartedClick}
              className="bg-gradient-to-r from-matrix-600 to-matrix-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:shadow-xl hover:shadow-matrix-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group text-sm sm:text-base"
            >
              <span className="font-semibold">Get Started</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button 
              onClick={handleViewDocs}
              className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:border-matrix-600 hover:text-matrix-600 dark:hover:text-matrix-400 transition-all duration-300 flex items-center justify-center space-x-2 group text-sm sm:text-base cursor-pointer">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold relative">
                View Docs
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-matrix-600 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Cross-platform</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-matrix-500 rounded-full"></div>
              <span>Lightweight</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-matrix-600 rounded-full"></div>
              <span>AI-Powered</span>
            </div>
          </div>
        </div>

        {/* Terminal Mockup */}
        <div className="w-full max-w-2xl lg:max-w-lg lg:order-1 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
          <div className="bg-white/5 dark:bg-black/10 backdrop-blur-lg rounded-lg shadow-2xl border border-white/10 dark:border-gray-400/10 overflow-hidden transition-all duration-500 ease-out hover:shadow-[0_0_40px_rgba(34,197,94,0.3)] hover:border-green-400/30 hover:bg-white/8 dark:hover:bg-black/15 group">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/3 dark:bg-black/5 backdrop-blur-md border-b border-white/5 dark:border-gray-400/10 transition-all duration-300 group-hover:bg-white/5 dark:group-hover:bg-black/10 group-hover:border-green-400/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Terminal className="w-4 h-4" />
                <span>FlawHunt CLI</span>
              </div>
            </div>
            
            {/* Terminal Content */}
            <div className="p-4 font-mono text-sm bg-white/2 dark:bg-black/5 backdrop-blur-md text-green-400 space-y-2 h-80 overflow-hidden transition-all duration-300 group-hover:bg-white/5 dark:group-hover:bg-black/8 group-hover:text-green-300">
              <div className="text-matrix-400">$ flawhunt scan --target example.com</div>
              <div className="text-gray-300">🔍 Initializing security scan...</div>
              <div className="text-gray-300">📡 Discovering services...</div>
              <div className="text-green-400">✓ Found 3 open ports: 22, 80, 443</div>
              <div className="text-gray-300">🛡️  Running vulnerability checks...</div>
              <div className="text-yellow-400">⚠️  Potential SQL injection found</div>
              <div className="text-red-400">🚨 Critical: Outdated SSL certificate</div>
              <div className="text-gray-300">📊 Generating report...</div>
              <div className="text-matrix-400">$ flawhunt ai --analyze "explain the SSL issue"</div>
              <div className="text-blue-400">🤖 AI Analysis:</div>
              <div className="text-gray-300 pl-4">The SSL certificate expired 30 days ago.</div>
              <div className="text-gray-300 pl-4">Recommendation: Update certificate immediately</div>
              <div className="text-gray-300 pl-4">to prevent MITM attacks.</div>
              <div className="text-matrix-400">$ flawhunt fix --auto-ssl</div>
              <div className="text-green-400">✓ SSL certificate renewal initiated</div>
              <div className="text-matrix-400 animate-pulse">$ █</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;