import { Heart, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QuoteAccent } from '../components/DecorativeElements';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white" style={{
      backgroundImage: 'url(https://images.pexels.com/photos/8948426/pexels-photo-8948426.jpeg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="relative mb-20 animate-fade-in">
          <div
            className="relative rounded-3xl overflow-hidden mb-8 h-80 bg-cover bg-center border-4 border-emerald-200"
            style={{
              backgroundImage:
                'url(https://images.pexels.com/photos/3862632/pexels-photo-3862632.jpeg?auto=compress&cs=tinysrgb&w=1200)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 flex flex-col items-center justify-center">
              <h1 className="text-6xl font-serif text-white mb-4 drop-shadow-lg">Sara & Francesco</h1>
              <p className="text-2xl text-white drop-shadow-lg">We're getting married!</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-600">
            <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <span className="font-medium">June 15, 2026</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-emerald-600 rounded-full"></div>
            <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <span className="font-medium">Villa Verde, Tuscany</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16 relative">

          <div className="bg-white rounded-2xl p-8 shadow-md border-4 border-emerald-200 hover:shadow-lg transition-all relative">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 mx-auto overflow-hidden border-4 border-emerald-300 shadow-md">
              <img
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Sara"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-serif text-center text-gray-800 mb-4">Sara</h2>
            <p className="text-gray-600 leading-relaxed text-center">
              Born and raised in Florence, Sara is a passionate architect who finds beauty in every detail.
              She loves art, nature walks, and experimenting with new recipes in the kitchen. Her warm smile
              and creative spirit bring joy to everyone around her.
            </p>
            <div className="mt-6 pt-6 border-t-2 border-emerald-100">
              <div className="flex justify-center mb-3">
                <QuoteAccent />
              </div>
              <p className="text-sm text-gray-500 text-center italic">
                "Life is the flower for which love is the honey"
              </p>
              <div className="flex justify-center mt-3">
                <QuoteAccent />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md border-4 border-emerald-200 hover:shadow-lg transition-all relative">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 mx-auto overflow-hidden border-4 border-emerald-300 shadow-md">
              <img
                src="https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Francesco"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-serif text-center text-gray-800 mb-4">Francesco</h2>
            <p className="text-gray-600 leading-relaxed text-center">
              A software engineer from Rome with a love for music and adventure. Francesco plays the guitar,
              enjoys hiking in the mountains, and has an infectious laugh. His logical mind perfectly
              complements his romantic heart.
            </p>
            <div className="mt-6 pt-6 border-t-2 border-emerald-100">
              <div className="flex justify-center mb-3">
                <QuoteAccent />
              </div>
              <p className="text-sm text-gray-500 text-center italic">
                "In all the world, there is no heart for me like yours"
              </p>
              <div className="flex justify-center mt-3">
                <QuoteAccent />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border-4 border-emerald-200 mb-12 relative">
          <h2 className="text-3xl font-serif text-center text-gray-800 mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed max-w-2xl mx-auto">
            <p>
              We met on a rainy evening in October 2019 at a small café in the heart of Florence.
              Sara was sketching building designs, and Francesco was coding on his laptop. A shared
              power outlet brought us together, and the rest is history.
            </p>
            <p>
              After three years of adventures, laughter, and growing together, Francesco proposed
              during a sunset hike in the Dolomites. With tears of joy and the mountains as our
              witness, Sara said yes.
            </p>
            <p>
              Now we invite you to celebrate this special day with us as we begin our forever together.
            </p>
          </div>
        </div>

        <div className="text-center mb-12">
          <Link
            to="/rsvp"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <Heart className="w-5 h-5" />
            Confirm Your Presence
          </Link>
        </div>
      </div>
    </div>
  );
}
