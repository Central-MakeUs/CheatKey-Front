import React from "react";
import {
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { WebView } from "react-native-webview";

export default function WebViewScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <StatusBar barStyle="light-content" backgroundColor="#161517" />
        <WebView
          source={{ uri: "http://localhost:3000/signup" }}
          style={styles.webview}
          javaScriptEnabled
          bounces={false}
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
