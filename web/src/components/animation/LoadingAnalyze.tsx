import { Player } from "@lottiefiles/react-lottie-player";

import LoadingAnalyzeAnimation from "@/assets/animation/ai_analyze_animation.json";

interface LoadingAnalyzeProps {
  width?: number;
  height?: number;
  speed?: number;
  className?: string;
}

export const LoadingAnalyze = ({
  width = 160,
  height = 160,
  speed = 1,
  className,
}: LoadingAnalyzeProps) => {
  return (
    <Player
      src={LoadingAnalyzeAnimation}
      loop
      autoplay
      speed={speed}
      style={{ width: width, height: height }}
      className={`${className}`}
    />
  );
};
