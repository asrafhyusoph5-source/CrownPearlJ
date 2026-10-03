import React from 'react';
import { Link } from 'react-router-dom';
// 1. Import your local photo here:
import customLogoImg from '../../assets/crown-pearl-logo.png';

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
    sm: 'w-8 h-8',
    md: 'w-10 h-10 md:w-11 md:h-11',
    lg: 'w-14 h-14 md:w-16 md:h-16',
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
      {/* 2. Your Local Photo / Logo */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconDimensions}`}>
        <img
          src={customLogoImg}
          alt="Crown Pearl Logo"
          className="w-full h-full object-contain transform transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* 3. The Brand Typography */}
      <div className="flex flex-col text-left">
        <span
          className={`font-script leading-tight ${crownTextSize} ${
            isLightMode ? 'text-[#7FC8C0]' : 'text-[#3B4A50]'
          }`}
        >
          Crown
        </span>
        <span
          className={`font-heading font-bold uppercase leading-none ${pearlTextSize} ${
            isLightMode ? 'text-white' : 'text-[#111111]'
          }`}
        >
          Pearl
        </span>
        <span
          className={`font-heading uppercase font-semibold leading-tight mt-1 opacity-80 ${subtitleSize} ${
            isLightMode ? 'text-[#C9D1D3]' : 'text-[#3B4A50]'
          }`}
        >
          Jewelry Shop · By Delma · Estd. 2003
        </span>
      </div>
    </Link>
  );
};
