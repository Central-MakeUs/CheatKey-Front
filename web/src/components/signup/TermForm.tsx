import CheckBoxOff from "@/assets/icons/checkbox_off.svg?react";
import CheckBoxOn from "@/assets/icons/checkbox_on.svg?react";
import OpenDetailTerm from "@/assets/icons/prev.svg?react";

interface Term {
  id: number;
  title: string;
  required: boolean;
}
interface TermFormProps {
  terms: Term[];
  agreedTerms: number[];
  isAllAgreed: boolean;
  onToggleAll: () => void;
  onToggle: (termId: number) => void;
  onClickDetail: (termId: number) => void;
}

export const TermForm = ({
  terms,
  agreedTerms,
  isAllAgreed,
  onToggleAll,
  onToggle,
  onClickDetail,
}: TermFormProps) => {
  return (
    <>
      <h1 className="head-2-semibold text-base-0 mt-19 px-5">
        서비스 이용을 위해
        <br />
        이용약관에 동의해 주세요.
      </h1>

      {/* 전체 동의 섹션 */}
      <div className="border-b-bg-50 mx-5 mt-8 flex items-center gap-2.5 border-b py-4">
        <button
          type="button"
          onClick={onToggleAll}
          role="checkbox"
          aria-checked={isAllAgreed}
          aria-labelledby="agree-all-label"
        >
          {isAllAgreed ? (
            <CheckBoxOn className="h-6 w-6" />
          ) : (
            <CheckBoxOff className="h-6 w-6" />
          )}
        </button>
        <p id="agree-all-label" className="body-1-bold text-base-0">
          전체 동의
        </p>
      </div>

      <div className="flex flex-col gap-6 px-5 pt-[1.875rem]">
        {terms.map((term) => (
          <TermCheckBox
            key={term.id}
            isCheck={agreedTerms.includes(term.id)}
            onToggle={() => onToggle(term.id)}
            onOpenDetail={() => onClickDetail(term.id)}
            label={term.title}
          />
        ))}
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
  const labelId = `term-label-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onToggle}
          role="checkbox"
          aria-checked={isCheck}
          aria-labelledby={labelId}
        >
          {isCheck ? (
            <CheckBoxOn className="h-6 w-6" />
          ) : (
            <CheckBoxOff className="h-6 w-6" />
          )}
        </button>
        <p id={labelId} className="body-2-medium text-base-0">
          {label}
        </p>
      </div>
      <button
        type="button"
        onClick={onOpenDetail}
        aria-label={`${label} 상세 보기`}
      >
        <OpenDetailTerm className="text-gray-system-700 h-6 w-6 -rotate-180" />
      </button>
    </div>
  );
};
