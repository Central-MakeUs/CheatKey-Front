import { NicknameForm } from "@/components/signup/NicknameForm";
import { useState } from "react";
import type {
  SignUpForm,
  TradeMethod,
  ItemCategory,
} from "@/types/signup/signup.types";
import { useNavigate } from "react-router-dom";
import { path } from "@/routes/path";
import { AppHeader } from "@/components/common/AppHeader";
import { BottomFullButton } from "@/components/common/BottomFullButton";
import { PageIndicator } from "@/components/common/PageIndicator";
import { BottomSignupButton } from "@/components/common/BottomSignupButton";

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [stepState, setStepState] = useState<number>(1);
  const [signupFormData, setSignupFormData] = useState<SignUpForm>({
    nickname: "",
    age: "",
    gender: null,
    method: [],
    item: [],
  });
  const [isValidName, setIsValidName] = useState<boolean>(true);

  const parseIndicatorStep = (step: number) => {
    if (step === 1) {
      return 1;
    } else if (step === 2 || step === 3 || step === 4) {
      return 2;
    } else return 3;
  };

  // 다음 단계로 이동
  const handleNextStep = () => {
    if (stepState < 5) {
      setStepState((step) => step + 1);
    } else {
      console.log("회원가입");
    }
  };

  // 이전 단계로 이동
  const handlePrevStep = () => {
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
  // 각 단계별 하단 버튼 설정
  const BOTTOM_BUTTON_CONFIG: Record<number, boolean> = {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  };

  return (
    <div className="relative flex h-full w-full flex-1 flex-col">
      <AppHeader
        title={HEADER_CONFIG[stepState]}
        onPrev={handlePrevStep}
        onSkip={
          stepState === 4 || stepState === 5
            ? () => console.log("스킵하기")
            : undefined
        }
      />
      <div className="flex flex-1 flex-col px-5">
        <NicknameForm nickname={signupFormData.nickname} />
      </div>
      <div className="flex flex-col items-center gap-8 px-5 py-3">
        <PageIndicator total={3} current={parseIndicatorStep(stepState)} />
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
  );
};
