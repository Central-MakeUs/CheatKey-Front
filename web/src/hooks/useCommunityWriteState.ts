import { useState, useMemo } from "react";

import type { UploadedImage } from "@/types/communityWrite/communityWrite.types";

import { communityWriteSchema } from "@/schemas/communityWriteSchema";

export const useCommunityWriteState = () => {
  const [form, setForm] = useState({
    title: "",
    board: "",
    content: "",
    images: [] as UploadedImage[],
  });

  const validationResult = useMemo(() => {
    return communityWriteSchema.safeParse(form);
  }, [form]);

  const errors = useMemo(() => {
    if (validationResult.success) return {};

    const formattedErrors: Record<string, string> = {};
    validationResult.error.issues.forEach((error) => {
      const pathKey = error.path[0];
      if (typeof pathKey === "string" || typeof pathKey === "number") {
        formattedErrors[pathKey] = error.message;
      }
    });
    return formattedErrors;
  }, [validationResult]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

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
    modal,
    setModal,
    errors,
    isValid: validationResult.success,
    toastMessage,
    showToast,
  };
};
