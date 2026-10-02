import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  isLightMode?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  isLightMode = false,
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9 md:w-10 md:h-10',
    lg: 'w-12 h-12 md:w-14 md:h-14',
  }[size];

  const crownTextSize = {
    sm: 'text-sm -mb-1',
    md: 'text-lg md:text-xl -mb-1.5',
    lg: 'text-2xl md:text-3xl -mb-2',
  }[size];

  const pearlTextSize = {
    sm: 'text-xs tracking-[0.24em]',
    md: 'text-sm md:text-base tracking-[0.28em]',
    lg: 'text-lg md:text-xl tracking-[0.32em]',
  }[size];

  const subtitleSize = {
    sm: 'text-[7px] tracking-[0.22em]',
    md: 'text-[8px] md:text-[9px] tracking-[0.26em]',
    lg: 'text-[9px] md:text-[10px] tracking-[0.3em]',
  }[size];

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 md:gap-3 group select-none transition-opacity hover:opacity-90 ${className}`}
      aria-label="Crown Pearl – Jewelry Shop by Delma, Estd. 2003"
    >
      <div className={`relative flex items-center justify-center shrink-0 ${iconDimensions}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full transform transition-transform duration-700 group-hover:scale-105" aria-hidden="true">
          <defs>
            <radialGradient id="pearlSphereGrad" cx="32%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#F5FAF9" />
              <stop offset="65%" stopColor="#D8E8E6" />
              <stop offset="85%" stopColor="#7FC8C0" />
              <stop offset="100%" stopColor="#3B4A50" />
            </radialGradient>
            <radialGradient id="pearlHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7FC8C0" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#C9D1D3" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#7FC8C0" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="url(#pearlHalo)" className="animate-pearl-glow" />
          <circle cx="50" cy="50" r="32" fill="url(#pearlSphereGrad)" stroke="#C9D1D3" strokeWidth="0.8" />
          <ellipse cx="40" cy="38" rx="8" ry="5" fill="#FFFFFF" opacity="0.85" transform="rotate(-20 40 38)" />
          <path d="M 20,58 A 34,34 0 0,1 80,42" fill="none" stroke={isLightMode ? '#FAFAF8' : '#111111'} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="80" cy="42" r="1.8" fill="#7FC8C0" />
        </svg>
      </div>

      <div className="flex flex-col text-left">
        <span className={`font-script leading-tight ${crownTextSize} ${isLightMode ? 'text-[#7FC8C0]' : 'text-[#3B4A50]'}`}>
          Crown
        </span>
        <span className={`font-heading font-bold uppercase leading-none ${pearlTextSize} ${isLightMode ? 'text-white' : 'text-[#111111]'}`}>
          Pearl
        </span>
        <span className={`font-heading uppercase font-semibold leading-tight mt-1 opacity-80 ${subtitleSize} ${isLightMode ? 'text-[#C9D1D3]' : 'text-[#3B4A50]'}`}>
          Jewelry Shop · By Delma · Estd. 2003
        </span>
      </div>
    </Link>
  );
};
