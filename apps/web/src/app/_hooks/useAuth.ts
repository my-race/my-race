'use client';

import { useEffect, useState } from 'react';
import LocalStorage from '../_services/LocalStorage/LocalStorage';
import { LocalStorageKey } from '../_services/LocalStorage/LocalStorage.type';
import { useAuthStore } from '../_stores/useAuthStore';

const localStorageService = new LocalStorage();

const setSessionCookie = (token: string) => {
  if (typeof document !== 'undefined') {
    document.cookie = `next-auth.session-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7일
  }
};

const removeSessionCookie = () => {
  if (typeof document !== 'undefined') {
    document.cookie =
      'next-auth.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
};

const useAuth = () => {
  const { user, setUser } = useAuthStore();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorageService.getItem(LocalStorageKey.TOKEN);
    if (token) {
      setIsLoggedIn(true);
      loadUserInfo();
      setSessionCookie(token);
    }
  }, []);

  const loadUserInfo = async () => {
    setTimeout(() => setUser({ name: 'bran' }), 1000);
  };

  const setAuthInfo = (token: string) => {
    localStorageService.setItem(LocalStorageKey.TOKEN, token);
    setIsLoggedIn(true);
    loadUserInfo();
    setSessionCookie(token);
  };

  const logout = () => {
    localStorageService.removeItem(LocalStorageKey.TOKEN);
    setIsLoggedIn(false);
    setUser(null);
    removeSessionCookie();
  };

  return {
    user,
    isLoggedIn,
    setAuthInfo,
    logout,
  };
};

export default useAuth;
