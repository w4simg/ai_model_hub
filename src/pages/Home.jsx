import { useState, useMemo } from 'react';
import Hero from '../components/Home/Hero';
import FilterSort from '../components/Home/FilterSort';
import ModelCard from '../components/Home/ModelCard';
import modelsData from '../data/models.json';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [filters, setFilters] = useState({
    category: 'All',
    pricing: 'all', // 'all', 'free', 'paid'
    sortBy: 'popularity', // 'popularity', 'speed', 'cost'
  });

  const filteredModels = useMemo(() => {
    let result = [...modelsData];

    // Search Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) => m.name.toLowerCase().includes(q) || m.provider.toLowerCase().includes(q)
      );
    }

    // Category Filter
    if (filters.category !== 'All') {
      result = result.filter((m) => m.category === filters.category);
    }

    // Pricing Filter
    if (filters.pricing === 'free') {
      result = result.filter((m) => m.isFree === true);
    } else if (filters.pricing === 'paid') {
      result = result.filter((m) => m.isFree === false);
    }

    // Sorting
    result.sort((a, b) => {
      if (filters.sortBy === 'popularity') {
        return b.popularity - a.popularity;
      } else if (filters.sortBy === 'speed') {
        return b.speed - a.speed;
      } else if (filters.sortBy === 'cost') {
        return b.costScore - a.costScore; 
        // Note: costScore is higher for better value (cheaper)
      }
      return 0;
    });

    return result;
  }, [searchQuery, filters]);

  const isFiltering = searchQuery !== '' || filters.category !== 'All' || filters.pricing !== 'all';
  const limitReached = !isFiltering && filteredModels.length > 20 && !showAll;
  const displayedModels = isFiltering || showAll ? filteredModels : filteredModels.slice(0, 20);

  return (
    <div className="min-h-screen bg-dark-900 pb-20">
      <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <FilterSort filters={filters} setFilters={setFilters} />
        
        {displayedModels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedModels.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
            {limitReached && (
              <div 
                onClick={() => setShowAll(true)}
                className="group flex flex-col justify-center items-center bg-brand-500/10 rounded-2xl border-2 border-dashed border-brand-500/30 hover:border-brand-500 hover:bg-brand-500/20 transition-all duration-300 cursor-pointer p-6 h-full min-h-[300px]"
              >
                <div className="w-16 h-16 rounded-full bg-brand-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl text-brand-400 font-bold">+</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 text-center">View All {filteredModels.length} Models</h3>
                <p className="text-brand-400 text-sm text-center">Click to expand the full catalog</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 bg-dark-800 rounded-2xl border border-dark-700">
            <h3 className="text-xl font-medium text-white mb-2">No models found</h3>
            <p className="text-gray-400">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
