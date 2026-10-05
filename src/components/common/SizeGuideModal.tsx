import React, { useState } from 'react';
import { X, Ruler, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideModalOpen, setIsSizeGuideModalOpen } = useShop();
  const [activeTab, setActiveTab] = useState<'pearls' | 'necklaces' | 'rings'>('pearls');

  if (!isSizeGuideModalOpen) return null;

  const pearlSizes = [
    { mm: '6.0 - 6.5 mm', title: 'Delicate Petite', desc: 'Subtle and youthful. Ideal for layered pendants, debutante strands, and petite earlobes.', relativeScale: 24 },
    { mm: '7.0 - 7.5 mm', title: 'Classic Standard', desc: 'The historic benchmark for Akoya pearls. Versatile day-to-evening elegance.', relativeScale: 30 },
    { mm: '8.0 - 8.5 mm', title: 'Sophisticated Luxury', desc: 'Noticeable presence and rich nacre. Perfect for milestone anniversaries.', relativeScale: 36 },
    { mm: '9.0 - 10.0 mm', title: 'Grand Statement', desc: 'Top tier of Japanese Akoya and entry size for Tahitian pearls. Impressive luster.', relativeScale: 42 },
    { mm: '11.0 - 13.0 mm', title: 'Imperial South Sea', desc: 'Large, rare Australian and Indonesian gems with monumental visual weight.', relativeScale: 50 },
    { mm: '14.0 mm+', title: 'Collector’s Sovereign', desc: 'Less than 1% of annual harvest. Museum and high-jewelry private acquisitions.', relativeScale: 58 },
  ];

  const necklaceLengths = [
    { length: '16 Inch · Choker', placement: 'Rests delicately at the base of the throat', pairing: 'High necklines, off-the-shoulder, crewneck cashmere sweaters' },
    { length: '18 Inch · Princess', placement: 'Rests gently on the collarbone (most popular choice)', pairing: 'Plunging V-necks, button-down shirts, sweetheart bridal gowns' },
    { length: '20 Inch · Matinee', placement: 'Rests just above the bustline', pairing: 'Cocktail dresses, high boatneck gowns, tailored blazers' },
    { length: '24-28 Inch · Opera / Lariat', placement: 'Rests over the sternum, can often be looped or adjusted', pairing: 'Evening silk slips, high-neck turtlenecks, festive soirees' },
  ];

  const ringSizes = [
    { us: '5', insideDiam: '15.7 mm', circumference: '49.3 mm' },
    { us: '6', insideDiam: '16.5 mm', circumference: '51.9 mm' },
    { us: '7', insideDiam: '17.3 mm', circumference: '54.4 mm' },
    { us: '8', insideDiam: '18.1 mm', circumference: '57.0 mm' },
    { us: '9', insideDiam: '18.9 mm', circumference: '59.5 mm' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-[#FAFAF8] rounded-2xl shadow-2xl border border-[#C9D1D3] overflow-hidden max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Crown Pearl Sizing Guide"
      >
        {/* Header */}
        <div className="bg-[#3B4A50] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#7FC8C0]" />
            <div>
              <h3 className="font-serif text-xl">Crown Pearl Sizing & Proportions Guide</h3>
              <p className="text-xs text-[#C9D1D3]">Curated by Delma for immaculate bespoke fit</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsSizeGuideModalOpen(false)}
            className="text-[#C9D1D3] hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#E5E7EB] bg-white px-6 pt-3 gap-6 text-xs uppercase font-heading tracking-widest text-[#3B4A50] shrink-0">
          <button
            onClick={() => setActiveTab('pearls')}
            className={`pb-3 font-semibold transition-all relative ${
              activeTab === 'pearls'
                ? 'text-[#111] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#7FC8C0]'
                : 'hover:text-[#111]'
            }`}
          >
            Pearl Millimeter Scale
          </button>
          <button
            onClick={() => setActiveTab('necklaces')}
            className={`pb-3 font-semibold transition-all relative ${
              activeTab === 'necklaces'
                ? 'text-[#111] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#7FC8C0]'
                : 'hover:text-[#111]'
            }`}
          >
            Necklace Strand Lengths
          </button>
          <button
            onClick={() => setActiveTab('rings')}
            className={`pb-3 font-semibold transition-all relative ${
              activeTab === 'rings'
                ? 'text-[#111] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#7FC8C0]'
                : 'hover:text-[#111]'
            }`}
          >
            Ring Size Table
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {activeTab === 'pearls' && (
            <div className="space-y-4">
              <p className="text-xs text-[#3B4A50] leading-relaxed">
                Pearl diameter is measured in tenths of a millimeter along the gem's axis. Even a 1mm increase represents an exponential jump in oyster cultivation years and luster depth.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {pearlSizes.map((p, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-[#E5E7EB] flex items-center gap-4 shadow-sm">
                    {/* Visual scaled sphere */}
                    <div
                      className="rounded-full bg-gradient-to-tr from-[#3B4A50] via-[#C9D1D3] to-white border border-[#C9D1D3] shadow-inner shrink-0"
                      style={{ width: `${p.relativeScale}px`, height: `${p.relativeScale}px` }}
                      title={`${p.mm}`}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-xs uppercase tracking-wider text-[#111]">
                          {p.mm}
                        </span>
                        <span className="text-[10px] text-[#7FC8C0] font-heading font-semibold uppercase">
                          {p.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#3B4A50]/80 mt-1 leading-normal">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'necklaces' && (
            <div className="space-y-4">
              <p className="text-xs text-[#3B4A50] leading-relaxed">
                Our necklaces are hand-knotted on supple silk cord that molds naturally to your chest and neckline.
              </p>
              <div className="space-y-3 pt-1">
                {necklaceLengths.map((n, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-heading font-semibold text-xs uppercase tracking-wider text-[#111]">
                        {n.length}
                      </h4>
                      <p className="text-xs text-[#3B4A50] mt-0.5">{n.placement}</p>
                    </div>
                    <div className="text-[11px] text-[#7FC8C0] sm:text-right font-medium">
                      Best for: {n.pairing}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rings' && (
            <div className="space-y-4">
              <p className="text-xs text-[#3B4A50] leading-relaxed">
                Crown Pearl rings are crafted with comfort-fit curved bands. If you are between two sizes, we recommend selecting the larger size.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#FAFAF8] text-[#3B4A50] uppercase font-heading text-[11px] border-b border-[#C9D1D3]">
                    <tr>
                      <th className="py-2.5 px-4">US Size</th>
                      <th className="py-2.5 px-4">Inside Diameter</th>
                      <th className="py-2.5 px-4">Inner Circumference</th>
                      <th className="py-2.5 px-4">EU Equivalent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB] bg-white">
                    {ringSizes.map((r) => (
                      <tr key={r.us} className="hover:bg-[#FAFAF8]">
                        <td className="py-2.5 px-4 font-semibold text-[#111]">Size {r.us}</td>
                        <td className="py-2.5 px-4 tabular-nums text-[#3B4A50]">{r.insideDiam}</td>
                        <td className="py-2.5 px-4 tabular-nums text-[#3B4A50]">{r.circumference}</td>
                        <td className="py-2.5 px-4 tabular-nums text-[#3B4A50]">EU {parseInt(r.us) * 2 + 38}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#FAFAF8] border-t border-[#E5E7EB] p-4 flex items-center justify-between text-xs text-[#3B4A50] shrink-0">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#7FC8C0]" />
            <span>Need a custom collar measurement? We knot bespoke strands upon request.</span>
          </span>
          <button
            type="button"
            onClick={() => setIsSizeGuideModalOpen(false)}
            className="px-4 py-1.5 bg-[#3B4A50] text-white hover:bg-[#111] font-heading uppercase text-[11px] tracking-wider rounded transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
