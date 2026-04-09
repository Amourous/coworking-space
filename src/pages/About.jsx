import { Clock, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

export default function About() {
  const { t } = useLang();
  return (
    <div className="section-container pt-8 md:pt-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">{t('about.title')}</h1>
        <p className="text-lg text-textMuted text-center leading-relaxed mb-16">
          {t('about.desc')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> {t('about.hours')}
            </h3>
            <ul className="space-y-3 text-sm text-textMuted">
              <li className="flex justify-between border-b border-white/5 pb-2 gap-4">
                <span>{t('about.monFri')}</span>
                <span className="text-white font-medium text-right">{t('about.monFriHours')}</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2 gap-4">
                <span>{t('about.sat')}</span>
                <span className="text-white font-medium text-right">{t('about.satHours')}</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2 gap-4">
                <span>{t('about.sun')}</span>
                <span className="text-white font-medium text-right">{t('about.sunHours')}</span>
              </li>
              <li className="flex justify-between pt-1 gap-4">
                <span>{t('about.dedicated')}</span>
                <span className="text-primary font-medium text-right">{t('about.access247')}</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" /> {t('about.location')}
            </h3>
            <div className="space-y-4 text-sm text-textMuted">
              <p>
                42 Fouad Street<br />
                Raml Station, Downtown<br />
                Alexandria, Egypt
              </p>
              <div className="flex items-center gap-3 pt-2">
                <Phone className="w-4 h-4 text-textMain" />
                <span className="text-white">+20 3 486 7890</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-textMain" />
                <span className="text-white">hello@worknest.io</span>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8">{t('about.faq')}</h2>
        <div className="space-y-4">
          {[
            {
              q: t('about.faq1q'),
              a: t('about.faq1a')
            },
            {
              q: t('about.faq2q'),
              a: t('about.faq2a')
            },
            {
              q: t('about.faq3q'),
              a: t('about.faq3a')
            },
            {
              q: t('about.faq4q'),
              a: t('about.faq4a')
            }
          ].map((faq, i) => (
            <div key={i} className="bg-surface/50 border border-white/5 rounded-xl p-6">
              <h4 className="text-lg font-bold mb-2 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                {faq.q}
              </h4>
              <p className="text-textMuted pl-8">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
