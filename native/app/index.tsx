import React, { useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createWebView } from "@webview-bridge/react-native";
import { appBridge, appSchema } from "@/bridge";
import { initializeKakaoSDK } from "@react-native-kakao/core";
import { useInitialUrl } from "@/hooks/useInitialUrl";

const { WebView } = createWebView({
  bridge: appBridge,
  postMessageSchema: appSchema,
  debug: true,
});

export default function WebViewScreen() {
  const insets = useSafeAreaInsets();

  const WEB_APP_URL = process.env.EXPO_PUBLIC_WEB_URL || "";
  const KAKAO_NATIVE_APP_KEY = process.env.EXPO_PUBLIC_KAKAO_NATIVE_KEY || "";

  const { initialUrl, isLoading } = useInitialUrl(WEB_APP_URL);

  useEffect(() => {
    const initKakaoSDK = async () => {
      try {
        await initializeKakaoSDK(KAKAO_NATIVE_APP_KEY);
      } catch (error) {
        console.error("카카오 SDK 초기화 실패:", error);
      }
    };
    initKakaoSDK();
  });

  const injectedJavaScript = `
    document.documentElement.style.setProperty('--safe-area-inset-top', '${insets.top}px');
    document.documentElement.style.setProperty('--safe-area-inset-right', '${insets.right}px');
    document.documentElement.style.setProperty('--safe-area-inset-bottom', '${insets.bottom}px');
    document.documentElement.style.setProperty('--safe-area-inset-left', '${insets.left}px');
    true; 
  `;

  if (isLoading || !initialUrl) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={insets.top}
      >
        <WebView
          source={{ uri: initialUrl }}
          style={styles.webview}
          injectedJavaScript={injectedJavaScript}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: "transparent",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
