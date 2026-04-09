import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import SpaceCard from '../components/spaces/SpaceCard';
import { Search, Filter, Loader2 } from 'lucide-react';
import { C } from '../utils/constants';

export default function Spaces() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    setLoading(true);
    let query = supabase.from('spaces').select('*');
    
    const { data, error } = await query;
    if (error) {
      console.error('Error fetching spaces:', error);
    } else {
      setSpaces(data || []);
    }
    setLoading(false);
  };

  const filteredSpaces = spaces.filter(space => {
    const matchesType = filterType === 'all' || space.type === filterType;
    const matchesSearch = space.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          space.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="section-container pt-8 md:pt-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-4">Find your space</h1>
          <p className="text-textMuted max-w-xl">
            From hot desks to executive boardrooms, find the perfect environment for your next big idea.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search spaces..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-9 w-full sm:w-64 text-sm py-2"
            />
          </div>
          <div className="relative min-w-[140px]">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted w-4 h-4" />
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="input-field pl-9 w-full appearance-none text-sm py-2"
            >
              <option value="all">All Types</option>
              {Object.entries(C.SPACE_TYPES).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-32">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : filteredSpaces.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSpaces.map((space, index) => (
            <SpaceCard key={space.id} space={space} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 glass-card rounded-2xl">
          <h3 className="text-xl font-semibold mb-2">No spaces found</h3>
          <p className="text-textMuted">Try adjusting your filters or search query.</p>
          <button 
            onClick={() => { setFilterType('all'); setSearchQuery(''); }}
            className="mt-4 text-primary hover:text-primaryHover text-sm font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
