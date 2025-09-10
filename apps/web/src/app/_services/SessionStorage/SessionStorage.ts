import { SessionStorageKey } from "./SessionStorage.type";

interface StorageData {
  value: string;
  timestamp: number;
  expirationTime?: number; // milliseconds
}

class SessionStorage {
  setItem(key: SessionStorageKey, value: string, expirationMinutes: number = 30) {
    const data: StorageData = {
      value,
      timestamp: Date.now(),
      expirationTime: expirationMinutes * 60 * 1000, // 30분을 밀리초로 변환
    };
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  getItem(key: SessionStorageKey): string | null {
    const item = sessionStorage.getItem(key);
    if (!item) return null;

    try {
      const data: StorageData = JSON.parse(item);
      
      // 만료 시간 체크
      if (data.expirationTime && Date.now() - data.timestamp > data.expirationTime) {
        this.removeItem(key);
        return null;
      }
      
      return data.value;
    } catch {
      // 기존 방식의 단순 문자열일 경우 그대로 반환 (하위 호환성)
      return item;
    }
  }

  removeItem(key: SessionStorageKey) {
    sessionStorage.removeItem(key);
  }
}

export default SessionStorage;
