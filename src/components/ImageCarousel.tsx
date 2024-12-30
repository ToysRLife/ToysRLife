import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCarousel } from '../hooks/useCarousel';

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { currentIndex, goToNext, goToPrevious, goToIndex } = useCarousel({
    totalItems: images.length,
    isActive: isHovered,
  });

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden aspect-square">
        <img
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
      </div>
      
      {/* Navigation buttons */}
      <button
        onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); goToNext(); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => { e.stopPropagation(); goToIndex(index); }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}