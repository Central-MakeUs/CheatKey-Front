import { motion } from "motion/react";

import { Bubble } from "@/components/common/Bubble";
import { AppleLogin } from "@/components/login/AppleLogin";
import { KakaoLogin } from "@/components/login/KakaoLogin";

import CheatKeyLogo from "@/assets/logo/logo_cheatkey.svg?react";
import CheatKeyTextLogo from "@/assets/logo/logo_cheatkey_text.svg?react";

export const LoginPage = () => {
  return (
    <div className="safearea relative flex h-screen w-full flex-1 flex-col items-center justify-center">
      <CheatKeyLogo className="h-auto w-28 -translate-y-10" />
      <CheatKeyTextLogo className="mt-11 h-auto w-40 -translate-y-10" />

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
        <div className="w-full">
          <KakaoLogin />
          <AppleLogin />
        </div>
      </div>
    </div>
  );
};
