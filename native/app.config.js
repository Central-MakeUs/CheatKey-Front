module.exports = () => {
  const KAKAO_NATIVE_APP_KEY = process.env.EXPO_KAKAO_NATIVE_KEY;

  return {
    name: "native",
    slug: "native",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "native",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.anonymous.native",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
        "@react-native-seoul/kako-login",
        {
          kakaoAppKey: KAKAO_NATIVE_APP_KEY,
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  };
};
