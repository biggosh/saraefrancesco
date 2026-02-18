import { useState } from 'react';
import { Calendar, MapPin, Clock, Church, PartyPopper, Map } from 'lucide-react';
import MapModal from '../components/MapModal';

export default function SchedulePage() {
  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    address: string;
    coordinates: [number, number];
  } | null>(null);

  const scheduleItems = [
    {
      time: '3:00 PM',
      title: 'Ceremony',
      location: 'Chiesa di San Valentino',
      address: 'Via Roma, 33050 Fiumicello UD, Friuli-Venezia Giulia',
      coordinates: [45.8167, 13.4167] as [number, number],
      icon: Church,
      description: 'Join us for our wedding ceremony in this beautiful historic church.',
    },
    {
      time: '5:00 PM',
      title: 'Reception',
      location: 'Villa Locatelli',
      address: 'Via Gorizia, 34071 Cormons GO, Friuli-Venezia Giulia',
      coordinates: [45.9550, 13.4750] as [number, number],
      icon: PartyPopper,
      description: 'Celebrate with us over a delicious Italian feast and dancing.',
    },
  ];

  return (
    <>
      <div
        className="min-h-screen py-16 px-4 relative"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/2885578/pexels-photo-2885578.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block p-4 bg-emerald-50 rounded-full mb-6">
              <Calendar className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-5xl font-serif text-gray-800 mb-4">Schedule & Locations</h1>
            <p className="text-lg text-gray-600">
              Saturday, June 15, 2026
            </p>
          </div>

          <div className="space-y-6 mb-16">
            {scheduleItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-md border-4 border-emerald-200 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center">
                        <Icon className="w-7 h-7 text-emerald-600" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2 text-emerald-600">
                          <Clock className="w-4 h-4" />
                          <span className="font-semibold">{item.time}</span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-serif text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600 mb-3">{item.description}</p>

                      <div className="flex items-start gap-2 text-gray-700 mb-4">
                        <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-emerald-600" />
                        <div>
                          <p className="font-medium">{item.location}</p>
                          <p className="text-sm text-gray-500">{item.address}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedLocation({
                          name: item.location,
                          address: item.address,
                          coordinates: item.coordinates,
                        })}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm"
                      >
                        <Map className="w-4 h-4" />
                        Show Map
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md border-4 border-emerald-200 mb-8">
            <h2 className="text-2xl font-serif text-gray-800 mb-6 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-emerald-600" />
              Getting There
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">By Car</h3>
                <p className="text-gray-600 leading-relaxed">
                  The venues are located in Friuli-Venezia Giulia. Free parking is available at both locations.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Accommodation</h3>
                <p className="text-gray-600 leading-relaxed">
                  We recommend staying in the nearby area. There are several hotels and B&Bs in Cormons and surrounding towns.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-8 border-4 border-emerald-200">
            <h2 className="text-2xl font-serif text-gray-800 mb-4">Important Information</h2>
            <div className="space-y-3 text-gray-700">
              <p className="flex items-start gap-2">
                <span className="text-emerald-600 font-semibold">•</span>
                <span>Dress code: Formal attire (suits and evening dresses)</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-emerald-600 font-semibold">•</span>
                <span>Please arrive at least 15 minutes before the ceremony begins</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-emerald-600 font-semibold">•</span>
                <span>Transportation will be provided between the church and the reception venue</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <MapModal
        isOpen={selectedLocation !== null}
        onClose={() => setSelectedLocation(null)}
        location={selectedLocation || { name: '', address: '', coordinates: [0, 0] }}
      />
    </>
  );
}
