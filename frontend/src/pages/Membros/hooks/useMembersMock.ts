import { useState, useCallback, useMemo } from "react";
import type { ApiMember, ApiMemberCreatePayload, ApiMemberDeletePayload } from "../api/members.api";
import { mockMembersList } from "../data/mockMembers";

export function useMembersMock() {
  const [members, setMembers] = useState<ApiMember[]>(mockMembersList);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = useCallback(
    (data: ApiMemberCreatePayload) => {
      setIsLoading(true);

      // Simulate API delay
      setTimeout(() => {
        const newMember: ApiMember = {
          id: Math.max(...members.map((m) => m.id), 0) + 1,
          name: data.name,
          email: data.email,
          hierarchy: data.hierarchy,
          joined_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        setMembers((prev) => [...prev, newMember]);
        setIsLoading(false);
      }, 300);

      return Promise.resolve();
    },
    [members]
  );

  const handleUpdate = useCallback((id: number, data: Partial<ApiMember>) => {
    setIsLoading(true);

    setTimeout(() => {
      setMembers((prev) =>
        prev.map((member) =>
          member.id === id
            ? {
                ...member,
                ...data,
                updated_at: new Date().toISOString(),
              }
            : member
        )
      );
      setIsLoading(false);
    }, 300);

    return Promise.resolve();
  }, []);

  const handleDelete = useCallback((id: number, payload?: ApiMemberDeletePayload) => {
    setIsLoading(true);

    setTimeout(() => {
      if (payload?.action === "reallocate" && payload.target_member_id) {
        // TODO: Implement reallocation logic when backend is ready
        console.log(`Reallocating tasks from member ${id} to ${payload.target_member_id}`);
      }

      setMembers((prev) => prev.filter((member) => member.id !== id));
      setIsLoading(false);
    }, 300);

    return Promise.resolve();
  }, []);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);

    setTimeout(() => {
      setMembers(mockMembersList);
      setIsLoading(false);
    }, 500);
  }, []);

  return useMemo(
    () => ({
      members,
      isLoading,
      handleCreate,
      handleUpdate,
      handleDelete,
      handleRefresh,
    }),
    [members, isLoading, handleCreate, handleUpdate, handleDelete, handleRefresh]
  );
}
