import React from 'react';
import { Download, ArrowRight, CheckCircle } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-light-100/80 via-light-200/80 to-light-50/80 dark:from-dark-950/80 dark:via-dark-200/80 dark:to-dark-950/80 lg:bg-transparent relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-matrix-600/20 to-matrix-700/20 dark:from-matrix-400/10 dark:to-matrix-500/10"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-matrix-500/10 dark:bg-matrix-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-matrix-600/10 dark:bg-matrix-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Ready to{' '}
            <span className="bg-gradient-to-r from-matrix-400 to-matrix-600 bg-clip-text text-transparent">
              Supercharge Your Terminal?
            </span>
          </h2>
          
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Get FlawHunt CLI and streamline your cybersecurity workflows with the power of AI. 
            Join thousands of professionals who trust our platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-matrix-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-matrix-700 transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 shadow-xl hover:shadow-2xl">
              <Download className="w-6 h-6 group-hover:animate-bounce" />
              <span>Download Now</span>
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="w-4 h-4 text-matrix-600" />
              </div>
            </button>
            
            <button className="border-2 border-gray-300 dark:border-white/20 text-gray-700 dark:text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-white/5 hover:border-gray-400 dark:hover:border-white/30 transition-all duration-300">
              View Documentation
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-700 dark:text-gray-300">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Cross-platform</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Lightweight</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>AI-Powered</span>
            </div>
          </div>

          <div className="pt-8">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Free for personal use • Enterprise plans available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;