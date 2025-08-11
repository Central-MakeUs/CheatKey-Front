import React, { useEffect, useRef } from "react";

import { StatusBar, StyleSheet, View, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createWebView } from "@webview-bridge/react-native";
import { appBridge, appSchema } from "@/bridge";
import { initializeKakaoSDK } from "@react-native-kakao/core";
import { useInitialUrl } from "@/hooks/useInitialUrl";
import { SplashScreen } from "expo-router";
import { WebView as RNWebView } from "react-native-webview";

const { WebView } = createWebView({
  bridge: appBridge,
  postMessageSchema: appSchema,
  debug: true,
});

export default function WebViewScreen() {
  const insets = useSafeAreaInsets();
  const webViewRef = useRef<RNWebView>(null);

  const WEB_APP_URL = process.env.EXPO_PUBLIC_WEB_URL || "";
  const KAKAO_NATIVE_APP_KEY = process.env.EXPO_PUBLIC_KAKAO_NATIVE_KEY || "";

  const { initialUrl, isLoading } = useInitialUrl(WEB_APP_URL);

  const handleWebViewLoad = () => {
    const safeAreaScript = `
      document.documentElement.style.setProperty('--safe-area-inset-top', '${insets.top}px');
      document.documentElement.style.setProperty('--safe-area-inset-right', '${insets.right}px');
      document.documentElement.style.setProperty('--safe-area-inset-bottom', '${insets.bottom}px');
      document.documentElement.style.setProperty('--safe-area-inset-left', '${insets.left}px');
      true;
    `;

    webViewRef.current?.injectJavaScript(safeAreaScript);
    SplashScreen.hideAsync();
  };

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

  useEffect(() => {
    appBridge.setState({
      safeAreaTop: insets.top,
      safeAreaRight: insets.right,
      safeAreaBottom: insets.bottom,
      safeAreaLeft: insets.left,
    });
  }, [insets]);

  const injectedJavaScript = `
    document.documentElement.style.setProperty('--safe-area-inset-top', '${insets.top}px');
    document.documentElement.style.setProperty('--safe-area-inset-right', '${insets.right}px');
    document.documentElement.style.setProperty('--safe-area-inset-bottom', '${insets.bottom}px');
    document.documentElement.style.setProperty('--safe-area-inset-left', '${insets.left}px');
    true; 
  `;

  if (isLoading || !initialUrl) {
    return (
      <View
        style={[
          styles.container,
          styles.center,
          { backgroundColor: "#161517" },
        ]}
      >
        <ActivityIndicator size="large" color={"#fff"} />
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
      <WebView
        ref={webViewRef}
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
        onLoad={handleWebViewLoad}
        onLoadEnd={handleWebViewLoad}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: "#161517",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
