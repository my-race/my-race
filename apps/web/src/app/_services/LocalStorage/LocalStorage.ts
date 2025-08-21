import { LocalStorageKey } from "./LocalStorage.type";

class LocalStorage {
  setItem(key: LocalStorageKey, value: string) {
    localStorage.setItem(key, value);
  }

  getItem(key: LocalStorageKey) {
    return localStorage.getItem(key);
  }

  removeItem(key: LocalStorageKey) {
    localStorage.removeItem(key);
  }
}

export default LocalStorage;
