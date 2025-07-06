import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export default function WebViewScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#161517" />
      <WebView
        source={{ uri: "http://localhost:3000/signup" }}
        style={styles.webview}
        javaScriptEnabled
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
