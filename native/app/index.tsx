import React, { useEffect } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { createWebView } from "@webview-bridge/react-native";
import { appBridge, appSchema } from "@/bridge";
import { initializeKakaoSDK } from "@react-native-kakao/core";

const { WebView } = createWebView({
  bridge: appBridge,
  postMessageSchema: appSchema,
  debug: true, // 개발 중에는 디버깅 모드를 켜는 것이 좋습니다.
});

export default function WebViewScreen() {
  const WEB_APP_URL = process.env.EXPO_PUBLIC_WEB_URL || "";
  const KAKAO_NATIVE_APP_KEY = process.env.EXPO_PUBLIC_KAKAO_NATIVE_KEY || "";

  useEffect(() => {
    const initKakaoSDK = async () => {
      try {
        await initializeKakaoSDK(KAKAO_NATIVE_APP_KEY);
      } catch (error) {
        console.error("카카오 SDK 초기화 실패:", error);
      }
    };
    initKakaoSDK();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#161517" />
      <WebView
        source={{ uri: WEB_APP_URL }}
        style={styles.webview}
        // JavaScript 관련
        javaScriptEnabled={true}
        javaScriptCanOpenWindowsAutomatically={false}
        domStorageEnabled={true}
        // 보안 설정
        mixedContentMode="compatibility"
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        // UI 설정
        bounces={false}
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // 성능 설정
        cacheEnabled={true}
        incognito={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161517",
  },
  webview: {
    flex: 1,
  },
});
