import CheckBoxOff from "@/assets/icons/checkbox_off.svg?react";
import CheckBoxOn from "@/assets/icons/checkbox_on.svg?react";
import OpenDetailTerm from "@/assets/icons/prev.svg?react";

interface TermFormProps {
  agreements: {
    term: boolean;
    privacy: boolean;
    marketing: boolean;
  };
  isAllAgreed: boolean;
  onToggleAll: () => void;
  onToggle: (name: "term" | "privacy" | "marketing") => void;
}

export const TermForm = ({
  agreements,
  isAllAgreed,
  onToggleAll,
  onToggle,
}: TermFormProps) => {
  const handleOpenDetail = (termName: string) => {
    alert(`${termName} 상세 보기`);
  };

  return (
    <>
      <h1 className="head-2-semibold text-base-0 mt-19 px-5">
        서비스 이용을 위해
        <br />
        이용약관에 동의해 주세요.
      </h1>

      {/* 전체 동의 섹션 */}
      <div className="border-b-gray-system-700 mt-8 flex items-center gap-2.5 border-b px-5 py-4">
        <button type="button" onClick={onToggleAll}>
          {isAllAgreed ? (
            <CheckBoxOn className="h-6 w-6" />
          ) : (
            <CheckBoxOff className="h-6 w-6" />
          )}
        </button>
        <p className="body-1-bold text-base-0">전체 동의</p>
      </div>

      {/* 개별 약관 목록 섹션 추후에 서버 연동 후 변경 예정*/}
      <div className="flex flex-col gap-6 px-5 pt-[1.875rem]">
        <TermCheckBox
          isCheck={agreements.term}
          onToggle={() => onToggle("term")}
          onOpenDetail={() => handleOpenDetail("서비스 이용약관")}
          label="서비스 이용약관 동의 (필수)"
        />
        <TermCheckBox
          isCheck={agreements.privacy}
          onToggle={() => onToggle("privacy")}
          onOpenDetail={() => handleOpenDetail("개인정보 수집 및 이용 동의서")}
          label="개인정보 수집 및 이용 동의서 (필수)"
        />
        <TermCheckBox
          isCheck={agreements.marketing}
          onToggle={() => onToggle("marketing")}
          onOpenDetail={() => handleOpenDetail("광고성 정보 내용 수신 동의")}
          label="광고성 정보 내용 수신 동의 (선택)"
        />
      </div>
    </>
  );
};

interface TermCheckBoxProps {
  isCheck: boolean;
  onToggle: () => void;
  onOpenDetail: () => void;
  label: string;
}

const TermCheckBox = ({
  isCheck,
  onToggle,
  onOpenDetail,
  label,
}: TermCheckBoxProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2.5">
        <button type="button" onClick={onToggle}>
          {isCheck ? (
            <CheckBoxOn className="h-6 w-6" />
          ) : (
            <CheckBoxOff className="h-6 w-6" />
          )}
        </button>
        <p className="body-2-medium text-base-0">{label}</p>
      </div>
      <button type="button" onClick={onOpenDetail}>
        <OpenDetailTerm className="text-gray-system-700 h-6 w-6 -rotate-180" />
      </button>
    </div>
  );
};
