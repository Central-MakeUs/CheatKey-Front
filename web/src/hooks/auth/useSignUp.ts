import { useLayoutEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useQuery, useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { getAuthRegister } from "@/apis/auth/getAuthRegister.api";
import { postAuthRegister } from "@/apis/auth/postAuthRegister";
import { useSignUpTerms } from "@/hooks/auth/useSignUpTerms";
import { useKeyboardHeight } from "@/hooks/common/useKeyboardHeight";
import type {
  NicknameStatus,
  RegisterRequest,
  SignUpForm,
} from "@/types/signup/signup.types";

import { QUERY_KEYS } from "@/constants/api/apiConstants";
import { PAGE_PATH } from "@/constants/route/path";

export const useSignUp = () => {
  const navigate = useNavigate();

  // 상태 관리
  const [stepState, setStepState] = useState(0);
  const [signupFormData, setSignupFormData] = useState<SignUpForm>({
    agreedTerms: [],
    nickname: "",
    ageCode: null,
    genderCode: null,
    tradeMethodCodes: [],
    tradeItemCodes: [],
  });
  const [nicknameStatus, setNicknameStatus] =
    useState<NicknameStatus>("NORMAL");
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [direction, setDirection] = useState(0);

  const { data: registerData, isLoading: isRegisterLoading } = useQuery({
    queryFn: getAuthRegister,
    queryKey: [QUERY_KEYS.GET_AUTH_REGISTER],
  });
  const { mutate: register, isPending: isRegistering } = useMutation({
    mutationFn: postAuthRegister,
    onSuccess: () => {
      navigate(PAGE_PATH.HOME, { state: { fromSignup: true }, replace: true });
    },
    onError: (error) => {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 409) {
        alert("이미 존재하는 회원입니다.");
      } else {
        alert("회원가입에 실패하였습니다.");
      }
    },
  });

  const termsList = registerData?.termsList ?? [];

  const {
    requiredTermIds,
    selectedTerm,
    isAllAgreed,
    handleToggleAllAgreements,
    handleAgreementChange,
    handleOpenTermDetail,
    handleCloseBottomSheet,
  } = useSignUpTerms({ termsList, signupFormData, setSignupFormData });

  const bottomButtonState =
    {
      0: requiredTermIds.every((id) => signupFormData.agreedTerms.includes(id)),
      1: nicknameStatus === "PASS",
      2: signupFormData.ageCode !== null,
      3: signupFormData.genderCode !== null,
      4: signupFormData.tradeMethodCodes.length > 0,
      5: signupFormData.tradeItemCodes.length > 0,
    }[stepState] ?? false;

  // 레이아웃 관련
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | "auto">("auto");
  const keyboardHeight = useKeyboardHeight();

  useLayoutEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.offsetHeight);
    }
  }, [stepState]);

  // 회원가입 페이로드 함수
  const createRegisterPayload = (): RegisterRequest | null => {
    if (!signupFormData.nickname) {
      alert("필수 입력값이 누락되었습니다.");
      return null;
    }
    const optionalTermIds = termsList
      .filter((term) => !term.required)
      .map((term) => term.id);
    const agreedRequiredTerms = signupFormData.agreedTerms.filter((id) =>
      requiredTermIds.includes(id),
    );
    const agreedOptionalTerms = signupFormData.agreedTerms.filter((id) =>
      optionalTermIds.includes(id),
    );

    return {
      nickname: signupFormData.nickname,
      ageCode: signupFormData.ageCode,
      genderCode: signupFormData.genderCode,
      tradeMethodCodeList: signupFormData.tradeMethodCodes,
      tradeItemCodeList: signupFormData.tradeItemCodes,
      agreedRequiredTerms,
      agreedOptionalTerms,
    };
  };

  const handleNextStep = () => {
    if (isRegistering) return;

    if (stepState < 5) {
      setDirection(1);
      setStepState((prev) => prev + 1);
    } else {
      const payload = createRegisterPayload();
      if (payload) {
        register(payload);
      }
    }
  };

  const handlePrevStep = () => {
    setDirection(-1);
    if (stepState > 0) {
      setStepState((prev) => prev - 1);
    } else {
      navigate(PAGE_PATH.AUTH.LOGIN, { replace: true });
    }
  };

  const handleSkip = () => {
    if (isRegistering) return;

    const payload = createRegisterPayload();
    if (payload) {
      register(payload);
    }
  };

  return {
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
    bottomButtonState: bottomButtonState && !isRegistering,
  };
};
