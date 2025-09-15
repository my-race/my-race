export interface PostKakaoLoginRequest {
  code: string;
  redirect_uri: string;
}

export interface PostKakaoLoginResponse {
  message: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    date_joined: string;
    is_active: boolean;
  };
  token: string;
}
