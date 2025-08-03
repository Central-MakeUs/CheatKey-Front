import { useState, useMemo } from "react";

import type {
  UploadedImage,
  CommunityWriteValidationError,
} from "@/types/community/community.types";

export const useCommunityWriteState = () => {
  const [form, setForm] = useState({
    title: "",
    board: "",
    content: "",
    images: [] as UploadedImage[],
  });

  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB입니다

  const validationErrors = useMemo<CommunityWriteValidationError>(() => {
    const errors: CommunityWriteValidationError = {
      titleTooShort: false,
      contentTooShort: false,
      boardEmpty: false,
      imageTooLarge: false,
    };

    if (form.title.trim().length < 10) {
      errors.titleTooShort = true;
    }
    if (form.content.trim().length < 10) {
      errors.contentTooShort = true;
    }
    if (form.board.trim().length === 0) {
      errors.boardEmpty = true;
    }
    if (form.images.some((img) => img.file.size > MAX_IMAGE_SIZE)) {
      errors.imageTooLarge = true;
    }

    return errors;
  }, [form, MAX_IMAGE_SIZE]);

  const isValid = useMemo(() => {
    return (
      !validationErrors.titleTooShort &&
      !validationErrors.contentTooShort &&
      !validationErrors.boardEmpty &&
      !validationErrors.imageTooLarge
    );
  }, [validationErrors]);

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

  return {
    form,
    updateForm,
    toast,
    setToast,
    modal,
    setModal,
    isValid,
    validationErrors,
  };
};
