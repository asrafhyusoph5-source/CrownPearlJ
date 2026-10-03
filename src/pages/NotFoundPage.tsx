import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Page Not Found – Crown Pearl Atelier';
  }, []);

  return (
    <div className="bg-[#FAFAF8] min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-lg w-full bg-white p-10 rounded-2xl border border-[#E5E7EB] text-center space-y-6 shadow-xs">
        <Sparkles className="w-10 h-10 text-[#7FC8C0] mx-auto" />
        <h1 className="font-serif text-3xl font-semibold text-[#111]">
          Creation Not Located (404)
        </h1>
        <p className="text-xs sm:text-sm text-[#3B4A50]">
          The page or jewelry item you are seeking may have been reserved into a private collection.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#3B4A50] text-white text-xs font-heading uppercase tracking-widest rounded-lg"
        >
          <span>Explore Collection</span>
          <ArrowRight className="w-4 h-4 text-[#7FC8C0]" />
        </Link>
      </div>
    </div>
  );
};
