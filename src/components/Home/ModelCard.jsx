import { Link } from 'react-router-dom';
import { ExternalLink, Zap, DollarSign, BarChart3 } from 'lucide-react';
import classNames from 'classnames';

export default function ModelCard({ model }) {
  return (
    <div className="group flex flex-col bg-dark-800 rounded-2xl border border-dark-700 overflow-hidden hover:border-brand-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1 cursor-pointer relative p-6 h-full">
      
      {/* Header section */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-brand-400 transition-colors">
            {model.name}
          </h3>
          <p className="text-sm text-gray-400 mt-1">{model.provider}</p>
        </div>
        <span
          className={classNames(
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
            model.isFree 
              ? 'bg-green-500/10 text-green-400 border-green-500/20' 
              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
          )}
        >
          {model.isFree ? 'Free' : 'Paid'}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-6 flex-grow line-clamp-3">
        {model.description}
      </p>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 py-4 border-y border-dark-700 mb-6">
        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-dark-900/50">
          <Zap className="w-4 h-4 text-gray-400 mb-1" />
          <span className="text-xs font-semibold text-white">{model.speed}/100</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">Speed</span>
        </div>
        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-dark-900/50">
          <DollarSign className="w-4 h-4 text-gray-400 mb-1" />
          <span className="text-xs font-semibold text-white">{model.costScore}/100</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">Value</span>
        </div>
        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-dark-900/50">
          <BarChart3 className="w-4 h-4 text-gray-400 mb-1" />
          <span className="text-xs font-semibold text-white">{model.popularity}/100</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">Popularity</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mt-auto">
        <Link
          to={`/models/${model.id}`}
          className="flex-1 text-center py-2.5 bg-dark-700 hover:bg-dark-600 border border-dark-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Details
        </Link>
        <a
          href={model.apiKeyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex justify-center items-center py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium rounded-lg shadow-md shadow-brand-500/20 transition-all duration-200 hover:shadow-brand-500/40"
          onClick={(e) => e.stopPropagation()}
        >
          API Key
          <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
        </a>
      </div>
    </div>
  );
}
