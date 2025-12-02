import { useState, useCallback, useMemo, useEffect } from "react";
import type {
  ApiOrganization,
  ApiOrganizationCreatePayload,
  ApiOrganizationUpdatePayload,
} from "../api/organizations.api";
import {
  fetchOrganizations,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} from "../api/organizations.api";
import { apiToOrganizations } from "../utils/organizationTransformers";

export function useOrganizacoesBackend() {
  const [organizations, setOrganizations] = useState<ApiOrganization[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganizationsList = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchOrganizations();
      setOrganizations(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      console.error("Erro ao buscar organizações:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreate = useCallback(
    async (data: ApiOrganizationCreatePayload) => {
      setIsLoading(true);
      setError(null);

      try {
        const newOrg = await createOrganization(data);
        setOrganizations((prev) => [...prev, newOrg]);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
        setError(errorMessage);
        console.error("Erro ao criar organização:", err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleUpdate = useCallback(
    async (id: number, data: ApiOrganizationUpdatePayload) => {
      setIsLoading(true);
      setError(null);

      try {
        const updatedOrg = await updateOrganization(id, data);
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
    },
    []
  );

  const handleDelete = useCallback(async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      await deleteOrganization(id);
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
    fetchOrganizationsList();
  }, [fetchOrganizationsList]);

  // Fetch organizations on mount
  useEffect(() => {
    fetchOrganizationsList();
  }, [fetchOrganizationsList]);

  return useMemo(
    () => ({
      organizations: apiToOrganizations(organizations),
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
