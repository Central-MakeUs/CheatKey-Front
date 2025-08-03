import { useEffect } from "react";

import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { getCheckNickname } from "@/apis/auth/getCheckNickname";
import { useDebounce } from "@/hooks/useDebounce";
import type { NicknameStatus } from "@/types/signup/signup.types";

interface UseNicknameValidationProps {
  nickname: string;
  setNicknameStatus: (status: NicknameStatus) => void;
}

export const useNicknameValidation = ({
  nickname,
  setNicknameStatus,
}: UseNicknameValidationProps) => {
  const debouncedNickname = useDebounce(nickname, 500);

  const { mutate: checkNickname } = useMutation({
    mutationFn: getCheckNickname,
    onSuccess: () => {
      setNicknameStatus("PASS");
    },
    onError: (error) => {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 409) {
        setNicknameStatus("DUPLICATE");
      }
    },
  });

  const validateNicknameFormat = (text: string): NicknameStatus => {
    if (!text || text.trim().length === 0) return "NORMAL";

    // 허용된 문자(한글, 영문 소문자, 숫자) 외에 다른 문자가 있는지 검사
    // [^...]: 괄호 안의 문자를 제외한 모든 문자와 일치
    const invalidCharsRegex = /[^a-z0-9가-힣]/;

    if (invalidCharsRegex.test(text)) {
      return "INVALID_FORMAT";
    }

    if (text.length < 2) return "TOO_SHORT";
    if (text.length > 5) return "TOO_LONG";

    return "VALID_FORMAT";
  };

  useEffect(() => {
    setNicknameStatus(validateNicknameFormat(nickname));
  }, [nickname, setNicknameStatus]);

  useEffect(() => {
    if (debouncedNickname === "") {
      setNicknameStatus("NORMAL");
      return;
    }

    const formatStatus = validateNicknameFormat(debouncedNickname);

    if (formatStatus !== "VALID_FORMAT") {
      setNicknameStatus(formatStatus);
      return;
    }

    // 형식이 유효하면, 서버에 중복 체크 요청
    checkNickname({ nickname: debouncedNickname });
  }, [debouncedNickname, setNicknameStatus, checkNickname]);
};
