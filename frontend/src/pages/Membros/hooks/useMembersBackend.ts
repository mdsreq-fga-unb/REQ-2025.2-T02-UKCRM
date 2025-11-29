import { useState, useCallback, useMemo, useEffect } from "react";
import type {
  ApiMember,
  ApiMemberCreatePayload,
  ApiMemberUpdatePayload,
  ApiMemberDeletePayload,
} from "../api/members.api";
import {
  fetchMembers,
  createMember,
  updateMember,
  deleteMember,
} from "../api/members.api";

export function useMembersBackend() {
  const [members, setMembers] = useState<ApiMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMembersList = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchMembers();
      setMembers(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      console.error("Erro ao buscar membros:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreate = useCallback(
    async (data: ApiMemberCreatePayload) => {
      setIsLoading(true);
      setError(null);

      try {
        const newMember = await createMember(data);
        setMembers((prev) => [...prev, newMember]);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
        setError(errorMessage);
        console.error("Erro ao criar membro:", err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleUpdate = useCallback(
    async (id: number, data: ApiMemberUpdatePayload) => {
      setIsLoading(true);
      setError(null);

      try {
        const updatedMember = await updateMember(id, data);
        setMembers((prev) =>
          prev.map((member) => (member.id === id ? updatedMember : member))
        );
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
        setError(errorMessage);
        console.error("Erro ao atualizar membro:", err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleDelete = useCallback(
    async (id: number, payload?: ApiMemberDeletePayload) => {
      setIsLoading(true);
      setError(null);

      try {
        await deleteMember(id, payload);
        setMembers((prev) => prev.filter((member) => member.id !== id));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
        setError(errorMessage);
        console.error("Erro ao deletar membro:", err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleRefresh = useCallback(() => {
    fetchMembersList();
  }, [fetchMembersList]);

  // Fetch members on mount
  useEffect(() => {
    fetchMembersList();
  }, [fetchMembersList]);

  return useMemo(
    () => ({
      members,
      isLoading,
      error,
      handleCreate,
      handleUpdate,
      handleDelete,
      handleRefresh,
    }),
    [members, isLoading, error, handleCreate, handleUpdate, handleDelete, handleRefresh]
  );
}
