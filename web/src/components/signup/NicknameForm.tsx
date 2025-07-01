import { useState, type ChangeEvent } from "react";
import CloseButton from "@/assets/icons/close_button.svg?react";
import CheckOn from "@/assets/icons/check_on.svg?react";

interface NicknameFormProps {
  nickname: string;
  setNickname: (value: string) => void;
  isValidName: boolean;
  setIsValidName: (value: boolean) => void;
}
export const NicknameForm = ({
  nickname,
  setNickname,
  isValidName,
  setIsValidName, // 추후 서버 통신 이후 사용 예정
}: NicknameFormProps) => {
  return (
    <>
      <h1 className="head-3-bold text-base-0 pb-3">닉네임을 설정해주세요.</h1>
      <label htmlFor="nicknameInput" className="relative h-fit w-full">
        <input
          id="nicknameInput"
          className="body-3-regular text-gray-system-400 border-b-gray-system-700 focus:border-b-primary-400 w-full border-b p-3 overflow-ellipsis outline-0"
          value={nickname}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNickname(e.target.value)
          }
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
      <h2 className="caption-2-regular text-gray-system-600 pt-2">
        이모티콘 사용 불가, 중복 닉네임 금지, 대문자 미포함
      </h2>
    </>
  );
};
