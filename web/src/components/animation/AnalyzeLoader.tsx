import { Player } from "@lottiefiles/react-lottie-player";

import AnalyzeLoaderAnimation from "@/assets/animation/ai_analyze_animation.json";

interface AnalyzeLoaderProps {
  width?: number;
  height?: number;
  speed?: number;
  className?: string;
}

export const AnalyzeLoader = ({
  width = 160,
  height = 160,
  speed = 1,
  className,
}: AnalyzeLoaderProps) => {
  return (
    <Player
      src={AnalyzeLoaderAnimation}
      loop
      autoplay
      speed={speed}
      style={{ width: width, height: height }}
      className={`${className}`}
    />
  );
};
