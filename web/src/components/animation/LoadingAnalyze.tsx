import { Player } from "@lottiefiles/react-lottie-player";

import LoadingAnalyzeAnimation from "@/assets/animation/ai_analyze_animation.json";

interface LoadingAnalyzeProps {
  width?: number;
  height?: number;
  speed?: number;
}

export const LoadingAnalyze = ({
  width = 160,
  height = 160,
  speed = 1,
}: LoadingAnalyzeProps) => {
  return (
    <Player
      src={LoadingAnalyzeAnimation}
      loop
      autoplay
      speed={speed}
      style={{ width: width, height: height }}
    />
  );
};
