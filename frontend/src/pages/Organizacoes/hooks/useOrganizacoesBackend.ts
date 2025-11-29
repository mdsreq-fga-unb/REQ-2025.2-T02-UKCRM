import { useState, useCallback, useMemo, useEffect } from "react";

export interface Organization {
  id: number;
  nome: string;
  dataCriacao: string;
  dataAtualizacao: string;
  proprietario: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

export function useOrganizacoesBackend() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganizations = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/organizacoes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar organizações: ${response.statusText}`);
      }

      const data = await response.json();
      setOrganizations(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      console.error("Erro ao buscar organizações:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreate = useCallback(async (data: Omit<Organization, "id" | "dataCriacao" | "dataAtualizacao">) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/organizacoes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erro ao criar organização: ${response.statusText}`);
      }

      const newOrg = await response.json();
      setOrganizations((prev) => [...prev, newOrg]);
      return newOrg;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      console.error("Erro ao criar organização:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleUpdate = useCallback(async (id: number, data: Partial<Organization>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/organizacoes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar organização: ${response.statusText}`);
      }

      const updatedOrg = await response.json();
      setOrganizations((prev) =>
        prev.map((org) => (org.id === id ? updatedOrg : org))
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      console.error("Erro ao atualizar organização:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/organizacoes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao deletar organização: ${response.statusText}`);
      }

      setOrganizations((prev) => prev.filter((org) => org.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      console.error("Erro ao deletar organização:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  // Fetch organizations on mount
  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  return useMemo(
    () => ({
      organizations,
      isLoading,
      error,
      handleCreate,
      handleUpdate,
      handleDelete,
      handleRefresh,
    }),
    [organizations, isLoading, error, handleCreate, handleUpdate, handleDelete, handleRefresh]
  );
}
