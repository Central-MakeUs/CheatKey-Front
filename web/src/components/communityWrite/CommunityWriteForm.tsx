import { useState } from "react";

import { FormTextarea } from "@/components/common/FormTextarea";
import { TermBottomSheet } from "@/components/signup/TermBottomSheet";

import { WRITE_RULE } from "@/constants/community/writeRule";

import Rule from "@/assets/icons/alert.svg?react";

export const CommunityWriteForm = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <h1 className="head-4-semibold text-base-0 flex gap-1 pb-3">
        <button
          type="button"
          aria-label="커뮤니티 이용규칙 보기"
          onClick={() => setIsOpen(true)}
          className="h-6 w-6"
        >
          <Rule className="h-full w-full" />
        </button>
        내용을 입력해주세요.<span className="text-primary-400">*</span>
      </h1>
      <FormTextarea
        id="community_write"
        value={value}
        type="Write"
        onChange={onChange}
        maxLength={500}
        placeholder="최소 10자 이상 작성해주세요."
      />
      <TermBottomSheet
        title={WRITE_RULE.title}
        content={WRITE_RULE.content}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};
