import { Link, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Navigation() {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/rsvp', label: 'RSVP' },
    { path: '/gifts', label: 'Gift Registry' },
    { path: '/schedule', label: 'Schedule' },
    { path: '/wishes', label: 'Wishes' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <Heart className="w-6 h-6 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
            <span className="text-xl font-serif text-gray-800">Sara & Francesco</span>
          </Link>

          <div className="flex space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === link.path
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
