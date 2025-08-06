module.exports = () => {
  const KAKAO_NATIVE_APP_KEY = process.env.EXPO_PUBLIC_KAKAO_NATIVE_KEY;

  return {
    name: "native",
    slug: "native",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/cheatkey_icon.png",
    scheme: "native",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.cheatkey.native",
      infoPlist: {
        CFBundleURLTypes: [
          {
            CFBundleURLSchemes: ["native", "com.cheatkey.native"],
          },
          {
            CFBundleURLSchemes: [`kakao${KAKAO_NATIVE_APP_KEY}`],
            CFBundleURLName: "Kakao",
          },
        ],
        LSApplicationQueriesSchemes: [
          "kakaokompassauth",
          "kakaolink",
          "kakaoplus",
        ],
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive_icon.png",
        backgroundColor: "#161517",
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
          image: "./assets/images/cheatkey.png",
          imageWidth: 180,
          resizeMode: "contain",
          backgroundColor: "#161517",
        },
      ],
      [
        "expo-build-properties",
        {
          android: {
            extraMavenRepos: [
              "https://devrepo.kakao.com/nexus/content/groups/public/",
            ],
          },
        },
      ],
      [
        "@react-native-kakao/core",
        {
          nativeAppKey: KAKAO_NATIVE_APP_KEY,
          android: {
            authCodeHandlerActivity: true,
          },
          ios: {
            handleKakaoOpenUrl: true,
          },
        },
      ],
      "expo-apple-authentication",
      ["expo-secure-store"],
    ],

    experiments: {
      typedRoutes: true,
    },
  };
};
