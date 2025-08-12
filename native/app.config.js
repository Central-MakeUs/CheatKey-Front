module.exports = () => {
  const KAKAO_NATIVE_APP_KEY = process.env.EXPO_PUBLIC_KAKAO_NATIVE_KEY;
  const EAS_PROJECT_ID = process.env.EXPO_PUBLIC_EAS_PROJECT_ID;

  return {
    name: "CheatKey",
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
        NSCameraUsageDescription:
          "커뮤니티에 게시글을 작성할 때 사진을 직접 촬영하여 첨부하기 위해 카메라 접근 권한이 필요합니다. 촬영된 사진은 해당 게시글에만 업로드되며 다른 용도로 사용되지 않습니다.",
        NSPhotoLibraryUsageDescription:
          "커뮤니티 게시글 작성 시 기기에 저장된 사진을 첨부하기 위해 앨범 접근 권한이 필요합니다. 선택하신 사진은 게시글 업로드 용도로만 사용됩니다.",
        NSPhotoLibraryAddUsageDescription:
          "커뮤니티의 유용한 정보를 이미지 형태로 기기의 사진 보관함에 저장하기 위해 앨범 접근 권한이 필요합니다.",
      },
    },
    android: {
      package: "com.cheatkey.app",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive_icon.png",
        backgroundColor: "#161517",
      },
      edgeToEdgeEnabled: true,
    },

    extra: {
      eas: {
        projectId: EAS_PROJECT_ID,
      },
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
