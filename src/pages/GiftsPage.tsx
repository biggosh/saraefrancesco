import { useState, useEffect } from 'react';
import { Gift, ExternalLink, CheckCircle, Loader } from 'lucide-react';
import { supabase, GiftRegistryItem } from '../lib/supabase';

export default function GiftsPage() {
  const [gifts, setGifts] = useState<GiftRegistryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [claimingId, setClaimingId] = useState<string | null>(null);

  useEffect(() => {
    loadGifts();
  }, []);

  const loadGifts = async () => {
    try {
      const { data, error } = await supabase
        .from('gift_registry')
        .select('*')
        .order('priority', { ascending: false })
        .order('created_at', { ascending: true });

      if (error) throw error;
      setGifts(data || []);
    } catch (error) {
      console.error('Error loading gifts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async (giftId: string, currentlyClaimed: boolean) => {
    setClaimingId(giftId);

    try {
      if (currentlyClaimed) {
        const { error } = await supabase
          .from('gift_registry')
          .update({ is_claimed: false, claimed_by: null })
          .eq('id', giftId);

        if (error) throw error;
      } else {
        const guestName = prompt('Please enter your name to claim this gift:');
        if (!guestName) {
          setClaimingId(null);
          return;
        }

        const { error } = await supabase
          .from('gift_registry')
          .update({ is_claimed: true, claimed_by: guestName })
          .eq('id', giftId);

        if (error) throw error;
      }

      await loadGifts();
    } catch (error) {
      console.error('Error claiming gift:', error);
      alert('Failed to update gift status. Please try again.');
    } finally {
      setClaimingId(null);
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center relative"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/264985/pexels-photo-264985.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
        <Loader className="w-8 h-8 text-emerald-600 animate-spin relative z-10" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-16 px-4 relative"
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/264985/pexels-photo-264985.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-emerald-50 rounded-full mb-6">
            <Gift className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-5xl font-serif text-gray-800 mb-4">Gift Registry</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your presence is the greatest gift, but if you wish to honor us with something special,
            here are a few items that would help us start our journey together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gifts.map((gift) => (
            <div
              key={gift.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md border-4 border-emerald-200 hover:shadow-lg transition-all"
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={gift.photo_url}
                  alt={gift.name}
                  className="w-full h-full object-cover"
                />
                {gift.is_claimed && (
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center">
                    <div className="bg-white rounded-full px-4 py-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-medium text-gray-700">Claimed</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{gift.name}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{gift.description}</p>

                {gift.is_claimed && gift.claimed_by && (
                  <p className="text-sm text-emerald-600 mb-4">
                    Reserved by {gift.claimed_by}
                  </p>
                )}

                <div className="flex gap-2">
                  {gift.website_link && (
                    <a
                      href={gift.website_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View
                    </a>
                  )}

                  <button
                    onClick={() => handleClaim(gift.id, gift.is_claimed)}
                    disabled={claimingId === gift.id}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      gift.is_claimed
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {claimingId === gift.id ? (
                      <Loader className="w-4 h-4 animate-spin mx-auto" />
                    ) : gift.is_claimed ? (
                      'Unclaim'
                    ) : (
                      'Claim Gift'
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {gifts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No gifts in the registry yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
