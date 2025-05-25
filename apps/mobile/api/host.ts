// app entry file, e.g., app/index.tsx or App.tsx

import Constants from 'expo-constants';
import { getIpAddressAsync } from 'expo-network';

export const getWebUrl = async (): Promise<string | null> => {
  if (!__DEV__) {
    // Production 환경
    return Constants.expoConfig?.extra?.WEB_URL ?? null;
  }

  // 개발 환경
  const ip = await getIpAddressAsync();
  if (!ip) return null;

  return `http://${ip}:3000`;
}
