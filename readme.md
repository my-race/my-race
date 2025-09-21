# My Race

러닝 대회 정보와 알림 서비스

## 프로젝트 구조

Turborepo + Yarn Workspaces 기반 모노레포

```
my-race/
├── apps/
│   ├── web/              # Next.js 15 웹 앱
│   └── mobile/           # React Native (Expo) 모바일 앱
├── package.json          # 루트 워크스페이스 설정
├── turbo.json            # Turborepo 설정
└── tsconfig.base.json    # 공통 TypeScript 설정
```

## 기술 스택

### 웹 앱
- **프레임워크**: Next.js 15.3.2 (App Router, Turbopack)
- **UI**: React 19 + TailwindCSS + Framer Motion
- **인증**: NextAuth.js + 카카오 OAuth
- **상태관리**: Zustand

### 모바일 앱
- **프레임워크**: React Native (Expo SDK 53)
- **네비게이션**: Expo Router
- **상태관리**: Zustand

### 개발 도구
- **패키지 매니저**: Yarn Workspaces
- **빌드**: Turborepo
- **린터**: ESLint + Prettier
- **커밋**: Husky + Commitlint

## 시작하기

### 1. 의존성 설치
```bash
yarn install
```

### 2. 환경변수 설정

#### 웹 앱 (`apps/web/.env.local`)
```bash
# NextAuth 설정
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key

# 카카오 OAuth
KAKAO_CLIENT_ID=your-kakao-rest-api-key
KAKAO_CLIENT_SECRET=your-kakao-client-secret
NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY=your-kakao-javascript-key

# 서비스 URL
NEXT_PUBLIC_SERVICE_URL=http://localhost:3000/

# 백엔드 API
API_BASE_URL=https://api.my-race.com
```

#### 모바일 앱 (`apps/mobile/.env`)
```bash
# 앱 환경
EXPO_PUBLIC_APP_ENV=development

# 웹 URL
EXPO_PUBLIC_WEB_URL=http://localhost:3000
```

### 3. 개발 서버 실행

#### 전체 앱 실행
```bash
yarn dev
```

#### 웹 앱만 실행
```bash
yarn dev:web
```

#### 모바일 앱만 실행
```bash
yarn workspace mobile dev
```

#### 클린 실행 (캐시 제거)
```bash
yarn dev:clean
```

### 4. 빌드
```bash
yarn build
```

## 카카오 개발자 설정

1. [카카오 개발자 콘솔](https://developers.kakao.com/)에서 앱 등록
2. 플랫폼 설정:
   - 웹: `http://localhost:3000`
   - 카카오로그인 Redirect URI: `http://localhost:3000/api/auth/callback/kakao`
3. 필요한 키 발급:
   - REST API 키 → `KAKAO_CLIENT_ID`
   - JavaScript 키 → `NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY`
   - Client Secret → `KAKAO_CLIENT_SECRET`

## 스크립트

- `yarn dev` - 모든 앱 개발 모드 실행
- `yarn dev:web` - 웹 앱만 실행
- `yarn dev:mobile:clean` - 모바일 앱 캐시 클리어 후 실행
- `yarn dev:clean` - 웹 + 모바일 동시 실행
- `yarn build` - 전체 빌드