'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/data/mockData';
import { ProductImage } from '@/components/ui/ProductImage';
import { Heart } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { wishlist, toggleWishlist } = useApp();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group flex flex-col h-full transition-all duration-300">
      {/* Product Image Frame */}
      <div
        className={`relative aspect-square rounded-2xl ${product.bgTint} overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-md border border-[#E7DFD0]`}
      >
        {/* Diagonal White Light Sheen Sweep across Image on Hover */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-2xl">
          <div className="absolute -inset-full w-[250%] h-[250%] bg-gradient-to-tr from-transparent via-white/45 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        </div>

        {/* Top Badges */}
        {product.badge && (
          <span className="absolute top-3 left-3 z-20 bg-[#0E3B2E] text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center text-[#1C1917] hover:bg-white hover:text-red-500 hover:scale-110 active:scale-90 transition shadow-sm"
          title="Save to wishlist"
        >
          <Heart
            className={`w-4 h-4 transition ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-[#6B645A]'
            }`}
          />
        </button>

        {/* Product Visual Link */}
        <Link
          href={`/product/${product.id}`}
          className="w-full h-full block cursor-pointer"
        >
          <ProductImage
            src={product.image}
            alt={product.name}
            bgTint={product.bgTint}
            emblemSize={56}
            className="w-full h-full"
          />
        </Link>
      </div>

      {/* Info */}
      <div className="mt-3.5 space-y-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B8893B]">
          {product.category}
        </span>
        <h3 className="font-serif text-base sm:text-lg font-medium text-[#1C1917] leading-snug group-hover:text-[#0E3B2E] transition">
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="text-xs text-[#6B645A]">
          {product.purity} Gold • {product.weight} g
        </p>
        <p className="text-sm sm:text-base font-semibold text-[#1C1917] pt-0.5">
          Rs. {product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};
