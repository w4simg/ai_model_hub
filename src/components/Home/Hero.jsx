import { Search } from 'lucide-react';

export default function Hero({ searchQuery, setSearchQuery }) {
  return (
    <div className="relative overflow-hidden border-b border-dark-700 bg-dark-800">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-transparent"></div>
      
      <div className="max-w-4xl mx-auto px-4 py-20 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
          Find the Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">AI Models</span>
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Explore, compare, and discover top-tier AI models across Text, Image, and Speech to supercharge your next application.
        </p>

        <div className="max-w-xl mx-auto relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500 group-focus-within:text-brand-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 bg-dark-900 border border-dark-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent shadow-lg transition-all"
            placeholder="Search models by name or provider..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
