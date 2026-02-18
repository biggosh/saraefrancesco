import { Calendar, MapPin, Clock, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t-2 border-emerald-100 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-3">
              <Calendar className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">When</p>
            <p className="font-semibold text-gray-800">June 15, 2026</p>
            <p className="text-xs text-gray-500 mt-1">Saturday</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-3">
              <Clock className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Ceremony</p>
            <p className="font-semibold text-gray-800">3:00 PM</p>
            <p className="text-xs text-gray-500 mt-1">Chiesa di San Michele</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-3">
              <MapPin className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Reception</p>
            <p className="font-semibold text-gray-800">Villa Verde</p>
            <p className="text-xs text-gray-500 mt-1">7:00 PM</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-3">
              <Heart className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Location</p>
            <p className="font-semibold text-gray-800">Greve in Chianti</p>
            <p className="text-xs text-gray-500 mt-1">Tuscany, Italy</p>
          </div>
        </div>

        <div className="border-t border-emerald-100 pt-8 text-center">
          <p className="text-gray-600 mb-3">
            We can't wait to celebrate with you
          </p>
          <div className="flex items-center justify-center gap-2 text-emerald-600">
            <Heart className="w-4 h-4 fill-current" />
            <span className="font-serif">Sara & Francesco</span>
            <Heart className="w-4 h-4 fill-current" />
          </div>
          <p className="text-xs text-gray-500 mt-4">
            © 2026 Sara & Francesco Wedding. All moments cherished.
          </p>
        </div>
      </div>
    </footer>
  );
}
