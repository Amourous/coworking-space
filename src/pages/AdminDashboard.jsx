import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';
import { formatCurrency } from '../utils/constants';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [data, setData] = useState({ bookings: [], spaces: [], cafeteria: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      
      const [bookingsRes, spacesRes, cafeteriaRes] = await Promise.all([
        supabase.from('reservations').select('*, space:spaces(name), user:profiles(full_name, email)').order('booking_date', { ascending: false }),
        supabase.from('spaces').select('*').order('id'),
        supabase.from('cafeteria_items').select('*').order('category')
      ]);

      setData({
        bookings: bookingsRes.data || [],
        spaces: spacesRes.data || [],
        cafeteria: cafeteriaRes.data || []
      });
      
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-[60vh]"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>;

  return (
    <div className="section-container pt-8">
      <h1 className="text-3xl font-bold mb-8 text-white">WorkNest Admin</h1>
      
      <div className="flex bg-surface rounded-xl p-1 mb-8">
        {['bookings', 'spaces', 'cafeteria'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-center rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-primary text-white shadow-md' : 'text-textMuted hover:text-white'}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          {activeTab === 'bookings' && (
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-textMuted uppercase">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Space</th>
                  <th className="px-6 py-4">Date / Time</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.bookings.map(row => (
                  <tr key={row.id} className="hover:bg-white/5">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{row.user?.full_name || 'Unknown'}</div>
                    </td>
                    <td className="px-6 py-4">{row.space?.name}</td>
                    <td className="px-6 py-4">
                      {row.booking_date} <br/>
                      <span className="text-textMuted text-xs">{row.start_time.substring(0,5)} - {row.end_time.substring(0,5)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        row.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400' : 
                        row.status === 'cancelled' ? 'bg-danger/20 text-danger' : 
                        'bg-success/20 text-success'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono">{formatCurrency(row.total_price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'spaces' && (
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-textMuted uppercase">
                <tr>
                  <th className="px-6 py-4">Space Name</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Capacity</th>
                  <th className="px-6 py-4">Hourly / Daily</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.spaces.map(row => (
                  <tr key={row.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 font-medium text-white">{row.name}</td>
                    <td className="px-6 py-4 capitalize">{row.type.replace('_', ' ')}</td>
                    <td className="px-6 py-4">{row.capacity}</td>
                    <td className="px-6 py-4 font-mono">
                      {formatCurrency(row.price_hourly)} / {formatCurrency(row.price_daily)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'cafeteria' && (
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-textMuted uppercase">
                <tr>
                  <th className="px-6 py-4">Item Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Available</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.cafeteria.map(row => (
                  <tr key={row.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 font-medium text-white">{row.name}</td>
                    <td className="px-6 py-4 capitalize">{row.category.replace('_', ' ')}</td>
                    <td className="px-6 py-4 font-mono">{formatCurrency(row.price)}</td>
                    <td className="px-6 py-4">{row.is_available ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
