// 제외할 경로 목록
const EXCLUDE_PATHS = ["api", "_next", "favicon.ico", "login"];

export const protectedPathRegex = new RegExp(
  `^/(?!(${EXCLUDE_PATHS.join("|")}))(.*)?`,
);

export function isProtectedRoute(pathname: string) {
  return protectedPathRegex.test(pathname);
}
