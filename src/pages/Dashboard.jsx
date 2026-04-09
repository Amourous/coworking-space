import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import { Loader2, Calendar, MapPin, Clock, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency, C } from '../utils/constants';
import { useLang } from '../context/LanguageContext';

export default function Dashboard() {
  const { user, profile } = useAuth();
  const { lang, t } = useLang();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReservations() {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('reservations')
        .select(`
          *,
          space:spaces(*)
        `)
        .eq('user_id', user.id)
        .order('booking_date', { ascending: true });
        
      if (error) {
        console.error('Error fetching reservations:', error);
      } else {
        setReservations(data || []);
      }
      setLoading(false);
    }
    fetchReservations();
  }, [user]);

  const handleCancel = async (id) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status: 'cancelled' })
        .eq('id', id);
        
      if (error) throw error;
      
      setReservations(prev => prev.map(res => 
        res.id === id ? { ...res, status: 'cancelled' } : res
      ));
    } catch (err) {
      alert('Failed to cancel booking.');
      console.error(err);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-[60vh]"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>;

  const upcomingReservations = reservations.filter(r => r.status === 'upcoming' || r.status === 'active');
  const pastReservations = reservations.filter(r => r.status === 'completed' || r.status === 'cancelled');

  return (
    <div className="section-container pt-8">
      <div className="flex justify-between items-end mb-10 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {profile?.full_name?.split(' ')[0] || 'User'}!</h1>
          <p className="text-textMuted">Manage your upcoming workspace reservations.</p>
        </div>
        <Link to="/spaces" className="btn-primary py-2 px-6 hidden sm:block">
          Book a Space
        </Link>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-primary" /> Upcoming Bookings
        </h2>
        
        {upcomingReservations.length === 0 ? (
          <div className="bg-surface/50 border border-white/5 rounded-2xl p-10 text-center">
            <h3 className="text-xl font-medium mb-2">No upcoming bookings</h3>
            <p className="text-textMuted mb-6">Looks like you don't have any spaces reserved yet.</p>
            <Link to="/spaces" className="btn-primary py-2 px-6">Explore Spaces</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingReservations.map(res => (
              <div key={res.id} className="glass-card p-6 rounded-2xl border-l-4 border-l-primary flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">
                      {lang === 'ar' && res.space.name_ar ? res.space.name_ar : res.space.name}
                    </h3>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary">
                      {res.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{formatCurrency(res.total_price, lang)}</div>
                    <div className="text-xs text-textMuted">Unpaid</div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-center text-sm text-textMuted gap-3">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>{format(new Date(res.booking_date), 'EEEE, MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center text-sm text-textMuted gap-3">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>
                      {res.start_time.substring(0, 5)} - {res.end_time.substring(0, 5)}
                      {res.start_time === '00:00:00' && ' (Full Day)'}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-textMuted gap-3">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>{C.SPACE_TYPES[res.space.type]}</span>
                  </div>
                </div>
                
                <div className="mt-auto border-t border-white/5 pt-4">
                  <button 
                    onClick={() => handleCancel(res.id)}
                    className="flex items-center justify-center gap-2 w-full text-danger hover:bg-danger/10 py-2 rounded-lg transition-colors text-sm font-medium"
                  >
                    <XCircle className="w-4 h-4" /> Cancel Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {pastReservations.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Booking History</h2>
          <div className="bg-surface border border-white/5 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-textMuted uppercase border-b border-white/5">
                <tr>
                  <th className="px-6 py-4">Space</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {pastReservations.map(res => (
                  <tr key={res.id} className="border-b border-white/5 hover:bg-white/5 text-textMain">
                    <td className="px-6 py-4 font-medium">
                      {lang === 'ar' && res.space.name_ar ? res.space.name_ar : res.space.name}
                    </td>
                    <td className="px-6 py-4">{format(new Date(res.booking_date), 'MMM d, yyyy')}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${res.status === 'cancelled' ? 'bg-danger/20 text-danger' : 'bg-success/20 text-success'}`}>
                        {res.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">{formatCurrency(res.total_price, lang)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
