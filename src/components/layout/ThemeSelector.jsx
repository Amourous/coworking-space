import { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const themes = [
  { id: 'worknest', name: 'WorkNest', icon: '🌙' },
  { id: 'morning-brew', name: 'Morning Brew', icon: '☕' },
  { id: 'cyber-neon', name: 'Cyber Neon', icon: '⚡' },
  { id: 'zen-space', name: 'Zen Space', icon: '🍃' },
  { id: 'executive', name: 'Executive', icon: '👔' },
];

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-textMuted hover:text-textMain flex items-center gap-1.5 transition-colors text-sm font-medium p-2 rounded-lg hover:bg-surfaceHover"
        title="Change Theme"
      >
        <Palette className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-surface border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-fade-in">
          <div className="p-2 space-y-1">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left rtl:text-right px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between transition-colors ${
                  theme === t.id
                    ? 'bg-primary/20 text-primary'
                    : 'text-textMuted hover:bg-surfaceHover hover:text-textMain'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{t.icon}</span>
                  <span>{t.name}</span>
                </div>
                {theme === t.id && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
