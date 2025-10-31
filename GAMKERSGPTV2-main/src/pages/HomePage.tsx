
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Demo from '../components/Demo';
import Pricing from '../components/Pricing';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,225,255,0.05),transparent_40%)] pointer-events-none"></div>
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <About />
          <Features />
          <Demo />
          <Testimonials />
          <Pricing />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;