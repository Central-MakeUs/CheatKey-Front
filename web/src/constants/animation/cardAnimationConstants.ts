export const CARD_ANIMATION = {
  transition: {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  },
  drag: {
    dragConstraints: { left: 0, right: 0 },
    dragElastic: 0.1,
    dragMomentum: false,
  },
} as const;
