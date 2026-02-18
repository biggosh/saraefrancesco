import { useState, FormEvent } from 'react';
import { CheckCircle, UserCheck, Users, Mail, MessageSquare, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function RSVPPage() {
  const [formData, setFormData] = useState({
    guest_name: '',
    email: '',
    attending: true,
    number_of_guests: 1,
    food_intolerances: '',
    message: '',
  });

  const [additionalGuests, setAdditionalGuests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (formData.attending && formData.number_of_guests > 1) {
      const emptyGuestIndex = additionalGuests.findIndex((name, idx) => idx < formData.number_of_guests - 1 && !name.trim());
      if (emptyGuestIndex !== -1) {
        setError(`Please enter the name for Guest ${emptyGuestIndex + 2}`);
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const { data: rsvpData, error: submitError } = await supabase.from('rsvps').insert([
        {
          guest_name: formData.guest_name,
          email: formData.email || null,
          attending: formData.attending,
          number_of_guests: formData.number_of_guests,
          food_intolerances: formData.food_intolerances || null,
          message: formData.message || null,
        },
      ]).select();

      if (submitError) throw submitError;

      if (formData.attending && formData.number_of_guests > 1 && rsvpData && rsvpData[0]) {
        const rsvpId = rsvpData[0].id;
        const guestRecords = additionalGuests
          .slice(0, formData.number_of_guests - 1)
          .map((guestName, index) => ({
            rsvp_id: rsvpId,
            guest_name: guestName.trim(),
            guest_order: index + 2,
          }));

        const { error: guestsError } = await supabase.from('rsvp_guests').insert(guestRecords);

        if (guestsError) throw guestsError;
      }

      setSubmitSuccess(true);
      setFormData({
        guest_name: '',
        email: '',
        attending: true,
        number_of_guests: 1,
        food_intolerances: '',
        message: '',
      });
      setAdditionalGuests([]);
    } catch (err) {
      setError('Failed to submit RSVP. Please try again.');
      console.error('Error submitting RSVP:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4 relative"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg border-4 border-emerald-200 text-center relative z-10">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-serif text-gray-800 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-8">
            Your RSVP has been received. We can't wait to celebrate with you!
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Submit another RSVP
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-16 px-4 relative"
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-emerald-50 rounded-full mb-6">
            <UserCheck className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-5xl font-serif text-gray-800 mb-4">RSVP</h1>
          <p className="text-lg text-gray-600">
            Please let us know if you can join us on our special day
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-md border-4 border-emerald-200">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label htmlFor="guest_name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="guest_name"
                required
                value={formData.guest_name}
                onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Will you attend? <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: true })}
                  className={`flex-1 py-3 px-4 rounded-lg border-3 font-medium transition-all ${
                    formData.attending
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-700'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  Joyfully Accept
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: false })}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                    !formData.attending
                      ? 'bg-gray-100 border-gray-600 text-gray-700'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  Regretfully Decline
                </button>
              </div>
            </div>

            {formData.attending && (
              <>
                <div>
                  <label htmlFor="number_of_guests" className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Guests <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      id="number_of_guests"
                      min="1"
                      required
                      value={formData.number_of_guests}
                      onChange={(e) => {
                        const newCount = parseInt(e.target.value) || 1;
                        setFormData({ ...formData, number_of_guests: newCount });

                        const additionalGuestsNeeded = Math.max(0, newCount - 1);
                        setAdditionalGuests(prev => {
                          const updated = [...prev];
                          while (updated.length < additionalGuestsNeeded) {
                            updated.push('');
                          }
                          return updated.slice(0, additionalGuestsNeeded);
                        });
                      }}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                {formData.number_of_guests > 1 && (
                  <div className="space-y-4 animate-fadeIn">
                    {additionalGuests.slice(0, formData.number_of_guests - 1).map((guestName, index) => (
                      <div key={index}>
                        <label htmlFor={`guest_${index + 2}`} className="block text-sm font-medium text-gray-700 mb-2">
                          Guest {index + 2} Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id={`guest_${index + 2}`}
                          required
                          value={guestName}
                          onChange={(e) => {
                            const updated = [...additionalGuests];
                            updated[index] = e.target.value;
                            setAdditionalGuests(updated);
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                          placeholder={`Full name of guest ${index + 2}`}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <label htmlFor="food_intolerances" className="block text-sm font-medium text-gray-700 mb-2">
                    Dietary Restrictions or Food Allergies
                  </label>
                  <textarea
                    id="food_intolerances"
                    rows={3}
                    value={formData.food_intolerances}
                    onChange={(e) => setFormData({ ...formData, food_intolerances: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Please let us know of any dietary restrictions or allergies..."
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message to the Couple
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Share your well wishes or any special notes..."
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-8 bg-emerald-600 text-white py-4 px-6 rounded-full text-lg font-medium hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
          </button>
        </form>
      </div>
    </div>
  );
}
