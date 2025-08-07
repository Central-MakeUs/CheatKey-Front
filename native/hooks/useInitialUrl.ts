import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { authStorage } from "@/services/authStorage";

const ONBOARDING_KEY = "hasCompletedOnboarding";

export const useInitialUrl = (webAppUrl: string) => {
  const [initialUrl, setInitialUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const determineInitialUrl = async () => {
      try {
        const hasCompletedOnboarding = await SecureStore.getItemAsync(
          ONBOARDING_KEY
        );

        if (hasCompletedOnboarding !== "true") {
          setInitialUrl(`${webAppUrl}`);
        } else {
          const refreshToken = await authStorage.getRefreshToken();
          if (refreshToken) {
            setInitialUrl(`${webAppUrl}/home`);
          } else {
            setInitialUrl(`${webAppUrl}/login`);
          }
        }
      } catch {
        // 오류 시, 온보딩 화면
        setInitialUrl(`${webAppUrl}`);
      } finally {
        setIsLoading(false);
      }
    };

    determineInitialUrl();
  }, [webAppUrl]);

  return { initialUrl, isLoading };
};
