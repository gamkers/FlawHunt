import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, name, title, rating }) => (
  <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1">
    <div className="flex mb-4">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          size={16} 
          className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"} 
        />
      ))}
    </div>
    <p className="text-gray-300 mb-6 italic">"{quote}"</p>
    <div>
      <p className="font-medium text-white">{name}</p>
      <p className="text-gray-500 text-sm">{title}</p>
    </div>
  </div>
);

const Testimonials = () => {
  const testimonials = [
    {
      quote: "GamkersGPT has completely transformed our security training program. The AI guidance is incredibly accurate and helpful.",
      name: "Alex Morgan",
      title: "Security Training Manager",
      rating: 5
    },
    {
      quote: "I use GamkersGPT daily for security research. Its ability to find relevant CVEs and suggest mitigation strategies saves me hours of work.",
      name: "Jamie Chen",
      title: "Security Researcher",
      rating: 5
    },
    {
      quote: "The tool command generation feature is invaluable for our penetration testing team. It's like having an expert guiding you through complex security tools.",
      name: "Sam Wilson",
      title: "Penetration Tester",
      rating: 4
    }
  ];

  return (
    <section className="min-h-screen flex items-center relative py-20" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
              Trusted by Security Professionals
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Hear what cybersecurity experts and ethical hackers have to say about GamkersGPT.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;