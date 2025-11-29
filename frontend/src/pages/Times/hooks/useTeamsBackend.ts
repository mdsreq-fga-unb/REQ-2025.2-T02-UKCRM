import { useState, useCallback, useMemo, useEffect } from "react";
import type { ApiTeam, ApiTeamCreatePayload, ApiTeamUpdatePayload } from "../api/teams.api";
import {
  fetchTeams,
  createTeam,
  updateTeam,
  deleteTeam,
} from "../api/teams.api";
import { mockMembers } from "../data/mockTeams";

export function useTeamsBackend() {
  const [teams, setTeams] = useState<ApiTeam[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTeamsList = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchTeams();
      setTeams(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      console.error("Erro ao buscar times:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreate = useCallback(
    async (data: ApiTeamCreatePayload) => {
      setIsLoading(true);
      setError(null);

      try {
        const newTeam = await createTeam(data);
        setTeams((prev) => [...prev, newTeam]);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
        setError(errorMessage);
        console.error("Erro ao criar time:", err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleUpdate = useCallback(
    async (id: number, data: ApiTeamUpdatePayload) => {
      setIsLoading(true);
      setError(null);

      try {
        const updatedTeam = await updateTeam(id, data);
        setTeams((prev) =>
          prev.map((team) => (team.id === id ? updatedTeam : team))
        );
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
        setError(errorMessage);
        console.error("Erro ao atualizar time:", err);
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
      await deleteTeam(id);
      setTeams((prev) => prev.filter((team) => team.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      console.error("Erro ao deletar time:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(() => {
    fetchTeamsList();
  }, [fetchTeamsList]);

  // Fetch teams on mount
  useEffect(() => {
    fetchTeamsList();
  }, [fetchTeamsList]);

  return useMemo(
    () => ({
      teams,
      members: mockMembers, // TODO: Replace with API call when members endpoint is ready
      isLoading,
      error,
      handleCreate,
      handleUpdate,
      handleDelete,
      handleRefresh,
    }),
    [teams, isLoading, error, handleCreate, handleUpdate, handleDelete, handleRefresh]
  );
}
