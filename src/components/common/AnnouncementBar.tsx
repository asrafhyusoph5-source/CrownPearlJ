import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const ANNOUNCEMENTS = [
  {
    icon: Sparkles,
    text: 'Spring Heirloom Event: 10% Off Orders with Code WELCOME10',
    link: '/shop',
    actionText: 'Explore Collection'
  },
  {
    icon: ShieldCheck,
    text: 'Complimentary Insured Courier Delivery on All Orders Over $150',
    link: '/shipping-returns',
    actionText: 'Learn More'
  },
  {
    icon: Sparkles,
    text: '30-Day In-Home Natural Daylight Examination & Free Returns',
    link: '/shipping-returns',
    actionText: 'Details'
  }
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4800);
    return () => clearInterval(timer);
  }, []);

  const active = ANNOUNCEMENTS[currentIndex];
  const Icon = active.icon;

  return (
    <aside
      aria-label="Store announcement"
      className="bg-[#3B4A50] text-[#FAFAF8] text-xs py-2 px-4 border-b border-[#3B4A50]/40 transition-colors relative z-40"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-center gap-3">
        <div className="flex items-center gap-2 overflow-hidden transition-all duration-500 ease-in-out">
          <Icon className="w-3.5 h-3.5 text-[#7FC8C0] shrink-0" />
          <span className="font-heading tracking-wide uppercase text-[11px] md:text-xs truncate">
            {active.text}
          </span>
        </div>
        <Link
          to={active.link}
          className="inline-flex items-center gap-1 text-[#7FC8C0] hover:text-white font-medium text-[11px] uppercase tracking-wider shrink-0 underline decoration-[#7FC8C0]/50 hover:decoration-white transition-colors"
        >
          <span>{active.actionText}</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </aside>
  );
};
