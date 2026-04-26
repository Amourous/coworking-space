import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Wifi, Coffee, Users, Shield, MapPin, Star } from 'lucide-react';
import { C, formatCurrency } from '../utils/constants';
import { useLang } from '../context/LanguageContext';

const testimonials = [
  { name: 'Sarah Jenkins', role: 'Freelance Designer', text: 'WorkNest changed the way I work. The atmosphere is vibrant, internet is blazing fast, and I love the focus pods when I have client meetings.', rating: 5 },
  { name: 'Michael Chen', role: 'Startup Founder', text: 'We built our MVP mostly working from the Synergy Lab room here. Best investment we made to get the team out of the garage.', rating: 5 },
  { name: 'Elena R.', role: 'CS Student', text: 'As a student, the hot desk pricing is perfect. I study better here than on campus, and the coffee is actually good!', rating: 4 },
];

export default function Landing() {
  const { t, lang } = useLang();

  const features = [
    { icon: <Wifi className="w-6 h-6 text-primary" />, title: t('features.wifi'), desc: t('features.wifiDesc') },
    { icon: <Coffee className="w-6 h-6 text-primary" />, title: t('features.cafe'), desc: t('features.cafeDesc') },
    { icon: <Users className="w-6 h-6 text-primary" />, title: t('features.community'), desc: t('features.communityDesc') },
    { icon: <Shield className="w-6 h-6 text-primary" />, title: t('features.secure'), desc: t('features.secureDesc') },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                {t('landing.heroTitle1')} <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  {t('landing.heroTitle2')}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-textMuted mb-10 max-w-2xl leading-relaxed">
                {t('landing.heroDesc')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/spaces" className="btn-primary text-center flex items-center justify-center gap-2 group text-lg py-3 px-8">
                  {t('landing.findSpace')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-scale-x-100 transition-transform" />
                </Link>
                <Link to="/about" className="btn-secondary text-center text-lg py-3 px-8">
                  {t('landing.takeTour')}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-white/5 bg-surface/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center text-textMuted font-medium text-sm">
            <span>TRUSTED BY STUDENTS FROM</span>
            <span className="text-white text-lg font-bold font-serif opacity-70">Alexandria University</span>
            <span className="text-white text-lg font-bold font-mono opacity-70">Arab Academy</span>
            <span className="text-white text-lg font-bold opacity-70">E-JUST</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-container">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {t('landing.featuresTitle')}
          </motion.h2>
          <p className="text-textMuted max-w-2xl mx-auto">
            {t('landing.featuresDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-2xl hover:border-primary/30 transition-colors"
            >
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-textMuted text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Spaces Teaser */}
      <section className="bg-surface border-y border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('landing.popularSpaces')}</h2>
              <p className="text-textMuted">{t('landing.popularDesc')}</p>
            </div>
            <Link to="/spaces" className="hidden md:flex text-primary hover:text-primaryHover items-center gap-1 font-medium transition-colors">
              {t('landing.viewAll')} <ArrowRight className="w-4 h-4 rtl:-scale-x-100" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Hardcoded teaser spaces for preview */}
            {[
              { id: 1, name: 'Flex Desk', type: 'Hot Desk', price: 50, img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80' },
              { id: 4, name: 'Focus Pod 1', type: 'Quiet Booth', price: 75, img: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=800&q=80' },
              { id: 5, name: 'The Huddle', type: 'Meeting Room', price: 200, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' }
            ].map((space, i) => (
              <motion.div 
                key={space.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={space.img} alt={space.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur pb-1 px-2.5 rounded-full text-xs font-medium text-white border border-white/10">
                    {space.type}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{space.name}</h3>
                    <div className="text-right">
                      <span className="text-lg font-bold text-accent">{formatCurrency(space.price, lang)}</span>
                      <span className="text-xs text-textMuted rtl:mr-1">{t('landing.perHour')}</span>
                    </div>
                  </div>
                  <Link to={`/spaces/${space.id}`} className="mt-4 w-full block text-center btn-secondary py-2 text-sm">
                    {t('landing.viewDetails')}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <Link to="/spaces" className="md:hidden mt-8 w-full btn-secondary text-center block">
            {t('landing.viewAll')}
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Loved by the community</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex text-warning mb-4">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-sm text-textMain leading-relaxed mb-6 italic">"{t.text}"</p>
              </div>
              <div>
                <h4 className="font-semibold">{t.name}</h4>
                <p className="text-xs text-textMuted">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('landing.ctaTitle')}</h2>
          <p className="text-xl text-textMuted mb-10">{t('landing.ctaDesc')}</p>
          <Link to="/register" className="btn-primary text-lg py-4 px-10 shadow-xl shadow-primary/40 hover:scale-105 transition-transform inline-block">
            {t('landing.ctaButton')}
          </Link>
        </div>
      </section>
    </div>
  );
}
