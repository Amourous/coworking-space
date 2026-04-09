import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import { C, formatCurrency } from '../utils/constants';
import { useLang } from '../context/LanguageContext';

export default function Cafeteria() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const { t, lang } = useLang();

  useEffect(() => {
    async function fetchMenu() {
      const { data, error } = await supabase
        .from('cafeteria_items')
        .select('*')
        .order('name');
        
      if (error) console.error(error);
      else setItems(data || []);
      
      setLoading(false);
    }
    fetchMenu();
  }, []);

  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const categories = ['all', ...Array.from(new Set(items.map(i => i.category)))];

  if (loading) return <div className="flex justify-center items-center min-h-[60vh]"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>;

  return (
    <div className="section-container pt-8 md:pt-12">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center justify-center bg-primary/20 p-4 rounded-3xl mb-6">
          <Coffee className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('cafeteria.title')}</h1>
        <p className="text-lg text-textMuted">
          {t('cafeteria.desc')}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat 
                ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                : 'bg-surface border border-white/5 text-textMuted hover:text-white hover:border-white/20'
            }`}
          >
            {cat === 'all' ? t('cafeteria.allItems') : t(`cafeteria.categories.${cat}`) !== `cafeteria.categories.${cat}` ? t(`cafeteria.categories.${cat}`) : C.CAFETERIA_CATEGORIES[cat] || cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="h-48 overflow-hidden bg-surface relative">
              <img 
                src={item.image_url || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80'} 
                alt={item.name}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
              {!item.is_available && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                  <span className="bg-danger px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider">Sold Out</span>
                </div>
              )}
            </div>
            
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-white">
                  {lang === 'ar' && item.name_ar ? item.name_ar : item.name}
                </h3>
                <span className="font-mono font-bold text-accent">{formatCurrency(item.price, lang)}</span>
              </div>
              <p className="text-sm text-textMuted line-clamp-2 mb-4 flex-grow">
                {lang === 'ar' && item.description_ar ? item.description_ar : item.description}
              </p>
              
              <div className="pt-4 border-t border-white/5">
                <button 
                  disabled={!item.is_available}
                  className="w-full text-sm font-medium py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-primary"
                >
                  {t('cafeteria.orderBtn')}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="text-center py-20 bg-surface/50 rounded-3xl border border-white/5">
          <p className="text-textMuted">No items found in this category.</p>
        </div>
      )}
    </div>
  );
}
