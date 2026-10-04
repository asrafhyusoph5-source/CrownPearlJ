import React from 'react';
import { Award, Compass, HeartHandshake, Sparkles, RefreshCw } from 'lucide-react';
import { ASSET_IMAGES } from '../../assets/images';

export const WhyCrownPearl: React.FC = () => {
  const pillars = [
    {
      icon: Award,
      title: 'Hand-Selected Under Studio Daylight',
      desc: 'Delma personally inspects every harvest lot under north-facing studio light, accepting only pearls with deep mirror reflections and flawless spherical symmetry.'
    },
    {
      icon: HeartHandshake,
      title: 'Generational Silk-Knotting Discipline',
      desc: 'Each pearl is individually double-knotted on 100% Japanese silk cord, protecting precious nacre from friction and ensuring supple drape against the collarbone.'
    },
    {
      icon: Compass,
      title: 'Direct Maritime Ethical Sourcing',
      desc: 'We cultivate direct partnerships with sustainable family pearl farmers across Ago Bay Japan, Broome Australia, and French Polynesian atolls.'
    },
    {
      icon: RefreshCw,
      title: 'Lifetime Complimentary Atelier Care',
      desc: 'Every Crown Pearl piece includes lifetime clasp checks, ultrasonic setting inspections, and complimentary restringing every 24 months.'
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Side */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-xl bg-[#FAFAF8] aspect-[4/3]">
              <img
                src={ASSET_IMAGES.workshop}
                alt="Delma Atelier master craftsmanship"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.25em] text-[#7FC8C0]">
                  Atelier Archive · Philippines
                </span>
                <p className="font-serif text-lg font-semibold mt-1">
                  "A genuine pearl is not merely polished; it is nurtured over years of ocean tide and careful human hands."
                </p>
                <span className="text-xs text-[#C9D1D3] font-heading uppercase tracking-wider block mt-1">
                  — Delma, Founder & Master Jeweler
                </span>
              </div>
            </div>
            {/* Heritage seal badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-2 bg-[#3B4A50] text-white p-4 rounded-xl shadow-lg border border-[#7FC8C0]/40">
              <Sparkles className="w-5 h-5 text-[#7FC8C0]" />
              <div className="text-left">
                <div className="text-xs font-heading font-bold uppercase tracking-wider">Estd. 2003</div>
                <div className="text-[10px] text-[#C9D1D3]">20+ Years Excellence</div>
              </div>
            </div>
          </div>

          {/* Text & Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#7FC8C0] mb-2">
                The Delma Standard
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-semibold leading-tight">
                Why Connoisseurs Trust Crown Pearl
              </h2>
              <p className="text-sm text-[#3B4A50] mt-3 leading-relaxed font-light">
                Since our founding in 2003, we have avoided commercial mass-production. We treat cultured pearls with the dignity of sacred oceanic gems, marrying time-honored artisanal stringing with contemporary structural goldsmithing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {pillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-[#FAFAF8] border border-[#C9D1D3]/50 flex items-center justify-center text-[#3B4A50]">
                      <Icon className="w-5 h-5 text-[#7FC8C0]" />
                    </div>
                    <h3 className="font-heading font-semibold text-xs uppercase tracking-wider text-[#111111]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#3B4A50]/80 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
