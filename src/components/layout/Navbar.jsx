import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Coffee, Menu, X, User } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <Coffee className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">WorkNest</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/spaces" className="text-sm font-medium text-textMuted hover:text-white transition-colors">Spaces</Link>
            <Link to="/cafeteria" className="text-sm font-medium text-textMuted hover:text-white transition-colors">Cafeteria</Link>
            <Link to="/about" className="text-sm font-medium text-textMuted hover:text-white transition-colors">About</Link>
            
            <div className="h-6 w-px bg-white/10" />

            {user ? (
              <div className="flex items-center gap-4">
                <Link to={profile?.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                  <User className="w-4 h-4" />
                  {profile?.full_name || 'Dashboard'}
                </Link>
                <button onClick={handleSignOut} className="btn-secondary text-sm py-1.5">
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-medium hover:text-white transition-colors">Log in</Link>
                <Link to="/register" className="btn-primary text-sm py-1.5">Sign up</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-textMuted hover:text-white">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-surface border-b border-white/5 shadow-2xl absolute w-full left-0 top-16">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link to="/spaces" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium rounded-md hover:bg-white/5">Spaces</Link>
            <Link to="/cafeteria" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium rounded-md hover:bg-white/5">Cafeteria</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium rounded-md hover:bg-white/5">About</Link>
            
            <div className="border-t border-white/5 my-2 pt-2" />
            
            {user ? (
              <>
                <Link to={profile?.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium rounded-md hover:bg-white/5 text-primary">Dashboard</Link>
                <button onClick={() => { setIsOpen(false); handleSignOut(); }} className="block w-full text-left px-3 py-2 text-base font-medium rounded-md hover:bg-white/5 text-danger">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium rounded-md hover:bg-white/5">Log in</Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium rounded-md bg-primary/20 text-primary mt-2">Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
