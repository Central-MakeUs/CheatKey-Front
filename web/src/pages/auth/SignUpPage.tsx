import { NicknameForm } from "@/components/signup/NicknameForm";
import { useLayoutEffect, useRef, useState } from "react";
import type { NicknameStatus, SignUpForm } from "@/types/signup/signup.types";
import { useNavigate } from "react-router-dom";
import { path } from "@/routes/path";
import { AppHeader } from "@/components/common/AppHeader";
import { BottomFullButton } from "@/components/common/BottomFullButton";
import { BottomSignupButton } from "@/components/common/BottomSignupButton";
import { AgeForm } from "@/components/signup/AgeForm";
import { GenderForm } from "@/components/signup/GenderForm";
import { MethodForm } from "@/components/signup/MethodForm";
import { ItemForm } from "@/components/signup/ItemForm";
import { motion, AnimatePresence } from "motion/react";
import { useKeyboardHeight } from "@/hooks/useKeyboardHeight";
import { cn } from "@/utils/cn";

// 슬라이드 애니메이션 효과 객체
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [stepState, setStepState] = useState<number>(1);
  const [signupFormData, setSignupFormData] = useState<SignUpForm>({
    nickname: "",
    age: null,
    gender: null,
    method: [],
    item: [],
  });
  const [nicknameStatus, setNicknameStatus] =
    useState<NicknameStatus>("NORMAL");

  // 닉네임 폼 포커스 검사 변수
  const [isInputFocus, setIsInputFocus] = useState<boolean>(false);

  // 폼 내용 높이 계산 하는 변수
  const [contentHeight, setContentHeight] = useState<number | "auto">("auto");
  const contentRef = useRef<HTMLDivElement>(null);

  // 폼 좌우 애니메이션 용
  const [direction, setDirection] = useState(0);

  const keyboardHeight = useKeyboardHeight();

  // 다음 단계로 이동
  const handleNextStep = () => {
    setDirection(1);
    if (stepState < 5) {
      setStepState((step) => step + 1);
    } else {
      console.log("회원가입");
    }
  };

  // 이전 단계로 이동
  const handlePrevStep = () => {
    setDirection(-1);
    if (stepState > 1) {
      setStepState((step) => step - 1);
    } else {
      navigate(path.auth.login, { replace: true });
    }
  };

  // 각 단계별 헤더 설정
  const HEADER_CONFIG: Record<number, string> = {
    1: "닉네임 입력",
    2: "기본 정보 선택",
    3: "기본 정보 선택",
    4: "거래 방식",
    5: "주요 거래 품목",
  };
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
        age={signupFormData.age}
        setAge={(newValue) =>
          setSignupFormData((prev) => ({ ...prev, age: newValue }))
        }
      />
    ),
    3: (
      <GenderForm
        gender={signupFormData.gender}
        setGender={(newValue) =>
          setSignupFormData((prev) => ({ ...prev, gender: newValue }))
        }
      />
    ),
    4: (
      <MethodForm
        methods={signupFormData.method ?? []}
        setMethods={(newValue) =>
          setSignupFormData((prev) => ({ ...prev, method: newValue }))
        }
      />
    ),
    5: (
      <ItemForm
        items={signupFormData.item ?? []}
        setItems={(newValue) =>
          setSignupFormData((prev) => ({
            ...prev,
            item: newValue,
          }))
        }
      />
    ),
  };

  // 각 단계별 하단 버튼 설정
  const BOTTOM_BUTTON_CONFIG: Record<number, boolean> = {
    1: nicknameStatus === "PASS",
    2: signupFormData.age !== null,
    3: signupFormData.gender !== null,
    4: true,
    5: true,
  };

  // 폼 내용에 맞게 레이아웃 크기 계산 후 적용
  useLayoutEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.offsetHeight);
    }
  }, [stepState]);

  return (
    <div className="relative flex h-fit w-full flex-1 flex-col">
      <AppHeader
        title={HEADER_CONFIG[stepState]}
        onPrev={handlePrevStep}
        onSkip={
          stepState === 4 || stepState === 5
            ? () => console.log("스킵하기")
            : undefined
        }
      />
      <div className="relative mx-5 pt-1">
        <div className="bg-bg-50 absolute top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full" />
        <div
          className={`bg-primary-600 absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full transition-all duration-300 ease-in-out`}
          style={{ width: `${(stepState / 5) * 100}%` }}
        />
      </div>
      <div
        className="relative flex flex-1 flex-col"
        style={{
          minHeight: contentHeight,
          transition: "min-height 0.3s ease-in-out",
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={stepState}
            ref={contentRef}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.3 }}
            className="absolute right-0 left-0 flex h-fit flex-col px-5 pt-8 pb-3"
          >
            {STEP_COMPONENTS[stepState]}
          </motion.div>
        </AnimatePresence>
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
          {stepState === 1 ? (
            <BottomFullButton
              content="다음"
              state={BOTTOM_BUTTON_CONFIG[stepState]}
              onClick={handleNextStep}
            />
          ) : (
            <BottomSignupButton
              leftContent="이전"
              rightContent="다음"
              state={BOTTOM_BUTTON_CONFIG[stepState]}
              onLeftClick={handlePrevStep}
              onRightClick={handleNextStep}
            />
          )}
        </div>
      </div>
    </div>
  );
};
