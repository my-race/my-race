/**
 * 홈화면 개발을 위한 임시 인증 우회 함수들
 */

export const mockKakaoLogin = async (
  code?: string,
): Promise<{
  accessToken: string | null;
  errorMessage: string | null;
}> => {
  // 개발용 가짜 로그인 성공 응답
  return {
    accessToken: "fake-access-token-for-development",
    errorMessage: null,
  };
};
