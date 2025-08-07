import { useEffect } from "react";

import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import z from "zod";

import { getCheckNickname } from "@/apis/auth/getCheckNickname";
import { useDebounce } from "@/hooks/useDebounce";
import type { NicknameStatus } from "@/types/signup/signup.types";

interface UseNicknameValidationProps {
  nickname: string;
  setNicknameStatus: (status: NicknameStatus) => void;
}

const NicknameSchema = z
  .string()
  .min(2, "TOO_SHORT")
  .max(5, "TOO_LONG")
  .regex(/^[a-z0-9가-힣]+$/, "INVALID_FORMAT");

const validateNicknameFormat = (text: string): NicknameStatus => {
  if (!text || text.trim().length === 0) return "NORMAL";

  const result = NicknameSchema.safeParse(text);
  if (result.success) {
    return "VALID_FORMAT";
  }
  return result.error.issues[0].message as NicknameStatus;
};

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
