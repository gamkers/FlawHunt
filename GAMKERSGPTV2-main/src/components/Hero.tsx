import { useState, useEffect } from 'react';
import { Shield, ChevronRight, Terminal } from 'lucide-react';
import TerminalAnimation from './TerminalAnimation';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    navigate('/app');
  };

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-20 md:pt-24" id="home">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl transition-opacity duration-1000 opacity-0 animate-[fadeIn_2s_ease-in-out_forwards]"></div>
        <div className="absolute bottom-1/4 -left-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl transition-opacity duration-1000 opacity-0 animate-[fadeIn_2s_ease-in-out_0.5s_forwards]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <div 
              className={`inline-flex items-center gap-2 bg-gray-800/70 backdrop-blur-sm py-2 px-4 rounded-full mb-6 transition-all duration-1000 ease-out opacity-0 translate-y-4 ${
                isVisible ? 'opacity-100 translate-y-0' : ''
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <Shield size={16} className="text-emerald-400" />
              <span className="text-sm font-medium">AI-Powered Cybersecurity Assistant</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span 
                className={`block bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 transition-all duration-1000 ease-out opacity-0 translate-y-4 ${
                  isVisible ? 'opacity-100 translate-y-0' : ''
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                Secure Your Digital World with 
              </span>
              <span 
                className={`block bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500 transition-all duration-1000 ease-out opacity-0 translate-y-4 ${
                  isVisible ? 'opacity-100 translate-y-0' : ''
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                GamkersGPT
              </span>
            </h1>
            
            <p 
              className={`text-gray-400 text-lg mb-8 max-w-xl transition-all duration-1000 ease-out opacity-0 translate-y-4 ${
                isVisible ? 'opacity-100 translate-y-0' : ''
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              An AI-powered cybersecurity training assistant designed for ethical hacking education and security analysis with advanced threat intelligence.
            </p>
            
            <div 
              className={`flex flex-wrap gap-4 transition-all duration-1000 ease-out opacity-0 translate-y-4 ${
                isVisible ? 'opacity-100 translate-y-0' : ''
              }`}
              style={{ transitionDelay: '1000ms' }}
            >
              <button 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-emerald-500/20 group hover:scale-105"
              >
                Get Started
                <ChevronRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              
              <a 
                href="#demo" 
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 border border-gray-700 hover:border-gray-600 hover:scale-105"
              >
                <Terminal size={18} />
                View Demo
              </a>
            </div>
          </div>
          
          <div 
            className={`md:w-1/2 transition-all duration-1000 ease-out opacity-0 translate-y-8 ${
              isVisible ? 'opacity-100 translate-y-0' : ''
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className="relative bg-gray-900 rounded-xl border border-gray-800 shadow-2xl overflow-hidden hover:shadow-emerald-500/10 hover:border-emerald-500/50 transition-all duration-300 transform hover:scale-[1.02]">
              <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 flex items-center px-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="pt-6 px-4 pb-4">
                <TerminalAnimation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;