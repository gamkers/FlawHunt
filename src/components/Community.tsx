import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { 
  MessageCircle, 
  Youtube, 
  Instagram, 
  Users, 
  User, 
  Shield, 
  Globe, 
  BookOpen, 
  Target, 
  Award,
  TrendingUp,
  Heart,
  Code,
  Zap
} from 'lucide-react';

const Community: React.FC = () => {
  const { isDark } = useTheme();
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [communityCardsVisible, setCommunityCardsVisible] = useState(false);
  const [teamCardsVisible, setTeamCardsVisible] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const communityCardsRef = useRef<HTMLDivElement>(null);
  const teamCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, index]));
          }
        },
        {
          threshold: 0.2,
          rootMargin: '50px'
        }
      );
      
      observer.observe(ref);
      return observer;
    });

    const communityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCommunityCardsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    if (communityCardsRef.current) {
      communityObserver.observe(communityCardsRef.current);
    }

    const teamObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTeamCardsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    if (teamCardsRef.current) {
      teamObserver.observe(teamCardsRef.current);
    }

    return () => {
      observers.forEach(observer => observer?.disconnect());
      if (communityCardsRef.current) {
        communityObserver.unobserve(communityCardsRef.current);
      }
      if (teamCardsRef.current) {
        teamObserver.unobserve(teamCardsRef.current);
      }
    };
  }, []);

  // Typewriter animation effect
  useEffect(() => {
    const fullText = 'Cybersecurity Experts';
    let currentIndex = 0;
    let typeInterval: number;
    let cursorInterval: number;
    
    typeInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        clearInterval(cursorInterval);
        setShowCursor(false);
      }
    }, 100);

    // Cursor blinking effect - only while typing
    cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typeInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  const socialLinks = [
    {
      name: 'Discord',
      icon: MessageCircle,
      url: 'https://discord.gg/cq44bugm2z',
      members: '2000+',
      color: 'text-[#5865F2]',
      bgColor: 'hover:bg-[#5865F2]/10',
      borderColor: 'border-[#5865F2]/20',
      description: 'Real-time discussions, Q&A sessions, and collaboration',
      features: ['24/7 Support', 'Live CTF Events', 'Mentorship Programs', 'Job Opportunities']
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://www.youtube.com/@gamkeryt',
      members: '9K+',
      color: 'text-[#FF0000]',
      bgColor: 'hover:bg-[#FF0000]/10',
      borderColor: 'border-[#FF0000]/20',
      description: 'In-depth tutorials, security analysis, and educational content',
      features: ['Weekly Uploads', 'Bug Bounty Walkthroughs', 'Tool Reviews', 'Live Streams']
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/gamkers/?hl=en',
      members: '230K+',
      color: 'text-[#E4405F]',
      bgColor: 'hover:bg-[#E4405F]/10',
      borderColor: 'border-[#E4405F]/20',
      description: 'Daily cybersecurity tips, infographics, and community highlights',
      features: ['Daily Tips', 'Security News', 'Community Spotlights', 'Quick Tutorials']
    }
  ];

  const developers = [
    {
      name: 'Akash M',
      role: 'Founder & CEO',
      icon: User,
      color: 'text-green-400',
      bio: 'Cybersecurity expert with 8+ years of experience in penetration testing and AI security',
      expertise: ['AI Security', 'Penetration Testing', 'Bug Bounty', 'Leadership'],
      achievements: 'Founded FlawHunt AI • 500+ Vulnerabilities Found • Security Researcher'
    },
    {
      name: 'Vigneshwaran',
      role: 'Lead Developer',
      icon: Code,
      color: 'text-blue-400',
      bio: 'Full-stack developer specializing in security-focused applications and AI integration',
      expertise: ['Full-Stack Development', 'AI Integration', 'Security Architecture', 'DevSecOps'],
      achievements: 'Core FlawHunt Developer • 50+ Security Tools Built • Open Source Contributor'
    },
    {
      name: 'Bhavan & Balaji',
      role: 'Penetration Tester',
      icon: Shield,
      color: 'text-red-400',
      bio: 'Certified ethical hacker focused on web application security and vulnerability research',
      expertise: ['Web App Security', 'Network Pentesting', 'Vulnerability Research', 'Red Team'],
      achievements: 'OSCP Certified • 200+ Critical Bugs Found • Security Consultant'
    }
  ];

  const communityImpact = [
    {
      icon: Globe,
      title: 'Global Reach',
      value: '50+',
      subtitle: 'Countries Worldwide',
      description: 'Our community spans across continents, creating a truly global cybersecurity network.'
    },
    {
      icon: BookOpen,
      title: 'Educational Content',
      value: '500+',
      subtitle: 'Learning Resources',
      description: 'Comprehensive tutorials, guides, and educational materials for all skill levels.'
    },
    {
      icon: Target,
      title: 'Success Stories',
      value: '1000+',
      subtitle: 'Careers Launched',
      description: 'Community members who successfully transitioned into cybersecurity careers.'
    },
    {
      icon: Award,
      title: 'Recognition',
      value: '50+',
      subtitle: 'Industry Awards',
      description: 'Our community members have received recognition from top security organizations.'
    }
  ];

  const whatWeDo = [
    {
      icon: Shield,
      title: 'AI-Powered Security Testing',
      description: 'Revolutionizing vulnerability assessment with advanced artificial intelligence and machine learning algorithms.'
    },
    {
      icon: Users,
      title: 'Community Education',
      description: 'Providing comprehensive cybersecurity education through interactive workshops, webinars, and hands-on training.'
    },
    {
      icon: Target,
      title: 'Professional Development',
      description: 'Helping cybersecurity professionals advance their careers through mentorship and skill development programs.'
    },
    {
      icon: Heart,
      title: 'Open Source Contribution',
      description: 'Contributing to the cybersecurity community through open-source tools and collaborative research projects.'
    }
  ];

  return (
    <div className={`${isDark ? 'bg-black' : 'bg-white'} relative`}>
      {/* Spline 3D Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <spline-viewer 
            url="https://prod.spline.design/rV6Jmc853U2mtqN5/scene.splinecode"
            className="w-full h-full opacity-20 dark:opacity-10"
            style={{position: 'absolute', width: '120%', height: '120%', left: '-10%', top: '-10%', pointerEvents: 'none', zIndex: 1}}
          ></spline-viewer>
        </div>
      </div>
      {/* Hero Section */}
        <section className={`min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-black/30' : 'bg-white/30'} relative z-10`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 mb-6">
            <Zap className={`w-8 h-8 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            <span className={`text-lg font-semibold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
              FlawHunt AI Community
            </span>
          </div>
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Empowering Future<br />
            <span className={`bg-gradient-to-r ${isDark ? 'from-green-400 to-blue-400' : 'from-green-600 to-blue-600'} bg-clip-text text-transparent`}>
              {typewriterText}
              {showCursor && <span className="animate-pulse">|</span>}
            </span>
          </h1>
          <p className={`text-xl md:text-2xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-4xl mx-auto leading-relaxed`}>
            Join a thriving community of 240,000+ cybersecurity enthusiasts, researchers, and professionals. 
            Learn, grow, and make an impact in the world of digital security.
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className={`min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-black/30' : 'bg-white/30'} relative z-10`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              What We Do
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Building the future of cybersecurity through innovation, education, and community collaboration
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* AI-Powered Security Testing */}
            <div 
              ref={el => cardRefs.current[0] = el}
              className={`p-6 rounded-xl ${isDark ? 'bg-gray-900/30' : 'bg-white/30'} backdrop-blur-lg border ${isDark ? 'border-gray-700/30' : 'border-gray-200/30'} hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 hover:rotate-1 group ${
                visibleCards.has(0) 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{
                transitionDelay: visibleCards.has(0) ? '0ms' : '0ms',
                transformOrigin: 'center'
              }}
            >
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-blue-500/20' : 'bg-blue-500/10'} backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-12`}>
                    <Shield className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'} transition-all duration-500 group-hover:drop-shadow-lg`} />
                  </div>
                  <h3 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} transition-all duration-500 group-hover:text-blue-400`}>
                    AI-Powered Security Testing
                  </h3>
                </div>
                <p className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 transition-all duration-500 group-hover:text-gray-200`}>
                  Revolutionizing vulnerability assessment with advanced AI and ML algorithms for intelligent threat detection.
                </p>
                <div className="grid grid-cols-1 gap-3 w-full">
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800/40' : 'bg-gray-100/40'} backdrop-blur-sm transition-all duration-500 hover:bg-blue-500/10 hover:scale-105 hover:translate-x-2`}>
                    <h4 className={`font-semibold mb-1 ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>Smart Detection</h4>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>ML algorithms for zero-day vulnerability identification</p>
                  </div>
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800/40' : 'bg-gray-100/40'} backdrop-blur-sm transition-all duration-500 hover:bg-blue-500/10 hover:scale-105 hover:translate-x-2`} style={{transitionDelay: '100ms'}}>
                    <h4 className={`font-semibold mb-1 ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>Automated Testing</h4>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>AI-driven pentesting with real-world scenarios</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Education */}
            <div 
              ref={el => cardRefs.current[1] = el}
              className={`p-6 rounded-xl ${isDark ? 'bg-gray-900/30' : 'bg-white/30'} backdrop-blur-lg border ${isDark ? 'border-gray-700/30' : 'border-gray-200/30'} hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 hover:-rotate-1 group ${
                visibleCards.has(1) 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{
                transitionDelay: visibleCards.has(1) ? '150ms' : '0ms',
                transformOrigin: 'center'
              }}
            >
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-green-500/20' : 'bg-green-500/10'} backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12`}>
                    <Users className={`w-8 h-8 ${isDark ? 'text-green-400' : 'text-green-600'} transition-all duration-500 group-hover:drop-shadow-lg`} />
                  </div>
                  <h3 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} transition-all duration-500 group-hover:text-green-400`}>
                    Community Education
                  </h3>
                </div>
                <p className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 transition-all duration-500 group-hover:text-gray-200`}>
                  Comprehensive cybersecurity education through interactive workshops, webinars, and hands-on training for all skill levels.
                </p>
                <div className="grid grid-cols-1 gap-3 w-full">
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800/40' : 'bg-gray-100/40'} backdrop-blur-sm transition-all duration-500 hover:bg-green-500/10 hover:scale-105 hover:-translate-x-2`}>
                    <h4 className={`font-semibold mb-1 ${isDark ? 'text-green-300' : 'text-green-700'}`}>Interactive Workshops</h4>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Hands-on learning with real-world scenarios</p>
                  </div>
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800/40' : 'bg-gray-100/40'} backdrop-blur-sm transition-all duration-500 hover:bg-green-500/10 hover:scale-105 hover:-translate-x-2`} style={{transitionDelay: '100ms'}}>
                    <h4 className={`font-semibold mb-1 ${isDark ? 'text-green-300' : 'text-green-700'}`}>Certification Programs</h4>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Industry-recognized skill validation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Development */}
            <div 
              ref={el => cardRefs.current[2] = el}
              className={`p-6 rounded-xl ${isDark ? 'bg-gray-900/30' : 'bg-white/30'} backdrop-blur-lg border ${isDark ? 'border-gray-700/30' : 'border-gray-200/30'} hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 hover:rotate-1 group ${
                visibleCards.has(2) 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{
                transitionDelay: visibleCards.has(2) ? '300ms' : '0ms',
                transformOrigin: 'center'
              }}
            >
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-purple-500/20' : 'bg-purple-500/10'} backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-12`}>
                    <Target className={`w-8 h-8 ${isDark ? 'text-purple-400' : 'text-purple-600'} transition-all duration-500 group-hover:drop-shadow-lg`} />
                  </div>
                  <h3 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} transition-all duration-500 group-hover:text-purple-400`}>
                    Professional Development
                  </h3>
                </div>
                <p className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 transition-all duration-500 group-hover:text-gray-200`}>
                  Advancing cybersecurity careers through mentorship and skill development programs connecting veterans with emerging talent.
                </p>
                <div className="grid grid-cols-1 gap-3 w-full">
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800/40' : 'bg-gray-100/40'} backdrop-blur-sm transition-all duration-500 hover:bg-purple-500/10 hover:scale-105 hover:translate-x-2`}>
                    <h4 className={`font-semibold mb-1 ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>Mentorship Network</h4>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Industry leader connections for career guidance</p>
                  </div>
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800/40' : 'bg-gray-100/40'} backdrop-blur-sm transition-all duration-500 hover:bg-purple-500/10 hover:scale-105 hover:translate-x-2`} style={{transitionDelay: '100ms'}}>
                    <h4 className={`font-semibold mb-1 ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>Career Advancement</h4>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Strategic planning and skill mapping</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Open Source Contribution */}
            <div 
              ref={el => cardRefs.current[3] = el}
              className={`p-6 rounded-xl ${isDark ? 'bg-gray-900/30' : 'bg-white/30'} backdrop-blur-lg border ${isDark ? 'border-gray-700/30' : 'border-gray-200/30'} hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 hover:-rotate-1 group ${
                visibleCards.has(3) 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{
                transitionDelay: visibleCards.has(3) ? '450ms' : '0ms',
                transformOrigin: 'center'
              }}
            >
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-orange-500/20' : 'bg-orange-500/10'} backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12`}>
                    <Heart className={`w-8 h-8 ${isDark ? 'text-orange-400' : 'text-orange-600'} transition-all duration-500 group-hover:drop-shadow-lg`} />
                  </div>
                  <h3 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} transition-all duration-500 group-hover:text-orange-400`}>
                    Open Source Contribution
                  </h3>
                </div>
                <p className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 transition-all duration-500 group-hover:text-gray-200`}>
                  Contributing through open-source tools and collaborative research projects using collective intelligence for security challenges.
                </p>
                <div className="grid grid-cols-1 gap-3 w-full">
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800/40' : 'bg-gray-100/40'} backdrop-blur-sm transition-all duration-500 hover:bg-orange-500/10 hover:scale-105 hover:-translate-x-2`}>
                    <h4 className={`font-semibold mb-1 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>Security Tools</h4>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Open-source tools used by professionals worldwide</p>
                  </div>
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800/40' : 'bg-gray-100/40'} backdrop-blur-sm transition-all duration-500 hover:bg-orange-500/10 hover:scale-105 hover:-translate-x-2`} style={{transitionDelay: '100ms'}}>
                    <h4 className={`font-semibold mb-1 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>Research Collaboration</h4>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Joint initiatives advancing cybersecurity knowledge</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Impact Section */}
      <section className={`min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-black/30' : 'bg-white/30'} relative z-10`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Our Community Impact
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Measuring success through the growth and achievements of our community members
            </p>
          </div>

          {/* Mobile: Grid Layout, Desktop: Sliding Animation */}
          <div className="block md:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {communityImpact.map((stat, index) => (
                <div
                  key={stat.title}
                  className={`p-6 rounded-xl ${isDark ? 'bg-gray-900/20' : 'bg-white/20'} backdrop-blur-md border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} text-center hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 hover:bg-opacity-30 hover:backdrop-blur-lg`}
                >
                  <stat.icon className={`w-10 h-10 mx-auto mb-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                  <div className={`text-2xl sm:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </div>
                  <div className={`text-base font-semibold mb-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                    {stat.subtitle}
                  </div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Desktop: Sliding Animation */}
          <div className="hidden md:block overflow-hidden relative">
            <div className="flex animate-slide-left-to-right gap-8" style={{width: 'calc(200% + 2rem)'}}>
              {[...communityImpact, ...communityImpact].map((stat, index) => (
                <div
                  key={`${stat.title}-${index}`}
                  className={`p-8 rounded-xl ${isDark ? 'bg-gray-900/20' : 'bg-white/20'} backdrop-blur-md border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} text-center hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 hover:bg-opacity-30 hover:backdrop-blur-lg flex-shrink-0`}
                  style={{width: 'calc(25% - 1.5rem)'}}
                >
                  <stat.icon className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                  <div className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </div>
                  <div className={`text-lg font-semibold mb-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                    {stat.subtitle}
                  </div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Community Section */}
      <section className={`min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-black/30' : 'bg-white/30'} relative z-10`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Join Our Community
            </h2>
            <p className={`text-base sm:text-lg md:text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto mb-4 px-4`}>
              Connect with thousands of cybersecurity professionals across multiple platforms. 
              Each platform offers unique opportunities for learning, networking, and career growth.
            </p>
            <div className={`inline-flex items-center space-x-2 ${isDark ? 'text-green-400' : 'text-green-600'} px-4`}>
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base md:text-lg font-semibold">Growing by 1000+ members monthly</span>
            </div>
          </div>

          {/* Enhanced Social Links */}
          <div ref={communityCardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {socialLinks.map((platform, index) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group p-6 sm:p-8 rounded-2xl ${isDark ? 'bg-gray-900/10' : 'bg-white/10'} backdrop-blur-lg border border-white/20 shadow-xl transition-all duration-700 transform-gpu origin-center ${
                communityCardsVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              } hover:scale-105 hover:-translate-y-2 hover:rotate-1 hover:shadow-2xl hover:shadow-green-500/30 hover:bg-opacity-20 hover:backdrop-blur-xl hover:border-white/30 ${platform.bgColor}/5`}
              style={{transitionDelay: `${index * 150}ms`}}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <platform.icon className={`w-12 h-12 sm:w-16 sm:h-16 ${platform.color} transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:drop-shadow-lg`} />
                  <div className="text-right">
                    <div className={`text-2xl sm:text-3xl font-bold ${platform.color} transition-colors duration-300`}>
                      {platform.members}
                    </div>
                    <div className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300 group-hover:${platform.color}`}>
                      Active Members
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'} transition-colors duration-300 group-hover:${platform.color}`}>
                    {platform.name}
                  </h3>
                  <p className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 transition-colors duration-300`}>
                    {platform.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300 group-hover:${platform.color}`}>
                    What you'll get:
                  </h4>
                  <ul className="space-y-1">
                    {platform.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className={`text-sm flex items-center space-x-2 ${isDark ? 'text-gray-400' : 'text-gray-600'} transition-all duration-300 group-hover:translate-x-2 group-hover:${platform.color}`} style={{transitionDelay: `${featureIndex * 50}ms`}}>
                        <div className={`w-1.5 h-1.5 rounded-full ${platform.color.replace('text-', 'bg-')} transition-all duration-300 group-hover:scale-150`}></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`text-center py-3 px-6 rounded-lg ${platform.bgColor}/20 backdrop-blur-sm border border-white/10 transition-all duration-300 group-hover:${platform.bgColor}/30 group-hover:backdrop-blur-md group-hover:scale-105 group-hover:shadow-lg`}>
                  <span className={`text-sm font-semibold ${platform.color} transition-all duration-300 group-hover:scale-110`}>
                    Click to Join →
                  </span>
                </div>
              </div>
            </a>
          ))}
          </div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section className={`min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-black/30' : 'bg-white/30'} relative z-10`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Meet Our Leadership Team
            </h2>
            <p className={`text-base sm:text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto px-4`}>
              Experienced cybersecurity professionals dedicated to building the future of digital security and empowering the next generation of experts.
            </p>
          </div>

          <div ref={teamCardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {developers.map((dev, index) => (
              <div
                key={dev.name}
                className={`group p-6 sm:p-8 rounded-2xl ${isDark ? 'bg-gray-900/20' : 'bg-white/20'} backdrop-blur-md border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} shadow-xl transition-all duration-700 transform-gpu origin-center ${
                  teamCardsVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                } hover:scale-105 hover:-translate-y-2 hover:rotate-1 hover:shadow-2xl hover:shadow-purple-500/30 hover:bg-opacity-30 hover:backdrop-blur-lg`}
                style={{transitionDelay: `${index * 150}ms`}}
              >
                <div className="text-center space-y-4 sm:space-y-6">
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                    <dev.icon className={`w-10 h-10 sm:w-12 sm:h-12 ${dev.color} transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:drop-shadow-lg`} />
                  </div>
                  
                  <div>
                    <h3 className={`text-xl sm:text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'} transition-colors duration-300 group-hover:${dev.color}`}>
                      {dev.name}
                    </h3>
                    <p className={`text-base sm:text-lg ${dev.color} font-semibold mb-3 transition-all duration-300 group-hover:scale-105`}>
                      {dev.role}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 transition-colors duration-300`}>
                      {dev.bio}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300 group-hover:${dev.color}`}>
                      Expertise:
                    </h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {dev.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className={`text-xs px-3 py-1 rounded-full ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300 group-hover:scale-105 group-hover:${dev.color} group-hover:border-current`}
                          style={{transitionDelay: `${skillIndex * 50}ms`}}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} pt-4 transition-all duration-300 group-hover:${dev.color} group-hover:border-current`}>
                    {dev.achievements}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Community Stats Summary */}
          <div className={`p-8 rounded-2xl ${isDark ? 'bg-gradient-to-r from-gray-900/30 to-gray-800/30' : 'bg-gradient-to-r from-white/30 to-gray-50/30'} backdrop-blur-md border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} shadow-2xl shadow-green-500/20 mt-12 hover:shadow-green-500/30 transition-all duration-500 hover:scale-105 animate-fade-in-up`} style={{animationDelay: '0.4s'}}>
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Users className={`w-8 h-8 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Community at a Glance
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
              <div className="p-4 sm:p-0">
                <div className={`text-2xl sm:text-3xl font-bold mb-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>240K+</div>
                <div className={`text-sm font-semibold mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Total Members</div>
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Across all platforms</div>
              </div>
              <div className="p-4 sm:p-0">
                <div className={`text-2xl sm:text-3xl font-bold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>500+</div>
                <div className={`text-sm font-semibold mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Resources</div>
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Tutorials & guides</div>
              </div>
              <div className="p-4 sm:p-0">
                <div className={`text-2xl sm:text-3xl font-bold mb-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>50+</div>
                <div className={`text-sm font-semibold mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Countries</div>
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Global reach</div>
              </div>
              <div className="p-4 sm:p-0">
                <div className={`text-2xl sm:text-3xl font-bold mb-2 ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>24/7</div>
                <div className={`text-sm font-semibold mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Support</div>
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Community help</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      

    </div>
  );
};

export default Community;