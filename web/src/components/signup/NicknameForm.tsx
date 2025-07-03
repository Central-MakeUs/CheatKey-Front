import { useEffect, useState, type ChangeEvent } from "react";
import CloseButton from "@/assets/icons/close_button.svg?react";
import CheckOn from "@/assets/icons/check_on.svg?react";
import type {
  DuplicateCheckStatus,
  NicknameFormatStatus,
} from "@/types/signup/signup.types";
import { cn } from "@/utils/cn";
import { validateNicknameFormat } from "@/utils/nicknameValidator";
import { useDebounce } from "@/hooks/useDebounce";

interface NicknameFormProps {
  nickname: string;
  setNickname: (value: string) => void;
  isValidName: NicknameFormatStatus | DuplicateCheckStatus;
  setIsValidName: (value: NicknameFormatStatus | DuplicateCheckStatus) => void;
}

const NICKNAME_MESSAGES: Record<
  NicknameFormatStatus | DuplicateCheckStatus,
  string
> = {
  NORMAL: "이모티콘 및 영어 대문자는 사용할 수 없어요.",
  TOO_SHORT: "최소 2글자 이상 입력해주세요.",
  TOO_LONG: "닉네임은 5글자 이하로 입력해주세요.",
  INVALID_FORMAT: "사용할 수 없는 닉네임이에요.",
  VALID_FORMAT: "",
  PASS: "사용 가능한 닉네임이에요.",
  DUPLICATE: "이미 존재하는 닉네임이에요.",
  IDLE: "",
} as const;

export const NicknameForm = ({
  nickname,
  setNickname,
  isValidName,
  setIsValidName, // 추후 서버 통신 이후 사용 예정
}: NicknameFormProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const debouncedNickname = useDebounce(nickname, 1000);

  useEffect(() => {
    setIsValidName(validateNicknameFormat(nickname));
  }, [nickname]);

  useEffect(() => {
    if (validateNicknameFormat(debouncedNickname) !== "VALID_FORMAT") {
      return;
    }

    const checkDuplicate = async () => {
      const existingNicknames = ["관리자", "테스트", "게스트"];

      const isDuplicate = await new Promise<boolean>((resolve) => {
        setTimeout(() => {
          const result = existingNicknames.includes(debouncedNickname);
          resolve(result);
        }, 500);
      });

      if (isDuplicate) {
        setIsValidName("DUPLICATE"); // 중복일 경우
      } else {
        setIsValidName("PASS"); // 중복이 아닐 경우
      }
    };
    checkDuplicate();
  }, [debouncedNickname]);

  return (
    <>
      <h1 className="head-3-bold text-base-0 pb-3">닉네임을 설정해주세요.</h1>
      <label htmlFor="nicknameInput" className="relative h-fit w-full">
        <input
          id="nicknameInput"
          className={cn(
            "body-3-regular text-gray-system-400 w-full border-b p-3 overflow-ellipsis outline-0",
            {
              "border-b-gray-system-700":
                isValidName === "NORMAL" || isValidName === "PASS",
              "border-b-error-100":
                isValidName === "DUPLICATE" ||
                isValidName === "INVALID_FORMAT" ||
                isValidName === "TOO_LONG" ||
                isValidName === "TOO_SHORT",
              "border-b-primary-400": isFocus,
            },
          )}
          value={nickname}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNickname(e.target.value)
          }
          onFocus={() => {
            setIsFocus(true);
            setIsValidName("NORMAL");
          }}
          onBlur={() => setIsFocus(false)}
        />
        {isValidName ? (
          <button
            onClick={() => setNickname("")}
            className="absolute top-1/2 right-4 h-[1.375rem] w-[1.375rem] -translate-y-1/2 rounded-full"
          >
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
          "text-error-100":
            isValidName === "DUPLICATE" ||
            isValidName === "INVALID_FORMAT" ||
            isValidName === "TOO_LONG" ||
            isValidName === "TOO_SHORT",
          "text-primary-400": isValidName === "PASS",
        })}
      >
        {NICKNAME_MESSAGES[isValidName]}
      </h2>
    </>
  );
};
