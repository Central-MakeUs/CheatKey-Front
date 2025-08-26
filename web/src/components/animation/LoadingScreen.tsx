import { LoadingSpinner } from "./LoadingSpinner";

export const LoadingScreen = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <LoadingSpinner width={32} height={32} />
    </div>
  );
};
