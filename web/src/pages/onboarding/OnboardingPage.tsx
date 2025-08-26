import { useCallback, useState } from "react";

import { useNavigate } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import { bridge } from "@/bridge";
import { useImagePreloader } from "@/hooks/useImagePreloader";

import { LoadingScreen } from "@/components/animation/LoadingScreen";
import { BottomFullButton } from "@/components/common/BottomFullButton";
import { BottomSignupButton } from "@/components/common/BottomSignupButton";
import { PageIndicator } from "@/components/common/PageIndicator";
import { OnboardingContent } from "@/components/onboarding/OnboardingContent";

import { SLIDE_ANIMATION } from "@/constants/animation/slideAnimation";
import {
  ONBOARDING_CONSTANTS,
  ONBOARDING_TOTAL_STEP,
} from "@/constants/onboardingConstants";
import { PAGE_PATH } from "@/constants/path";

const onboardingImageUrls = Object.values(ONBOARDING_CONSTANTS).map(
  (content) => content.image,
);

export const OnboardingPage = () => {
  const navigate = useNavigate();
  const [stepState, setStepState] = useState<number>(1);
  const [direction, setDirection] = useState(1);

  const { imagesLoaded } = useImagePreloader(onboardingImageUrls);

  const handleNextStep = useCallback(() => {
    setDirection(1);
    if (stepState >= ONBOARDING_TOTAL_STEP) return;
    setStepState((prev) => prev + 1);
  }, [stepState]);

  const handlePrevStep = useCallback(() => {
    setDirection(-1);
    if (stepState <= 1) return;
    setStepState((prev) => prev - 1);
  }, [stepState]);

  const handleCompleteOnboarding = async () => {
    await bridge.completeOnboarding();
    navigate(PAGE_PATH.AUTH.LOGIN);
  };

  if (!imagesLoaded) {
    return <LoadingScreen />;
  }

  const currentContent =
    ONBOARDING_CONSTANTS[stepState as keyof typeof ONBOARDING_CONSTANTS];

  const isLastStep = stepState === ONBOARDING_TOTAL_STEP;

  return (
    <div className="safearea bg-bg-100 relative flex h-screen w-full flex-1 flex-col justify-center">
      <div className="relative flex w-full flex-1">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={stepState}
            custom={direction}
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
              total={ONBOARDING_TOTAL_STEP}
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
        {stepState === 1 ? (
          <BottomFullButton
            content={"다음"}
            state={true}
            onClick={handleNextStep}
          />
        ) : (
          <BottomSignupButton
            leftContent="이전"
            rightContent={isLastStep ? "시작하기" : "다음"}
            state={true}
            onLeftClick={handlePrevStep}
            onRightClick={
              isLastStep ? handleCompleteOnboarding : handleNextStep
            }
          />
        )}
      </div>
    </div>
  );
};
