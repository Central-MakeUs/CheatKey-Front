import Close from "@/assets/icons/close.svg?react";

type ImageCloseUpModalProps = {
  imageUrl: string;
  onClose: () => void;
};

export const ImageCloseUpModal = ({
  imageUrl,
  onClose,
}: ImageCloseUpModalProps) => {
  return (
    <div
      className="bg-bg-100 fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <img
        src={imageUrl}
        alt="확대한 이미지"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        onClick={onClose}
        className="text-base-0 absolute top-1.5 right-5 h-8 w-8"
        aria-label="확대한 이미지 닫기"
      >
        <Close className="h-full w-full" />
      </button>
    </div>
  );
};
