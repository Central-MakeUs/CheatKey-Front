import { useState, useCallback, useRef, useEffect } from "react";

interface UseCardNavigationProps {
  totalCards: number;
  onIndexChange?: (index: number) => void;
}

export const useCardNavigation = ({
  totalCards,
  onIndexChange,
}: UseCardNavigationProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<number>(null);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const goToCard = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalCards && !isTransitioning) {
        setIsTransitioning(true);
        setCurrentIndex(index);
        onIndexChange?.(index);

        if (transitionTimeoutRef.current) {
          clearTimeout(transitionTimeoutRef.current);
        }
        transitionTimeoutRef.current = setTimeout(() => {
          setIsTransitioning(false);

          transitionTimeoutRef.current = null;
        }, 300);
      }
    },
    [totalCards, onIndexChange, isTransitioning],
  );

  const goToNext = useCallback(() => {
    const nextIndex = Math.min(currentIndex + 1, totalCards - 1);
    if (nextIndex !== currentIndex) {
      goToCard(nextIndex);
    }
  }, [currentIndex, totalCards, goToCard]);

  const goToPrev = useCallback(() => {
    const prevIndex = Math.max(currentIndex - 1, 0);
    if (prevIndex !== currentIndex) {
      goToCard(prevIndex);
    }
  }, [currentIndex, goToCard]);

  return {
    currentIndex,
    goToCard,
    goToNext,
    goToPrev,
    isTransitioning,
  };
};
