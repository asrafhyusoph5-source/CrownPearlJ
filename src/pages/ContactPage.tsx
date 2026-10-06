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
  MapPin,
  Instagram,
  Navigation
} from 'lucide-react';

const STORE_ADDRESS = 'National Highway, Brgy. San Manuel, Puerto Princesa, Philippines, 5300';
const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/EQPD2tW2Su5iQhFK8?g_st=ac';
const WHATSAPP_PHONE = '+63 999 991 0270';
const WHATSAPP_LINK = 'https://wa.me/639999910270';
const EMAIL_ADDRESS = 'delmapearl17@gmail.com';
const INSTAGRAM_URL = 'https://www.instagram.com/crown.pearljewelry?stkn=MWNzZ3pyOWs1ZjF2Mw==';
const FB_PAGE_URL = 'https://www.facebook.com/delmapearlonline';
const FB_MESSENGER_URL = 'https://m.me/delmapearlonline';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Contact & Store Location – Crown Pearl & Jewelry Shop, Palawan';
  }, []);

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7FC8C0]/15 text-[#3B4A50] text-xs font-heading font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#7FC8C0]" />
            <span>Palawan, Philippines · Estd. 2003</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#111] font-semibold">
            Visit Us or Connect Directly
          </h1>
          <p className="text-xs sm:text-sm text-[#3B4A50] font-light leading-relaxed">
            Welcome to Crown Pearl & Jewelry Shop. Whether you wish to visit our store in Puerto Princesa, chat with Delma on Messenger, or message via WhatsApp, our family is here to assist you.
          </p>
        </div>

        {/* Physical Store Location Card */}
        <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-[#7FC8C0]" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-heading font-semibold uppercase tracking-widest text-[#7FC8C0] block">
                  Official Store Location
                </span>
                <h2 className="font-serif text-2xl font-semibold text-[#111]">
                  Crown Pearl and Jewelry Shop
                </h2>
                <p className="text-sm text-[#3B4A50] font-medium leading-relaxed">
                  {STORE_ADDRESS}
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#3B4A50] hover:bg-[#111] text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-xl shadow-sm transition-all"
              >
                <Navigation className="w-4 h-4 text-[#7FC8C0]" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#3B4A50] pt-2">
            <div className="p-4 bg-[#FAFAF8] rounded-xl border border-gray-100 space-y-1">
              <span className="font-heading font-semibold text-[#111] uppercase tracking-wider block">
                Boutique Hours
              </span>
              <p>Monday – Sunday</p>
              <p className="font-medium text-[#111]">9:00 AM – 9:00 PM (PHT)</p>
            </div>

            <div className="p-4 bg-[#FAFAF8] rounded-xl border border-gray-100 space-y-1">
              <span className="font-heading font-semibold text-[#111] uppercase tracking-wider block">
                Store Pick-up & Sizing
              </span>
              <p>In-person natural daylight check</p>
              <p className="font-medium text-[#111]">Available daily</p>
            </div>
          </div>
        </div>

        {/* Primary Contact Cards Grid: Messenger, WhatsApp, Instagram, Live */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Card 1: Facebook Messenger */}
          <div className="bg-white p-8 rounded-3xl border-2 border-[#0084FF]/30 shadow-md flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-50 text-[#0084FF] rounded-2xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-[#0084FF] bg-blue-50 px-2 py-0.5 rounded">
                  Fastest Response · Online Concierge
                </span>
                <h3 className="font-serif text-2xl font-semibold text-[#111] mt-2">
                  Facebook Messenger
                </h3>
                <p className="text-xs text-[#3B4A50] mt-1 leading-relaxed">
                  Send us screenshots of pieces you like, ask about pearl size, lock in live stream bids, or request custom lengths.
                </p>
              </div>

              <div className="space-y-2 pt-2 text-xs text-[#111]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant order assistance & invoice links</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified Palawan pearl authenticity certificates</span>
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
                <span>Chat on Messenger (@delmapearlonline)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>

          {/* Card 2: WhatsApp & Direct Call */}
          <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Direct Line & WhatsApp
                </span>
                <h3 className="font-serif text-2xl font-semibold text-[#111] mt-2">
                  WhatsApp Concierge
                </h3>
                <p className="text-xs text-[#3B4A50] mt-1 leading-relaxed">
                  Message or call us on WhatsApp for high-resolution macro videos, ring size adjustments, or customer care inquiries.
                </p>
              </div>

              <div className="p-3 bg-[#FAFAF8] rounded-xl border border-gray-100">
                <span className="text-[10px] font-heading uppercase text-gray-400 block">Contact & WhatsApp Number</span>
                <span className="font-mono text-base font-bold text-[#111]">{WHATSAPP_PHONE}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href={`tel:${WHATSAPP_PHONE.replace(/\s+/g, '')}`}
                className="w-full py-2.5 bg-[#FAFAF8] hover:bg-gray-100 text-[#3B4A50] font-heading uppercase text-xs tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 border border-gray-200"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Direct Phone Call</span>
              </a>
            </div>
          </div>
        </div>

        {/* Social Channels: Instagram & Facebook */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#3B4A50]">
          {/* Instagram */}
          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#E1306C] flex items-center justify-center">
                <Instagram className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-semibold text-[#111]">
                Instagram Boutique
              </h4>
              <p className="text-xs text-gray-500">
                Browse our daily photo feed, behind-the-scenes knotting, and client jewelry styling.
              </p>
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 bg-[#FAFAF8] hover:bg-[#E1306C] hover:text-white border border-gray-200 rounded-lg text-xs font-heading font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
            >
              <span>@crown.pearljewelry</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Official Email */}
          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-gray-50 text-[#3B4A50] flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-semibold text-[#111]">
                Official Email
              </h4>
              <p className="text-xs text-gray-500">
                For order status, GIA appraisal copies, or formal corporate gift inquiries.
              </p>
            </div>
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="py-2.5 px-4 bg-[#FAFAF8] hover:bg-[#111] hover:text-white border border-gray-200 rounded-lg text-xs font-heading font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 font-mono"
            >
              <span>{EMAIL_ADDRESS}</span>
            </a>
          </div>
        </div>

        {/* Trust Guarantee Footer */}
        <div className="text-center space-y-2 pt-4">
          <div className="inline-flex items-center gap-2 text-xs text-[#3B4A50]">
            <ShieldCheck className="w-4 h-4 text-[#7FC8C0]" />
            <span>Crown Pearl & Jewelry Shop guarantees 100% genuine saltwater Palawan & South Sea pearls.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
