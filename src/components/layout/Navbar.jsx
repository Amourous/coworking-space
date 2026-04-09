import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Coffee, Menu, X, User, Globe } from 'lucide-react';
import { useState } from 'react';
import { useLang } from '../../context/LanguageContext';

export default function Navbar() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { lang, toggleLang, t } = useLang();

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
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link to="/spaces" className="text-sm font-medium text-textMuted hover:text-white transition-colors">{t('nav.spaces')}</Link>
            <Link to="/cafeteria" className="text-sm font-medium text-textMuted hover:text-white transition-colors">{t('nav.cafeteria')}</Link>
            <Link to="/about" className="text-sm font-medium text-textMuted hover:text-white transition-colors">{t('nav.about')}</Link>
            
            <div className="h-6 w-px bg-white/10" />

            <button onClick={toggleLang} className="text-textMuted hover:text-white flex items-center gap-1.5 transition-colors text-sm font-medium">
              <Globe className="w-4 h-4" />
              {lang === 'en' ? 'عربي' : 'EN'}
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <Link to={profile?.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                  <User className="w-4 h-4" />
                  {profile?.full_name || t('nav.dashboard')}
                </Link>
                <button onClick={handleSignOut} className="btn-secondary text-sm py-1.5">
                  {t('nav.signout')}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-medium hover:text-white transition-colors">{t('nav.login')}</Link>
                <Link to="/register" className="btn-primary text-sm py-1.5">{t('nav.signup')}</Link>
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
            <Link to="/spaces" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium rounded-md hover:bg-white/5">{t('nav.spaces')}</Link>
            <Link to="/cafeteria" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium rounded-md hover:bg-white/5">{t('nav.cafeteria')}</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium rounded-md hover:bg-white/5">{t('nav.about')}</Link>
            
            <div className="border-t border-white/5 my-2 pt-2" />
            
            <button onClick={() => { toggleLang(); setIsOpen(false); }} className="flex items-center gap-2 w-full px-3 py-2 text-base font-medium rounded-md hover:bg-white/5 text-textMuted text-left rtl:text-right">
              <Globe className="w-5 h-5" />
              {lang === 'en' ? 'عربي' : 'English'}
            </button>

            <div className="border-t border-white/5 my-2 pt-2" />
            
            {user ? (
              <>
                <Link to={profile?.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium rounded-md hover:bg-white/5 text-primary">{t('nav.dashboard')}</Link>
                <button onClick={() => { setIsOpen(false); handleSignOut(); }} className="block w-full text-left rtl:text-right px-3 py-2 text-base font-medium rounded-md hover:bg-white/5 text-danger">{t('nav.signout')}</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium rounded-md hover:bg-white/5">{t('nav.login')}</Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium rounded-md bg-primary/20 text-primary mt-2">{t('nav.signup')}</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
