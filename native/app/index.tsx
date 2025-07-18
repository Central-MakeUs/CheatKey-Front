import React, { useEffect } from "react";

import { createWebView } from "@webview-bridge/react-native";
import { appBridge, appSchema } from "@/bridge";
import { initializeKakaoSDK } from "@react-native-kakao/core";

import {
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";

const { WebView } = createWebView({
  bridge: appBridge,
  postMessageSchema: appSchema,
  debug: true,
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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
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
          // Tifsy 설정
          keyboardDisplayRequiresUserAction={false}
          automaticallyAdjustContentInsets={false}
          contentInsetAdjustmentBehavior="never"
          onError={(e) => {
            console.error("WebView error:", e.nativeEvent);
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#161517",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
