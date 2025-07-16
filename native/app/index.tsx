import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export default function WebViewScreen() {
  const WEB_APP_URL = process.env.EXPO_PUBLIC_WEB_URL || "";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#161517" />
      <WebView
        source={{ uri: WEB_APP_URL }}
        style={styles.webview}
        javaScriptEnabled
        bounces={false}
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
