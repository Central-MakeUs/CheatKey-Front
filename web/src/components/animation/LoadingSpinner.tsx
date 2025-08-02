import { Player } from "@lottiefiles/react-lottie-player";

import LoadingSpinnerAnimation from "@/assets/animation/loading.json";

interface LoadingSpinnerProps {
  width?: number;
  height?: number;
  speed?: number;
  className?: string;
}

export const LoadingSpinner = ({
  width = 24,
  height = 24,
  speed = 1,
  className,
}: LoadingSpinnerProps) => {
  return (
    <Player
      src={LoadingSpinnerAnimation}
      loop
      autoplay
      speed={speed}
      style={{ width: width, height: height }}
      className={`${className}`}
    />
  );
};
