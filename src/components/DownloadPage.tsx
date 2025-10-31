import React from 'react';
import { 
  Download, 
  Shield, 
  Terminal, 
  Zap, 
  Lock, 
  Brain,
  Smartphone,
  Monitor,
  Apple,
  ExternalLink,
  CheckCircle,
  Star,
  Github
} from 'lucide-react';

const DownloadPage: React.FC = () => {
  const downloadLinks = [
    {
      platform: 'Windows',
      icon: Monitor,
      version: 'v1.1',
      size: 'Coming Soon',
      url: '#',
      description: 'Windows 10/11 (x64)',
      color: 'from-blue-500 to-blue-600',
      comingSoon: true
    },
    {
      platform: 'macOS',
      icon: Apple,
      version: 'v1.1',
      size: 'Available',
      url: 'https://github.com/gamkers/FlawHunt_CLI/releases/download/v1.1/flawhunt-cli-macos.zip',
      description: 'macOS 10.15+ (Universal)',
      color: 'from-gray-500 to-gray-600',
      comingSoon: false
    },
    {
      platform: 'Linux',
      icon: Terminal,
      version: 'v1.1',
      size: 'Available',
      url: 'https://github.com/gamkers/FlawHunt_CLI/releases/download/v1.1/flawhunt-cli-linux.zip',
      description: 'Ubuntu/Debian/CentOS',
      color: 'from-orange-500 to-orange-600',
      comingSoon: false
    },
    {
      platform: 'Android (Termux)',
      icon: Smartphone,
      version: 'v1.1',
      size: 'Coming Soon',
      url: '#',
      description: 'Android 7.0+ via Termux',
      color: 'from-green-500 to-green-600',
      comingSoon: true
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Advanced Security',
      description: 'Built-in security tools and vulnerability scanning'
    },
    {
      icon: Brain,
      title: 'AI-Powered',
      description: 'SAGE, FORGE, and HUNTER AI modes for different tasks'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance with intelligent caching'
    },
    {
      icon: Lock,
      title: 'Secure by Design',
      description: 'Command blocking and confirmation for destructive actions'
    }
  ];

  const quickStart = [
    'Download the appropriate version for your platform',
    'Extract the archive to your preferred directory',
    'Set up your API keys (Groq, Google, FlawHunt)',
    'Run your first security scan with FlawHunt CLI'
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl">
            <Download className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
            Download FlawHunt CLI
          </h1>
        </div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          The ultimate cybersecurity command-line interface with AI-powered vulnerability detection, 
          penetration testing tools, and intelligent automation.
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400" />
            <span>Latest Version: v1.1</span>
          </div>
          <div className="flex items-center gap-2">
            <Github className="h-4 w-4" />
            <span>Open Source</span>
          </div>
        </div>
      </div>

      {/* Download Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {downloadLinks.map((download) => {
          const IconComponent = download.icon;
          return (
            <div
              key={download.platform}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-emerald-500/50 transition-all duration-300 group"
            >
              <div className="text-center space-y-4">
                <div className={`mx-auto w-16 h-16 bg-gradient-to-r ${download.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {download.platform}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    {download.description}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500 mb-4">
                    <span>{download.version}</span>
                    <span>{download.size}</span>
                  </div>
                </div>
                <button
                  onClick={() => download.comingSoon ? null : window.open(download.url, '_blank')}
                  disabled={download.comingSoon}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    download.comingSoon 
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                      : `bg-gradient-to-r ${download.color} text-white hover:shadow-lg hover:shadow-emerald-500/25`
                  }`}
                >
                  <Download className="h-4 w-4" />
                  {download.comingSoon ? 'Coming Soon' : 'Download'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Features Section */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Why Choose FlawHunt CLI?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div key={feature.title} className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                  <IconComponent className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          Quick Start Guide
        </h2>
        <div className="space-y-4">
          {quickStart.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              <p className="text-gray-300 pt-1">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Features Documentation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Modes */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-emerald-400" />
            AI Modes
          </h3>
          <div className="space-y-4">
            <div className="border-l-4 border-emerald-500 pl-4">
              <h4 className="font-semibold text-emerald-400">SAGE Mode</h4>
              <p className="text-sm text-gray-400">Advanced reasoning and problem-solving for complex security challenges</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-blue-400">FORGE Mode</h4>
              <p className="text-sm text-gray-400">Creative solutions and innovative approaches to security testing</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-purple-400">HUNTER Mode</h4>
              <p className="text-sm text-gray-400">Aggressive vulnerability discovery and exploitation techniques</p>
            </div>
          </div>
        </div>

        {/* Security Tools */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-400" />
            Security Tools
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-300">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span>Network scanning with nmap integration</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span>SQL injection testing with sqlmap</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span>Web application security scanning</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span>Automated vulnerability assessment</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span>Custom payload generation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Section */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          Configuration & Setup
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Required API Keys</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h4 className="font-medium text-emerald-400 mb-2">Groq API</h4>
                <p className="text-sm text-gray-400">For AI-powered analysis and reasoning</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h4 className="font-medium text-blue-400 mb-2">Google API</h4>
                <p className="text-sm text-gray-400">For enhanced search and data retrieval</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h4 className="font-medium text-purple-400 mb-2">FlawHunt License</h4>
                <p className="text-sm text-gray-400">For premium features and tools</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">First Run</h3>
            <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm">
              <div className="text-gray-400 mb-2"># Set up your API keys</div>
              <div className="text-emerald-400">flawhunt config --setup</div>
              <div className="text-gray-400 mt-2 mb-2"># Run your first scan</div>
              <div className="text-emerald-400">flawhunt scan --target example.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Need Help?
        </h2>
        <p className="text-gray-300 mb-6">
          Join our community or check out the documentation for detailed guides and tutorials.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Documentation
          </button>
          <button 
            onClick={() => window.open('https://github.com/gamkers/FlawHunt_CLI', '_blank')}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <Github className="h-4 w-4" />
            GitHub Repository
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;