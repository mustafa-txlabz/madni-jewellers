'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { DiamondEmblem } from '@/components/ui/DiamondLogo';

interface ProductImageProps {
  src?: string;
  alt: string;
  bgTint?: string;
  className?: string;
  emblemSize?: number;
  priority?: boolean;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  bgTint = 'bg-[#FAF3E0]',
  className = 'w-full h-full',
  emblemSize = 36,
  priority = false,
}) => {
  const [error, setError] = useState(false);

  // If no source is provided or image loading failed, display the signature diamond emblem placeholder
  if (!src || error) {
    return (
      <div
        className={`${bgTint} ${className} flex items-center justify-center transition-all duration-300 relative select-none`}
        aria-label={alt}
      >
        <div className="w-3/5 h-3/5 rounded-full bg-white/40 backdrop-blur-xs flex items-center justify-center shadow-inner">
          <DiamondEmblem size={emblemSize} color="#B8893B" className="drop-shadow-sm" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${bgTint} ${className}`}>
      {/* We use an img tag with onError fallback to avoid any domain restrictions while supporting local & remote URLs */}
      <img
        src={src}
        alt={alt}
        onError={() => setError(true)}
        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
};

