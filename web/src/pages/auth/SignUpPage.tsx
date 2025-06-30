import { NicknameForm } from "@/components/signup/NicknameForm";
import { useState } from "react";
import type {
  SignUpForm,
  TradeMethod,
  ItemCategory,
} from "@/types/signup/signup.types";
import { useNavigate } from "react-router-dom";
import { path } from "@/routes/path";
import { AppHeader, type AppHeaderProps } from "@/components/common/AppHeader";
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

  // 각 단계별 헤더 설정
  const HEADER_CONFIG: Record<number, AppHeaderProps> = {
    1: {
      title: "닉네임 입력",
      onPrev: () => navigate(path.auth.login, { replace: true }),
    },
    2: {
      title: "기본 정보 선택",
      onPrev: () => setStepState((step) => step - 1),
    },
    3: {
      title: "기본 정보 선택",
      onPrev: () => setStepState((step) => step - 1),
    },
    4: {
      title: "거래 방식",
      onPrev: () => setStepState((step) => step - 1),
      onSkip: () => console.log("Skip"),
    },
    5: {
      title: "주요 거래 품목",
      onPrev: () => setStepState((step) => step - 1),
      onSkip: () => console.log("Skip"),
    },
  };

  return (
    <div className="relative flex h-full w-full flex-1 flex-col">
      <AppHeader
        title={HEADER_CONFIG[stepState].title}
        onPrev={HEADER_CONFIG[stepState].onPrev}
      />
      <div className="flex flex-1 flex-col px-5">
        <NicknameForm nickname={signupFormData.nickname} />
      </div>
      <div className="flex flex-col items-center gap-8 px-5 py-3">
        <PageIndicator total={3} current={parseIndicatorStep(stepState)} />
        {stepState === 1 && (
          <BottomFullButton
            content="다음"
            state={isValidName}
            onClick={() => setStepState((step) => step + 1)}
          />
        )}
        {stepState !== 1 && (
          <BottomSignupButton
            leftContent="이전"
            rightContent="다음"
            state={true}
            onLeftClick={() => setStepState((step) => step - 1)}
            onRightClick={() => setStepState((step) => step + 1)}
          />
        )}
      </div>
    </div>
  );
};
