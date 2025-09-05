import React, { useEffect, useRef, useState } from 'react';
import { 
  Shield, 
  Brain, 
  ShieldCheck, 
  Zap, 
  Network, 
  FileCode, 
  Container, 
  GitBranch, 
  Settings 
} from 'lucide-react';

const Features: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const features = [
    {
      icon: Shield,
      title: "Security Shortcuts",
      description: "Quick commands to enhance productivity with built-in security best practices."
    },
    {
      icon: Brain,
      title: "Smart Suggestions",
      description: "AI-powered command recommendations based on your current context and goals."
    },
    {
      icon: ShieldCheck,
      title: "Safe Mode",
      description: "Automatic security protection prevents dangerous commands from executing."
    },
    {
      icon: Zap,
      title: "Smart Autocomplete",
      description: "Intelligent autocomplete for commands with context-aware suggestions."
    },
    {
      icon: Network,
      title: "Network Tools",
      description: "Integrated scanning and monitoring tools for comprehensive network analysis."
    },
    {
      icon: FileCode,
      title: "Script Generation",
      description: "Create backup and deployment scripts automatically using AI assistance."
    },
    {
      icon: Container,
      title: "Docker Integration",
      description: "Manage containers seamlessly with intelligent Docker command assistance."
    },
    {
      icon: GitBranch,
      title: "Git Automation",
      description: "Advanced Git operations simplified with smart workflow automation."
    },
    {
      icon: Settings,
      title: "Environment Setup",
      description: "Easy Python/Node/Docker setup with automated configuration management."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => {
              if (!prev.includes(cardIndex)) {
                return [...prev, cardIndex].sort((a, b) => a - b);
              }
              return prev;
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px 50px 0px'
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="features" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-light-50/80 dark:bg-dark-200/80 lg:bg-transparent relative overflow-hidden">
      {/* Glassmorphism background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-matrix-500/5 to-matrix-700/10 dark:from-matrix-400/10 dark:to-matrix-600/20 backdrop-blur-sm"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-matrix-500/15 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-matrix-600/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features to{' '}
            <span className="bg-gradient-to-r from-matrix-600 to-matrix-700 bg-clip-text text-transparent animate-gradient-x">
              Elevate Your Workflow
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            FlawHunt CLI combines cutting-edge AI with practical cybersecurity tools to streamline your penetration testing and security workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const isVisible = visibleCards.includes(index);
            const animationDelay = isVisible ? index * 150 : 0;
            
            return (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                data-index={index}
                className={`group p-6 sm:p-8 rounded-2xl border border-white/20 dark:border-white/10 hover:border-matrix-400/50 dark:hover:border-matrix-500/50 hover:shadow-2xl hover:shadow-matrix-500/20 hover:-translate-y-3 hover:scale-105 bg-white/10 dark:bg-black/20 backdrop-blur-md hover:bg-white/20 dark:hover:bg-black/30 cursor-pointer transform ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-12 opacity-0'
                }`}
                style={{
                  transition: 'transform 0.3s ease-out, scale 0.3s ease-out, border-color 0.3s ease-out, box-shadow 0.3s ease-out, background-color 0.3s ease-out, opacity 0.6s ease-out',
                  transitionDelay: `0ms, 0ms, 0ms, 0ms, 0ms, ${isVisible ? animationDelay : 0}ms`
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-matrix-500 to-matrix-700 rounded-xl flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-200 ease-out shadow-lg group-hover:shadow-matrix-500/50">
                      <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-matrix-100 transition-colors duration-300" />
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white group-hover:text-matrix-600 dark:group-hover:text-matrix-400 transition-all duration-300 group-hover:translate-x-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-all duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <button className="group inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-matrix-600 to-matrix-700 hover:from-matrix-500 hover:to-matrix-600 text-white font-semibold rounded-xl transition-all duration-500 hover:shadow-2xl hover:shadow-matrix-500/30 hover:-translate-y-2 hover:scale-105 text-sm sm:text-base backdrop-blur-sm border border-matrix-400/20 hover:border-matrix-300/40">
            Explore All Features
            <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;