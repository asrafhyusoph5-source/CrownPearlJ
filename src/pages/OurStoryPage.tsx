import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Compass, ShieldCheck, Gem, Quote, Radio, MessageCircle, ArrowRight } from 'lucide-react';
import { ASSET_IMAGES } from '../assets/images';

export const OurStoryPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'A Mother’s Dream, A Family’s Legacy – Crown Pearl Palawan, Estd. 2003';
  }, []);

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-[0.3em] text-[#7FC8C0]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Palawan, Philippines · Estd. 2003</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#111111] font-semibold leading-tight">
            A Mother’s Dream.<br />
            A Family’s Journey.<br />
            <span className="italic font-normal">A Legacy of Pearls.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#3B4A50] font-light leading-relaxed pt-2">
            Since 2003, Crown Pearl has been more than a jewelry business. It has been a story of family, perseverance, trust, and a mother's dream to create a better future for her children.
          </p>

          <div className="pt-4 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#7FC8C0]" />
            <span className="font-serif italic text-sm text-[#3B4A50]">
              Every pearl has its own journey. So does every family.
            </span>
            <span className="h-px w-12 bg-[#7FC8C0]" />
          </div>
        </div>

        {/* Chapter 1: The Beginning & Onion Vendor */}
        <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 sm:p-14 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-heading font-semibold uppercase tracking-wider text-[#7FC8C0]">
              Chapter I · Where It All Began
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111] font-semibold">
              From Humble Steps to a Growing Dream
            </h2>
            <div className="space-y-4 text-sm text-[#3B4A50] leading-relaxed font-light">
              <p>
                The story of Crown Pearl began in 2003 in Palawan, with Delma, a mother of nine who understood that building a better life for her family would not happen overnight. Life was challenging, but her love for her children gave her the courage to begin.
              </p>
              <p>
                Crown Pearl was not originally a pearl jewelry shop. Before pearls became the heart of the business, Delma started with a humble livelihood as an onion vendor.
              </p>
              <p>
                There was nothing glamorous about those early days. It was simply honest work, determination, and a mother doing everything she could for her family. With the encouragement of someone who inspired her and the strong support of her husband, Delma took her first steps into business.
              </p>
              <p className="font-normal text-[#111]">
                Delma and her husband continued working together, learning through experience and gradually building their business. Their perseverance eventually opened the door to the world of pearls and jewelry. What began as a simple family livelihood slowly became a growing dream.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-md aspect-[4/5] bg-[#F3F4F6]">
              <img
                src={ASSET_IMAGES.workshop}
                alt="Delma crafting pearls"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#3B4A50] text-white p-5 rounded-2xl shadow-lg border border-[#7FC8C0]/30 hidden sm:block max-w-[240px]">
              <Heart className="w-5 h-5 text-[#7FC8C0] mb-2" />
              <div className="font-serif text-sm font-semibold">A Mother of Nine</div>
              <div className="text-[11px] text-[#C9D1D3] mt-1 font-light">
                Built on unconditional love, honest labor, and family perseverance.
              </div>
            </div>
          </div>
        </div>

        {/* Chapter 2: The Palawan Milestones */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#7FC8C0]">
              Chapter II · The Milestones
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111] font-semibold">
              From a Small Business to a Pearl Journey
            </h2>
            <p className="text-xs sm:text-sm text-[#3B4A50]">
              Day by day, customer by customer, earning trust across the islands of Palawan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] space-y-4 relative shadow-xs">
              <span className="text-xs font-heading font-bold text-[#7FC8C0] uppercase tracking-wider block">
                Milestone 01 · 2003
              </span>
              <h3 className="font-serif text-xl font-semibold text-[#111]">
                Delma Pearl and Pasalubong Center
              </h3>
              <p className="text-xs text-[#3B4A50] leading-relaxed">
                As Delma and her husband continued their journey, they established Delma Pearl and Pasalubong Center in Palawan. The business became an important part of their family's daily life, building lasting relationships with locals and travelers alike.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] space-y-4 relative shadow-xs">
              <span className="text-xs font-heading font-bold text-[#7FC8C0] uppercase tracking-wider block">
                Milestone 02 · Puerto Princesa
              </span>
              <h3 className="font-serif text-xl font-semibold text-[#111]">
                Mercado de San Miguel
              </h3>
              <p className="text-xs text-[#3B4A50] leading-relaxed">
                Their journey eventually brought them to Mercado de San Miguel near the airport in Puerto Princesa City, Palawan, sharing the natural beauty of Palawan's authentic pearls with visitors arriving from across the world.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#7FC8C0]/50 bg-gradient-to-b from-white to-[#FAFAF8] space-y-4 relative shadow-sm ring-1 ring-[#7FC8C0]">
              <span className="text-xs font-heading font-bold text-emerald-700 uppercase tracking-wider block">
                Milestone 03 · San Manuel
              </span>
              <h3 className="font-serif text-xl font-semibold text-[#111]">
                Crown Pearl and Jewelry Shop
              </h3>
              <p className="text-xs text-[#3B4A50] leading-relaxed">
                Through years of hard work, the family expanded to establish Crown Pearl and Jewelry Shop in San Manuel, Puerto Princesa City, Palawan. A small beginning had become something much bigger.
              </p>
            </div>
          </div>
        </div>

        {/* Chapter 3: Family Legacy */}
        <div className="bg-[#1A2327] text-white rounded-3xl p-8 sm:p-14 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-heading font-semibold uppercase tracking-wider text-[#7FC8C0]">
              Chapter III · The Heart of the Business
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white">
              A Business Built Around Family
            </h2>
            <div className="space-y-4 text-sm text-[#C9D1D3] leading-relaxed font-light">
              <p>
                For Delma, business was never only about selling. It was about creating something that could help her family move forward.
              </p>
              <p>
                Her nine children grew up witnessing the dedication, sacrifices, and persistence that went into building the family business. Over time, her sons and daughters also found their own paths and established businesses of their own.
              </p>
              <p className="text-white font-normal">
                In this way, what began as one mother's dream became part of a larger family legacy. The journey of Crown Pearl is therefore not only the story of a jewelry shop. It is the story of a family that grew together.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white/5 border border-white/10 p-8 rounded-2xl space-y-4 text-center">
            <Sparkles className="w-8 h-8 text-[#7FC8C0] mx-auto" />
            <h3 className="font-serif text-2xl font-semibold text-white">
              Over 2 Decades of Connoisseur Trust
            </h3>
            <p className="text-xs text-[#C9D1D3] font-light leading-relaxed">
              From Palawan to patrons worldwide, every pearl is inspected with the same integrity Delma began with in 2003.
            </p>
            <div className="pt-2">
              <span className="font-heading uppercase text-xs tracking-widest text-[#7FC8C0] font-bold">
                Estd. 2003 · Puerto Princesa, Palawan
              </span>
            </div>
          </div>
        </div>

        {/* Chapter 4: South Sea Pearls & More Than a Pearl */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E5E7EB] space-y-4 shadow-xs">
            <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center">
              <Gem className="w-6 h-6" />
            </div>
            <span className="text-xs font-heading font-semibold uppercase tracking-wider text-[#7FC8C0]">
              Chapter IV · Natural Treasures
            </span>
            <h3 className="font-serif text-2xl font-semibold text-[#111]">
              Why the South Sea Pearl Matters
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-[#3B4A50] leading-relaxed font-light">
              <p>
                Among the many varieties of pearls, the South Sea Pearl holds a special place in Crown Pearl. For Delma, pearls are not simply chosen because they are beautiful. They represent natural beauty, value, character, and something that can be treasured for generations.
              </p>
              <p>
                Crown Pearl carefully considers the qualities that make each pearl special, including its body, luster, quality, color, shape, and overall appearance.
              </p>
              <p className="italic font-serif text-[#111] pt-1">
                "Every pearl has its own character. Some are perfectly shaped. Some have a distinctive natural form. Some capture the light in a way that immediately makes them unforgettable."
              </p>
            </div>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E5E7EB] space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <span className="text-xs font-heading font-semibold uppercase tracking-wider text-[#7FC8C0]">
                Chapter V · Cherished Memories
              </span>
              <h3 className="font-serif text-2xl font-semibold text-[#111]">
                More Than a Pearl
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-[#3B4A50] leading-relaxed font-light">
                <p>
                  A piece of jewelry can be beautiful. But its meaning can become even more beautiful with time.
                </p>
                <p>
                  A pearl may be given to celebrate a wedding, a birthday, an anniversary, a milestone, or simply to express love and appreciation. Years later, the jewelry may still be there—but the memory attached to it can become even more valuable.
                </p>
                <p className="font-semibold text-[#111]">
                  Something to remember. Something to cherish. Something worth passing on.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-[#3B4A50]">
              <ShieldCheck className="w-4 h-4 text-[#7FC8C0] shrink-0" />
              <span>Built through trust: earned one customer, one pearl at a time.</span>
            </div>
          </div>
        </div>

        

        {/* Delma's Personal Message Block */}
        <div className="bg-gradient-to-br from-[#FAFAF8] via-white to-amber-50/40 rounded-3xl border-2 border-[#7FC8C0]/40 p-8 sm:p-14 shadow-md text-center space-y-6 relative overflow-hidden">
          <Quote className="w-12 h-12 text-[#7FC8C0]/30 mx-auto" />
          
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#7FC8C0] block">
            A Message From Delma
          </span>

          <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#111] font-medium leading-relaxed max-w-2xl mx-auto italic">
            “I want every person who receives a Crown Pearl piece to remember and cherish it, to trust the true value of the pearl, and to trust the beauty of the pearl.”
          </blockquote>

          <div className="space-y-1 pt-2">
            <div className="font-heading uppercase text-sm font-bold tracking-widest text-[#111]">
              — Delma
            </div>
            <div className="text-xs text-[#3B4A50]">
              Founder, Crown Pearl & Jewelry Shop
            </div>
            <div className="text-[11px] text-[#7FC8C0] font-heading uppercase tracking-wider font-semibold pt-1">
              Crown Pearl · Since 2003 · Palawan, Philippines
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
