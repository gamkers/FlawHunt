import React, { useEffect, useState } from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, color, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  const getGradient = () => {
    switch (color) {
      case 'blue': return 'from-blue-500/20 to-blue-500/5';
      case 'red': return 'from-red-500/20 to-red-500/5';
      case 'green': return 'from-green-500/20 to-green-500/5';
      case 'purple': return 'from-purple-500/20 to-purple-500/5';
      case 'yellow': return 'from-yellow-500/20 to-yellow-500/5';
      case 'indigo': return 'from-indigo-500/20 to-indigo-500/5';
      case 'orange': return 'from-orange-500/20 to-orange-500/5';
      case 'teal': return 'from-teal-500/20 to-teal-500/5';
      default: return 'from-gray-500/20 to-gray-500/5';
    }
  };

  const getBorderColor = () => {
    switch (color) {
      case 'blue': return 'border-blue-500/30';
      case 'red': return 'border-red-500/30';
      case 'green': return 'border-green-500/30';
      case 'purple': return 'border-purple-500/30';
      case 'yellow': return 'border-yellow-500/30';
      case 'indigo': return 'border-indigo-500/30';
      case 'orange': return 'border-orange-500/30';
      case 'teal': return 'border-teal-500/30';
      default: return 'border-gray-500/30';
    }
  };

  return (
    <div 
      className={`bg-gradient-to-b ${getGradient()} p-6 rounded-xl border ${getBorderColor()} backdrop-blur-sm transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } hover:shadow-lg hover:scale-105`}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default FeatureCard;