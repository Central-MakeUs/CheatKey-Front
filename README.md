# CheatKey-Front

<p align="center">
  <img width="80%" alt="치트키 프로젝트 배너" src="https://github.com/user-attachments/assets/c99dd314-ea4f-4656-857d-dc5ffc6da1cf" />
</p>
<p align="center">
  <strong>AI 기반 사기 탐지 및 예방을 위한 하이브리드 앱 프론트엔드 레포지토리</strong>
</p>

## 🧐 프로젝트 소개

**치트키**는 URL, 문자 메시지, 중고 거래 게시글 등 잠재적인 사기 위험이 있는 콘텐츠를 AI를 통해 분석하고 사용자에게 위험도를 알려주는 서비스입니다. 또한, 커뮤니티 기능을 통해 사용자들이 직접 사기 사례를 공유하고 예방법을 논의하며 사기 피해를 예방하는 것을 목표로 합니다.

이 프로젝트는 **네이티브 앱(React Native)과 웹뷰(React)를 결합한 하이브리드 앱**으로 개발되었습니다.


## 📱 다운로드

[![Google Play에서 다운로드](https://img.shields.io/badge/Google_Play-414141?style=for-the-badge&logo=google-play&logoColor=white)](https://play.google.com/store/apps/details?id=com.cheatkey.app&pcampaignid=web_share)
[![App Store에서 다운로드](https://img.shields.io/badge/App_Store-0D96F6?style=for-the-badge&logo=app-store&logoColor=white)](https://apps.apple.com/kr/app/%EC%B9%98%ED%8A%B8%ED%82%A4-ai-%EC%82%AC%EA%B8%B0%ED%83%90%EC%A7%80-%ED%94%8C%EB%9E%AB%ED%8F%BC/id6749635626)

## 💻 주요 기능

 - **AI 분석**: 사용자가 입력한 URL이나 텍스트를 AI 모델이 분석하여 `양호`, `주의`, `위험`, `분석 불가` 네 단계로 위험도를 알려줍니다.
 - **커뮤니티**: 사용자들이 직접 경험한 사기 사례를 공유하고 정보를 나눌 수 있는 공간입니다.
 - **콘텐츠**: 최신 사기 동향과 인터뷰 형식의 콘텐츠를 제공합니다 
 - **마이페이지**: 사용자는 자신의 작성글과 AI 분석 내역을 확인할 수 있습니다.



## 🛠️ 기술 스택

### **Web (WebView)**

| 구분 | 기술 |
| :--- | :--- |
| **Core** | `TypeScript`, `React` |
| **State Management** | `Zustand`, `React Query` |
| **Routing** | `React Router DOM` |
| **Styling** | `Tailwind CSS`, `Clsx` |
| **Animation** | `Framer Motion`, `Lottiefiles` |
| **HTTP Client** | `Axios` |
| **Bridge** | `@webview-bridge/web` |
| **Bundler** | `Vite` |

### **Native (iOS & Android)**

| 구분 | 기술 |
| :--- | :--- |
| **Core** | `TypeScript`, `React Native` |
| **Framework** | `Expo` |
| **Social Login** | `Kakao Login`, `Apple Login` |
| **Bridge** | `@webview-bridge/react-native` |


## ☁️ 배포 및 CI/CD

하이브리드 앱의 웹뷰(Web) 부분은 아래와 같은 AWS 서비스를 통해 배포되었습니다.

- **`Amazon S3`** +  **`Amazon CloudFront`** + **`Amazon Route 53`** + **`Github Actions`**



네이티브(Native) 앱은 각 플랫폼의 스토어를 통해 배포되었습니다.


## 📂 프로젝트 구조

```

cheatkey-front/
├── .github/              \# GitHub 관련 템플릿 및 워크플로우
├── native/               \# React Native (Expo) 프로젝트
│   ├── apis/             \# 네이티브 환경 API 호출
│   ├── app/              \# Expo Router 기반 화면 구성
│   ├── assets/           \# 폰트 및 이미지 에셋
│   ├── bridge/           \# 웹뷰-네이티브 통신 브릿지
│   └── services/         \# SecureStore를 이용한 저장소 관리
└── web/                  \# React (Vite) 프로젝트
├── public/           \# 정적 파일
└── src/
  ├── apis/         \# 웹 환경 API 호출
  ├── assets/       \# 이미지, 아이콘, 애니메이션 등
  ├── components/   \# 재사용 가능한 UI 컴포넌트
  ├── constants/    \# 상수 데이터
  ├── contexts/     \# Context API
  ├── hooks/        \# 커스텀 훅
  ├── layouts/      \# 페이지 레이아웃
  ├── lib/          \# 라이브러리 (브릿지, Zod 등)
  ├── mocks/        \# mock 데이터
  ├── pages/        \# 라우팅 페이지 컴포넌트
  ├── routes/       \# React Router 설정
  ├── stores/       \# Zustand 스토어
  ├── styles/       \# 전역 CSS
  ├── types/        \# TypeScript 타입 정의
  └── utils/        \# 유틸리티 함수

````

## ⚙️ 실행 방법

**1. 레포지토리 클론**

```bash
git clone [https://github.com/central-makeus/cheatkey-front.git](https://github.com/central-makeus/cheatkey-front.git)
cd cheatkey-front
````

**2. 웹 프로젝트 실행 (Vite)**

```bash
cd web
npm install
npm run dev
```

**3. 네이티브 프로젝트 실행 (Expo)**

```bash
cd native
npm install
npm run ios  # 또는 npm run android
```

