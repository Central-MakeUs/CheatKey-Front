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
      className="safearea bg-bg-100 fixed inset-0 z-50 flex h-screen w-full flex-col items-center"
      onClick={onClose}
    >
      <div className="flex h-fit w-full justify-end py-1.5 pr-5">
        <button
          onClick={onClose}
          className="text-base-0 h-8 w-8"
          aria-label="확대한 이미지 닫기"
        >
          <Close className="h-full w-full" />
        </button>
      </div>
      <div className="flex w-full flex-1 items-center justify-center">
        <img
          src={imageUrl}
          alt="확대한 이미지"
          className="max-h-[75vh] w-full"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};
