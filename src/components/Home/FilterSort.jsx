import classNames from 'classnames';

export default function FilterSort({ filters, setFilters }) {
  const categories = ['All', 'Text', 'Speech', 'Image'];
  
  const handleCategoryChange = (cat) => {
    setFilters({ ...filters, category: cat });
  };

  const handlePricingChange = (type) => {
    setFilters({ ...filters, pricing: type }); // 'all', 'free', 'paid'
  };

  const handleSortChange = (e) => {
    setFilters({ ...filters, sortBy: e.target.value });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-6 bg-dark-800 rounded-2xl border border-dark-700 shadow-sm mb-8">
      
      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={classNames(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              filters.category === cat
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                : 'bg-dark-900 text-gray-400 hover:text-white hover:bg-dark-700 border border-dark-700'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
        {/* Pricing Filter */}
        <div className="flex bg-dark-900 rounded-lg p-1 border border-dark-700">
          {[
            { label: 'All', value: 'all' },
            { label: 'Free', value: 'free' },
            { label: 'Paid', value: 'paid' },
          ].map((mode) => (
            <button
              key={mode.value}
              onClick={() => handlePricingChange(mode.value)}
              className={classNames(
                'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                filters.pricing === mode.value
                  ? 'bg-dark-700 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="relative">
          <select
            value={filters.sortBy}
            onChange={handleSortChange}
            className="appearance-none bg-dark-900 border border-dark-700 text-white text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full px-4 py-2.5 pr-8 focus:outline-none cursor-pointer"
          >
            <option value="popularity">Sort by Popularity</option>
            <option value="speed">Sort by Speed</option>
            <option value="cost">Sort by Cost</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

    </div>
  );
}
