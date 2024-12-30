import { useState, useEffect, useCallback } from 'react';

interface UseCarouselProps {
  totalItems: number;
  interval?: number;
  isActive?: boolean;
}

export function useCarousel({ totalItems, interval = 3000, isActive = false }: UseCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % totalItems);
    }, interval);

    return () => clearInterval(timer);
  }, [totalItems, interval, isActive]);

  const goToNext = useCallback(() => {
    setCurrentIndex((current) => (current + 1) % totalItems);
  }, [totalItems]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((current) => (current - 1 + totalItems) % totalItems);
  }, [totalItems]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return {
    currentIndex,
    goToNext,
    goToPrevious,
    goToIndex,
  };
}