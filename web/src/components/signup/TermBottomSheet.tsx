import { BottomSheet } from "../common/BottomSheet";

interface TermBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export const TermBottomSheet = ({
  isOpen,
  onClose,
  title,
  content,
}: TermBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div
        aria-labelledby="term-bottomsheet-title"
        className="flex max-h-[80vh] flex-col gap-5 overflow-y-auto px-5 py-10"
      >
        <h1 id="term-bottomsheet-title" className="head-2-semibold text-base-0">
          {title}
        </h1>
        <p className="body-5-regular text-gray-system-300 whitespace-pre-line">
          {content}
        </p>
      </div>
    </BottomSheet>
  );
};
