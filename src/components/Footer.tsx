import React from 'react';
import { Terminal, Github, Twitter, Mail, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const footerLinks = [
    { title: 'About', href: '#about' },
    { title: 'Docs', href: '#docs' },
    { title: 'GitHub', href: '#github', external: true },
    { title: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: '#github', label: 'GitHub' },
    { icon: Twitter, href: '#twitter', label: 'Twitter' },
    { icon: Mail, href: '#contact', label: 'Email' },
  ];

  return (
    <footer className="bg-light-100/90 dark:bg-dark-950/90 text-gray-700 dark:text-gray-400 py-16 px-4 pointer-events-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-matrix-500 to-matrix-700 rounded-lg p-2">
                <Terminal className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">FlawHunt CLI</span>
            </div>
            <p className="text-gray-600 dark:text-gray-500 leading-relaxed mb-6 max-w-md">
              The intelligent AI-powered command-line tool designed for cybersecurity professionals and ethical hackers. 
              Streamline your workflows, enhance security, and boost productivity.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-matrix-600 dark:hover:bg-matrix-500 hover:scale-110 transition-all duration-300"
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
                    className="hover:text-matrix-400 dark:hover:text-matrix-300 transition-colors duration-200 flex items-center space-x-2 group"
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

          {/* Newsletter */}
          <div>
            <h4 className="text-gray-900 dark:text-gray-200 font-semibold text-lg mb-6">Stay Updated</h4>
            <p className="text-gray-600 dark:text-gray-500 mb-4">
              Get the latest updates on new features and security insights.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:border-matrix-500 dark:focus:border-matrix-400 focus:ring-1 focus:ring-matrix-500 dark:focus:ring-matrix-400 transition-colors duration-200"
              />
              <button className="w-full bg-gradient-to-r from-matrix-600 to-matrix-700 text-white py-3 rounded-lg hover:shadow-lg hover:shadow-matrix-500/25 transition-all duration-300 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-600 dark:text-gray-500 text-center md:text-left">
            © 2025 FlawHunt CLI. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#privacy" className="hover:text-matrix-400 dark:hover:text-matrix-300 transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-matrix-400 dark:hover:text-matrix-300 transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#security" className="hover:text-matrix-400 dark:hover:text-matrix-300 transition-colors duration-200">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;