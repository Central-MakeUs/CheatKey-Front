import { useState, useMemo } from "react";

import type {
  SignUpForm,
  TermContent,
  Terms,
} from "@/types/signup/signup.types";

interface UseSignUpTermsProps {
  termsList: Terms[];
  signupFormData: SignUpForm;
  setSignupFormData: React.Dispatch<React.SetStateAction<SignUpForm>>;
}

export const useSignUpTerms = ({
  termsList,
  signupFormData,
  setSignupFormData,
}: UseSignUpTermsProps) => {
  //  약관 관련 상태
  const [selectedTerm, setSelectedTerm] = useState<TermContent | null>(null);

  // 약관 관련 파생 상태
  const requiredTermIds = useMemo(
    () => termsList.filter((term) => term.required).map((term) => term.id),
    [termsList],
  );

  const isAllAgreed = useMemo(
    () =>
      termsList.length > 0 &&
      termsList.every((term) => signupFormData.agreedTerms.includes(term.id)),
    [termsList, signupFormData.agreedTerms],
  );

  // 약관 관련 핸들러
  const handleToggleAllAgreements = () => {
    if (isAllAgreed) {
      setSignupFormData((prev) => ({ ...prev, agreedTerms: [] }));
    } else {
      const allTermIds = termsList.map((term) => term.id);
      setSignupFormData((prev) => ({ ...prev, agreedTerms: allTermIds }));
    }
  };

  const handleAgreementChange = (termId: number) => {
    setSignupFormData((prev) => {
      const newAgreedTerms = prev.agreedTerms.includes(termId)
        ? prev.agreedTerms.filter((id) => id !== termId)
        : [...prev.agreedTerms, termId];
      return { ...prev, agreedTerms: newAgreedTerms };
    });
  };

  const handleOpenTermDetail = (termId: number) => {
    const term = termsList.find((term) => term.id === termId);
    if (term) {
      setSelectedTerm({ title: term.title, content: term.contents });
    }
  };

  const handleCloseBottomSheet = () => setSelectedTerm(null);

  return {
    requiredTermIds,
    selectedTerm,
    isAllAgreed,
    handleToggleAllAgreements,
    handleAgreementChange,
    handleOpenTermDetail,
    handleCloseBottomSheet,
  };
};
