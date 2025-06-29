'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface AdvCarouselProps {
  images: string[];
}

export default function AdvCarousel({ images }: AdvCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(true);
  const slideRef = useRef<HTMLDivElement>(null);

  const totalSlides = images.length;

  const extendedSlides = [images[totalSlides - 1], ...images, images[0]];

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
    setIsAnimating(true);
  };

  useEffect(() => {
    const slideEl = slideRef.current;

    if (!slideEl) return;

    const handleTransitionEnd = () => {
      setIsAnimating(false);

      if (currentIndex === totalSlides + 1) {
        setCurrentIndex(1);
      }

      if (currentIndex === 0) {
        setCurrentIndex(totalSlides);
      }
    };

    slideEl.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      slideEl.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [currentIndex, totalSlides]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[10.875rem] w-full overflow-hidden rounded-[1.25rem]">
      <div
        ref={slideRef}
        className={`flex ${isAnimating ? 'transition-transform duration-500 ease-in-out' : ''}`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {extendedSlides.map((src, idx) => (
          <div key={idx} className="relative h-[10.875rem] w-full shrink-0">
            <Image
              src={src}
              alt={`광고 이미지 ${idx}`}
              fill
              className="object-cover"
              sizes="100vw"
              priority={idx === 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
