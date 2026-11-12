import React from 'react';

export const DiamondEmblem: React.FC<{
  className?: string;
  size?: number;
  color?: string;
}> = ({ className = 'w-7 h-7', size, color = '#B8893B' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer crown and pavilion */}
      <polygon
        points="7,14 33,14 20,33"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="none"
      />
      <polygon
        points="7,14 13,6 27,6 33,14"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Facet lines */}
      <line x1="13" y1="6" x2="16" y2="14" stroke={color} strokeWidth="1.5" />
      <line x1="27" y1="6" x2="24" y2="14" stroke={color} strokeWidth="1.5" />
      <line x1="16" y1="14" x2="20" y2="33" stroke={color} strokeWidth="1.5" />
      <line x1="24" y1="14" x2="20" y2="33" stroke={color} strokeWidth="1.5" />
      <line x1="13" y1="6" x2="20" y2="14" stroke={color} strokeWidth="1.2" opacity="0.7" />
      <line x1="27" y1="6" x2="20" y2="14" stroke={color} strokeWidth="1.2" opacity="0.7" />
    </svg>
  );
};

export const BrandLogo: React.FC<{
  variant?: 'light' | 'dark';
  subtitle?: boolean;
}> = ({ variant = 'dark', subtitle = false }) => {
  const isLight = variant === 'light';
  return (
    <div className="flex items-center gap-2.5">
      <DiamondEmblem
        className="w-7 h-7 flex-shrink-0"
        color={isLight ? '#F3E7CC' : '#B8893B'}
      />
      <div className="flex flex-col">
        <span
          className={`font-serif text-xl tracking-wider uppercase font-semibold leading-none ${
            isLight ? 'text-white' : 'text-[#0E3B2E]'
          }`}
        >
          Madni
        </span>
        <span
          className={`text-[9px] tracking-[0.28em] uppercase font-sans font-medium mt-0.5 ${
            isLight ? 'text-[#F3E7CC]/80' : 'text-[#B8893B]'
          }`}
        >
          Jeweller
        </span>
        {subtitle && (
          <span className="text-[11px] text-muted font-sans mt-0.5">
            Admin Panel
          </span>
        )}
      </div>
    </div>
  );
};

