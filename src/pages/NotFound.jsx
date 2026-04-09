import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex-grow flex items-center justify-center pt-8 md:pt-12 px-4">
      <div className="max-w-xl w-full text-center py-20 px-6 bg-surface/50 border border-white/5 rounded-3xl backdrop-blur-sm">
        <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary/80 to-accent/80 mb-6 drop-shadow-2xl">
          404
        </h1>
        <h2 className="text-3xl font-bold mb-4 text-white">Page not found</h2>
        <p className="text-lg text-textMuted mb-10 max-w-md mx-auto">
          We couldn't find the page you're looking for. It might have been moved, deleted, or perhaps you just took a wrong turn.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.history.back()} 
            className="btn-secondary flex items-center justify-center gap-2 py-3 px-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
          <Link 
            to="/" 
            className="btn-primary flex items-center justify-center gap-2 py-3 px-6 text-sm"
          >
            <Home className="w-4 h-4" /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
