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
      <div
        className="relative w-full max-w-xl bg-[#FAFAF8] rounded-2xl shadow-2xl border border-[#C9D1D3] overflow-hidden max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Book Private Consultation"
      >
        {/* Header */}
        <div className="bg-[#3B4A50] text-white p-5 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#7FC8C0] font-heading uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personal Jeweler Appointment</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl mt-0.5">
              Private Consultation with Delma
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsConsultationModalOpen(false)}
            className="text-[#C9D1D3] hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {!isBooked ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type Switcher */}
              <div>
                <label className="block text-xs uppercase font-heading tracking-wider text-[#3B4A50] mb-2 font-semibold">
                  Consultation Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSessionType('virtual')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs font-heading uppercase tracking-wider transition-all ${
                      sessionType === 'virtual'
                        ? 'border-[#7FC8C0] bg-white text-[#111] shadow-sm ring-1 ring-[#7FC8C0]'
                        : 'border-[#C9D1D3] bg-[#FAFAF8] text-[#3B4A50] hover:bg-white'
                    }`}
                  >
                    <Video className="w-4 h-4 text-[#7FC8C0]" />
                    <span>Virtual Video (Global)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSessionType('atelier')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs font-heading uppercase tracking-wider transition-all ${
                      sessionType === 'atelier'
                        ? 'border-[#7FC8C0] bg-white text-[#111] shadow-sm ring-1 ring-[#7FC8C0]'
                        : 'border-[#C9D1D3] bg-[#FAFAF8] text-[#3B4A50] hover:bg-white'
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-[#7FC8C0]" />
                    <span>Palawan Store (San Manuel)</span>
                  </button>
                </div>
              </div>

              {/* Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase font-heading tracking-wider text-[#3B4A50] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Eleanor Vance"
                    className="w-full px-3 py-2 bg-white border border-[#C9D1D3] rounded text-xs focus:outline-none focus:border-[#7FC8C0]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-heading tracking-wider text-[#3B4A50] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="eleanor@example.com"
                    className="w-full px-3 py-2 bg-white border border-[#C9D1D3] rounded text-xs focus:outline-none focus:border-[#7FC8C0]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] uppercase font-heading tracking-wider text-[#3B4A50] mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 019-2834"
                    className="w-full px-3 py-2 bg-white border border-[#C9D1D3] rounded text-xs focus:outline-none focus:border-[#7FC8C0]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-heading tracking-wider text-[#3B4A50] mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#7FC8C0]" />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#C9D1D3] rounded text-xs focus:outline-none focus:border-[#7FC8C0]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-heading tracking-wider text-[#3B4A50] mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#7FC8C0]" />
                    <span>Time (EST)</span>
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#C9D1D3] rounded text-xs focus:outline-none focus:border-[#7FC8C0]"
                  >
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="18:00">06:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-heading tracking-wider text-[#3B4A50] mb-1">
                  Primary Interest
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#C9D1D3] rounded text-xs focus:outline-none focus:border-[#7FC8C0]"
                >
                  <option value="Bridal High Jewelry Suite">Bridal High Jewelry Suite</option>
                  <option value="Custom Hand-Knotted Akoya Strand">Custom Hand-Knotted Akoya Strand</option>
                  <option value="Rare Tahitian or Golden South Sea Pearls">Rare Tahitian or Golden South Sea Pearls</option>
                  <option value="Anniversary or Milestone Heirloom Gift">Anniversary or Milestone Heirloom Gift</option>
                  <option value="Pearl Appraisal, Restringing & Care">Pearl Appraisal, Restringing & Care</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-heading tracking-wider text-[#3B4A50] mb-1">
                  Specific Requests or Gown / Neckline Notes
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Matching an off-the-shoulder silk mikado bridal gown, or custom 19-inch graduation strand..."
                  className="w-full px-3 py-2 bg-white border border-[#C9D1D3] rounded text-xs focus:outline-none focus:border-[#7FC8C0]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#3B4A50] hover:bg-[#111] text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-lg shadow-md transition-colors"
                >
                  Confirm Appointment Request
                </button>
                <p className="text-[10px] text-center text-[#3B4A50]/70 mt-2">
                  Complimentary 45-minute consultation. No purchase obligation.
                </p>
              </div>
            </form>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-2xl text-[#111] font-semibold">
                  Consultation Reserved
                </h4>
                <p className="text-xs sm:text-sm text-[#3B4A50] max-w-sm mx-auto">
                  Thank you, {formData.name || 'Valued Client'}. Delma has reserved your {sessionType === 'virtual' ? 'Virtual Video Session' : 'Store Visit'} for {formData.date} at {formData.time} (PHT).
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#C9D1D3] max-w-sm mx-auto text-xs text-left text-[#3B4A50] space-y-1">
                <div><strong>Format:</strong> {sessionType === 'virtual' ? 'Private Video Consultation (Link sent via WhatsApp / Messenger)' : 'National Highway, Brgy. San Manuel, Puerto Princesa, Palawan'}</div>
                <div><strong>Focus:</strong> {formData.interest}</div>
                <div><strong>Confirmation sent to:</strong> {formData.email || 'your email'}</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsBooked(false);
                  setIsConsultationModalOpen(false);
                }}
                className="px-6 py-2.5 bg-[#7FC8C0] text-[#111] hover:bg-[#68b5ad] font-heading uppercase text-xs tracking-wider rounded font-semibold transition-colors"
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
