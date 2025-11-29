import { useState, useCallback, useMemo } from "react";
import type { ApiTeam, ApiTeamCreatePayload } from "../api/teams.api";
import { mockTeamsList, mockMembers } from "../data/mockTeams";

export function useTeamsMock() {
  const [teams, setTeams] = useState<ApiTeam[]>(mockTeamsList);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = useCallback(
    (data: ApiTeamCreatePayload) => {
      setIsLoading(true);

      // Simulate API delay
      setTimeout(() => {
        const newTeam: ApiTeam = {
          id: Math.max(...teams.map((t) => t.id), 0) + 1,
          name: data.name,
          member_count: data.member_ids.length,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          members: data.member_ids,
        };

        setTeams((prev) => [...prev, newTeam]);
        setIsLoading(false);
      }, 300);

      return Promise.resolve();
    },
    [teams]
  );

  const handleUpdate = useCallback((id: number, data: Partial<ApiTeam>) => {
    setIsLoading(true);

    setTimeout(() => {
      setTeams((prev) =>
        prev.map((team) =>
          team.id === id
            ? {
                ...team,
                ...data,
                member_count: data.members ? data.members.length : team.member_count,
                updated_at: new Date().toISOString(),
              }
            : team
        )
      );
      setIsLoading(false);
    }, 300);

    return Promise.resolve();
  }, []);

  const handleDelete = useCallback((id: number) => {
    setIsLoading(true);

    setTimeout(() => {
      setTeams((prev) => prev.filter((team) => team.id !== id));
      setIsLoading(false);
    }, 300);

    return Promise.resolve();
  }, []);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);

    setTimeout(() => {
      setTeams(mockTeamsList);
      setIsLoading(false);
    }, 500);
  }, []);

  return useMemo(
    () => ({
      teams,
      members: mockMembers,
      isLoading,
      handleCreate,
      handleUpdate,
      handleDelete,
      handleRefresh,
    }),
    [teams, isLoading, handleCreate, handleUpdate, handleDelete, handleRefresh]
  );
}
