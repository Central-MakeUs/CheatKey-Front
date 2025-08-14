import React from "react";

import { motion } from "framer-motion";
import ReactDOM from "react-dom";

import { ConfettiPiece } from "@/components/animation/ConfettiPiece";

interface ConfettiExplosionProps {
  isActive: boolean;
  centerX?: number;
  centerY?: number;
}

export const ConfettiExplosion: React.FC<ConfettiExplosionProps> = ({
  isActive,
  centerX = 300,
  centerY = 200,
}) => {
  const explosionColors = [
    "#4A9EFF",
    "#5DB3FF",
    "#3B7DDD",
    "#1A1A2E",
    "#252740",
    "#2D3349",
    "#0EA5E9",
    "#0284C7",
    "#0369A1",
    "#075985",
    "#E2E8F0",
    "#CBD5E1",
    "#94A3B8",
    "#6366F1",
    "#4338CA",
    "#3730A3",
  ];

  const confettiPieces = Array.from({ length: 60 }, (_, index) => ({
    id: index,
    color: explosionColors[Math.floor(Math.random() * explosionColors.length)],
    delay: Math.random() * 0.5,
  }));

  if (!isActive) return null;

  const portalContainer =
    document.getElementById("confetti-root") || document.body;

  const content = (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* 색종이 조각들 */}
      {confettiPieces.map((piece) => (
        <ConfettiPiece
          key={piece.id}
          color={piece.color}
          initialX={centerX}
          initialY={centerY}
          delay={piece.delay}
        />
      ))}

      {/* 추가 작은 색종이들 */}
      {Array.from({ length: 40 }, (_, index) => {
        const particleColor =
          explosionColors[Math.floor(Math.random() * explosionColors.length)];

        return (
          <motion.div
            key={`small-${index}`}
            className="absolute"
            style={{
              backgroundColor: particleColor,
              width: Math.random() * 4 + 2,
              height: Math.random() * 6 + 4,
              left: centerX + (Math.random() - 0.5) * 40,
              top: centerY + (Math.random() - 0.5) * 40,
            }}
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{
              scale: [0, 1.5, 1, 0],
              opacity: [0, 1, 0.8, 0],
              rotate: Math.random() * 720 - 360,
              x: (Math.random() - 0.5) * (window.innerWidth * 0.8),
              y: Math.random() * (window.innerHeight * 0.6) + 100,
            }}
            transition={{
              duration: 2.5,
              delay: Math.random() * 0.6,
              ease: "easeOut",
            }}
          />
        );
      })}

      {/* 추가 중간 크기 색종이들 */}
      {Array.from({ length: 20 }, (_, index) => {
        const particleColor =
          explosionColors[Math.floor(Math.random() * explosionColors.length)];

        return (
          <motion.div
            key={`medium-${index}`}
            className="absolute"
            style={{
              backgroundColor: particleColor,
              width: Math.random() * 4 + 4,
              height: Math.random() * 6 + 6,
              left: centerX + (Math.random() - 0.5) * 30,
              top: centerY + (Math.random() - 0.5) * 30,
            }}
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{
              scale: [0, 1.2, 0.8, 0],
              opacity: [0, 1, 0.7, 0],
              rotate: Math.random() * 720 - 360,
              x: (Math.random() - 0.5) * (window.innerWidth * 0.9),
              y: Math.random() * (window.innerHeight * 0.7) + 50,
            }}
            transition={{
              duration: 3,
              delay: Math.random() * 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        );
      })}
    </div>
  );

  return ReactDOM.createPortal(content, portalContainer);
};
