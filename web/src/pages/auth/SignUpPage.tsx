import { useLayoutEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";

import { path } from "@/routes/path";

import { getAuthRegister } from "@/apis/auth/getAuthRegister.api";
import { useKeyboardHeight } from "@/hooks/useKeyboardHeight";
import type {
  NicknameStatus,
  SignUpForm,
  TermContent,
} from "@/types/signup/signup.types";
import { cn } from "@/utils/cn";

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

import { QUERY_KEYS } from "@/constants/apiConstants";

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
  const [stepState, setStepState] = useState<number>(0);
  const [signupFormData, setSignupFormData] = useState<SignUpForm>({
    agreedTerms: [],
    nickname: "",
    ageCode: null,
    genderCode: null,
    tradeMethodCodes: [],
    tradeItemCodes: [],
  });

  const { data: registerData } = useQuery({
    queryFn: getAuthRegister,
    queryKey: [QUERY_KEYS.GET_AUTH_REGISTER],
  });

  const termsList = registerData?.termsList ?? [];
  const ageCodeList = registerData?.ageCodeList ?? [];
  const genderCodeList = registerData?.genderCodeList ?? [];
  const tradeMethodCodeList = registerData?.tradeMethodCodeList ?? [];
  const tradeItemCodeList = registerData?.tradeItemCodeList ?? [];

  // 선택된 약관 상태
  const [selectedTerm, setSelectedTerm] = useState<TermContent | null>(null);

  const [nicknameStatus, setNicknameStatus] =
    useState<NicknameStatus>("NORMAL");

  // 닉네임 폼 포커스 검사 변수
  const [isInputFocus, setIsInputFocus] = useState<boolean>(false);

  // 폼 내용 높이 계산 하는 변수
  const [contentHeight, setContentHeight] = useState<number | "auto">("auto");
  const contentRef = useRef<HTMLDivElement>(null);

  // 폼 좌우 애니메이션 용
  const [direction, setDirection] = useState(0);

  // 키보드 높이 측정 훅
  const keyboardHeight = useKeyboardHeight();

  const requiredTermIds = termsList
    .filter((term) => term.required)
    .map((term) => term.id);

  // 전체 동의 여부
  const isAllAgreed = termsList.every((term) =>
    signupFormData.agreedTerms.includes(term.id),
  );

  // 전체 동의 클릭 핸들러
  const handleToggleAllAgreements = () => {
    if (isAllAgreed) {
      setSignupFormData((prev) => ({ ...prev, agreedTerms: [] }));
    } else {
      const allTermIds = termsList.map((term) => term.id);
      setSignupFormData((prev) => ({ ...prev, agreedTerms: allTermIds }));
    }
  };

  // 개별 약관 동의 상태 변경 핸들러
  const handleAgreementChange = (termId: number) => {
    setSignupFormData((prev) => {
      const newAgreedTerms = prev.agreedTerms.includes(termId)
        ? prev.agreedTerms.filter((id) => id !== termId)
        : [...prev.agreedTerms, termId];
      return { ...prev, agreedTerms: newAgreedTerms };
    });
  };

  // 약관 상세 보기 클릭 핸들러
  const handleOpenTermDetail = (termId: number) => {
    const term = termsList.find((t) => t.id === termId);
    if (term) {
      setSelectedTerm({ title: term.title, content: term.contents });
    }
  };

  // 약관 상세 보기 취소
  const handleCloseBottomSheet = () => {
    setSelectedTerm(null);
  };

  // 다음 단계로 이동
  const handleNextStep = () => {
    setDirection(1);
    if (stepState < 5) {
      setStepState((step) => step + 1);
    } else {
      // TODO: @Ki-Tak 회원가입으로 변경
    }
  };

  // 이전 단계로 이동
  const handlePrevStep = () => {
    setDirection(-1);
    if (stepState > 0) {
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
        ageCode={signupFormData.ageCode}
        setAgeCode={(newValue) =>
          setSignupFormData((prev) => ({ ...prev, ageCode: newValue }))
        }
        ageOptions={ageCodeList}
      />
    ),
    3: (
      <GenderForm
        genderCode={signupFormData.genderCode}
        setGenderCode={(newValue) =>
          setSignupFormData((prev) => ({ ...prev, genderCode: newValue }))
        }
        genderOptions={genderCodeList}
      />
    ),
    4: (
      <MethodForm
        selectedMethods={signupFormData.tradeMethodCodes}
        setMethods={(newValue) =>
          setSignupFormData((prev) => ({ ...prev, tradeMethodCodes: newValue }))
        }
        methodOptions={tradeMethodCodeList}
      />
    ),
    5: (
      <ItemForm
        selectedItems={signupFormData.tradeItemCodes}
        setItems={(newValue) =>
          setSignupFormData((prev) => ({ ...prev, tradeItemCodes: newValue }))
        }
        itemOptions={tradeItemCodeList}
      />
    ),
  };

  // 각 단계별 하단 버튼 설정
  const BOTTOM_BUTTON_CONFIG: Record<number, boolean> = {
    0: requiredTermIds.every((id) => signupFormData.agreedTerms.includes(id)),
    1: nicknameStatus === "PASS",
    2: signupFormData.ageCode !== null,
    3: signupFormData.genderCode !== null,
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
    <div className="bg-bg-100 relative flex h-fit w-full flex-1 flex-col">
      {/* AppHeader와 프로그레스바는 stepState > 0 일 때만 렌더링 */}
      {stepState > 0 && (
        <>
          <AppHeader
            title={HEADER_CONFIG[stepState]}
            onPrev={handlePrevStep}
            onSkip={
              stepState === 4 || stepState === 5
                ? () => console.log("회원가입 폼 제출")
                : undefined
            }
          />
          <div className="mt-header relative mx-5 pt-1">
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

      <TermBottomSheet
        isOpen={selectedTerm !== null}
        onClose={handleCloseBottomSheet}
        title={selectedTerm?.title ?? ""}
        content={selectedTerm?.content ?? ""}
      />
    </div>
  );
};
