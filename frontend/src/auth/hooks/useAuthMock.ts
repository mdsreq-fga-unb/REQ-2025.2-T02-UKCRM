import { useState, useCallback, useMemo, useEffect } from "react";
import type { User, LoginCredentials } from "../types/auth.types";

/**
 * Mock users for testing different role permissions
 * Password for all users: "123456"
 *
 * Available test users:
 * - sdr@test.com - SDR role (only Funis page)
 * - closer@test.com - Closer role (only Funis page)
 * - coordinator@test.com - Sales Coordinator role (only Funis page)
 * - manager@test.com - Sales Manager role (Funis + Times pages)
 * - owner@test.com - Owner role (Funis + Times + Membros pages)
 * - admin@test.com - Admin role (only Organizações page)
 * - udsonwiter@gmail.com - Owner role (default user)
 */
const MOCK_USERS: Record<string, User> = {
  "sdr@test.com": {
    id: 1,
    email: "sdr@test.com",
    nome: "SDR User",
    role: "SDR",
    organization_id: 1,
  },
  "closer@test.com": {
    id: 2,
    email: "closer@test.com",
    nome: "Closer User",
    role: "Closer",
    organization_id: 1,
  },
  "coordinator@test.com": {
    id: 3,
    email: "coordinator@test.com",
    nome: "Sales Coordinator",
    role: "Sales Coordinator",
    organization_id: 1,
  },
  "manager@test.com": {
    id: 4,
    email: "manager@test.com",
    nome: "Sales Manager",
    role: "Sales Manager",
    organization_id: 1,
  },
  "owner@test.com": {
    id: 5,
    email: "owner@test.com",
    nome: "Owner User",
    role: "Owner",
    organization_id: 1,
  },
  "admin@test.com": {
    id: 6,
    email: "admin@test.com",
    nome: "Admin User",
    role: "Admin",
    organization_id: 1,
  },
  "udsonwiter@gmail.com": {
    id: 7,
    email: "udsonwiter@gmail.com",
    nome: "Udson Witer",
    role: "Owner",
    organization_id: 1,
  },
};

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

    const mockUser = MOCK_USERS[credentials.email];

    if (mockUser && credentials.password === MOCK_PASSWORD) {
      setUser(mockUser);
      localStorage.setItem("mockUser", JSON.stringify(mockUser));
      setIsLoading(false);
      return mockUser;
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
