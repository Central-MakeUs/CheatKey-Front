import { motion, AnimatePresence } from "motion/react";

import { useSignUp } from "@/hooks/useSignUp";
import { cn } from "@/lib/cn";

import { LoadingScreen } from "@/components/animation/LoadingScreen";
import { AppHeader } from "@/components/common/AppHeader";
import { BottomFullButton } from "@/components/common/BottomFullButton";
import { BottomSignupButton } from "@/components/common/BottomSignupButton";
import { AgeForm } from "@/components/signup/AgeForm";
import { GenderForm } from "@/components/signup/GenderForm";
import { ItemForm } from "@/components/signup/ItemForm";
import { MethodForm } from "@/components/signup/MethodForm";
import { NicknameForm } from "@/components/signup/NicknameForm";
import { TermBottomSheet } from "@/components/signup/TermBottomSheet";
import { TermForm } from "@/components/signup/TermForm";

import { SLIDE_ANIMATION } from "@/constants/animation/slideAnimation";
import { SIGNUP_HEADER_CONFIG } from "@/constants/signUpConstants";

export const SignUpPage = () => {
  const {
    stepState,
    direction,
    contentRef,
    contentHeight,
    keyboardHeight,
    isInputFocus,
    setIsInputFocus,
    signupFormData,
    setSignupFormData,
    nicknameStatus,
    setNicknameStatus,
    registerData,
    isRegisterLoading,
    termsList,
    selectedTerm,
    isAllAgreed,
    handleToggleAllAgreements,
    handleAgreementChange,
    handleOpenTermDetail,
    handleCloseBottomSheet,
    handlePrevStep,
    handleNextStep,
    handleSkip,
    bottomButtonState,
  } = useSignUp();

  // 각 단계별로 보여줄 컴포넌트를 정의
  const STEP_COMPONENTS: Record<number, React.ReactNode> = {
    1: (
      <NicknameForm
        nickname={signupFormData.nickname}
        setNickname={(newValue) =>
          setSignupFormData((prev) => ({ ...prev, nickname: newValue }))
        }
        nicknameStatus={nicknameStatus}
        setNicknameStatus={setNicknameStatus}
        isInputFocus={isInputFocus}
        setIsInputFocus={setIsInputFocus}
      />
    ),
    2: (
      <AgeForm
        ageCode={signupFormData.ageCode}
        setAgeCode={(newValue) =>
          setSignupFormData((prev) => ({ ...prev, ageCode: newValue }))
        }
        ageOptions={registerData?.ageCodeList ?? []}
      />
    ),
    3: (
      <GenderForm
        genderCode={signupFormData.genderCode}
        setGenderCode={(newValue) =>
          setSignupFormData((prev) => ({ ...prev, genderCode: newValue }))
        }
        genderOptions={registerData?.genderCodeList ?? []}
      />
    ),
    4: (
      <MethodForm
        selectedMethods={signupFormData.tradeMethodCodes}
        setMethods={(newValue) =>
          setSignupFormData((prev) => ({ ...prev, tradeMethodCodes: newValue }))
        }
        methodOptions={registerData?.tradeMethodCodeList ?? []}
      />
    ),
    5: (
      <ItemForm
        selectedItems={signupFormData.tradeItemCodes}
        setItems={(newValue) =>
          setSignupFormData((prev) => ({ ...prev, tradeItemCodes: newValue }))
        }
        itemOptions={registerData?.tradeItemCodeList ?? []}
      />
    ),
  };

  if (isRegisterLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {stepState > 0 && (
        <>
          <AppHeader
            title={SIGNUP_HEADER_CONFIG[stepState]}
            onPrev={handlePrevStep}
            onSkip={stepState !== 1 ? handleSkip : undefined}
          />
          <div className="mt-header relative mx-5 pt-2">
            <div className="bg-bg-50 absolute top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full" />
            <div
              className={`bg-primary-600 absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full transition-all duration-300 ease-in-out`}
              style={{ width: `${(stepState / 5) * 100}%` }}
            />
          </div>
        </>
      )}

      <div
        className="relative flex flex-1 flex-col"
        style={{
          minHeight: contentHeight,
          transition: "min-height 0.3s ease-in-out",
        }}
      >
        {stepState === 0 ? (
          <div ref={contentRef}>
            <TermForm
              terms={termsList}
              agreedTerms={signupFormData.agreedTerms}
              isAllAgreed={isAllAgreed}
              onToggleAll={handleToggleAllAgreements}
              onToggle={handleAgreementChange}
              onClickDetail={handleOpenTermDetail}
            />
          </div>
        ) : (
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={stepState}
              ref={contentRef}
              custom={direction}
              variants={SLIDE_ANIMATION}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute right-0 left-0 flex h-fit flex-col px-5 pt-8 pb-3"
            >
              {STEP_COMPONENTS[stepState]}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <div
        className="relative flex flex-col items-center gap-9"
        style={{
          bottom: keyboardHeight,
          transition: "bottom 0.3s ease-out",
        }}
      >
        {(stepState === 4 || stepState === 5) && (
          <p className="caption-1-medium text-gray-system-600">
            중복선택이 가능해요
          </p>
        )}
        <div
          className={cn("w-full px-5 py-3", {
            "border-t-gray-system-800 border-t": !isInputFocus,
          })}
        >
          {stepState === 0 || stepState === 1 ? (
            <BottomFullButton
              content={stepState === 0 ? "동의하고 계속하기" : "다음"}
              state={bottomButtonState}
              onClick={handleNextStep}
            />
          ) : (
            <BottomSignupButton
              leftContent="이전"
              rightContent="다음"
              state={bottomButtonState}
              onLeftClick={handlePrevStep}
              onRightClick={handleNextStep}
            />
          )}
        </div>
      </div>

      <TermBottomSheet
        isOpen={selectedTerm !== null}
        onClose={handleCloseBottomSheet}
        title={selectedTerm?.title ?? ""}
        content={selectedTerm?.content ?? ""}
      />
    </>
  );
};
