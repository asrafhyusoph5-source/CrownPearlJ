import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Award, ShieldCheck, HeartHandshake, Compass, ArrowRight } from 'lucide-react';
import { ASSET_IMAGES } from '../assets/images';

export const OurStoryPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Our Story – Delma, Estd. 2003 | Crown Pearl Atelier';
  }, []);

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-[0.3em] text-[#7FC8C0]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Atelier Provenance</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#111111] font-semibold leading-tight">
            Twenty-Three Years of Slow Luxury and Living Nacre
          </h1>
          <p className="text-base sm:text-lg text-[#3B4A50] font-light leading-relaxed">
            Founded by Delma in autumn 2003, Crown Pearl was born out of reverence for the singular gem on Earth that emerges complete and glowing from the sea, requiring no faceting or diamond wheels.
          </p>
        </div>

        {/* Founder Story Split Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-lg bg-white aspect-[4/3]">
              <img
                src={ASSET_IMAGES.workshop}
                alt="Master jeweler Delma knotting pearls in Palawan workshop"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden sm:block bg-white p-4 rounded-xl border border-[#C9D1D3] shadow-md max-w-xs">
              <span className="font-heading uppercase text-[10px] tracking-wider text-[#7FC8C0] font-semibold block">
                The Workshop Method
              </span>
              <p className="font-serif text-xs text-[#111] mt-0.5">
                Double silk knots tied at 2.4 pounds of uniform tension per centimeter.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-heading font-semibold uppercase tracking-wider text-[#7FC8C0]">
                The Early Years · 2003
              </span>
              <h2 className="font-serif text-3xl text-[#111] font-semibold">
                Rejecting Mass Production for Generational Integrity
              </h2>
            </div>
            <p className="text-sm text-[#3B4A50] leading-relaxed">
              When Delma opened the atelier doors on Puerto Princesa, Palawan in 2003, commercial jewelry was rapidly transitioning to synthetic filaments and glued composite pearls. Delma chose the harder path: establishing direct relationships with multi-generational pearl farmers in Ago Bay, Japan, and the coral lagoons of French Polynesia.
            </p>
            <p className="text-sm text-[#3B4A50] leading-relaxed">
              Every single strand in our atelier is knotted by hand on double Japanese silk cord. If a necklace is ever accidentally severed, only a single pearl can break loose. That unwavering standard remains our signature two decades later.
            </p>
          </div>
        </div>

        {/* 4 Pillars of Delma's Philosophy */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 sm:p-12 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#111] font-semibold">
              The Four Principles of Crown Pearl
            </h3>
            <p className="text-xs sm:text-sm text-[#3B4A50]">
              How Delma has preserved connoisseur trust across generations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#FAFAF8] border border-[#C9D1D3]/50 flex items-center justify-center text-[#7FC8C0]">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-heading uppercase text-xs tracking-wider font-semibold text-[#111]">
                Zero Artificial Enhancements
              </h4>
              <p className="text-xs text-[#3B4A50] leading-relaxed">
                We never irradiate or dye pearls. The deep peacock hues of our Tahitians and warm gold of our South Seas are 100% natural oyster pigmentation.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#FAFAF8] border border-[#C9D1D3]/50 flex items-center justify-center text-[#7FC8C0]">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-heading uppercase text-xs tracking-wider font-semibold text-[#111]">
                Maritime Stewardship
              </h4>
              <p className="text-xs text-[#3B4A50] leading-relaxed">
                Pearls are oceanic bio-indicators. Healthy oysters can only thrive in pristine waters. We support sustainable cooperative mariculture farms exclusively.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#FAFAF8] border border-[#C9D1D3]/50 flex items-center justify-center text-[#7FC8C0]">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-heading uppercase text-xs tracking-wider font-semibold text-[#111]">
                Bespoke Atelier Touch
              </h4>
              <p className="text-xs text-[#3B4A50] leading-relaxed">
                Whether customizing a collar for a wedding gown or engraving an anniversary clasp, you communicate directly with Delma's master gemologists.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#FAFAF8] border border-[#C9D1D3]/50 flex items-center justify-center text-[#7FC8C0]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-heading uppercase text-xs tracking-wider font-semibold text-[#111]">
                Lifetime Guarantee
              </h4>
              <p className="text-xs text-[#3B4A50] leading-relaxed">
                A Crown Pearl piece is designed to be passed from mother to daughter. We provide lifetime clasp inspection and restringing care.
              </p>
            </div>
          </div>
        </div>

        {/* Atelier CTA Banner */}
        <div className="bg-[#1A2327] rounded-2xl p-8 sm:p-14 text-white text-center space-y-6">
          <span className="text-xs font-heading uppercase tracking-[0.3em] text-[#7FC8C0] font-semibold">
            Experience the Craft
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl max-w-xl mx-auto font-semibold">
            Visit the Delma Atelier on Palawan
          </h2>
          <p className="text-xs sm:text-sm text-[#C9D1D3] max-w-lg mx-auto font-light leading-relaxed">
            Hold rare pearls under natural studio light, inspect nacre thickness with our gemological loupes, and design your bespoke creation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-[#7FC8C0] hover:bg-[#68b5ad] text-[#111] font-heading uppercase text-xs tracking-widest font-semibold rounded-lg transition-colors"
            >
              Book an Atelier Visit
            </Link>
            <Link
              to="/shop"
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-lg transition-colors"
            >
              Shop Current Creations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
