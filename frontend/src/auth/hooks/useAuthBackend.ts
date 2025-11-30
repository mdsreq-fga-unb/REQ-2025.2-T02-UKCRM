import { useState, useCallback, useMemo, useEffect } from "react";
import type { User, LoginCredentials } from "../types/auth.types";
import { loginApi, logoutApi, getCurrentUserApi } from "../api/auth.api";
import { apiToUser } from "../utils/authTransformers";

export function useAuthBackend() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginApi({
        email: credentials.email,
        password: credentials.password,
      });

      const authenticatedUser = apiToUser(response.user);
      setUser(authenticatedUser);

      // Store token for subsequent requests
      localStorage.setItem("authToken", response.token);

      return authenticatedUser;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao fazer login";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await logoutApi();
      setUser(null);
      localStorage.removeItem("authToken");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao fazer logout";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const isAuthenticated = useMemo(() => user !== null, [user]);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      getCurrentUserApi()
        .then((apiUser) => {
          setUser(apiToUser(apiUser));
        })
        .catch(() => {
          // Token is invalid, remove it
          localStorage.removeItem("authToken");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // No token found, stop loading
      setIsLoading(false);
    }
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
