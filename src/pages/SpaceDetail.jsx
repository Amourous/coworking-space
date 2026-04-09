import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import BookingForm from '../components/booking/BookingForm';
import { Users, ArrowLeft, Loader2, Info, MapPin } from 'lucide-react';
import { C, formatCurrency } from '../utils/constants';

export default function SpaceDetail() {
  const { id } = useParams();
  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSpace() {
      try {
        const { data, error } = await supabase
          .from('spaces')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setSpace(data);
      } catch (err) {
        console.error('Error fetching space:', err);
        setError('Space not found or unavailable.');
      } finally {
        setLoading(false);
      }
    }
    fetchSpace();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center min-h-[60vh]"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>;
  
  if (error || !space) return (
    <div className="section-container text-center py-32">
      <h2 className="text-3xl font-bold mb-4">{error || 'Space Not Found'}</h2>
      <Link to="/spaces" className="text-primary hover:underline">Return to Spaces</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Link to="/spaces" className="inline-flex items-center text-textMuted hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Spaces
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl overflow-hidden mb-8 h-64 md:h-96 relative border border-white/5">
            <img 
              src={space.image_url || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'} 
              alt={space.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-black/60 backdrop-blur px-3 py-1.5 rounded-full text-sm font-medium border border-white/10">
                {C.SPACE_TYPES[space.type] || space.type}
              </span>
              {space.capacity > 1 && (
                <span className="bg-primary/90 backdrop-blur px-3 py-1.5 rounded-full text-sm font-medium shadow-lg flex items-center gap-1.5">
                  <Users className="w-4 h-4" /> Capacity: {space.capacity}
                </span>
              )}
            </div>
          </div>

          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{space.name}</h1>
            <p className="text-lg text-textMuted leading-relaxed">{space.description}</p>
          </div>

          {space.amenities && space.amenities.length > 0 && (
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" /> Amenities Included
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {space.amenities.map((amenity, i) => (
                  <div key={i} className="bg-surface border border-white/5 p-4 rounded-xl flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="capitalize">{amenity.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mb-8 p-6 bg-surface/50 border border-white/5 rounded-2xl flex items-start gap-4">
            <MapPin className="w-6 h-6 text-textMuted shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold mb-1">Floor 2, East Wing</h4>
              <p className="text-sm text-textMuted">Check in at the front desk upon arrival. Access cards are provided for booking durations.</p>
            </div>
          </div>
        </div>

        {/* Sidebar / Booking Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <BookingForm space={space} />
          </div>
        </div>
      </div>
    </div>
  );
}
