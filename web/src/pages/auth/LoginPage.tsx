import { motion } from "motion/react";

import { LoadingAnalyze } from "@/components/animation/LoadingAnalyze";
import { Bubble } from "@/components/common/Bubble";
import { KakaoLogin } from "@/components/login/KakaoLogin";

export const LoginPage = () => {
  return (
    <div className="relative flex h-full w-full flex-1 flex-col items-center justify-center bg-gradient-to-b from-[rgba(11,49,255,0.3)] via-[rgba(31,32,47,0)] via-45% to-[rgba(11,49,255,0.09)]">
      <div className="flex flex-col items-center gap-2">
        <div className="bg-base-0 h-40 w-40" />
        <h1 className="text-base-0 head-2-semibold mt-[1.375rem]">
          치트키에 오신 것을 환영합니다!
        </h1>
      </div>
      <LoadingAnalyze />
      <div className="absolute bottom-11 flex w-full flex-col items-center gap-8 px-5">
        <motion.div
          animate={{
            y: ["0%", "-15%", "0%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Bubble dir="bottom_center" text="3초만에 로그인 하기!" />
        </motion.div>
        <KakaoLogin />
      </div>
    </div>
  );
};
