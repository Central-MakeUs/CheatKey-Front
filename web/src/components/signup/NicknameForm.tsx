import { useEffect, useState, type ChangeEvent } from "react";
import CloseButton from "@/assets/icons/close_button.svg?react";
import CheckOn from "@/assets/icons/check_on.svg?react";
import type { NicknameStatus } from "@/types/signup/signup.types";
import { cn } from "@/utils/cn";
import { validateNicknameFormat } from "@/utils/validateNicknameFormat";
import { useDebounce } from "@/hooks/useDebounce";

interface NicknameFormProps {
  nickname: string;
  setNickname: (value: string) => void;
  isValidName: NicknameStatus;
  setIsValidName: (value: NicknameStatus) => void;
}

const NICKNAME_MESSAGES: Record<NicknameStatus, string> = {
  NORMAL: "이모티콘 및 영어 대문자는 사용할 수 없어요.",
  TOO_SHORT: "최소 2글자 이상 입력해주세요.",
  TOO_LONG: "닉네임은 5글자 이하로 입력해주세요.",
  INVALID_FORMAT: "사용할 수 없는 닉네임이에요.",
  VALID_FORMAT: "중복 확인 중이에요...",
  PASS: "사용 가능한 닉네임이에요.",
  DUPLICATE: "이미 존재하는 닉네임이에요.",
} as const;

export const NicknameForm = ({
  nickname,
  setNickname,
  isValidName,
  setIsValidName,
}: NicknameFormProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const debouncedNickname = useDebounce(nickname, 500);

  useEffect(() => {
    // 클라이언트 측 형식 체크
    setIsValidName(validateNicknameFormat(nickname));
  }, [nickname, setIsValidName]);

  useEffect(() => {
    // 형식 맞지 않으면 바로 반환
    if (validateNicknameFormat(debouncedNickname) !== "VALID_FORMAT") {
      return;
    }
    // 클린업 함수 (추후에 서버 연동시 abort 컨트롤러로 변경)
    let timer: number;

    const checkDuplicate = () => {
      timer = setTimeout(() => {
        const existingNicknames = ["관리자", "테스트", "게스트"];
        const isDuplicate = existingNicknames.includes(debouncedNickname);

        if (isDuplicate) {
          setIsValidName("DUPLICATE");
        } else {
          setIsValidName("PASS");
        }
      }, 200);
    };

    checkDuplicate();

    return () => {
      clearTimeout(timer);
    };
  }, [debouncedNickname, setIsValidName]);

  return (
    <>
      <h1 className="head-3-bold text-base-0 pb-3">닉네임을 설정해주세요.</h1>
      <label htmlFor="nicknameInput" className="relative h-fit w-full">
        <input
          id="nicknameInput"
          placeholder="최대 5자까지 입력해주세요."
          className={cn(
            "body-3-regular text-gray-system-400 w-full border-b p-3 overflow-ellipsis outline-0",
            {
              "border-b-gray-system-700": isValidName === "NORMAL",
              "border-b-error-100": [
                "DUPLICATE",
                "INVALID_FORMAT",
                "TOO_LONG",
                "TOO_SHORT",
              ].includes(isValidName),
              "border-b-primary-400":
                (isFocus && isValidName === "NORMAL") || isValidName === "PASS",
            },
          )}
          value={nickname}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNickname(e.target.value)
          }
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={() => setIsFocus(false)}
        />
        {isValidName === "PASS" ? (
          <button className="absolute top-1/2 right-4 h-[1.375rem] w-[1.375rem] -translate-y-1/2 rounded-full">
            <CheckOn className="h-[1.375rem] w-[1.375rem]" />
          </button>
        ) : (
          <button
            onClick={() => setNickname("")}
            className="absolute top-1/2 right-4 h-[1.375rem] w-[1.375rem] -translate-y-1/2 rounded-full"
          >
            <CloseButton className="h-[1.375rem] w-[1.375rem]" />
          </button>
        )}
      </label>
      <h2
        className={cn("caption-2-regular text-gray-system-600 pt-2", {
          "text-gray-system-600": isValidName === "NORMAL",
          "text-error-100": [
            "DUPLICATE",
            "INVALID_FORMAT",
            "TOO_LONG",
            "TOO_SHORT",
          ].includes(isValidName),
          "text-primary-400": isValidName === "PASS",
        })}
      >
        {NICKNAME_MESSAGES[isValidName]}
      </h2>
    </>
  );
};
