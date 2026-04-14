import { Link, useLocation } from 'react-router-dom';
import { Cpu, BarChart2, MessageSquare } from 'lucide-react';
import classNames from 'classnames';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Explore Models' },
    { path: '/compare', label: 'Compare' },
    { path: '/chat', label: 'AI Chat' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-dark-900/80 border-b border-dark-700 pointer-events-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-500 to-brand-400 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-all duration-300">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-brand-400 transition-colors">
              AI Model Hub
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={classNames(
                  'text-sm font-medium transition-colors hover:text-white',
                  location.pathname === link.path ? 'text-white' : 'text-gray-400'
                )}
              >
                {link.path === '/compare' && <BarChart2 className="w-4 h-4 inline-block mr-1.5 align-text-bottom" />}
                {link.path === '/chat' && <MessageSquare className="w-4 h-4 inline-block mr-1.5 align-text-bottom" />}
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
