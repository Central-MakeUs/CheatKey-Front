import { useEffect, useState, type ReactNode } from "react";

import {
  motion,
  AnimatePresence,
  useDragControls,
  useAnimationControls,
} from "framer-motion";
import { createPortal } from "react-dom";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

// 애니메이션 상태를 미리 정의
const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const sheetVariants = {
  visible: { y: 0 },
  hidden: { y: "100%" },
};

export const BottomSheet = ({
  isOpen,
  onClose,
  children,
}: BottomSheetProps) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  const animationControls = useAnimationControls();
  const dragControls = useDragControls();

  useEffect(() => {
    setPortalRoot(document.getElementById("bottom-sheet-root"));

    if (isOpen) {
      animationControls.start("visible");
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, animationControls]);

  if (!portalRoot) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-[2px]"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* 바텀시트 */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className="bg-bg-50 fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-lg rounded-t-[1.625rem] shadow-lg"
            variants={sheetVariants}
            initial="hidden"
            animate={animationControls}
            exit="hidden"
            transition={{ type: "spring", damping: 40, stiffness: 400 }}
            drag="y"
            dragControls={dragControls}
            dragListener={false} // 바텀 시트에서는 드래그 이벤트 X
            dragConstraints={{ top: 0 }}
            dragElastic={0}
            onDragEnd={(event, info) => {
              // y축으로 50px 이상 드래그하면 닫기
              if (info.offset.y > 50) {
                onClose();
              } else {
                // 50px 미만이면 원상 복귀
                animationControls.start("visible");
              }
            }}
          >
            {/* 드래그 핸들 */}
            <div
              onPointerDown={(event) => dragControls.start(event)}
              className="flex h-[1.625rem] w-full touch-none items-center justify-center"
            >
              <div className="bg-gray-system-600 h-1 w-10 cursor-grab rounded-full" />
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    portalRoot, // 포탈 렌더링
  );
};
