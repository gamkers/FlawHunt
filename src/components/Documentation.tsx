import React from 'react';

const Documentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-green-400 transition-colors duration-300">
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              FlawHunt CLI
            </h1>
            <p className="text-xl text-green-300">
              The smart CLI for cybersecurity professionals and ethical hackers. AI-powered terminal assistant that transforms natural language into safe, effective cybersecurity operations.
            </p>
          </div>

          {/* Quick Summary */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-green-400">🎯 Quick Summary</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold mb-3 text-green-400">🤖 SAGE Mode</h3>
                <p className="text-green-300/80">
                  Direct cybersecurity knowledge and guidance without tools
                </p>
              </div>
              <div className="p-6 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold mb-3 text-green-400">⚒️ FORGE Mode</h3>
                <p className="text-green-300/80">
                  Command generation with confirmation for precise operations
                </p>
              </div>
              <div className="p-6 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold mb-3 text-green-400">🎯 HUNTER Mode</h3>
                <p className="text-green-300/80">
                  Full AI agent with advanced tools for complete tactical operations
                </p>
              </div>
              <div className="p-6 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold mb-3 text-green-400">🔒 Security-First</h3>
                <p className="text-green-300/80">
                  Safe by default with dangerous command blocking
                </p>
              </div>
              <div className="p-6 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold mb-3 text-green-400">🧠 Smart Memory</h3>
                <p className="text-green-300/80">
                  Conversation history with semantic search and context awareness
                </p>
              </div>
              <div className="p-6 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold mb-3 text-green-400">🎨 Customizable</h3>
                <p className="text-green-300/80">
                  Multiple themes, verbose controls, and personalization options
                </p>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-green-400">🚀 Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold mb-3 text-green-400">🛡️ Security & Safety</h3>
                <p className="text-green-300/80">
                  Safe by default with automatic dangerous command blocking, security patterns detection, and ethical focus
                </p>
              </div>
              <div className="p-6 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold mb-3 text-green-400">🤖 Three Operating Modes</h3>
                <p className="text-green-300/80">
                  SAGE (knowledge), FORGE (commands), and HUNTER (full agent) modes for different use cases
                </p>
              </div>
              <div className="p-6 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold mb-3 text-green-400">🧠 Intelligent Memory</h3>
                <p className="text-green-300/80">
                  Persistent conversation history with semantic search and context awareness across sessions
                </p>
              </div>
              <div className="p-6 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold mb-3 text-green-400">🛠️ Comprehensive Tools</h3>
                <p className="text-green-300/80">
                  Shell operations, file management, Git integration, Docker support, and cybersecurity tools
                </p>
              </div>
              <div className="p-6 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold mb-3 text-green-400">🎨 Themes & Customization</h3>
                <p className="text-green-300/80">
                  Professional, hacker, minimal themes with animation effects and personalization
                </p>
              </div>
              <div className="p-6 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 hover:bg-black/60 transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold mb-3 text-green-400">🌐 Cross-Platform</h3>
                <p className="text-green-300/80">
                  Full support for Windows, macOS, Linux, and Android (Termux)
                </p>
              </div>
            </div>
          </section>

          {/* Installation */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-green-400">Installation</h2>
            
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-green-300">🚀 Quick Install (Recommended)</h3>
              <p className="text-green-300/90 mb-4">
                <strong>No Python installation required!</strong> Download the pre-built binary for your platform:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xl font-semibold mb-3 text-green-300">Windows</h4>
                  <div className="p-4 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 transition-all duration-300 overflow-x-auto">
                    <div className="text-sm text-yellow-400 mb-2">Coming Soon</div>
                    <pre className="text-sm text-gray-500">
{`# Windows version will be available soon
# Check back for updates`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-3 text-green-300">macOS</h4>
                  <div className="p-4 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 transition-all duration-300 overflow-x-auto">
                    <pre className="text-sm text-green-400">
{`curl -L -o flawhunt-cli-macos.zip \\
  https://github.com/gamkers/FlawHunt_CLI/releases/download/v1.1/flawhunt-cli-macos.zip
unzip flawhunt-cli-macos.zip
chmod +x flawhunt
# Run: ./flawhunt`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-3 text-green-300">Linux</h4>
                  <div className="p-4 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 transition-all duration-300 overflow-x-auto">
                    <pre className="text-sm text-green-400">
{`curl -L -o flawhunt-cli-linux.zip \\
  https://github.com/gamkers/FlawHunt_CLI/releases/download/v1.1/flawhunt-cli-linux.zip
unzip flawhunt-cli-linux.zip
chmod +x flawhunt
# Run: ./flawhunt`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-3 text-green-300">Android (Termux)</h4>
                  <div className="p-4 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 transition-all duration-300 overflow-x-auto">
                    <div className="text-sm text-yellow-400 mb-2">Coming Soon</div>
                    <pre className="text-sm text-gray-500">
{`# Android version will be available soon
# Check back for updates`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-green-300">📋 Requirements</h3>
              <p className="text-green-300/90 mb-4">You only need:</p>
              <ul className="list-disc list-inside space-y-2 text-green-300/90">
                <li><strong>Groq API Key</strong> (primary, recommended) OR <strong>Google Gemini API Key</strong> (alternative)</li>
                <li><strong>FlawHunt License Key</strong> (for full features)</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-green-300">🛠️ Advanced: Install from Source</h3>
              <p className="text-green-300/90 mb-4">For developers who want to modify the code:</p>
              <div className="p-4 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 transition-all duration-300 overflow-x-auto">
                <pre className="text-sm text-green-400">
{`git clone https://github.com/gamkers/GAMKERS_CLI.git
cd GAMKERS_CLI
pip install -r requirements.txt
pip install -e .`}
                </pre>
              </div>
            </div>
          </section>

          {/* Configuration & Usage */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-green-400">Configuration & Usage</h2>
            
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-green-300">🔑 API Keys Setup</h3>
              <p className="text-green-300/90 mb-4">Set up your API keys using environment variables or during first run:</p>
              <div className="p-4 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 transition-all duration-300 overflow-x-auto">
                <pre className="text-sm text-green-400">
{`# Primary provider (recommended)
export GROQ_API_KEY=your_groq_key_here

# Alternative provider
export GOOGLE_API_KEY=your_gemini_key_here

# FlawHunt license key
export FLAWHUNT_KEY=your_flawhunt_key_here`}
                </pre>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-green-300">🚀 First Run</h3>
              <p className="text-green-300/90 mb-4">After downloading and extracting the zip file:</p>
              <div className="p-4 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 transition-all duration-300 overflow-x-auto">
                <pre className="text-sm text-green-400">
{`# Windows
./flawhunt.exe

# macOS/Linux/Android
./flawhunt`}
                </pre>
              </div>
              <p className="text-green-300/90 mt-4">The application will guide you through:</p>
              <ol className="list-decimal list-inside space-y-2 text-green-300/90 mt-2">
                <li>API key configuration (if not set via environment variables)</li>
                <li>FlawHunt license key setup</li>
                <li>Initial mode selection and preferences</li>
              </ol>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-green-300">💡 Usage Examples</h3>
              
              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-3 text-green-300">Basic Operations</h4>
                <div className="p-4 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 transition-all duration-300 overflow-x-auto">
                  <pre className="text-sm text-green-400">
{`# Start FlawHunt CLI
./flawhunt  # (or ./flawhunt.exe on Windows)

# Select mode (1=SAGE, 2=FORGE, 3=HUNTER)
Mode choice: 3

# Natural language commands
> scan this network for open ports
> install nmap and show me how to use it
> what are the best tools for web application testing?
> create a python script to parse log files
> explain what this command does: nmap -sS -O target`}
                  </pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-3 text-green-300">Mode Switching</h4>
                <div className="p-4 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 transition-all duration-300 overflow-x-auto">
                  <pre className="text-sm text-green-400">
{`# Switch between modes anytime
:mode sage     # Switch to SAGE mode
:mode forge    # Switch to FORGE mode  
:mode hunter   # Switch to HUNTER mode`}
                  </pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-3 text-green-300">Meta Commands</h4>
                <div className="p-4 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 transition-all duration-300 overflow-x-auto">
                  <pre className="text-sm text-green-400">
{`# System controls
:help          # Show all available commands
:safe on/off   # Toggle safety mode
:verbose on/off # Toggle detailed output
:clear         # Clear screen
:quit          # Exit application

# Customization
:theme         # Show available themes
:theme hacker  # Switch to hacker theme
:animation matrix # Run matrix animation

# Memory & History
:history       # Show recent conversations
:history search nmap # Search for nmap-related conversations
:session new "Web Testing" # Create new conversation session
:backup        # Create cloud backup

# Learning & Tools
:learn nmap    # Learn about nmap tool
:packages      # Show available security tools
:stats         # Show usage statistics`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Security Features */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-green-400">🔒 Security Features</h2>
            
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-green-300">Built-in Safety Controls</h3>
              <ul className="list-disc list-inside space-y-2 text-green-300/90">
                <li>Dangerous command pattern detection</li>
                <li>Confirmation prompts for destructive operations</li>
                <li>Safe mode toggle for additional protection</li>
                <li>Command explanation before execution</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-green-300">Ethical Guidelines</h3>
              <ul className="list-disc list-inside space-y-2 text-green-300/90">
                <li>Designed for defensive security practices</li>
                <li>Educational focus on cybersecurity learning</li>
                <li>No offensive capabilities or attack tools</li>
                <li>Compliance with responsible disclosure principles</li>
              </ul>
            </div>
          </section>

          {/* Themes & Customization */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-green-400">🎨 Themes & Customization</h2>
            
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-green-300">Available Themes</h3>
              <ul className="list-disc list-inside space-y-2 text-green-300/90">
                <li><strong>Professional</strong>: Clean, business-appropriate interface</li>
                <li><strong>Hacker</strong>: Green-on-black terminal aesthetic</li>
                <li><strong>Minimal</strong>: Simplified, distraction-free design</li>
                <li><strong>Custom</strong>: User-defined color schemes and layouts</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-green-300">Verbose Mode Control</h3>
              <div className="p-4 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 transition-all duration-300 overflow-x-auto">
                <pre className="text-sm text-green-400">
{`:verbose off   # Clean, direct answers
:verbose on    # Detailed reasoning and steps`}
                </pre>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-green-300">Animation Effects</h3>
              <div className="p-4 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 transition-all duration-300 overflow-x-auto">
                <pre className="text-sm text-green-400">
{`:animation matrix           # Matrix digital rain
:animation glitch <text>    # Glitch text effect
:animation typewriter <text> # Typewriter effect
:animation scan            # Network scan simulation`}
                </pre>
              </div>
            </div>
          </section>

          {/* Support & Documentation */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-green-400">🆘 Support & Documentation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 hover:bg-black/60 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-3 text-green-300">Resources</h3>
                <ul className="space-y-2 text-green-300/90">
                  <li>• <strong>Issues</strong>: GitHub Issues for bug reports</li>
                  <li>• <strong>Discussions</strong>: Community discussions</li>
                  <li>• <strong>Documentation</strong>: Detailed guides in /docs</li>
                  <li>• <strong>Security</strong>: Private security reporting</li>
                </ul>
              </div>
              
              <div className="p-6 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 hover:bg-black/60 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-3 text-green-300">Acknowledgments</h3>
                <ul className="space-y-2 text-green-300/90">
                  <li>• Built with LangChain for AI capabilities</li>
                  <li>• Powered by Groq and Google Gemini APIs</li>
                  <li>• UI powered by Rich for terminal output</li>
                  <li>• Command completion via prompt-toolkit</li>
                </ul>
              </div>
            </div>
            
            {/* GitHub Repository Link */}
            <div className="mt-8 text-center">
              <button 
                onClick={() => window.open('https://github.com/gamkers/FlawHunt_CLI', '_blank')}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 mx-auto shadow-lg hover:shadow-green-500/25"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Visit GitHub Repository
              </button>
            </div>
          </section>

          {/* License */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-green-400">📄 License</h2>
            <div className="p-6 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-400/40 hover:bg-black/60 transition-all duration-300">
              <p className="text-green-300/90 text-center text-lg">
                MIT License - see LICENSE.md for details
              </p>
              <p className="text-green-300/70 text-center mt-4">
                <strong>FlawHunt CLI</strong> - Empowering ethical hackers with AI-assisted cybersecurity operations
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Documentation;