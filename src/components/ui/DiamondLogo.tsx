'use client';

import React, { useId } from 'react';

export interface DiamondEmblemProps {
  className?: string;
  size?: number;
  color?: string;
  variant?: 'light' | 'dark';
  animated?: boolean;
  showSparkle?: boolean;
}

export const DiamondEmblem: React.FC<DiamondEmblemProps> = ({
  className = 'w-8 h-8',
  size,
  color,
  variant = 'dark',
  animated = true,
  showSparkle = true,
}) => {
  const uid = useId().replace(/:/g, '');
  const isLight = variant === 'light';

  // Metallic gold palettes
  const goldPrimary = color || (isLight ? '#E5C578' : '#B8893B');
  const goldLight = isLight ? '#FFFDF7' : '#FCE8AB';
  const goldMid = isLight ? '#F3E7CC' : '#D4A143';
  const goldDark = isLight ? '#C59E4C' : '#7E5516';

  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          {/* Main Gold Facet Gradient */}
          <linearGradient id={`goldTable_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={goldLight} />
            <stop offset="50%" stopColor={goldMid} />
            <stop offset="100%" stopColor={goldPrimary} />
          </linearGradient>

          {/* Highlight Facet Gradient */}
          <linearGradient id={`goldHi_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={goldLight} />
            <stop offset="100%" stopColor={goldMid} />
          </linearGradient>

          {/* Shadow Facet Gradient */}
          <linearGradient id={`goldShade_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={goldPrimary} />
            <stop offset="100%" stopColor={goldDark} />
          </linearGradient>

          {/* Center Pavilion Deep Gradient */}
          <linearGradient id={`goldPav_${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={goldMid} />
            <stop offset="60%" stopColor={goldPrimary} />
            <stop offset="100%" stopColor={goldDark} />
          </linearGradient>
        </defs>

        {/* Ambient subtle backglow */}
        <ellipse
          cx="24"
          cy="24"
          rx="18"
          ry="14"
          fill={isLight ? '#FCE8AB' : '#B8893B'}
          className="opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"
        />

        {/* --- Faceted Diamond Body --- */}
        <g stroke={goldPrimary} strokeWidth="1.2" strokeLinejoin="round">
          {/* Pavilion Left Wing (Shadow) */}
          <polygon
            points="6,19 20,19 24,40"
            fill={`url(#goldShade_${uid})`}
            fillOpacity="0.85"
          />

          {/* Pavilion Right Wing (Highlight) */}
          <polygon
            points="28,19 42,19 24,40"
            fill={`url(#goldHi_${uid})`}
            fillOpacity="0.9"
          />

          {/* Pavilion Center Cut (Rich depth) */}
          <polygon
            points="20,19 28,19 24,40"
            fill={`url(#goldPav_${uid})`}
            fillOpacity="0.95"
          />

          {/* Crown Left Kite */}
          <polygon
            points="17,10 11,19 6,19"
            fill={`url(#goldShade_${uid})`}
            fillOpacity="0.8"
          />

          {/* Crown Left Star */}
          <polygon
            points="17,10 20,19 11,19"
            fill={`url(#goldHi_${uid})`}
            fillOpacity="0.85"
          />

          {/* Crown Table (Top Facet - Brightest) */}
          <polygon
            points="17,10 31,10 28,19 20,19"
            fill={`url(#goldTable_${uid})`}
            strokeWidth="1.4"
          />

          {/* Crown Right Star */}
          <polygon
            points="31,10 37,19 28,19"
            fill={`url(#goldHi_${uid})`}
            fillOpacity="0.9"
          />

          {/* Crown Right Kite */}
          <polygon
            points="31,10 42,19 37,19"
            fill={`url(#goldShade_${uid})`}
            fillOpacity="0.85"
          />

          {/* Precision Facet Line Accents */}
          <line
            x1="24"
            y1="19"
            x2="24"
            y2="40"
            stroke={goldLight}
            strokeWidth="0.8"
            strokeOpacity="0.75"
          />
        </g>

        {/* Radiant Sparkle Star Glint (Top Right Crown Corner) */}
        {showSparkle && (
          <g
            className={`group-sparkle ${animated ? 'animate-gem-twinkle' : ''}`}
            style={{
              transformOrigin: '33px 9px',
            }}
          >
            {/* Sparkle ambient halo */}
            <circle cx="33" cy="9" r="4.5" fill={goldLight} fillOpacity="0.3" />
            {/* 4-point Diamond Star */}
            <path
              d="M33,3 Q33,9 39,9 Q33,9 33,15 Q33,9 27,9 Q33,9 33,3 Z"
              fill="#FFFFFF"
            />
            {/* Inner Glint Core */}
            <circle cx="33" cy="9" r="1.2" fill={goldLight} />
            {/* Micro Satellite Sparkle */}
            <circle cx="38" cy="14" r="0.9" fill="#FFFFFF" fillOpacity="0.85" />
          </g>
        )}
      </svg>
    </div>
  );
};

export interface BrandLogoProps {
  variant?: 'light' | 'dark';
  subtitle?: boolean | string;
  size?: 'sm' | 'md' | 'lg' | 'responsive';
  animated?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  subtitle = false,
  size = 'responsive',
  animated = true,
  className = '',
}) => {
  const isLight = variant === 'light';

  // Responsive vs fixed size configurations
  const sizeConfig = {
    sm: {
      emblem: 'w-6 h-6',
      title: 'text-base tracking-[0.16em]',
      subtitle: 'text-[7.5px] tracking-[0.3em]',
      gap: 'gap-2',
    },
    md: {
      emblem: 'w-8 h-8',
      title: 'text-xl tracking-[0.18em]',
      subtitle: 'text-[9px] tracking-[0.32em]',
      gap: 'gap-2.5',
    },
    lg: {
      emblem: 'w-11 h-11 sm:w-12 sm:h-12',
      title: 'text-2xl sm:text-3xl tracking-[0.2em]',
      subtitle: 'text-[10.5px] sm:text-xs tracking-[0.36em]',
      gap: 'gap-3.5',
    },
    responsive: {
      emblem: 'w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9',
      title: 'text-lg sm:text-xl md:text-2xl tracking-[0.18em] sm:tracking-[0.2em] md:tracking-[0.22em]',
      subtitle: 'text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.3em] sm:tracking-[0.34em] md:tracking-[0.38em]',
      gap: 'gap-2 sm:gap-2.5 md:gap-3',
    },
  }[size];

  const subtitleText = typeof subtitle === 'string' ? subtitle : 'Admin Panel';

  return (
    <div
      className={`group inline-flex items-center ${sizeConfig.gap} select-none transition-all duration-300 ${className}`}
    >
      {/* Handcrafted Faceted Emblem with Sparkle */}
      <DiamondEmblem
        className={sizeConfig.emblem}
        variant={variant}
        animated={animated}
      />

      {/* Brand Identity Typography Lockup */}
      <div className="flex flex-col justify-center">
        {/* Main Brand Wordmark */}
        <span
          className={`font-serif font-bold uppercase leading-none transition-colors duration-300 ${
            sizeConfig.title
          } ${
            isLight
              ? 'text-white group-hover:text-[#FFFDF7]'
              : 'text-[#0E3B2E] group-hover:text-[#062018]'
          }`}
        >
          Madni
        </span>

        {/* Sub-Brand Jewellery Atelier Label */}
        <div className="flex items-center gap-1.5 mt-0.5 sm:mt-1">
          <span
            className={`font-sans font-semibold uppercase leading-tight transition-colors duration-200 ${
              sizeConfig.subtitle
            } ${
              isLight ? 'text-[#F3E7CC]' : 'text-[#B8893B]'
            }`}
          >
            Jeweller
          </span>
          <span
            className={`inline-block w-1 h-1 rounded-full ${
              isLight ? 'bg-[#E5C578]' : 'bg-[#B8893B]'
            }`}
          />
        </div>

        {/* Optional Secondary Label (e.g. Admin Panel) */}
        {subtitle && (
          <span
            className={`text-[9px] sm:text-[10px] tracking-wider uppercase font-sans font-medium mt-0.5 ${
              isLight ? 'text-[#F3E7CC]/70' : 'text-[#6B645A]'
            }`}
          >
            {subtitleText}
          </span>
        )}
      </div>
    </div>
  );
};
