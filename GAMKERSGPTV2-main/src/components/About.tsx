
import { 

  Shield, 
  Newspaper,
  Terminal,
  Search,
  GraduationCap,
  FileCode
} from 'lucide-react';

const About = () => {
  const agents = [
    {
      icon: <Shield className="w-6 h-6 text-emerald-400" />,
      name: 'Threat Analyst Agent',
      description: 'Provides real-time threat intelligence and security advisories'
    },
    {
      icon: <Terminal className="w-6 h-6 text-blue-400" />,
      name: 'Tool Master Agent',
      description: 'Generates and explains security tool commands and automation scripts'
    },
    {
      icon: <Search className="w-6 h-6 text-purple-400" />,
      name: 'Dorking Agent',
      description: 'Specializes in crafting safe and effective Google Dorks'
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-yellow-400" />,
      name: 'Training Agent',
      description: 'Creates personalized cybersecurity learning paths'
    },
    {
      icon: <FileCode className="w-6 h-6 text-red-400" />,
      name: 'Malware Analyst Agent',
      description: 'Performs static and behavioral code analysis'
    },
    {
      icon: <Newspaper className="w-6 h-6 text-teal-400" />,
      name: 'News Aggregator Agent',
      description: 'Delivers the latest updates from the infosec world'
    }
  ];

  return (
    <section className="min-h-screen flex items-center relative py-20" id="about">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
              About GamkersGPT
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Your intelligent cybersecurity training assistant, built to empower ethical hackers, security analysts, and IT learners with cutting-edge tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">What Sets Us Apart</h3>
            <p className="text-gray-400 mb-6">
              We don't rely on a single AI model. Instead, we deploy specialized AI agents—each expert in a specific domain—to deliver accurate, contextual, and task-optimized responses.
            </p>
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
              <h4 className="text-xl font-semibold mb-4 text-white">Our Mission</h4>
              <p className="text-gray-400">
                To simplify and democratize ethical hacking education using the power of artificial intelligence. GamkersGPT was created for learners, researchers, and professionals who want a smarter, faster, and more interactive way to engage with cybersecurity content and tools.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {agents.map((agent, index) => (
              <div key={index} className="bg-gray-900/60 backdrop-blur-sm rounded-lg border border-gray-800 p-4">
                <div className="mb-3">{agent.icon}</div>
                <h4 className="font-medium text-white mb-2">{agent.name}</h4>
                <p className="text-sm text-gray-400">{agent.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-600/20 to-blue-600/20 rounded-xl border border-emerald-500/20 p-8 backdrop-blur-sm">
          <h3 className="text-2xl font-bold mb-4 text-center text-white">
            Join the AI-Powered Cybersecurity Revolution
          </h3>
          <p className="text-gray-300 text-center max-w-2xl mx-auto">
            GamkersGPT isn't just a tool. It's your AI cybersecurity partner—always learning, always adapting. Built using Streamlit for a clean, responsive experience and constantly evolving with user feedback.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;