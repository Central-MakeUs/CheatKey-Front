import React from "react";

import { motion } from "framer-motion";

interface ConfettiPieceProps {
  color: string;
  initialX: number;
  initialY: number;
  delay: number;
}

export const ConfettiPiece: React.FC<ConfettiPieceProps> = ({
  color,
  initialX,
  initialY,
  delay,
}) => {
  const horizontalSpread = (Math.random() - 0.5) * 800;
  const verticalDistance = 300 + Math.random() * 600;

  const finalX = initialX + horizontalSpread;
  const finalY = initialY + verticalDistance;

  return (
    <motion.div
      className="absolute h-3 w-2 opacity-90"
      style={{
        backgroundColor: color,
        left: initialX,
        top: initialY,
      }}
      initial={{
        scale: 0,
        rotate: 0,
        x: 0,
        y: 0,
        opacity: 0,
      }}
      animate={{
        scale: [0, 1.2, 1],
        rotate: [0, Math.random() * 360 - 180],
        x: finalX - initialX,
        y: finalY - initialY,
        opacity: [0, 1, 0.8, 0],
      }}
      transition={{
        duration: 2.5,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        opacity: {
          times: [0, 0.1, 0.7, 1],
          duration: 2.5,
        },
      }}
    />
  );
};
