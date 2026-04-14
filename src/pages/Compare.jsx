import { useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import modelsData from '../data/models.json';
import classNames from 'classnames';

export default function Compare() {
  const [filterCat, setFilterCat] = useState('All');

  const filteredModels = useMemo(() => {
    if (filterCat === 'All') return modelsData;
    return modelsData.filter(m => m.category === filterCat);
  }, [filterCat]);

  // Chart configuration defaults
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#374151', 
        },
        ticks: { color: '#9ca3af' }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: { color: '#9ca3af' }
      }
    }
  };

  const getChartData = (label, dataKey, bgColors, hoverBgColors) => {
    return {
      labels: filteredModels.map(m => m.name),
      datasets: [
        {
          label: label,
          data: filteredModels.map(m => m[dataKey]),
          backgroundColor: bgColors,
          hoverBackgroundColor: hoverBgColors,
          borderRadius: 6,
        }
      ]
    };
  };

  const categories = ['All', 'Text', 'Speech', 'Image'];

  return (
    <div className="min-h-screen bg-dark-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-4">Compare Models</h1>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Analyze the trade-offs between speed, cost, and popularity across the top AI models in our database.
          </p>

          {/* Filters for graphs */}
          <div className="inline-flex bg-dark-800 rounded-xl p-1.5 border border-dark-700 relative z-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={classNames(
                  'px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                  filterCat === cat
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          
          {/* Speed Chart */}
          <div className="bg-dark-800 p-6 md:p-8 rounded-3xl border border-dark-700 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-0"></div>
             <div className="relative z-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="w-2 h-6 bg-amber-400 mr-3 rounded-full"></span>
                Speed Score Comparison
              </h2>
              <div className="h-[400px]">
                <Bar 
                  data={getChartData('Speed Index', 'speed', '#fbbf24', '#f59e0b')} 
                  options={chartOptions} 
                />
              </div>
             </div>
          </div>

          {/* Value Chart */}
          <div className="bg-dark-800 p-6 md:p-8 rounded-3xl border border-dark-700 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-0"></div>
             <div className="relative z-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="w-2 h-6 bg-emerald-400 mr-3 rounded-full"></span>
                Value / Cost-Effectiveness Score
              </h2>
              <div className="h-[400px]">
                <Bar 
                  data={getChartData('Cost Value Index', 'costScore', '#34d399', '#10b981')} 
                  options={chartOptions} 
                />
              </div>
             </div>
          </div>

          {/* Popularity Chart */}
          <div className="bg-dark-800 p-6 md:p-8 rounded-3xl border border-dark-700 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl -z-0"></div>
             <div className="relative z-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="w-2 h-6 bg-violet-400 mr-3 rounded-full"></span>
                Popularity Index
              </h2>
              <div className="h-[400px]">
                <Bar 
                  data={getChartData('Popularity Index', 'popularity', '#a78bfa', '#8b5cf6')} 
                  options={chartOptions} 
                />
              </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
