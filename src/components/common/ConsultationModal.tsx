import React, { useState } from 'react';
import { X, Calendar, Clock, Video, MapPin, CheckCircle, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ConsultationModal: React.FC = () => {
  const { isConsultationModalOpen, setIsConsultationModalOpen } = useShop();
  const [sessionType, setSessionType] = useState<'virtual' | 'atelier'>('virtual');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '2026-10-15',
    time: '14:00',
    interest: 'Bridal High Jewelry Suite',
    notes: ''
  });
  const [isBooked, setIsBooked] = useState(false);

  if (!isConsultationModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#FAFAF8] rounded-2xl shadow-2xl border border-[#C9D1D3] overflow-hidden max-h-[92vh] flex flex-col">
        <div className="bg-[#3B4A50] text-white p-5 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#7FC8C0] font-heading uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personal Jeweler Appointment</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl mt-0.5">Private Consultation with Delma</h3>
          </div>
          <button
            type="button"
            onClick={() => setIsConsultationModalOpen(false)}
            className="text-[#C9D1D3] hover:text-white p-1 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          {!isBooked ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSessionType('virtual')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs font-heading uppercase ${
                    sessionType === 'virtual' ? 'border-[#7FC8C0] bg-white text-[#111] ring-1 ring-[#7FC8C0]' : 'border-[#C9D1D3]'
                  }`}
                >
                  <Video className="w-4 h-4 text-[#7FC8C0]" />
                  <span>Virtual Video</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSessionType('atelier')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs font-heading uppercase ${
                    sessionType === 'atelier' ? 'border-[#7FC8C0] bg-white text-[#111] ring-1 ring-[#7FC8C0]' : 'border-[#C9D1D3]'
                  }`}
                >
                  <MapPin className="w-4 h-4 text-[#7FC8C0]" />
                  <span>NYC Atelier</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="p-2 border rounded text-xs bg-white"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="p-2 border rounded text-xs bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#3B4A50] hover:bg-[#111] text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-lg shadow-md"
              >
                Confirm Appointment Request
              </button>
            </form>
          ) : (
            <div className="py-8 text-center space-y-4">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-serif text-2xl text-[#111]">Consultation Reserved</h4>
              <p className="text-xs text-[#3B4A50]">We have reserved your appointment. Confirmation sent to {formData.email}.</p>
              <button
                type="button"
                onClick={() => { setIsBooked(false); setIsConsultationModalOpen(false); }}
                className="px-6 py-2 bg-[#7FC8C0] text-[#111] font-heading uppercase text-xs rounded font-semibold"
              >
                Return to Boutique
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
