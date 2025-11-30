import { useState, useCallback, useMemo } from "react";
import type { ApiOrganization, ApiOrganizationCreatePayload } from "../api/organizations.api";
import { mockOrganizationsList } from "../data/mockOrganizations";
import { apiToOrganizations } from "../utils/organizationTransformers";

export function useOrganizacoesMock() {
  const [organizations, setOrganizations] = useState<ApiOrganization[]>(mockOrganizationsList);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = useCallback(
    (data: ApiOrganizationCreatePayload) => {
      setIsLoading(true);

      // Simulate API delay
      setTimeout(() => {
        const newOrg: ApiOrganization = {
          id: Math.max(...organizations.map((o) => o.id), 0) + 1,
          name: data.name,
          owner: data.owner,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        setOrganizations((prev) => [...prev, newOrg]);
        setIsLoading(false);
      }, 300);

      return Promise.resolve();
    },
    [organizations]
  );

  const handleUpdate = useCallback((id: number, data: Partial<ApiOrganization>) => {
    setIsLoading(true);

    setTimeout(() => {
      setOrganizations((prev) =>
        prev.map((org) =>
          org.id === id
            ? {
                ...org,
                ...data,
                updated_at: new Date().toISOString(),
              }
            : org
        )
      );
      setIsLoading(false);
    }, 300);

    return Promise.resolve();
  }, []);

  const handleDelete = useCallback((id: number) => {
    setIsLoading(true);

    setTimeout(() => {
      setOrganizations((prev) => prev.filter((org) => org.id !== id));
      setIsLoading(false);
    }, 300);

    return Promise.resolve();
  }, []);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);

    setTimeout(() => {
      setOrganizations(mockOrganizationsList);
      setIsLoading(false);
    }, 500);
  }, []);

  return useMemo(
    () => ({
      organizations: apiToOrganizations(organizations),
      isLoading,
      handleCreate,
      handleUpdate,
      handleDelete,
      handleRefresh,
    }),
    [organizations, isLoading, handleCreate, handleUpdate, handleDelete, handleRefresh]
  );
}
