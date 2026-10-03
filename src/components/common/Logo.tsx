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
}) => {
  const logoSize = {
    sm: 'h-9',
    md: 'h-11 md:h-12',
    lg: 'h-14 md:h-16',
  }[size];

  return (
    <Link
      to="/"
      className={`inline-flex items-center select-none transition-opacity hover:opacity-90 ${className}`}
      aria-label="Crown Pearl – Jewelry Shop by Delma, Estd. 2003"
    >
      <img
        src="/CrownPearlJ/crown-pearl-logo.png"
        alt="Crown Pearl"
        className={`${logoSize} w-auto object-contain`}
      />
    </Link>
  );
};
