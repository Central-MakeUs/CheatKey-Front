import { useRef } from "react";

import { useNavigate } from "react-router-dom";

import { AppHeader } from "@/components/common/AppHeader";
import { ToTop } from "@/components/common/ToTop";
import { TermItem } from "@/components/my/TermItem";

import {
  TERMS_OF_SERVICE_CONTENT,
  PRIVACY_POLICY_CONTENT,
  MARKETING_CONSENT_CONTENT,
} from "@/constants/termContents";

export const TermsPage = () => {
  const navigate = useNavigate();

  const scrollRef = useRef<HTMLDivElement>(null);

  // TODO: @Ki-Tak 추후, 서버 연동

  return (
    <div className="safearea page bg-bg-100">
      <AppHeader
        title="이용약관"
        onPrev={() => {
          navigate(-1);
        }}
        className="bg-bg-100"
      />
      <div className="overflow-y-auto pt-10 pb-14">
        <TermItem
          title={TERMS_OF_SERVICE_CONTENT.title}
          content={TERMS_OF_SERVICE_CONTENT.content}
        />
        <TermItem
          title={PRIVACY_POLICY_CONTENT.title}
          content={PRIVACY_POLICY_CONTENT.content}
        />
        <TermItem
          title={MARKETING_CONSENT_CONTENT.title}
          content={MARKETING_CONSENT_CONTENT.content}
        />
      </div>
      <ToTop bottom="2rem" scrollContainerRef={scrollRef} />
    </div>
  );
};
