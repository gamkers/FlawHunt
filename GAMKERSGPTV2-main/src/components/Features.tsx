
import { 
  MessageSquare, 
  Shield, 
  Newspaper, 
  Terminal, 
  Search, 
  GraduationCap, 
  FileCode, 
  Network 
} from 'lucide-react';
import FeatureCard from './FeatureCard';

const Features = () => {
  const features = [
    {
      icon: <MessageSquare size={24} className="text-blue-400" />,
      title: "AI Chat Assistant",
      description: "Interactive chat with context-aware responses for all your cybersecurity queries.",
      color: "blue"
    },
    {
      icon: <Shield size={24} className="text-red-400" />,
      title: "CVE Database Search",
      description: "Search vulnerabilities by keyword or product with detailed information and remediation.",
      color: "red"
    },
    {
      icon: <Newspaper size={24} className="text-purple-400" />,
      title: "Security News",
      description: "Latest cybersecurity news aggregated from trusted sources with summaries and analysis.",
      color: "purple"
    },
    {
      icon: <Terminal size={24} className="text-green-400" />,
      title: "Tool Command Generation",
      description: "Generate security tool commands for nmap, metasploit, burpsuite, and more.",
      color: "green"
    },
    {
      icon: <Search size={24} className="text-yellow-400" />,
      title: "Google Dorking",
      description: "Advanced search techniques for reconnaissance with explanations and safety warnings.",
      color: "yellow"
    },
    {
      icon: <GraduationCap size={24} className="text-indigo-400" />,
      title: "Training & Learning",
      description: "Comprehensive modules for security concepts, CTF challenges, and more.",
      color: "indigo"
    },
    {
      icon: <FileCode size={24} className="text-orange-400" />,
      title: "Malware Analysis",
      description: "Upload and analyze code for malicious indicators with detailed reports.",
      color: "orange"
    },
    {
      icon: <Network size={24} className="text-teal-400" />,
      title: "Network Traffic Analysis",
      description: "Analyze network traffic for suspicious patterns and potential threats.",
      color: "teal"
    }
  ];

  return (
    <section className="min-h-screen flex items-center relative py-20" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
              Comprehensive Security Toolkit
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            GamkersGPT combines cutting-edge AI with cybersecurity expertise to provide a complete suite of tools for ethical hacking and security analysis.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;