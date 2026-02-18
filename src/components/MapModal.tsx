import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { X } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: {
    name: string;
    address: string;
    coordinates: [number, number];
  };
}

export default function MapModal({ isOpen, onClose, location }: MapModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border-4 border-emerald-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-emerald-50">
          <div>
            <h2 className="text-2xl font-serif text-gray-800">{location.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{location.address}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-emerald-100 rounded-full transition-colors"
            aria-label="Close map"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="h-[500px] w-full">
          <MapContainer
            center={location.coordinates}
            zoom={15}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={location.coordinates}>
              <Popup>
                <div className="text-center">
                  <p className="font-semibold">{location.name}</p>
                  <p className="text-sm text-gray-600">{location.address}</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${location.coordinates[0]},${location.coordinates[1]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
