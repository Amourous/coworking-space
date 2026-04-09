import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Wifi, Wind, MapPin } from 'lucide-react';
import { C, formatCurrency } from '../../utils/constants';
import { useLang } from '../../context/LanguageContext';

export default function SpaceCard({ space, index }) {
  const { lang, t } = useLang();
  const typeLabel = C.SPACE_TYPES[space.type] || space.type;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full"
    >
      <div className="h-48 overflow-hidden relative">
        <img 
          src={space.image_url || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'} 
          alt={space.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur pb-1 px-2.5 rounded-full text-xs font-medium text-white border border-white/10">
          {typeLabel}
        </div>
        {space.capacity > 1 && (
          <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur pb-1 px-2 rounded-full text-xs font-medium text-white shadow-lg flex items-center gap-1">
            <Users className="w-3 h-3" /> {space.capacity}
          </div>
        )}
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {lang === 'ar' && space.name_ar ? space.name_ar : space.name}
          </h3>
          <div className="text-right whitespace-nowrap ml-4 rtl:ml-0 rtl:mr-4">
            <span className="text-lg font-bold text-accent">{formatCurrency(space.price_hourly || space.price_daily || 0, lang)}</span>
            <span className="text-xs text-textMuted rtl:mr-1">{space.price_hourly ? t('booking.perHr') : t('booking.perDay')}</span>
          </div>
        </div>
        
        <p className="text-sm text-textMuted flex-grow mb-4 line-clamp-2">
          {lang === 'ar' && space.description_ar ? space.description_ar : space.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {(space.amenities || []).slice(0, 2).map((amenity, i) => (
            <span key={i} className="text-[10px] uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-0.5 rounded text-textMuted">
              {amenity.replace(/_/g, ' ')}
            </span>
          ))}
          {(space.amenities || []).length > 2 && (
             <span className="text-[10px] uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-0.5 rounded text-textMuted">
               +{(space.amenities.length - 2)}
             </span>
          )}
        </div>
        
        <Link to={`/spaces/${space.id}`} className="w-full block text-center btn-secondary py-2 text-sm mt-auto">
          {t('spaces.viewDetails')}
        </Link>
      </div>
    </motion.div>
  );
}
