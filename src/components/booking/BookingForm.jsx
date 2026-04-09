import { useState } from 'react';
import { format, addDays, isPast, isToday } from 'date-fns';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Clock, Users, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/constants';

export default function BookingForm({ space }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [date, setDate] = useState(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
  const [startTime, setStartTime] = useState('09:00');
  const [duration, setDuration] = useState('2');
  const [guests, setGuests] = useState('1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const isDaily = !space.price_hourly || space.type === 'dedicated_desk';
  
  // Calculate end time
  const startHour = parseInt(startTime.split(':')[0]);
  const endHour = startHour + parseInt(duration);
  const endTime = `${endHour.toString().padStart(2, '0')}:00`;

  // Calculate price (basic)
  const totalPrice = isDaily ? space.price_daily : (space.price_hourly * parseInt(duration));

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Create reservation
      const { data, error: insertError } = await supabase
        .from('reservations')
        .insert({
          user_id: user.id,
          space_id: space.id,
          booking_date: date,
          start_time: isDaily ? '00:00:00' : `${startTime}:00`,
          end_time: isDaily ? '23:59:59' : `${endTime}:00`,
          guests: parseInt(guests),
          total_price: totalPrice,
          status: 'upcoming'
        })
        .select()
        .single();

      if (insertError) {
        if (insertError.message.includes('already booked')) {
          throw new Error('This space is already booked for the selected time. Please choose another time.');
        }
        throw insertError;
      }

      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.message || 'Failed to complete booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const today = format(new Date(), 'yyyy-MM-dd');

  if (success) {
    return (
      <div className="glass-card p-8 rounded-2xl text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/20 mb-4">
          <CheckCircle2 className="w-8 h-8 text-success" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
        <p className="text-textMuted mb-6">Your reservation has been secured. Redirecting to your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden">
      {!user && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center rounded-2xl">
          <h3 className="text-xl font-bold mb-2">Sign in to book</h3>
          <p className="text-textMuted mb-4">You need an account to reserve spaces.</p>
          <button onClick={() => navigate('/login')} className="btn-primary">
            Sign In
          </button>
        </div>
      )}

      <h3 className="text-2xl font-bold mb-6">Reserve Space</h3>

      {error && (
        <div className="bg-danger/10 border border-danger/30 text-danger text-sm rounded-lg p-3 mb-6 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleBooking} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-textMuted mb-1.5">Date</label>
          <div className="relative">
            <Calendar className="w-5 h-5 text-textMuted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="date"
              required
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-field pl-10 custom-date-input"
            />
          </div>
        </div>

        {!isDaily && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-textMuted mb-1.5">Start Time</label>
              <div className="relative">
                <Clock className="w-5 h-5 text-textMuted absolute left-3 top-1/2 -translate-y-1/2" />
                <select 
                  value={startTime} 
                  onChange={(e) => setStartTime(e.target.value)}
                  className="input-field pl-10 appearance-none"
                >
                  {Array.from({length: 12}).map((_, i) => (
                    <option key={i} value={`${(i + 8).toString().padStart(2, '0')}:00`}>
                      {(i + 8).toString().padStart(2, '0')}:00
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-textMuted mb-1.5">Duration</label>
              <select 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)}
                className="input-field appearance-none"
              >
                <option value="1">1 Hour</option>
                <option value="2">2 Hours</option>
                <option value="3">3 Hours</option>
                <option value="4">4 Hours</option>
                <option value="8">Full Day (8h)</option>
              </select>
            </div>
          </div>
        )}

        {space.capacity > 1 && (
          <div>
            <label className="block text-sm font-medium text-textMuted mb-1.5">Guests</label>
            <div className="relative">
              <Users className="w-5 h-5 text-textMuted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                min="1"
                max={space.capacity}
                required
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
        )}

        <div className="border-t border-white/10 pt-5 mt-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-textMuted text-sm">Rate</span>
            <span className="font-medium text-sm">
              {isDaily ? `${formatCurrency(space.price_daily)}/day` : `${formatCurrency(space.price_hourly)}/hr`}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">Total</span>
            <span className="text-2xl font-bold text-primary">{formatCurrency(totalPrice)}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-3 flex justify-center items-center gap-2 mt-4"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>Confirm Booking <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </form>
      
      <p className="text-xs text-textMuted text-center mt-4">
        You won't be charged yet. Payment is handled on-site.
      </p>
    </div>
  );
}
