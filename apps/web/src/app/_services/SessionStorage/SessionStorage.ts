import { SessionStorageKey } from "./SessionStorage.type";

class SessionStorage {
  setItem(key: SessionStorageKey, value: string) {
    sessionStorage.setItem(key, value);
  }

  getItem(key: SessionStorageKey) {
    return sessionStorage.getItem(key);
  }

  removeItem(key: SessionStorageKey) {
    sessionStorage.removeItem(key);
  }
}

export default SessionStorage;
