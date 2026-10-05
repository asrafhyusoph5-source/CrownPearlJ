import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Logo } from '../components/common/Logo';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Page Not Found – Crown Pearl Atelier';
  }, []);

  return (
    <div className="bg-[#FAFAF8] min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-lg w-full bg-white p-10 rounded-2xl border border-[#E5E7EB] text-center space-y-6 shadow-xs">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FAFAF8] border border-[#C9D1D3] text-[#3B4A50] mx-auto">
          <Sparkles className="w-7 h-7 text-[#7FC8C0]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#7FC8C0]">
            404 · Atelier Notice
          </span>
          <h1 className="font-serif text-3xl font-semibold text-[#111]">
            Creation or Page Not Located
          </h1>
          <p className="text-xs sm:text-sm text-[#3B4A50] leading-relaxed">
            The page or jewelry item you are seeking may have been reserved into a private collection or moved to a different archive.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/shop"
            className="w-full sm:w-auto px-6 py-3 bg-[#3B4A50] hover:bg-[#111] text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <span>Explore Current Catalog</span>
            <ArrowRight className="w-4 h-4 text-[#7FC8C0]" />
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 bg-[#FAFAF8] hover:bg-gray-100 text-[#3B4A50] font-heading uppercase text-xs tracking-wider rounded-lg transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};
