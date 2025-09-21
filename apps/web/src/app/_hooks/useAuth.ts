"use client";

import { useState, useEffect } from "react";
import LocalStorage from "../_services/LocalStorage/LocalStorage";
import { LocalStorageKey } from "../_services/LocalStorage/LocalStorage.type";
import { useAuthStore } from "../_stores/useAuthStore";

const localStorageService = new LocalStorage();

const useAuth = () => {
  const { user, setUser } = useAuthStore();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 2. useEffect를 사용해 클라이언트에서만 localStorage를 확인
  useEffect(() => {
    const token = localStorageService.getItem(LocalStorageKey.TOKEN);
    if (token) {
      setIsLoggedIn(true);
      loadUserInfo();
    }
  }, []);

  const loadUserInfo = async () => {
    // 실제로는 여기서 API 요청을 통해 사용자 정보를 가져옴
    setTimeout(() => setUser({ name: "bran" }), 1000);
  };

  const setAuthInfo = (token: string) => {
    localStorageService.setItem(LocalStorageKey.TOKEN, token);
    setIsLoggedIn(true);
    loadUserInfo();
  };

  const logout = () => {
    localStorageService.removeItem(LocalStorageKey.TOKEN);
    setIsLoggedIn(false);
    setUser(null);
  };

  return {
    user,
    isLoggedIn,
    setAuthInfo,
    logout,
  };
};

export default useAuth;
