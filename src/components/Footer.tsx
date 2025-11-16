import React from 'react';
import { Terminal, Github, Instagram, Mail, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const footerLinks = [
    { title: 'About', href: '#about' },
    { title: 'Docs', href: '#docs' },
    { title: 'GitHub', href: 'https://github.com/gamkers', external: true },
    { title: 'Contact', href: 'mailto:flawhunt@gamkers.in' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/gamkers', label: 'GitHub' },
    { icon: Instagram, href: 'https://www.instagram.com/gamkers/', label: 'Instagram' },
    { icon: Mail, href: 'mailto:flawhunt@gamkers.in', label: 'Email' },
  ];

  return (
    <footer className="bg-light-100/90 dark:bg-dark-950/90 text-gray-700 dark:text-gray-400 pointer-events-auto">
      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-matrix-500 to-matrix-700 rounded-lg p-3">
                  <Terminal className="w-8 h-8 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">FlawHunt CLI</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-lg text-lg">
                The intelligent AI-powered command-line tool designed for cybersecurity professionals and ethical hackers. 
                Streamline your workflows, enhance security, and boost productivity.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-matrix-500 dark:hover:bg-matrix-600 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-gray-900 dark:text-gray-200 font-semibold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {footerLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="group flex items-center space-x-2 hover:text-matrix-500 dark:hover:text-matrix-400 transition-colors duration-200 text-base"
                    >
                      <span>{link.title}</span>
                      {link.external && (
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Info */}
            <div>
              <h4 className="text-gray-900 dark:text-gray-200 font-semibold text-lg mb-6">Resources</h4>
              <ul className="space-y-4 text-base">
                <li>
                  <a href="#features" className="hover:text-matrix-500 dark:hover:text-matrix-400 transition-colors duration-200">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#community" className="hover:text-matrix-500 dark:hover:text-matrix-400 transition-colors duration-200">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#support" className="hover:text-matrix-500 dark:hover:text-matrix-400 transition-colors duration-200">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#changelog" className="hover:text-matrix-500 dark:hover:text-matrix-400 transition-colors duration-200">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section - Moved to bottom */}
      <div className="bg-black py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Stay Updated with FlawHunt
              </h3>
              <p className="text-gray-300 text-lg">
                Subscribe to Gamkers newsletter for the latest cybersecurity insights, FlawHunt updates, and security best practices.
              </p>
            </div>
            <div className="flex justify-center md:justify-end w-full">
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg overflow-hidden">
                <iframe 
                  src="https://subscribe-forms.beehiiv.com/6830cc06-ec2d-49e4-805c-eabd4cebe4fb" 
                  className="beehiiv-embed rounded-lg shadow-lg w-full" 
                  data-test-id="beehiiv-embed" 
                  frameBorder="0" 
                  scrolling="no" 
                  style={{
                    height: '291px',
                    margin: '0',
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    maxWidth: '100%'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section - Moved to very bottom */}
      <div className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 dark:text-gray-400 text-center md:text-left">
              © 2025 FlawHunt CLI by Gamkers. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <a href="#privacy" className="hover:text-matrix-500 dark:hover:text-matrix-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-matrix-500 dark:hover:text-matrix-400 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#security" className="hover:text-matrix-500 dark:hover:text-matrix-400 transition-colors duration-200">
                Security
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;