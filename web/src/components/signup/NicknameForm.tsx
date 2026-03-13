import { type ChangeEvent } from "react";

import { useNicknameValidation } from "@/hooks/auth/useNicknameValidation";
import type { NicknameStatus } from "@/types/signup/signup.types";

import { NICKNAME_MESSAGES } from "@/constants/auth/signUpConstants";

import { cn } from "@/lib/cn";

import CheckOn from "@/assets/icons/check_on.svg?react";
import CloseButton from "@/assets/icons/close_button.svg?react";

interface NicknameFormProps {
  nickname: string;
  setNickname: (value: string) => void;
  nicknameStatus: NicknameStatus;
  setNicknameStatus: (value: NicknameStatus) => void;
  isInputFocus: boolean;
  setIsInputFocus: (value: boolean) => void;
}

export const NicknameForm = ({
  nickname,
  setNickname,
  nicknameStatus,
  setNicknameStatus,
  isInputFocus,
  setIsInputFocus,
}: NicknameFormProps) => {
  useNicknameValidation({ nickname, setNicknameStatus });

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
              "border-b-gray-system-700": nicknameStatus === "NORMAL",
              "border-b-error-100": [
                "DUPLICATE",
                "INVALID_FORMAT",
                "TOO_LONG",
                "TOO_SHORT",
              ].includes(nicknameStatus),
              "border-b-primary-400":
                (isInputFocus && nicknameStatus === "NORMAL") ||
                nicknameStatus === "PASS",
            },
          )}
          value={nickname}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNickname(e.target.value)
          }
          onFocus={() => {
            setIsInputFocus(true);
          }}
          onBlur={() => setIsInputFocus(false)}
        />
        {nicknameStatus === "PASS" ? (
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
          "text-gray-system-600": nicknameStatus === "NORMAL",
          "text-error-100": [
            "DUPLICATE",
            "INVALID_FORMAT",
            "TOO_LONG",
            "TOO_SHORT",
          ].includes(nicknameStatus),
          "text-primary-400": nicknameStatus === "PASS",
        })}
      >
        {NICKNAME_MESSAGES[nicknameStatus]}
      </h2>
    </>
  );
};
