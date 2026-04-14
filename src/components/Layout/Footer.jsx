import { Cpu } from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TelegramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

export default function Footer() {
  return (
    <footer className="border-t border-dark-700 bg-dark-900 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-dark-800 pb-8 mb-8">
          {/* Logo & Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-500 to-brand-400 flex items-center justify-center shadow-lg shadow-brand-500/20">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                AI Model Hub
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs mt-2">
              Discover, compare, and harness the power of over 300+ AI models.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-5">
            <a href="https://github.com/w4simg" target="_blank" rel="noopener noreferrer" className="p-2 bg-dark-800 rounded-full text-gray-400 hover:text-white hover:bg-dark-700 transition-colors" aria-label="GitHub">
              <GithubIcon className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/heavens_child_" target="_blank" rel="noopener noreferrer" className="p-2 bg-dark-800 rounded-full text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors" aria-label="Instagram">
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href="https://t.me/w4simg" target="_blank" rel="noopener noreferrer" className="p-2 bg-dark-800 rounded-full text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors" aria-label="Telegram">
              <TelegramIcon className="w-5 h-5" />
            </a>
          </div>


        </div>
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} AI Model Hub. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
