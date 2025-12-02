import { useState, useCallback, useMemo, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { User, LoginCredentials } from "../types/auth.types";
import { loginApi, logoutApi, getCurrentUserApi } from "../api/auth.api";
import { apiToUser } from "../utils/authTransformers";
import { PROFILE_QUERY_KEY } from "@/pages/Profile/hooks/useProfile";

export function useAuthBackend() {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      // Clear any cached profile data from previous user
      queryClient.removeQueries({ queryKey: PROFILE_QUERY_KEY });

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
  }, [queryClient]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await logoutApi();
      setUser(null);
      localStorage.removeItem("authToken");

      // Clear all cached data including profile
      queryClient.clear();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao fazer logout";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [queryClient]);

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
