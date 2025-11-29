import { useState, useCallback, useMemo } from "react";
import { usePermissions } from "@/auth/hooks/usePermissions";
import { useAuthContext } from "@/auth/context/AuthContext";
import type {
  Lead,
  LeadCreatePayload,
  LeadUpdatePayload,
  LeadAssignPayload,
  LeadGainLossPayload,
  LeadFilters,
} from "../types/lead.types";
import { mockLeads as initialMockLeads } from "../data/mockLeads";

/**
 * Mock hook for lead operations with role-based permissions
 * This simulates API calls with localStorage persistence
 */
export function useLeadsMock() {
  const { user } = useAuthContext();
  const { hasPermission } = usePermissions();

  // Initialize from localStorage or use mock data
  const [leads, setLeads] = useState<Lead[]>(() => {
    const stored = localStorage.getItem("mockLeads");
    return stored ? JSON.parse(stored) : initialMockLeads;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Persist to localStorage whenever leads change
  const persistLeads = useCallback((newLeads: Lead[]) => {
    localStorage.setItem("mockLeads", JSON.stringify(newLeads));
    setLeads(newLeads);
  }, []);

  /**
   * Get all leads (filtered by permissions)
   */
  const getLeads = useCallback(
    async (filters?: LeadFilters): Promise<Lead[]> => {
      setIsLoading(true);
      setError(null);

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      try {
        let filteredLeads = [...leads];

        // Apply role-based filtering
        if (hasPermission("lead:view:assigned") && !hasPermission("lead:view:all")) {
          // SDR, Closer, Sales Coordinator can only view assigned leads
          filteredLeads = filteredLeads.filter(
            (lead: Lead) => lead.assignedTo === user?.id
          );
        }

        // Apply additional filters
        if (filters) {
          if (filters.status) {
            filteredLeads = filteredLeads.filter((lead) =>
              filters.status!.includes(lead.status)
            );
          }
          if (filters.assignedTo) {
            filteredLeads = filteredLeads.filter((lead) =>
              lead.assignedTo ? filters.assignedTo!.includes(lead.assignedTo) : false
            );
          }
          if (filters.temperature) {
            filteredLeads = filteredLeads.filter((lead) =>
              filters.temperature!.includes(lead.temperature)
            );
          }
          if (filters.campaign) {
            filteredLeads = filteredLeads.filter((lead) =>
              filters.campaign!.includes(lead.campaign)
            );
          }
          if (filters.contactOrigin) {
            filteredLeads = filteredLeads.filter((lead) =>
              filters.contactOrigin!.includes(lead.contactOrigin)
            );
          }
          if (filters.stage) {
            filteredLeads = filteredLeads.filter((lead) =>
              filters.stage!.includes(lead.stage)
            );
          }
        }

        setIsLoading(false);
        return filteredLeads;
      } catch (err) {
        setError("Erro ao buscar leads");
        setIsLoading(false);
        throw err;
      }
    },
    [leads, hasPermission, user]
  );

  /**
   * Get a single lead by ID
   */
  const getLead = useCallback(
    async (id: number): Promise<Lead | null> => {
      setIsLoading(true);
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 200));

      try {
        const lead = leads.find((l: Lead) => l.id === id);

        if (!lead) {
          setError("Lead não encontrado");
          setIsLoading(false);
          return null;
        }

        // Check permissions
        if (hasPermission("lead:view:assigned") && !hasPermission("lead:view:all")) {
          if (lead.assignedTo !== user?.id) {
            setError("Você não tem permissão para visualizar este lead");
            setIsLoading(false);
            return null;
          }
        }

        setIsLoading(false);
        return lead;
      } catch (err) {
        setError("Erro ao buscar lead");
        setIsLoading(false);
        throw err;
      }
    },
    [leads, hasPermission, user]
  );

  /**
   * Create a new lead (SDR permission required)
   */
  const createLead = useCallback(
    async (payload: LeadCreatePayload): Promise<Lead> => {
      if (!hasPermission("lead:create")) {
        throw new Error("Você não tem permissão para criar leads");
      }

      setIsLoading(true);
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 400));

      try {
        const newLead: Lead = {
          id: Math.max(...leads.map((l: Lead) => l.id), 0) + 1,
          name: payload.name,
          cpf: payload.cpf || null,
          email: payload.email || null,
          phone: payload.phone,
          career: payload.career || null,
          income: payload.income || null,
          interests: payload.interests || [],
          campaign: payload.campaign || "None",
          contactOrigin: payload.contactOrigin || "Other",
          temperature: payload.temperature || "Frio",
          status: "Active",
          assignedTo: payload.assignedTo || null,
          earning: payload.earning || 0,
          gainLossValue: null,
          gainLossReason: null,
          stage: payload.stage,
          order: payload.order,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: user?.id || 0,
        };

        const updatedLeads = [...leads, newLead];
        persistLeads(updatedLeads);
        setIsLoading(false);
        return newLead;
      } catch (err) {
        setError("Erro ao criar lead");
        setIsLoading(false);
        throw err;
      }
    },
    [leads, hasPermission, user, persistLeads]
  );

  /**
   * Update a lead (edit permission required)
   */
  const updateLead = useCallback(
    async (payload: LeadUpdatePayload): Promise<Lead> => {
      if (!hasPermission("lead:edit")) {
        throw new Error("Você não tem permissão para editar leads");
      }

      setIsLoading(true);
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 400));

      try {
        const leadIndex = leads.findIndex((l: Lead) => l.id === payload.id);

        if (leadIndex === -1) {
          throw new Error("Lead não encontrado");
        }

        const existingLead = leads[leadIndex];

        // Check if user can edit this lead
        if (hasPermission("lead:view:assigned") && !hasPermission("lead:view:all")) {
          if (existingLead.assignedTo !== user?.id) {
            throw new Error("Você não tem permissão para editar este lead");
          }
        }

        const updatedLead: Lead = {
          ...existingLead,
          ...payload,
          id: existingLead.id, // Ensure ID doesn't change
          updatedAt: new Date().toISOString(),
        };

        const updatedLeads = [...leads];
        updatedLeads[leadIndex] = updatedLead;
        persistLeads(updatedLeads);
        setIsLoading(false);
        return updatedLead;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao atualizar lead");
        setIsLoading(false);
        throw err;
      }
    },
    [leads, hasPermission, user, persistLeads]
  );

  /**
   * Delete a lead (SDR permission required)
   */
  const deleteLead = useCallback(
    async (id: number): Promise<void> => {
      if (!hasPermission("lead:delete")) {
        throw new Error("Você não tem permissão para deletar leads");
      }

      setIsLoading(true);
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 300));

      try {
        const leadIndex = leads.findIndex((l: Lead) => l.id === id);

        if (leadIndex === -1) {
          throw new Error("Lead não encontrado");
        }

        const updatedLeads = leads.filter((l: Lead) => l.id !== id);
        persistLeads(updatedLeads);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao deletar lead");
        setIsLoading(false);
        throw err;
      }
    },
    [leads, hasPermission, persistLeads]
  );

  /**
   * Assign a lead to a team member (Sales Manager permission required)
   */
  const assignLead = useCallback(
    async (payload: LeadAssignPayload): Promise<Lead> => {
      if (!hasPermission("lead:assign")) {
        throw new Error(
          "Você não tem permissão para atribuir leads (requer Sales Manager ou superior)"
        );
      }

      setIsLoading(true);
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 300));

      try {
        const leadIndex = leads.findIndex((l: Lead) => l.id === payload.id);

        if (leadIndex === -1) {
          throw new Error("Lead não encontrado");
        }

        const updatedLead: Lead = {
          ...leads[leadIndex],
          assignedTo: payload.assignedTo,
          updatedAt: new Date().toISOString(),
        };

        const updatedLeads = [...leads];
        updatedLeads[leadIndex] = updatedLead;
        persistLeads(updatedLeads);
        setIsLoading(false);
        return updatedLead;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao atribuir lead");
        setIsLoading(false);
        throw err;
      }
    },
    [leads, hasPermission, persistLeads]
  );

  /**
   * Mark a lead as Gained or Lost (Closer permission required)
   */
  const setLeadGainLoss = useCallback(
    async (payload: LeadGainLossPayload): Promise<Lead> => {
      if (!hasPermission("lead:status:change")) {
        throw new Error(
          "Você não tem permissão para marcar leads como Ganho/Perdido (requer Closer ou superior)"
        );
      }

      setIsLoading(true);
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 400));

      try {
        const leadIndex = leads.findIndex((l: Lead) => l.id === payload.id);

        if (leadIndex === -1) {
          throw new Error("Lead não encontrado");
        }

        const existingLead = leads[leadIndex];

        // Check if user can edit this lead
        if (hasPermission("lead:view:assigned") && !hasPermission("lead:view:all")) {
          if (existingLead.assignedTo !== user?.id) {
            throw new Error("Você não tem permissão para editar este lead");
          }
        }

        const updatedLead: Lead = {
          ...existingLead,
          status: payload.status,
          gainLossValue: payload.value,
          gainLossReason: payload.reason || null,
          updatedAt: new Date().toISOString(),
        };

        const updatedLeads = [...leads];
        updatedLeads[leadIndex] = updatedLead;
        persistLeads(updatedLeads);
        setIsLoading(false);
        return updatedLead;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao atualizar status do lead"
        );
        setIsLoading(false);
        throw err;
      }
    },
    [leads, hasPermission, user, persistLeads]
  );

  return useMemo(
    () => ({
      leads,
      isLoading,
      error,
      getLeads,
      getLead,
      createLead,
      updateLead,
      deleteLead,
      assignLead,
      setLeadGainLoss,
    }),
    [
      leads,
      isLoading,
      error,
      getLeads,
      getLead,
      createLead,
      updateLead,
      deleteLead,
      assignLead,
      setLeadGainLoss,
    ]
  );
}
