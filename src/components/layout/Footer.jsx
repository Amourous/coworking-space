import { Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary p-1.5 rounded-lg">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">WorkNest</span>
            </Link>
            <p className="text-textMuted text-sm">
              Your workspace, your way. Premium coworking spaces for modern professionals and students.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-white">Explore</h3>
            <ul className="space-y-2 text-sm text-textMuted">
              <li><Link to="/spaces" className="hover:text-primary transition-colors">All Spaces</Link></li>
              <li><Link to="/cafeteria" className="hover:text-primary transition-colors">Cafeteria Menu</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-2 text-sm text-textMuted">
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/rules" className="hover:text-primary transition-colors">Space Rules</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-white">Visit Us</h3>
            <ul className="space-y-2 text-sm text-textMuted">
              <li>123 Innovation Drive</li>
              <li>Tech District, TX 78701</li>
              <li>hello@worknest.io</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-textMuted">
          <p>© {new Date().getFullYear()} WorkNest Coworking. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Social icons could go here */}
            <span>Twitter</span>
            <span>Instagram</span>
            <span>LinkedIn</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
