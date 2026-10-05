import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ContactPage: React.FC = () => {
  const { setIsConsultationModalOpen } = useShop();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Bespoke Pearl Commission',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Contact & Visit Atelier – Crown Pearl, Estd. 2003';
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSent(true);
    }
  };

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#7FC8C0]">
            The Philippines Atelier
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#111] font-semibold">
            Visit Us or Inquire Directly
          </h1>
          <p className="text-sm text-[#3B4A50] font-light">
            We welcome private clients by appointment to our Palawan atelier for customized strand knotting, appraisals, and bridal consultations.
          </p>
        </div>

        {/* 2-Column Contact Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Atelier Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-6">
              <h2 className="font-serif text-2xl font-semibold text-[#111]">
                Crown Pearl Atelier & Showroom
              </h2>

              <div className="space-y-4 text-xs text-[#3B4A50]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#7FC8C0] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#111] block">Palawan Atelier</strong>
                    5300 San Manuel, Puerto Princesa City <br />
                    Palawan, Philippines, PH
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#7FC8C0] shrink-0" />
                  <div>
                    <strong className="text-[#111] block">Telephone Concierge</strong>
                    <a href="tel:+18002769675" className="hover:text-[#7FC8C0]">
                      +1 (800) 276-9675 (Toll-Free)
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#7FC8C0] shrink-0" />
                  <div>
                    <strong className="text-[#111] block">Direct Electronic Mail</strong>
                    <a href="mailto:concierge@crownpearl.com" className="hover:text-[#7FC8C0]">
                      concierge@crownpearl.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#7FC8C0] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#111] block">Atelier Hours (EST)</strong>
                    Monday – Friday: 7:00 AM – 7:00 PM<br />
                    Saturday: 8:00 AM – 8:00 PM<br />
                    Sunday: By Private Advance Appointment
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="w-full py-3 bg-[#3B4A50] hover:bg-[#111] text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-lg shadow-sm transition-colors text-center"
                >
                  Book Private 1-on-1 Consultation
                </button>

                <a
                  href="https://wa.me/18002769675?text=Hello%20Delma%20Atelier%2C%20I%20would%20like%20to%20inquire%20about%20a%20pearl%20selection."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 border border-[#C9D1D3] hover:border-[#7FC8C0] text-[#3B4A50] hover:text-[#111] font-heading uppercase text-xs tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#7FC8C0]" />
                  <span>Instant WhatsApp Concierge</span>
                </a>
              </div>
            </div>

            {/* Metro & Directions Guidance */}
            <div className="bg-[#FAFAF8] p-6 rounded-2xl border border-[#C9D1D3]/70 text-xs text-[#3B4A50] space-y-2">
              <h3 className="font-heading uppercase text-xs font-semibold text-[#111]">
                Directions & Proximity
              </h3>
              <p>
                Located San Manuel, Puerto Princesa City. Private curbside attendant available upon advance booking.
              </p>
            </div>
          </div>

          {/* Right Column: Direct Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-[#E5E7EB] shadow-xs">
            {!isSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1 pb-2">
                  <span className="text-xs font-heading font-semibold uppercase tracking-wider text-[#7FC8C0]">
                    Direct Workshop Inquiry
                  </span>
                  <h2 className="font-serif text-2xl font-semibold text-[#111]">
                    Message Master Jeweler Delma
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-heading uppercase tracking-wider text-[#3B4A50] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Katherine Sterling"
                      className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#C9D1D3] rounded text-xs focus:outline-none focus:border-[#7FC8C0]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-heading uppercase tracking-wider text-[#3B4A50] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. katherine@example.com"
                      className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#C9D1D3] rounded text-xs focus:outline-none focus:border-[#7FC8C0]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-heading uppercase tracking-wider text-[#3B4A50] mb-1">
                    Subject of Inquiry
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#C9D1D3] rounded text-xs focus:outline-none focus:border-[#7FC8C0]"
                  >
                    <option value="Bespoke Pearl Commission">Bespoke Pearl Commission</option>
                    <option value="Bridal Suite & Wedding Party Jewelry">Bridal Suite & Wedding Party Jewelry</option>
                    <option value="Custom Necklace Length or Clasp Modification">Custom Necklace Length or Clasp Modification</option>
                    <option value="Pearl Restringing, Cleaning & Appraisal">Pearl Restringing, Cleaning & Appraisal</option>
                    <option value="General Connoisseur Inquiry">General Connoisseur Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-heading uppercase tracking-wider text-[#3B4A50] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please specify necklace length preferences, gown details, or the pearl type you are seeking..."
                    className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#C9D1D3] rounded text-xs focus:outline-none focus:border-[#7FC8C0]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#3B4A50] hover:bg-[#111] text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#7FC8C0]" />
                  <span>Send Direct Message to Atelier</span>
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-[#7FC8C0] mx-auto" />
                <h3 className="font-serif text-2xl font-semibold text-[#111]">
                  Message Received by Delma
                </h3>
                <p className="text-xs sm:text-sm text-[#3B4A50] max-w-sm mx-auto">
                  Thank you, {formData.name}. Our atelier gemologist will review your notes and respond within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSent(false)}
                  className="px-6 py-2 bg-[#3B4A50] text-white font-heading uppercase text-xs tracking-wider rounded"
                >
                  Send Another Inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
