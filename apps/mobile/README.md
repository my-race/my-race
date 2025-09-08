# Mobile App (React Native)

My Race 모바일 애플리케이션

## 기술 스택

- **프레임워크**: React Native (Expo SDK 53)
- **네비게이션**: Expo Router
- **상태관리**: Zustand
- **런타임**: React 19
- **테스트**: Jest + Expo Jest
- **타입스크립트**: TypeScript 5.8.x

## 프로젝트 구조

```
apps/mobile/
├── app/                       # Expo Router 페이지
│   ├── (tabs)/               # 탭 네비게이션
│   ├── _layout.tsx           # 루트 레이아웃
│   └── index.tsx             # 홈 페이지
├── api/                      # API 관련
├── assets/                   # 이미지, 폰트 등
├── components/               # 재사용 컴포넌트
├── constants/                # 상수 및 설정
├── stores/                   # Zustand 스토어
├── app.config.ts             # Expo 설정
├── package.json
└── babel.config.js
```

## 환경변수 설정

`.env` 파일을 생성하고 다음 변수들을 설정하세요:

```bash
# 앱 환경
EXPO_PUBLIC_APP_ENV=development

# 웹 URL (개발환경)
EXPO_PUBLIC_WEB_URL=http://localhost:3000

# 프로덕션 환경에서는
# EXPO_PUBLIC_WEB_URL=https://my-race.com
```

## 개발 시작

### 필수 준비사항

1. Node.js 18+ 설치
2. Expo CLI 설치: `npm install -g @expo/cli`
3. iOS Simulator (macOS) 또는 Android Studio 설치

### 의존성 설치
```bash
# 루트에서 실행
yarn install
```

### 개발 서버 실행

#### iOS 시뮬레이터에서 실행
```bash
# 루트에서
yarn workspace mobile dev

# 또는 모바일 앱 디렉토리에서
yarn ios
```

#### Android 에뮬레이터에서 실행
```bash
yarn android
```

#### 캐시 클리어 후 실행
```bash
# 루트에서
yarn dev:mobile:clean

# 또는 모바일 앱 디렉토리에서
yarn ios -c
```

#### 웹 브라우저에서 실행
```bash
yarn web
```

### 빌드

#### 개발용 빌드
```bash
expo build:ios
expo build:android
```

#### EAS 빌드 (권장)
```bash
# EAS CLI 설치
npm install -g eas-cli

# 빌드
eas build --platform ios
eas build --platform android
```

## 주요 기능

### 웹뷰 통합
- 웹 앱과의 연동을 위한 WebView 구현
- 네이티브-웹 간 통신 지원

### 네비게이션
- Expo Router 기반 파일 시스템 라우팅
- 탭 네비게이션 구조

### 상태 관리
- Zustand를 통한 전역 상태 관리
- 웹 URL 상태 관리

### 환경별 설정
- 개발/프로덕션 환경별 설정 분리
- 동적 호스트 설정

## 스크립트

- `yarn dev` - iOS 시뮬레이터에서 개발 실행
- `yarn dev:clean` - 캐시 클리어 후 개발 실행
- `yarn start` - Expo 개발 서버 시작
- `yarn ios` - iOS 시뮬레이터에서 실행
- `yarn android` - Android 에뮬레이터에서 실행
- `yarn web` - 웹 브라우저에서 실행
- `yarn test` - Jest 테스트 실행

## 개발 팁

### 디버깅
- React Native Debugger 사용 권장
- Expo Dev Tools를 통한 실시간 로그 확인

### 네이티브 모듈 추가
- Expo SDK 내 모듈 우선 사용
- 커스텀 네이티브 모듈 필요시 `expo eject` 고려

### 퍼포먼스 최적화
- 이미지 최적화 (WebP 형식 권장)
- 번들 크기 모니터링
- 렌더링 최적화 (React.memo, useMemo 활용)