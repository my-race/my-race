FROM node:18-alpine AS builder

WORKDIR /app

# 모노레포 전체 복사
COPY . .

# Turbo 또는 Yarn workspace 설치
RUN corepack enable && yarn install --frozen-lockfile

# web 앱만 빌드
WORKDIR /app/apps/web
RUN yarn build

# ---

FROM node:18-alpine AS runner

WORKDIR /app

# 모노레포 전체 복사 (필요한 경우만)
COPY . .

WORKDIR /app/apps/web

# 앱 실행
ENV PORT=3000
EXPOSE 3000
CMD ["yarn", "start"]
