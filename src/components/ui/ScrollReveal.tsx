'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'zoom-in';
  delay?: number; // ms delay
  duration?: number; // ms duration (default 700ms)
  className?: string;
  threshold?: number;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  className = '',
  threshold = 0.12,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion, reveal immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // Native IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsRevealed(false);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  // Initial and revealed transformation states
  const getTransformClasses = () => {
    switch (animation) {
      case 'fade-up':
        return isRevealed
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8';
      case 'fade-in':
        return isRevealed ? 'opacity-100' : 'opacity-0';
      case 'slide-left':
        return isRevealed
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 -translate-x-10';
      case 'slide-right':
        return isRevealed
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-10';
      case 'zoom-in':
        return isRevealed
          ? 'opacity-100 scale-100 translate-y-0'
          : 'opacity-0 scale-95 translate-y-4';
      default:
        return isRevealed
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`transition-all will-change-transform ${getTransformClasses()} ${className}`}
    >
      {children}
    </div>
  );
};

/**
 * ScrollStagger: Automatically staggers child elements with sequential reveal delays
 * when their container scrolls into view. Perfect for product grids & collection lists.
 */
export interface ScrollStaggerProps {
  children: React.ReactNode;
  staggerDelay?: number; // ms between each child (e.g. 100ms)
  animation?: 'fade-up' | 'fade-in' | 'zoom-in';
  className?: string;
  threshold?: number;
}

export const ScrollStagger: React.FC<ScrollStaggerProps> = ({
  children,
  staggerDelay = 90,
  animation = 'fade-up',
  className = '',
  threshold = 0.1,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const childArray = React.Children.toArray(children);

  return (
    <div ref={ref} className={className}>
      {childArray.map((child, index) => {
        const delay = index * staggerDelay;
        const transformClass =
          animation === 'zoom-in'
            ? isRevealed
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-6'
            : isRevealed
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8';

        return (
          <div
            key={index}
            style={{
              transitionDuration: '700ms',
              transitionDelay: `${delay}ms`,
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className={`transition-all will-change-transform ${transformClass}`}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

