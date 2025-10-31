import React, { useState, useEffect } from 'react';
import { Check, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  rating: number;
  delay?: number;
  comingSoon?: boolean;
  features: string[];
}

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, name, title, rating, delay = 0, comingSoon = false, features }) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleGetStarted = () => {
    if (!comingSoon) {
      navigate('/app');
    }
  };

  return (
    <div 
      className={`relative transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${
        rating === 5 ? 'bg-gradient-to-b from-emerald-600/20 to-blue-600/20' : 'bg-gray-900'
      } rounded-xl border ${
        rating === 5 ? 'border-emerald-500/50' : 'border-gray-800'
      } p-8 backdrop-blur-sm hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1`}
    >
      {rating === 5 && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium animate-pulse">
            Most Popular
          </span>
        </div>
      )}
      {comingSoon && (
        <div className="absolute -top-4 right-4">
          <span className="flex items-center gap-1 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
            <Clock size={14} className="animate-pulse" />
            Coming Soon
          </span>
        </div>
      )}
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Check 
            key={i} 
            size={16} 
            className={`transition-colors duration-300 ${
              i < rating ? "text-emerald-400" : "text-gray-600"
            }`} 
          />
        ))}
      </div>
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">${title}</span>
        {title !== 'Free' && <span className="text-gray-400">/month</span>}
      </div>
      <p className="text-gray-400 mb-6">{quote}</p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check size={16} className="text-emerald-400 flex-shrink-0" />
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <button 
        onClick={handleGetStarted}
        className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
          comingSoon
            ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
            : rating === 5
            ? 'bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white'
            : 'bg-gray-800 hover:bg-gray-700 text-white'
        }`}
      >
        {comingSoon ? 'Coming Soon' : 'Get Started'}
      </button>
    </div>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: "Standard",
      title: "Free",
      quote: "Perfect for getting started with cybersecurity training",
      rating: 4,
      comingSoon: false,
      features: [
        'Basic AI chat assistance',
        'Limited CVE database access',
        'Basic tool command generation',
        'Community support'
      ]
    },
    {
      name: "Pro",
      title: "10",
      quote: "Advanced features for security professionals",
      rating: 5,
      comingSoon: true,
      features: [
        'Everything in Standard',
        'Advanced AI chat capabilities',
        'Full CVE database access',
        'Advanced tool command generation',
        'Priority support',
        'Custom training modules'
      ]
    },
    {
      name: "Expert",
      title: "20",
      quote: "Enterprise-grade security analysis tools",
      rating: 4,
      comingSoon: true,
      features: [
        'Everything in Pro',
        'Multi-agent AI system',
        'Custom API access',
        'Advanced malware analysis',
        'Team collaboration features',
        'Dedicated support',
        'Custom integrations'
      ]
    }
  ];

  return (
    <section className="min-h-screen flex items-center relative py-20" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
              Choose Your Plan
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Select the perfect plan for your cybersecurity needs. All plans include core features with additional capabilities as you scale.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <TestimonialCard 
              key={index}
              {...plan}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;