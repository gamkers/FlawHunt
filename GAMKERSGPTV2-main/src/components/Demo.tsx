import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const Demo = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m GamkersGPT, your cybersecurity assistant. How can I help you today?' }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    setChatMessages([...chatMessages, { role: 'user', content: userInput }]);
    
    let response = '';
    if (userInput.toLowerCase().includes('vulnerabilit')) {
      response = 'I can help you identify vulnerabilities in your system. Would you like me to perform a basic scan simulation or explain common vulnerabilities in web applications?';
    } else if (userInput.toLowerCase().includes('nmap')) {
      response = 'For a basic Nmap scan, you can use: `nmap -sV -sC -p- -T4 target_ip` \n\nThis will perform a comprehensive service version detection scan with default scripts on all ports.';
    } else if (userInput.toLowerCase().includes('cve')) {
      response = 'I found CVE-2023-28252, a critical Windows vulnerability with a CVSS score of 9.8. This is a privilege escalation vulnerability in the Windows Common Log File System Driver.';
    } else {
      response = 'I can provide information on various cybersecurity topics including vulnerability scanning, penetration testing, threat intelligence, and security best practices. What specific area are you interested in?';
    }
    
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 1000);
    
    setUserInput('');
  };

  const demoTabs = [
    { name: 'Live Demo', content: 'live' },
    { name: 'AI Chat', content: 'chat' },
    { name: 'CVE Search', content: 'cve' },
    { name: 'Tool Commands', content: 'tools' }
  ];

  const LiveDemoContent = (
    <div className="w-full h-[600px] bg-gray-900 rounded-lg border border-gray-800">
      <iframe
        src="https://gamkersgpt-1.streamlit.app?embed=true"
        width="100%"
        height="100%"
        className="rounded-lg"
        title="GamkersGPT Live Demo"
      />
    </div>
  );

  const CVEDemoContent = (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Search for CVEs (e.g., Log4j, Spring4Shell)" 
          className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium text-white">CVE-2021-44228 (Log4Shell)</h3>
          <span className="px-2 py-1 text-xs rounded-full bg-red-900/60 text-red-300">CRITICAL</span>
        </div>
        <p className="text-gray-400 text-sm mb-2">Remote code execution vulnerability in Apache Log4j</p>
        <p className="text-gray-500 text-xs mb-2">Published: 2021-12-10 | CVSS: 10.0</p>
        <div className="border-t border-gray-700 my-2 pt-2">
          <h4 className="text-sm font-medium text-gray-300 mb-1">Recommended Actions:</h4>
          <ul className="list-disc pl-5 text-gray-400 text-xs">
            <li>Update to Log4j 2.15.0 or later</li>
            <li>Set system property -Dlog4j2.formatMsgNoLookups=true</li>
            <li>Remove JndiLookup class from classpath</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const ToolCommandsContent = (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="What do you want to accomplish? (e.g., scan a network)" 
          className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-medium text-white mb-2">Network Scanning Commands</h3>
        <div className="space-y-3">
          <div className="rounded bg-gray-900 p-2">
            <p className="text-green-400 font-mono text-sm">nmap -sV -sC -p- -T4 192.168.1.0/24</p>
            <p className="text-gray-500 text-xs mt-1">Full service scan with version detection and default scripts</p>
          </div>
          <div className="rounded bg-gray-900 p-2">
            <p className="text-green-400 font-mono text-sm">masscan -p1-65535 192.168.1.0/24 --rate=1000</p>
            <p className="text-gray-500 text-xs mt-1">Fast port scanning across network range</p>
          </div>
          <div className="rounded bg-gray-900 p-2">
            <p className="text-green-400 font-mono text-sm">nmap --script vuln 192.168.1.1</p>
            <p className="text-gray-500 text-xs mt-1">Scan for known vulnerabilities on target</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ChatContent = (
    <div className="flex flex-col h-96">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {chatMessages.map((msg, index) => (
          <div 
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-xs sm:max-w-md rounded-lg px-4 py-2 ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-gray-800 text-gray-200 rounded-bl-none'
              }`}
            >
              <p className="whitespace-pre-line">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSendMessage} className="mt-auto">
        <div className="relative">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask about vulnerabilities, tools, or security concepts..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-4 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 rounded-full p-1.5 text-white transition-colors duration-200"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <section className="min-h-screen flex items-center relative py-20" id="demo">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
              See GamkersGPT in Action
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore the capabilities of GamkersGPT with our interactive demo. Try out different features to see how it can enhance your cybersecurity workflow.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden shadow-2xl">
            <div className="flex border-b border-gray-800">
              {demoTabs.map((tab, index) => (
                <button
                  key={index}
                  className={`px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                    activeTab === index
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab.name}
                </button>
              ))}
            </div>
            
            <div className="p-4">
              {activeTab === 0 && LiveDemoContent}
              {activeTab === 1 && ChatContent}
              {activeTab === 2 && CVEDemoContent}
              {activeTab === 3 && ToolCommandsContent}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;