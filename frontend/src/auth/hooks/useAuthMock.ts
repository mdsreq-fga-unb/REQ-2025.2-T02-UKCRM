import { useState, useCallback, useMemo, useEffect } from "react";
import type { User, LoginCredentials } from "../types/auth.types";

const MOCK_USER: User = {
  id: 1,
  email: "udsonwiter@gmail.com",
  nome: "Udson Witer",
};

const MOCK_EMAIL = "udsonwiter@gmail.com";
const MOCK_PASSWORD = "123456";

export function useAuthMock() {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("mockUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (
      credentials.email === MOCK_EMAIL &&
      credentials.password === MOCK_PASSWORD
    ) {
      setUser(MOCK_USER);
      localStorage.setItem("mockUser", JSON.stringify(MOCK_USER));
      setIsLoading(false);
      return MOCK_USER;
    } else {
      setError("Credenciais inválidas");
      setIsLoading(false);
      throw new Error("Credenciais inválidas");
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    setUser(null);
    localStorage.removeItem("mockUser");
    setIsLoading(false);
  }, []);

  const isAuthenticated = useMemo(() => user !== null, [user]);

  useEffect(() => {
    // Sync with localStorage changes (e.g., from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "mockUser") {
        setUser(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return useMemo(
    () => ({
      user,
      isLoading,
      error,
      isAuthenticated,
      login,
      logout,
    }),
    [user, isLoading, error, isAuthenticated, login, logout]
  );
}
