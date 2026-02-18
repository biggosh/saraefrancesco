import { useState, useEffect } from 'react';
import { Heart, Send, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Wish {
  id: string;
  sender_name: string;
  message: string;
  created_at: string;
}

export default function WishesPage() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWishes(data || []);
    } catch (error) {
      console.error('Error fetching wishes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!senderName.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const { error } = await supabase
        .from('wishes')
        .insert([
          {
            sender_name: senderName.trim(),
            message: message.trim(),
          },
        ]);

      if (error) throw error;

      setSenderName('');
      setMessage('');
      setSubmitSuccess(true);

      setTimeout(() => setSubmitSuccess(false), 3000);

      await fetchWishes();
    } catch (error) {
      console.error('Error submitting wish:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div
      className="min-h-screen py-16 px-4 relative"
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-white/85 backdrop-blur-sm" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-emerald-50 rounded-full mb-6">
            <Heart className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-5xl font-serif text-gray-800 mb-4">Wedding Wishes</h1>
          <p className="text-lg text-gray-600">
            Share your love and best wishes for the happy couple
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border-4 border-emerald-200 mb-12">
          <h2 className="text-2xl font-serif text-gray-800 mb-6">Leave Your Message</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                required
                maxLength={100}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                maxLength={500}
                rows={5}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                placeholder="Write your wishes for the couple..."
              />
              <p className="text-sm text-gray-500 mt-1">
                {message.length}/500 characters
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !senderName.trim() || !message.trim()}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Your Wishes
                </>
              )}
            </button>

            {submitSuccess && (
              <div className="p-4 bg-emerald-50 border-2 border-emerald-200 rounded-lg text-emerald-700 text-center">
                Your wishes have been sent successfully!
              </div>
            )}
          </form>
        </div>

        <div>
          <h2 className="text-3xl font-serif text-gray-800 mb-8 text-center">
            Messages from Our Guests
          </h2>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            </div>
          ) : wishes.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 shadow-md border-4 border-emerald-200 text-center">
              <p className="text-gray-600">
                No wishes yet. Be the first to share your message!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {wishes.map((wish) => (
                <div
                  key={wish.id}
                  className="bg-white rounded-2xl p-6 shadow-md border-4 border-emerald-200 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{wish.sender_name}</h3>
                      <p className="text-sm text-gray-500">{formatDate(wish.created_at)}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{wish.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
