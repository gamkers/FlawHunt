import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

function IframePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950">
      {loading ? (
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-950 to-gray-900">
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-xl bg-gradient-to-r from-emerald-500/30 to-blue-500/30"></div>
            <Loader2 className="w-16 h-16 text-emerald-400 animate-spin relative z-10" />
          </div>
          <h2 className="mt-8 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
            Loading GamkersGPT...
          </h2>
          <div className="mt-4 w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 animate-[loading_2s_ease-in-out]"></div>
          </div>
        </div>
      ) : (
        <iframe
          src="https://gamkersgpt-1.streamlit.app/?embedded=true"
          className="w-full h-screen border-0"
          title="GamkersGPT Application"
        />
      )}
    </div>
  );
}

export default IframePage;