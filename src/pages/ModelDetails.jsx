import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Zap, DollarSign, Database, Award } from 'lucide-react';
import modelsData from '../data/models.json';

export default function ModelDetails() {
  const { id } = useParams();
  const model = modelsData.find((m) => m.id === id);

  if (!model) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Model not found. <Link to="/" className="text-brand-400 ml-2">Go back</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all models
        </Link>
        
        {/* Header */}
        <div className="bg-dark-800 border border-dark-700 rounded-3xl p-8 md:p-10 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-dark-700 text-gray-300 text-xs font-medium uppercase tracking-wider">
                  {model.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${model.isFree ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                  {model.isFree ? 'Free' : 'Paid'}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{model.name}</h1>
              <p className="text-xl text-brand-400">{model.provider}</p>
            </div>
            
            <div className="shrink-0 flex gap-3">
              <a
                href={model.apiKeyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-medium rounded-xl shadow-lg transition-all"
              >
                Get API Key
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>

        {/* Content Tabs / Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-white mb-4">About the Model</h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {model.fullDescription}
              </p>
            </div>
            
            <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Pricing Breakdown</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-dark-900 border border-dark-700 rounded-xl p-5">
                  <p className="text-sm text-gray-400 mb-1">Input pricing</p>
                  <p className="text-2xl font-bold text-white">
                    {model.pricing.input === 0 ? 'Free' : `$${model.pricing.input}`}
                    {model.pricing.input !== 0 && <span className="text-sm font-normal text-gray-400"> / 1M tokens</span>}
                  </p>
                </div>
                <div className="bg-dark-900 border border-dark-700 rounded-xl p-5">
                  <p className="text-sm text-gray-400 mb-1">Output pricing</p>
                  <p className="text-2xl font-bold text-white">
                    {model.pricing.output === 0 ? 'Free' : `$${model.pricing.output}`}
                    {model.pricing.output !== 0 && <span className="text-sm font-normal text-gray-400"> / 1M tokens</span>}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-4">
            <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-5 border-b border-dark-700 pb-3">Capabilities</h3>
              
              <ul className="space-y-5">
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-lg bg-dark-900 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                    <Database className="w-4 h-4 text-brand-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 text-xs uppercase tracking-wider mb-0.5">Context Window</p>
                    <p className="text-white font-medium">
                      {model.contextLength > 0 ? `${(model.contextLength / 1000)}k tokens` : 'N/A'}
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-lg bg-dark-900 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                    <Zap className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 text-xs uppercase tracking-wider mb-0.5">Speed Score</p>
                    <p className="text-white font-medium">{model.speed} / 100</p>
                    <div className="w-full bg-dark-900 rounded-full h-1.5 mt-2">
                       <div className="bg-amber-400 h-1.5 rounded-full" style={{width: `${model.speed}%`}}></div>
                    </div>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-lg bg-dark-900 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                    <Award className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 text-xs uppercase tracking-wider mb-0.5">Popularity index</p>
                    <p className="text-white font-medium">{model.popularity} / 100</p>
                    <div className="w-full bg-dark-900 rounded-full h-1.5 mt-2">
                       <div className="bg-violet-400 h-1.5 rounded-full" style={{width: `${model.popularity}%`}}></div>
                    </div>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-lg bg-dark-900 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 text-xs uppercase tracking-wider mb-0.5">Value Score</p>
                    <p className="text-white font-medium">{model.costScore} / 100</p>
                    <div className="w-full bg-dark-900 rounded-full h-1.5 mt-2">
                       <div className="bg-emerald-400 h-1.5 rounded-full" style={{width: `${model.costScore}%`}}></div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
