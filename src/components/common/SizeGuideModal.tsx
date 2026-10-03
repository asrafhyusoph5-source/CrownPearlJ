import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideModalOpen, setIsSizeGuideModalOpen } = useShop();
  const [activeTab, setActiveTab] = useState<'pearls' | 'necklaces' | 'rings'>('pearls');

  if (!isSizeGuideModalOpen) return null;

  const pearlSizes = [
    { mm: '6.0 - 6.5 mm', title: 'Delicate Petite', desc: 'Subtle and youthful. Ideal for debutante strands.' },
    { mm: '7.0 - 7.5 mm', title: 'Classic Standard', desc: 'The historic benchmark for Akoya pearls.' },
    { mm: '8.0 - 8.5 mm', title: 'Sophisticated Luxury', desc: 'Noticeable presence and rich nacre.' },
    { mm: '9.0 - 10.0 mm', title: 'Grand Statement', desc: 'Top tier Japanese Akoya and South Sea entry.' },
    { mm: '11.0 - 13.0 mm', title: 'Imperial South Sea', desc: 'Rare Australian gems with monumental presence.' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#FAFAF8] rounded-2xl shadow-2xl border border-[#C9D1D3] overflow-hidden max-h-[90vh] flex flex-col">
        <div className="bg-[#3B4A50] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#7FC8C0]" />
            <h3 className="font-serif text-xl">Crown Pearl Sizing Guide</h3>
          </div>
          <button onClick={() => setIsSizeGuideModalOpen(false)} className="text-[#C9D1D3] hover:text-white p-1 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b border-[#E5E7EB] bg-white px-6 pt-3 gap-6 text-xs uppercase font-heading tracking-widest text-[#3B4A50]">
          <button
            onClick={() => setActiveTab('pearls')}
            className={`pb-3 font-semibold ${activeTab === 'pearls' ? 'text-[#111] border-b-2 border-[#7FC8C0]' : ''}`}
          >
            Pearl Millimeter Scale
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pearlSizes.map((p, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-sm">
                <span className="font-heading font-bold text-xs uppercase text-[#111]">{p.mm}</span> - {p.title}
                <p className="text-[11px] text-[#3B4A50]/80 mt-1">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
