const protectedPaths = ["/dashboard", "/settings"];

export function isProtectedRoute(pathname: string) {
  return protectedPaths.some((path) => pathname.startsWith(path));
}

// 제외할 경로 목록
const EXCLUDE_PATHS = ["api", "_next", "favicon.ico", "login"];

/**
 * 블랙리스트 matcher 생성
 */
const buildBlacklistMatcher = (excluded: string[]) => {
  const pattern = `/((?!${excluded.join("|")}).*)`;
  return [pattern];
};

export const matcher = buildBlacklistMatcher(EXCLUDE_PATHS);
