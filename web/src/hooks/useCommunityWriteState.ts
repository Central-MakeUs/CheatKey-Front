import { useState } from "react";

import type { UploadedImage } from "@/types/communityWrite/communityWrite.types";

export const useCommunityWriteState = () => {
  const [form, setForm] = useState({
    title: "",
    board: "",
    content: "",
    images: [] as UploadedImage[],
  });

  const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

  const isImageTooLarge = form.images.some(
    (img) => img.file.size > MAX_IMAGE_SIZE,
  );

  const [toast, setToast] = useState({
    titleTooShort: false,
    boardEmpty: false,
    imageTooLarge: false,
  });

  const [modal, setModal] = useState({
    leave: false,
    complete: false,
  });

  const updateForm = <K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const isValid =
    form.title.trim().length >= 10 &&
    form.content.trim().length >= 10 &&
    form.board.trim().length > 0;

  return {
    form,
    updateForm,
    toast,
    setToast,
    modal,
    setModal,
    isValid,
    isImageTooLarge,
  };
};
