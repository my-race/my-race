import LocalStorage from "../_services/LocalStorage/LocalStorage";
import { LocalStorageKey } from "../_services/LocalStorage/LocalStorage.type";
import { useAuthStore } from "../_stores/useAuthStore";

const useAuth = () => {
  const { user, setUser } = useAuthStore();
  const localStorage = new LocalStorage();
  const isLoggedIn = !!user;

  const login = (token: string) => {
    setUser({ name: "Bran" });
    localStorage.setItem(LocalStorageKey.TOKEN, token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LocalStorageKey.TOKEN);
  };

  return {
    user,
    isLoggedIn,
    login,
    logout,
  };
};

export default useAuth;
