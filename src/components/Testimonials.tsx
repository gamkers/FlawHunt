import React, { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Penetration Tester",
      company: "CyberSec Solutions",
      image: "SC",
      quote: "FlawHunt CLI has revolutionized my penetration testing workflow. The AI suggestions are incredibly accurate and save hours of manual work.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Security Researcher",
      company: "TechGuard Inc",
      image: "MR",
      quote: "The smart autocomplete feature is a game-changer. It knows exactly what I need before I finish typing the command.",
      rating: 5
    },
    {
      name: "Alex Thompson",
      role: "Ethical Hacker",
      company: "WhiteHat Security",
      image: "AT",
      quote: "Safe mode has prevented several costly mistakes. This tool gives me confidence to explore without fear of breaking systems.",
      rating: 5
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => {
              if (!prev.includes(cardIndex)) {
                return [...prev, cardIndex].sort((a, b) => a - b);
              }
              return prev;
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px 50px 0px'
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-light-50/80 to-light-100/80 dark:from-dark-200/80 dark:to-dark-100/80 lg:bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-matrix-600 to-matrix-700 bg-clip-text text-transparent">
              Security Professionals
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            Join thousands of cybersecurity experts who rely on FlawHunt CLI to enhance their productivity and security workflows.
          </p>
        </div>

        {/* Mobile and Tablet View - Static Grid */}
        <div className="block lg:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => {
              const isVisible = visibleCards.includes(index);
              const animationDelay = isVisible ? index * 200 : 0;
              
              return (
                <div
                  key={index}
                  ref={(el) => (cardRefs.current[index] = el)}
                  data-index={index}
                  className={`group p-6 sm:p-8 rounded-2xl border border-white/20 dark:border-white/10 hover:border-matrix-400/50 dark:hover:border-matrix-500/50 hover:shadow-2xl hover:shadow-matrix-500/20 hover:-translate-y-3 hover:scale-105 transition-all duration-700 ease-out bg-white/10 dark:bg-black/20 backdrop-blur-md hover:bg-white/20 dark:hover:bg-black/30 cursor-pointer transform ${
                    isVisible 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-12 opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${animationDelay}ms`
                  }}
                >
              <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-matrix-500 to-matrix-700 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-sm sm:text-base group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 ease-out shadow-lg group-hover:shadow-matrix-500/50">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base group-hover:text-matrix-600 dark:group-hover:text-matrix-400 transition-all duration-300 group-hover:translate-x-1">{testimonial.name}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-all duration-300">{testimonial.role}</p>
                  <p className="text-xs sm:text-sm text-matrix-600 dark:text-matrix-400 group-hover:text-matrix-500 dark:group-hover:text-matrix-300 transition-all duration-300">{testimonial.company}</p>
                </div>
              </div>

              <div className="relative">
                <Quote className="absolute -top-1 sm:-top-2 -left-1 sm:-left-2 w-6 h-6 sm:w-8 sm:h-8 text-matrix-200 dark:text-matrix-300 group-hover:text-matrix-400 dark:group-hover:text-matrix-200 transition-all duration-300 group-hover:scale-110" />
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed italic pl-4 sm:pl-6 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-all duration-300">
                  "{testimonial.quote}"
                </p>
              </div>

              <div className="flex items-center mt-4 sm:mt-6 space-x-1">
                {[...Array(testimonial.rating)].map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current group-hover:text-yellow-300 group-hover:scale-125 transition-all duration-300"
                    style={{
                      transitionDelay: `${(animationDelay) + (starIndex * 100)}ms`
                    }}
                  />
                ))}
              </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop View - Sliding Animation */}
        <div className="hidden lg:block overflow-hidden">
          <div className="flex animate-slide-testimonials gap-8" style={{width: 'calc(200% + 2rem)'}}>
            {/* First set of cards */}
            {testimonials.map((testimonial, index) => {
              const isVisible = visibleCards.includes(index);
              const animationDelay = isVisible ? index * 200 : 0;
              
              return (
                <div
                  key={`first-${index}`}
                  ref={(el) => (cardRefs.current[index] = el)}
                  data-index={index}
                  className={`group p-6 sm:p-8 rounded-2xl border border-white/20 dark:border-white/10 hover:border-matrix-400/50 dark:hover:border-matrix-500/50 hover:shadow-2xl hover:shadow-matrix-500/20 hover:-translate-y-3 hover:scale-105 transition-all duration-700 ease-out bg-white/10 dark:bg-black/20 backdrop-blur-md hover:bg-white/20 dark:hover:bg-black/30 cursor-pointer transform flex-shrink-0 w-80 ${
                    isVisible 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-12 opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${animationDelay}ms`
                  }}
                >
                  <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-matrix-500 to-matrix-700 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-sm sm:text-base group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 ease-out shadow-lg group-hover:shadow-matrix-500/50">
                      {testimonial.image}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base group-hover:text-matrix-600 dark:group-hover:text-matrix-400 transition-all duration-300 group-hover:translate-x-1">{testimonial.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-all duration-300">{testimonial.role}</p>
                      <p className="text-xs sm:text-sm text-matrix-600 dark:text-matrix-400 group-hover:text-matrix-500 dark:group-hover:text-matrix-300 transition-all duration-300">{testimonial.company}</p>
                    </div>
                  </div>

                  <div className="relative">
                    <Quote className="absolute -top-1 sm:-top-2 -left-1 sm:-left-2 w-6 h-6 sm:w-8 sm:h-8 text-matrix-200 dark:text-matrix-300 group-hover:text-matrix-400 dark:group-hover:text-matrix-200 transition-all duration-300 group-hover:scale-110" />
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed italic pl-4 sm:pl-6 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-all duration-300">
                      "{testimonial.quote}"
                    </p>
                  </div>

                  <div className="flex items-center mt-4 sm:mt-6 space-x-1">
                    {[...Array(testimonial.rating)].map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current group-hover:text-yellow-300 group-hover:scale-125 transition-all duration-300"
                        style={{
                          transitionDelay: `${(animationDelay) + (starIndex * 100)}ms`
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
            
            {/* Duplicate set for seamless loop */}
            {testimonials.map((testimonial, index) => (
              <div
                key={`second-${index}`}
                className="group p-6 sm:p-8 rounded-2xl border border-white/20 dark:border-white/10 hover:border-matrix-400/50 dark:hover:border-matrix-500/50 hover:shadow-2xl hover:shadow-matrix-500/20 hover:-translate-y-3 hover:scale-105 transition-all duration-700 ease-out bg-white/10 dark:bg-black/20 backdrop-blur-md hover:bg-white/20 dark:hover:bg-black/30 cursor-pointer flex-shrink-0 w-80 translate-y-0 opacity-100"
              >
                <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-matrix-500 to-matrix-700 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-sm sm:text-base group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 ease-out shadow-lg group-hover:shadow-matrix-500/50">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base group-hover:text-matrix-600 dark:group-hover:text-matrix-400 transition-all duration-300 group-hover:translate-x-1">{testimonial.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-all duration-300">{testimonial.role}</p>
                    <p className="text-xs sm:text-sm text-matrix-600 dark:text-matrix-400 group-hover:text-matrix-500 dark:group-hover:text-matrix-300 transition-all duration-300">{testimonial.company}</p>
                  </div>
                </div>

                <div className="relative">
                  <Quote className="absolute -top-1 sm:-top-2 -left-1 sm:-left-2 w-6 h-6 sm:w-8 sm:h-8 text-matrix-200 dark:text-matrix-300 group-hover:text-matrix-400 dark:group-hover:text-matrix-200 transition-all duration-300 group-hover:scale-110" />
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed italic pl-4 sm:pl-6 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-all duration-300">
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="flex items-center mt-4 sm:mt-6 space-x-1">
                  {[...Array(testimonial.rating)].map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current group-hover:text-yellow-300 group-hover:scale-125 transition-all duration-300"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 bg-light-100/80 dark:bg-dark-100/80 backdrop-blur-sm px-4 sm:px-6 py-3 rounded-full border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-matrix-500 to-matrix-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  SC
                </div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-matrix-400 to-matrix-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  MR
                </div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-matrix-600 to-matrix-800 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  AT
                </div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs font-bold">
                  +5K
                </div>
              </div>
              <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">Trusted by 5,000+ professionals</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;