import { useState } from "react";

import { BottomFullButton } from "@/components/common/BottomFullButton";
import { OnboardingContent } from "@/components/onboarding/OnboardingContent";

import { ONBOARDING_CONSTANTS } from "@/constants/onboardingConstants";

export const OnboardingPage = () => {
  const [stepState, setStepState] = useState<number>(1);

  const currentContent =
    ONBOARDING_CONSTANTS[stepState as keyof typeof ONBOARDING_CONSTANTS];

  return (
    <div className="safearea bg-bg-100 relative flex h-screen w-full flex-1 flex-col justify-center">
      <OnboardingContent
        title={currentContent.title}
        subTitle={currentContent.subTitle}
        image={currentContent.image}
        total={4}
        step={stepState}
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
