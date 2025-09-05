import React from 'react';

const Documentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-green-400 transition-colors duration-300">
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              AI Terminal
            </h1>
            <p className="text-xl text-green-300">
              A safe-by-default AI terminal assistant that converts natural language to shell commands with explanations and confirmations.
            </p>
          </div>

          {/* Features */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-green-400">Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold mb-3 text-green-400">🛡️ Safe by Default</h3>
                <p className="text-green-300/80">
                  Blocks dangerous commands and requires confirmation for potentially destructive actions
                </p>
              </div>
              <div className="p-6 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold mb-3 text-green-400">💬 Natural Language</h3>
                <p className="text-green-300/80">
                  Use plain English to interact with your terminal
                </p>
              </div>
              <div className="p-6 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold mb-3 text-green-400">⚙️ Environment Setup</h3>
                <p className="text-green-300/80">
                  Automatically configure development environments with Docker, CI/CD, linting, and more
                </p>
              </div>
              <div className="p-6 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold mb-3 text-green-400">📚 Explanations</h3>
                <p className="text-green-300/80">
                  Get detailed explanations of commands before execution
                </p>
              </div>
              <div className="p-6 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold mb-3 text-green-400">🌐 Cross-Platform</h3>
                <p className="text-green-300/80">
                  Works on Windows, macOS, and Linux
                </p>
              </div>
              <div className="p-6 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold mb-3 text-green-400">🧠 Memory</h3>
                <p className="text-green-300/80">
                  Optional semantic memory using FAISS for better context
                </p>
              </div>
            </div>
          </section>

          {/* Installation */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-green-400">Installation</h2>
            
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-green-300">From Source</h3>
              <div className="p-4 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 transition-all duration-300 overflow-x-auto">
                <pre className="text-sm text-green-400">
{`git clone https://github.com/gamkers/GAMKERS_CLI.git
cd GAMKERS_CLI
pip install -r requirements.txt
pip install -e .`}
                </pre>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-green-300">Requirements</h3>
              <div className="p-4 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 transition-all duration-300 overflow-x-auto">
                <pre className="text-sm text-green-400">
{`pip install google-generativeai langchain langchain-google-genai prompt_toolkit typer rich faiss-cpu sentence-transformers`}
                </pre>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-green-300">Optional</h3>
              <div className="p-4 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 transition-all duration-300 overflow-x-auto">
                <pre className="text-sm text-green-400">
{`pip install tldr  # for better command explanations`}
                </pre>
              </div>
            </div>
          </section>

          {/* Usage */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-green-400">Usage</h2>
            
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-green-300">Quick Start</h3>
              <ol className="list-decimal list-inside space-y-4 text-green-300/90">
                <li>
                  Set your Gemini API key:
                  <div className="mt-2 p-4 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 transition-all duration-300 overflow-x-auto">
                    <pre className="text-sm text-green-400">
{`export GEMINI_API_KEY=your_key_here`}
                    </pre>
                  </div>
                </li>
                <li>
                  Run the terminal:
                  <div className="mt-2 p-4 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 transition-all duration-300 overflow-x-auto">
                    <pre className="text-sm text-green-400">
{`python -m GAMKERS_CLI.main
# or after installation
ai-terminal`}
                    </pre>
                  </div>
                </li>
              </ol>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-green-300">Commands</h3>
              
              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-3 text-green-400">Meta Commands</h4>
                <div className="p-4 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 transition-all duration-300">
                  <ul className="space-y-2 text-green-300/90">
                    <li><code className="text-green-400 bg-black/50 px-2 py-1 rounded">:help</code> - Show help</li>
                    <li><code className="text-green-400 bg-black/50 px-2 py-1 rounded">:safe on|off</code> - Toggle safe mode</li>
                    <li><code className="text-green-400 bg-black/50 px-2 py-1 rounded">:model NAME</code> - Switch Gemini model</li>
                    <li><code className="text-green-400 bg-black/50 px-2 py-1 rounded">:history</code> - Show memory entries</li>
                    <li><code className="text-green-400 bg-black/50 px-2 py-1 rounded">:platform</code> - Show platform info</li>
                    <li><code className="text-green-400 bg-black/50 px-2 py-1 rounded">:clear</code> - Clear screen</li>
                    <li><code className="text-green-400 bg-black/50 px-2 py-1 rounded">:quit</code> - Exit</li>
                  </ul>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-3 text-green-400">Shell Shortcuts</h4>
                <div className="p-4 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 transition-all duration-300">
                  <ul className="space-y-2 text-green-300/90">
                    <li><code className="text-green-400 bg-black/50 px-2 py-1 rounded">!command</code> - Run raw shell command</li>
                    <li><code className="text-green-400 bg-black/50 px-2 py-1 rounded">?command</code> - Explain a command without running</li>
                  </ul>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-3 text-green-400">Examples</h4>
                <div className="p-4 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 transition-all duration-300 overflow-x-auto">
                  <pre className="text-sm text-green-300/90">
{`› list all python files in current directory
› explain what 'find . -name "*.py"' does
› create a new git branch called 'feature'
› show docker containers running
› search for 'TODO' in all files

# Environment Setup Examples:
› set up my development environment
› configure my Python project with Docker and CI/CD
› initialize project with linting and formatting
› set up Node.js project with all configs`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Security */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-green-400">Security</h2>
            <div className="p-6 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 hover:bg-black/60 transition-all duration-300">
              <p className="mb-4 text-green-300/90">
                This tool is designed with security in mind:
              </p>
              <ul className="list-disc list-inside space-y-2 text-green-300/80">
                <li>Blocks dangerous commands by default</li>
                <li>Requires explicit confirmation for destructive actions</li>
                <li>No offensive security or attack functionality</li>
                <li>Safe for workstation automation</li>
              </ul>
            </div>
          </section>

          {/* CyberSecurity Integration */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-green-400">CyberSecurity Integration</h2>
            
            <div className="p-6 rounded-lg bg-green-900/20 backdrop-blur-md border border-green-500/40 hover:border-green-400/60 transition-all duration-300 mb-6">
              <h3 className="text-xl font-semibold mb-3 text-green-400">✅ Problem Solved!</h3>
              <p className="text-green-300/90">
                The issue where the AI agent wasn't properly routing commands to CyberSecurityToolManager has been resolved. 
                The agent now correctly recognizes and routes cybersecurity tool commands.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-green-300">Supported Tools</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'nmap', desc: 'Network discovery and security auditing' },
                  { name: 'nikto', desc: 'Web server scanner' },
                  { name: 'sqlmap', desc: 'SQL injection detection and exploitation' },
                  { name: 'metasploit', desc: 'Penetration testing framework' },
                  { name: 'burpsuite', desc: 'Web application security testing' },
                  { name: 'wireshark', desc: 'Network protocol analyzer' },
                  { name: 'john', desc: 'Password cracking tool' },
                  { name: 'hashcat', desc: 'Advanced password recovery' },
                  { name: 'gobuster', desc: 'Directory/file & DNS busting tool' }
                ].map((tool, index) => (
                  <div key={index} className="p-4 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 hover:bg-black/60 hover:scale-105 transition-all duration-300">
                    <h4 className="font-semibold text-green-400 mb-2">{tool.name}</h4>
                    <p className="text-sm text-green-300/80">{tool.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-green-300">Usage Examples</h3>
              <div className="p-4 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 transition-all duration-300 overflow-x-auto">
                <pre className="text-sm text-green-300/90">
{`# Tool Installation
› install nmap
› install sqlmap
› install nikto

# Tool Usage
› use nmap to scan 192.168.1.1
› use sqlmap to test http://example.com/page.php?id=1
› use nikto to scan website example.com

# Tool Management
› list cybersecurity tools
› show nmap manual
› check tool health`}
                </pre>
              </div>
            </div>
          </section>

          {/* License */}
          <section className="text-center">
            <div className="p-6 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 hover:bg-black/60 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4 text-green-400">License</h2>
              <p className="text-green-300/90">
                MIT License - see LICENSE file for details.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Documentation;