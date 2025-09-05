import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const navLinks = [
    { name: 'Features', href: isHomePage ? '#features' : '/#features' },
    { name: 'Community', href: '/community' },
    { name: 'Documentation', href: '/docs' }
  ];

  const handleContactClick = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetStartedClick = () => {
    // If we're not on the home page, navigate to home first
    if (!isHomePage) {
      window.location.href = '/#cta';
      return;
    }
    
    // Find the CTA section and scroll to it
    const ctaSection = document.querySelector('section');
    const allSections = document.querySelectorAll('section');
    
    // Find the CTA section (it should be the last section before footer)
    let targetSection = null;
    for (let i = allSections.length - 1; i >= 0; i--) {
      const section = allSections[i];
      if (section.textContent?.includes('Ready to Supercharge Your Terminal?')) {
        targetSection = section;
        break;
      }
    }
    
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 pointer-events-auto ${
      isScrolled 
        ? 'backdrop-blur-xl bg-light-50/90 dark:bg-dark-950/20' 
        : 'backdrop-blur-lg bg-light-50/80 dark:bg-dark-200/10'
    } rounded-2xl border border-matrix-500/20 dark:border-matrix-700/20 shadow-xl`}>
      <nav className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
          <div className="bg-gradient-to-br from-matrix-500 to-matrix-700 rounded-lg p-2">
            <Terminal className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">FlawHunt CLI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link, index) => (
            link.href.startsWith('/') ? (
              <Link
                key={index}
                to={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-matrix-600 dark:hover:text-matrix-400 transition-colors duration-200 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-matrix-600 dark:bg-matrix-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ) : (
              <a
                key={index}
                href={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-matrix-600 dark:hover:text-matrix-400 transition-colors duration-200 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-matrix-600 dark:bg-matrix-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            )
          ))}
          <button 
            onClick={handleContactClick}
            className="text-gray-700 dark:text-gray-300 hover:text-matrix-600 dark:hover:text-matrix-400 transition-colors duration-200 relative group cursor-pointer"
          >
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-matrix-600 dark:bg-matrix-400 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button 
            onClick={handleGetStartedClick}
            className="bg-gradient-to-r from-matrix-600 to-matrix-700 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-matrix-500/25 transform hover:scale-105 transition-all duration-200"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-900 dark:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-dark-50/95 dark:bg-dark-950/95 backdrop-blur-xl rounded-2xl border border-matrix-500/20 dark:border-matrix-700/20 shadow-xl p-6 md:hidden">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                link.href.startsWith('/') ? (
                  <Link
                    key={index}
                    to={link.href}
                    className="text-gray-700 dark:text-gray-300 hover:text-matrix-600 dark:hover:text-matrix-400 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={index}
                    href={link.href}
                    className="text-gray-700 dark:text-gray-300 hover:text-matrix-600 dark:hover:text-matrix-400 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              ))}
              
              <button 
                onClick={() => {
                  handleContactClick();
                  setIsMenuOpen(false);
                }}
                className="text-gray-700 dark:text-gray-300 hover:text-matrix-600 dark:hover:text-matrix-400 transition-colors duration-200 text-left"
              >
                Contact
              </button>

              <button 
                onClick={() => {
                  handleGetStartedClick();
                  setIsMenuOpen(false);
                }}
                className="bg-gradient-to-r from-matrix-600 to-matrix-700 text-white px-6 py-3 rounded-full hover:shadow-lg hover:shadow-matrix-500/25 transform hover:scale-105 transition-all duration-200"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;