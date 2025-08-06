import { useCallback, useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { BottomFullButton } from "@/components/common/BottomFullButton";
import { PageIndicator } from "@/components/common/PageIndicator";
import { OnboardingContent } from "@/components/onboarding/OnboardingContent";

import { SLIDE_ANIMATION } from "@/constants/animation/slideAnimation";
import { ONBOARDING_CONSTANTS } from "@/constants/onboardingConstants";

export const OnboardingPage = () => {
  const [stepState, setStepState] = useState<number>(1);

  const currentContent =
    ONBOARDING_CONSTANTS[stepState as keyof typeof ONBOARDING_CONSTANTS];

  const handleNextStep = useCallback(() => {
    if (stepState >= 4) return;
    setStepState((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (stepState >= 4) {
      return;
    }

    const timer = setTimeout(() => {
      handleNextStep();
    }, 2000);

    return () => clearTimeout(timer);
  }, [stepState, handleNextStep]);

  return (
    <div className="safearea bg-bg-100 relative flex h-screen w-full flex-1 flex-col justify-center">
      <div className="relative flex w-full flex-1">
        <AnimatePresence initial={false} custom={1}>
          <motion.div
            key={stepState}
            custom={1}
            variants={SLIDE_ANIMATION}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.3 }}
            className="absolute inset-0 flex flex-col justify-center"
          >
            <OnboardingContent
              title={currentContent.title}
              subTitle={currentContent.subTitle}
              image={currentContent.image}
              total={4}
              step={stepState}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <PageIndicator
        total={4}
        current={stepState}
        indicatorColor="bg-primary-400"
        className="pt-6 pb-11"
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
