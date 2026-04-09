import { Clock, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <div className="section-container pt-8 md:pt-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">About WorkNest</h1>
        <p className="text-lg text-textMuted text-center leading-relaxed mb-16">
          WorkNest exists to bridge the gap between loud coffee shops and sterile corporate offices. 
          We provide flexible, premium, and inspiring spaces designed for the way modern students, 
          freelancers, and startups actually work.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> Opening Hours
            </h3>
            <ul className="space-y-3 text-sm text-textMuted">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Monday - Friday</span>
                <span className="text-white font-medium">08:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Saturday</span>
                <span className="text-white font-medium">09:00 AM - 08:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Sunday</span>
                <span className="text-white font-medium">10:00 AM - 06:00 PM</span>
              </li>
              <li className="flex justify-between pt-1">
                <span>Members with Dedicated Desks</span>
                <span className="text-primary font-medium">24/7 Access</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" /> Location & Contact
            </h3>
            <div className="space-y-4 text-sm text-textMuted">
              <p>
                123 Innovation Drive<br />
                Tech District, Building A<br />
                Austin, TX 78701
              </p>
              <div className="flex items-center gap-3 pt-2">
                <Phone className="w-4 h-4 text-textMain" />
                <span className="text-white">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-textMain" />
                <span className="text-white">hello@worknest.io</span>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "Can I bring a guest?",
              a: "Yes! Dedicated desk members and meeting room bookers can bring guests. Hot desk members must book an additional pass for their guests."
            },
            {
              q: "Do I need to sign a long-term contract?",
              a: "No, all our spaces are strictly pay-as-you-go. You can book by the hour, day, or month without any long-term commitments."
            },
            {
              q: "Is the cafeteria open to the public?",
              a: "The cafeteria is an exclusive amenity for our members and guests to ensure a quiet, private environment."
            },
            {
              q: "How does the AI assistant work?",
              a: "Our AI assistant helps you navigate the platform, find spaces that fit your needs, and access information instantly. Look for the chat icon in the bottom right corner."
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
