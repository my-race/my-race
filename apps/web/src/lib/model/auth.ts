export interface KakaoLogin {
  message: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    dateJoined: string;
    isActive: boolean;
  };
  token: string;
}
