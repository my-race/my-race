# Web App (Next.js)

My Race 웹 애플리케이션

## 기술 스택

- **프레임워크**: Next.js 15.3.2 (App Router)
- **번들러**: Turbopack (개발 시)
- **UI**: React 19 + TailwindCSS + Framer Motion
- **인증**: NextAuth.js + 카카오 OAuth
- **상태관리**: Zustand
- **타입스크립트**: TypeScript 5.x

## 프로젝트 구조

```
apps/web/
├── src/
│   ├── app/                    # App Router 페이지
│   │   ├── api/               # API 라우트
│   │   │   └── auth/          # NextAuth 설정
│   │   └── _services/         # 서비스 레이어
│   ├── lib/                   # 유틸리티 및 설정
│   │   └── api/               # API 클라이언트
│   └── middleware/            # Next.js 미들웨어
├── package.json
└── next.config.ts
```

## 환경변수 설정

`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

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

## 개발 시작

### 의존성 설치
```bash
# 루트에서 실행
yarn install
```

### 개발 서버 실행
```bash
# 루트에서 웹앱만 실행
yarn dev:web

# 또는 웹 앱 디렉토리에서
yarn dev
```

### 빌드
```bash
yarn build
```

### 프로덕션 실행
```bash
yarn start
```

## 주요 기능

### 인증 시스템
- NextAuth.js 기반 카카오 로그인
- JWT 토큰 관리
- 세션 관리

### API 클라이언트
- Server-side API 클라이언트 (`lib/api/base.ts`)
- 자동 토큰 관리
- 에러 처리

### 카카오 SDK 통합
- 카카오 JavaScript SDK 래퍼 (`_services/Kakao/KakaoManager.ts`)
- 카카오 로그인/로그아웃
- 사용자 정보 조회

## 스크립트

- `yarn dev` - 개발 서버 (Turbopack)
- `yarn build` - 프로덕션 빌드
- `yarn start` - 프로덕션 서버
- `yarn lint` - ESLint 실행
