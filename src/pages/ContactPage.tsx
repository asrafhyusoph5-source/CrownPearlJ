import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  ExternalLink,
  Phone,
  Mail,
  Clock,
  Radio,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Share2
} from 'lucide-react';

const FB_PAGE_URL = 'https://www.facebook.com/delmapearlonline';
const FB_MESSENGER_URL = 'https://m.me/delmapearlonline';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Online Concierge & Messenger Support – Delma Pearl Online';
  }, []);

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#0084FF]">
            Online Pearl Concierge
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#111] font-semibold">
            Connect Directly with Delma
          </h1>
          <p className="text-xs sm:text-sm text-[#3B4A50] font-light leading-relaxed">
            We operate exclusively online to bring you direct ocean-harvested pearl treasures without retail markups. Message us anytime on Facebook Messenger for orders, sizing questions, or live stream inquiries.
          </p>
        </div>

        {/* Primary Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Card 1: Primary Facebook Messenger */}
          <div className="bg-white p-8 rounded-2xl border-2 border-[#0084FF]/30 shadow-md flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-50 text-[#0084FF] rounded-2xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-[#0084FF] bg-blue-50 px-2 py-0.5 rounded">
                  Fastest Response · Live Chat
                </span>
                <h2 className="font-serif text-2xl font-semibold text-[#111] mt-2">
                  Chat on Facebook Messenger
                </h2>
                <p className="text-xs text-[#3B4A50] mt-1 leading-relaxed">
                  Send us photos of items you want, inquire about pearl sizes, confirm live stream bids, or ask for custom necklace lengths. Delma and our team respond quickly.
                </p>
              </div>

              <div className="space-y-2 pt-2 text-xs text-[#111]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant order confirmations & bank/GCash invoices</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Send ring sizes, necklace lengths & bespoke requests</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Available 7 days a week</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <a
                href={FB_MESSENGER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#0084FF] hover:bg-[#0073e6] text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message on Facebook Messenger</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
              <p className="text-center text-[11px] text-gray-400 mt-2 font-mono">
                @delmapearlonline
              </p>
            </div>
          </div>

          {/* Card 2: Official Facebook Page & Live Streams */}
          <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
                <Radio className="w-6 h-6 animate-pulse" />
              </div>

              <div>
                <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-red-600 bg-red-50 px-2 py-0.5 rounded">
                  Live Selling Broadcasts
                </span>
                <h2 className="font-serif text-2xl font-semibold text-[#111] mt-2">
                  Official Facebook Page & Live
                </h2>
                <p className="text-xs text-[#3B4A50] mt-1 leading-relaxed">
                  Join our weekly Facebook Live selling broadcasts for macro-lens luster demonstrations, pearl testing, exclusive stream-only discounts, and giveaways.
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs text-[#3B4A50]">
                <div className="p-3 bg-[#FAFAF8] rounded-xl border border-gray-100">
                  <div className="font-heading font-semibold text-xs text-[#111]">
                    Weekly Live Selling Schedule
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    Wednesdays & Saturdays at 7:00 PM Manila Time (PHT)
                  </div>
                </div>

                <div className="p-3 bg-[#FAFAF8] rounded-xl border border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="font-heading font-semibold text-xs text-[#111]">
                      Catalog & Stream Drops
                    </div>
                    <div className="text-[11px] text-gray-500">
                      View tonight's featured live items
                    </div>
                  </div>
                  <Link
                    to="/live"
                    className="text-xs font-heading font-semibold uppercase text-red-600 hover:underline"
                  >
                    View Drops →
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2">
              <a
                href={FB_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#3B4A50] hover:bg-[#111] text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Visit Facebook Page</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <Link
                to="/live"
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Go to Live Stream Hub</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Contact Channels Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#3B4A50]">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#0084FF] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#111] block font-heading uppercase tracking-wider text-[11px]">
                  Phone & SMS Inquiries
                </strong>
                <a href="tel:+18002769675" className="hover:text-[#0084FF] font-mono mt-0.5 block">
                  +1 (800) 276-9675
                </a>
                <span className="text-[11px] text-gray-400">Toll-free customer care</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#0084FF] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#111] block font-heading uppercase tracking-wider text-[11px]">
                  Direct Email Support
                </strong>
                <a href="mailto:concierge@crownpearl.com" className="hover:text-[#0084FF] font-mono mt-0.5 block">
                  concierge@crownpearl.com
                </a>
                <span className="text-[11px] text-gray-400">Order verification & appraisals</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#0084FF] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#111] block font-heading uppercase tracking-wider text-[11px]">
                  Messenger Operating Hours
                </strong>
                <span className="block mt-0.5">Monday – Sunday: 9:00 AM – 10:00 PM</span>
                <span className="text-[11px] text-gray-400">Quick replies during broadcast hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Guarantee Footer */}
        <div className="text-center space-y-2 pt-4">
          <div className="inline-flex items-center gap-2 text-xs text-[#3B4A50]">
            <ShieldCheck className="w-4 h-4 text-[#7FC8C0]" />
            <span>Delma Pearl Online guarantees 100% genuine saltwater & freshwater pearls with authenticity certificate.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
