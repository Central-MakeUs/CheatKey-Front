import { useState } from "react";

import { BottomFullButton } from "@/components/common/BottomFullButton";
import { PageIndicator } from "@/components/common/PageIndicator";

export const OnboardingPage = () => {
  const [stepState, setStepState] = useState<number>(1);
  return (
    <div className="safearea bg-bg-100 relative flex h-screen w-full flex-1 flex-col justify-center">
      <div className="flex w-full flex-1 bg-amber-300">
        <h1 className="head-2-semibold text-base-0">URL 분석하기</h1>
        <h2 className="body-2-medium text-gray-system-400"></h2>
      </div>
      <PageIndicator
        total={4}
        current={stepState}
        indicatorColor="bg-primary-400"
      />
      <div className="border-t-gray-system-800 w-full border-t px-5 py-3">
        <BottomFullButton
          content={"시작하기"}
          state={stepState === 4}
          onClick={() => setStepState((prev) => prev + 1)}
        />
      </div>
    </div>
  );
};
