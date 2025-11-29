import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useLeadsMock } from "./useLeadsMock";
import { usePermissions } from "@/auth/hooks/usePermissions";
import { useAuthContext } from "@/auth/context/AuthContext";
import type { Lead, LeadCreatePayload } from "../types/lead.types";

// Mock the auth hooks
vi.mock("@/auth/hooks/usePermissions");
vi.mock("@/auth/context/AuthContext");

const mockUsePermissions = vi.mocked(usePermissions);
const mockUseAuthContext = vi.mocked(useAuthContext);

describe("useLeadsMock", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe("getLeads - with different roles", () => {
    it("should return all leads for Sales Manager", async () => {
      mockUseAuthContext.mockReturnValue({
        user: { id: 4, email: "manager@test.com", nome: "Sales Manager", role: "Sales Manager" },
        isLoading: false,
        error: null,
        isAuthenticated: true,
        login: vi.fn(),
        logout: vi.fn(),
      });

      mockUsePermissions.mockReturnValue({
        hasPermission: (perm) => {
          if (perm === "lead:view:all") return true;
          if (perm === "lead:view:assigned") return true;
          return false;
        },
        hasAnyPermission: vi.fn(),
        hasAllPermissions: vi.fn(),
        userRole: "Sales Manager",
      });

      const { result } = renderHook(() => useLeadsMock());

      let leads: Lead[] = [];
      await act(async () => {
        leads = await result.current.getLeads();
      });

      // Sales Manager should see all leads
      expect(leads.length).toBeGreaterThan(0);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
    });

    it("should return only assigned leads for SDR", async () => {
      mockUseAuthContext.mockReturnValue({
        user: { id: 2, email: "sdr@test.com", nome: "SDR User", role: "SDR" },
        isLoading: false,
        error: null,
        isAuthenticated: true,
        login: vi.fn(),
        logout: vi.fn(),
      });

      mockUsePermissions.mockReturnValue({
        hasPermission: (perm) => {
          if (perm === "lead:view:assigned") return true;
          if (perm === "lead:view:all") return false;
          return false;
        },
        hasAnyPermission: vi.fn(),
        hasAllPermissions: vi.fn(),
        userRole: "SDR",
      });

      const { result } = renderHook(() => useLeadsMock());

      let leads: Lead[] = [];
      await act(async () => {
        leads = await result.current.getLeads();
      });

      // SDR should only see leads assigned to them
      expect(leads.every((lead) => lead.assignedTo === 2)).toBe(true);
      expect(result.current.isLoading).toBe(false);
    });

    it("should filter leads by status", async () => {
      mockUseAuthContext.mockReturnValue({
        user: { id: 4, email: "manager@test.com", nome: "Sales Manager", role: "Sales Manager" },
        isLoading: false,
        error: null,
        isAuthenticated: true,
        login: vi.fn(),
        logout: vi.fn(),
      });

      mockUsePermissions.mockReturnValue({
        hasPermission: (perm) => {
          if (perm === "lead:view:all") return true;
          return false;
        },
        hasAnyPermission: vi.fn(),
        hasAllPermissions: vi.fn(),
        userRole: "Sales Manager",
      });

      const { result } = renderHook(() => useLeadsMock());

      let leads: Lead[] = [];
      await act(async () => {
        leads = await result.current.getLeads({ status: ["Active"] });
      });

      expect(leads.every((lead) => lead.status === "Active")).toBe(true);
    });
  });

  describe("getLead - get single lead", () => {
    it("should return a lead by ID for authorized user", async () => {
      mockUseAuthContext.mockReturnValue({
        user: { id: 4, email: "manager@test.com", nome: "Sales Manager", role: "Sales Manager" },
        isLoading: false,
        error: null,
        isAuthenticated: true,
        login: vi.fn(),
        logout: vi.fn(),
      });

      mockUsePermissions.mockReturnValue({
        hasPermission: (perm) => {
          if (perm === "lead:view:all") return true;
          return false;
        },
        hasAnyPermission: vi.fn(),
        hasAllPermissions: vi.fn(),
        userRole: "Sales Manager",
      });

      const { result } = renderHook(() => useLeadsMock());

      let lead: Lead | null = null;
      await act(async () => {
        lead = await result.current.getLead(1);
      });

      expect(lead).not.toBeNull();
      expect(lead?.id).toBe(1);
    });

    it("should return null for non-existent lead", async () => {
      mockUseAuthContext.mockReturnValue({
        user: { id: 4, email: "manager@test.com", nome: "Sales Manager", role: "Sales Manager" },
        isLoading: false,
        error: null,
        isAuthenticated: true,
        login: vi.fn(),
        logout: vi.fn(),
      });

      mockUsePermissions.mockReturnValue({
        hasPermission: (perm) => perm === "lead:view:all",
        hasAnyPermission: vi.fn(),
        hasAllPermissions: vi.fn(),
        userRole: "Sales Manager",
      });

      const { result } = renderHook(() => useLeadsMock());

      let lead: Lead | null = null;
      await act(async () => {
        lead = await result.current.getLead(99999);
      });

      expect(lead).toBeNull();
      expect(result.current.error).toBe("Lead não encontrado");
    });

    it("should deny access to unassigned lead for SDR", async () => {
      mockUseAuthContext.mockReturnValue({
        user: { id: 2, email: "sdr@test.com", nome: "SDR User", role: "SDR" },
        isLoading: false,
        error: null,
        isAuthenticated: true,
        login: vi.fn(),
        logout: vi.fn(),
      });

      mockUsePermissions.mockReturnValue({
        hasPermission: (perm) => {
          if (perm === "lead:view:assigned") return true;
          if (perm === "lead:view:all") return false;
          return false;
        },
        hasAnyPermission: vi.fn(),
        hasAllPermissions: vi.fn(),
        userRole: "SDR",
      });

      const { result } = renderHook(() => useLeadsMock());

      let lead: Lead | null = null;
      await act(async () => {
        // Try to access a lead not assigned to this SDR (id: 1 is assigned to member 2)
        lead = await result.current.getLead(3); // Lead 3 is assigned to member 4
      });

      expect(lead).toBeNull();
      expect(result.current.error).toBe("Você não tem permissão para visualizar este lead");
    });
  });

  describe("createLead - SDR creating leads", () => {
    it("should create a new lead with SDR permissions", async () => {
      mockUseAuthContext.mockReturnValue({
        user: { id: 2, email: "sdr@test.com", nome: "SDR User", role: "SDR" },
        isLoading: false,
        error: null,
        isAuthenticated: true,
        login: vi.fn(),
        logout: vi.fn(),
      });

      mockUsePermissions.mockReturnValue({
        hasPermission: (perm) => perm === "lead:create",
        hasAnyPermission: vi.fn(),
        hasAllPermissions: vi.fn(),
        userRole: "SDR",
      });

      const { result } = renderHook(() => useLeadsMock());

      const payload: LeadCreatePayload = {
        name: "Novo Lead Teste",
        phone: "(11) 99999-9999",
        email: "novlead@test.com",
        stage: 1,
        order: 1,
        assignedTo: 2,
      };

      let newLead: Lead | null = null;
      await act(async () => {
        newLead = await result.current.createLead(payload);
      });

      expect(newLead).not.toBeNull();
      expect(newLead?.name).toBe("Novo Lead Teste");
      expect(newLead?.createdBy).toBe(2);
      expect(newLead?.status).toBe("Active");
    });

    it("should throw error when user without permission tries to create lead", async () => {
      mockUseAuthContext.mockReturnValue({
        user: { id: 1, email: "closer@test.com", nome: "Closer User", role: "Closer" },
        isLoading: false,
        error: null,
        isAuthenticated: true,
        login: vi.fn(),
        logout: vi.fn(),
      });

      mockUsePermissions.mockReturnValue({
        hasPermission: (perm) => perm !== "lead:create", // Closer doesn't have create permission
        hasAnyPermission: vi.fn(),
        hasAllPermissions: vi.fn(),
        userRole: "Closer",
      });

      const { result } = renderHook(() => useLeadsMock());

      const payload: LeadCreatePayload = {
        name: "Novo Lead Teste",
        phone: "(11) 99999-9999",
        stage: 1,
        order: 1,
      };

      await expect(
        act(async () => {
          await result.current.createLead(payload);
        })
      ).rejects.toThrow("Você não tem permissão para criar leads");
    });
  });

  describe("updateLead - editing leads", () => {
    it("should update a lead with edit permissions", async () => {
      mockUseAuthContext.mockReturnValue({
        user: { id: 2, email: "sdr@test.com", nome: "SDR User", role: "SDR" },
        isLoading: false,
        error: null,
        isAuthenticated: true,
        login: vi.fn(),
        logout: vi.fn(),
      });

      mockUsePermissions.mockReturnValue({
        hasPermission: (perm) => {
          if (perm === "lead:edit") return true;
          if (perm === "lead:view:assigned") return true;
          if (perm === "lead:view:all") return false;
          return false;
        },
        hasAnyPermission: vi.fn(),
        hasAllPermissions: vi.fn(),
        userRole: "SDR",
      });

      const { result } = renderHook(() => useLeadsMock());

      let updatedLead: Lead | null = null;
      await act(async () => {
        updatedLead = await result.current.updateLead({
          id: 1,
          name: "Nome Atualizado",
          email: "updated@email.com",
        });
      });

      expect(updatedLead).not.toBeNull();
      expect(updatedLead?.name).toBe("Nome Atualizado");
      expect(updatedLead?.email).toBe("updated@email.com");
    });

    it("should throw error when updating non-existent lead", async () => {
      mockUseAuthContext.mockReturnValue({
        user: { id: 2, email: "sdr@test.com", nome: "SDR User", role: "SDR" },
        isLoading: false,
        error: null,
        isAuthenticated: true,
        login: vi.fn(),
        logout: vi.fn(),
      });

      mockUsePermissions.mockReturnValue({
        hasPermission: (perm) => perm === "lead:edit",
        hasAnyPermission: vi.fn(),
        hasAllPermissions: vi.fn(),
        userRole: "SDR",
      });

      const { result } = renderHook(() => useLeadsMock());

      await expect(
        act(async () => {
          await result.current.updateLead({ id: 99999, name: "Test" });
        })
      ).rejects.toThrow("Lead não encontrado");
    });
  });

  describe("deleteLead - SDR deleting leads", () => {
    it("should delete a lead with proper permissions", async () => {
      mockUseAuthContext.mockReturnValue({
        user: { id: 4, email: "manager@test.com", nome: "Sales Manager", role: "Sales Manager" },
        isLoading: false,
        error: null,
        isAuthenticated: true,
        login: vi.fn(),
        logout: vi.fn(),
      });

      mockUsePermissions.mockReturnValue({
        hasPermission: (perm) => perm === "lead:delete",
        hasAnyPermission: vi.fn(),
        hasAllPermissions: vi.fn(),
        userRole: "Sales Manager",
      });

      const { result } = renderHook(() => useLeadsMock());

      // First, get all leads to check count
      let leadsBefore: Lead[] = [];
      await act(async () => {
        leadsBefore = result.current.leads;
      });

      const initialCount = leadsBefore.length;

      // Delete a lead
      await act(async () => {
        await result.current.deleteLead(1);
      });

      // Check that lead was deleted
      const leadsAfter = result.current.leads;
      expect(leadsAfter.length).toBe(initialCount - 1);
      expect(leadsAfter.find((l) => l.id === 1)).toBeUndefined();
    });

    it("should throw error when user without permission tries to delete", async () => {
      mockUseAuthContext.mockReturnValue({
        user: { id: 2, email: "sdr@test.com", nome: "SDR User", role: "SDR" },
        isLoading: false,
        error: null,
        isAuthenticated: true,
        login: vi.fn(),
        logout: vi.fn(),
      });

      mockUsePermissions.mockReturnValue({
        hasPermission: (perm) => perm !== "lead:delete", // SDR doesn't have delete permission
        hasAnyPermission: vi.fn(),
        hasAllPermissions: vi.fn(),
        userRole: "SDR",
      });

      const { result } = renderHook(() => useLeadsMock());

      await expect(
        act(async () => {
          await result.current.deleteLead(1);
        })
      ).rejects.toThrow("Você não tem permissão para deletar leads");
    });
  });

  describe("assignLead - Sales Manager assigning leads", () => {
    it("should assign a lead to a team member with Sales Manager role", async () => {
      mockUseAuthContext.mockReturnValue({
        user: { id: 4, email: "manager@test.com", nome: "Sales Manager", role: "Sales Manager" },
        isLoading: false,
        error: null,
        isAuthenticated: true,
        login: vi.fn(),
        logout: vi.fn(),
      });

      mockUsePermissions.mockReturnValue({
        hasPermission: (perm) => perm === "lead:assign",
        hasAnyPermission: vi.fn(),
        hasAllPermissions: vi.fn(),
        userRole: "Sales Manager",
      });

      const { result } = renderHook(() => useLeadsMock());

      let assignedLead: Lead | null = null;
      await act(async () => {
        assignedLead = await result.current.assignLead({ id: 9, assignedTo: 2 });
      });

      expect(assignedLead).not.toBeNull();
      expect(assignedLead?.assignedTo).toBe(2);
    });

    it("should throw error when SDR tries to assign leads", async () => {
      mockUseAuthContext.mockReturnValue({
        user: { id: 2, email: "sdr@test.com", nome: "SDR User", role: "SDR" },
        isLoading: false,
        error: null,
        isAuthenticated: true,
        login: vi.fn(),
        logout: vi.fn(),
      });

      mockUsePermissions.mockReturnValue({
        hasPermission: (perm) => perm !== "lead:assign", // SDR doesn't have this permission
        hasAnyPermission: vi.fn(),
        hasAllPermissions: vi.fn(),
        userRole: "SDR",
      });

      const { result } = renderHook(() => useLeadsMock());

      await expect(
        act(async () => {
          await result.current.assignLead({ id: 1, assignedTo: 5 });
        })
      ).rejects.toThrow(
        "Você não tem permissão para atribuir leads (requer Sales Manager ou superior)"
      );
    });
  });

  describe("setLeadGainLoss - Closer marking leads as Gained/Lost", () => {
    it("should mark a lead as Gained with Closer role", async () => {
      mockUseAuthContext.mockReturnValue({
        user: { id: 1, email: "closer@test.com", nome: "Closer User", role: "Closer" },
        isLoading: false,
        error: null,
        isAuthenticated: true,
        login: vi.fn(),
        logout: vi.fn(),
      });

      mockUsePermissions.mockReturnValue({
        hasPermission: (perm) => {
          if (perm === "lead:status:change") return true;
          if (perm === "lead:view:assigned") return true;
          if (perm === "lead:view:all") return false;
          return false;
        },
        hasAnyPermission: vi.fn(),
        hasAllPermissions: vi.fn(),
        userRole: "Closer",
      });

      const { result } = renderHook(() => useLeadsMock());

      let updatedLead: Lead | null = null;
      await act(async () => {
        updatedLead = await result.current.setLeadGainLoss({
          id: 2,
          status: "Gained",
          value: 45000,
          reason: "Cliente fechou contrato completo",
        });
      });

      expect(updatedLead).not.toBeNull();
      expect(updatedLead?.status).toBe("Gained");
      expect(updatedLead?.gainLossValue).toBe(45000);
      expect(updatedLead?.gainLossReason).toBe("Cliente fechou contrato completo");
    });

    it("should mark a lead as Lost with Closer role", async () => {
      mockUseAuthContext.mockReturnValue({
        user: { id: 1, email: "closer@test.com", nome: "Closer User", role: "Closer" },
        isLoading: false,
        error: null,
        isAuthenticated: true,
        login: vi.fn(),
        logout: vi.fn(),
      });

      mockUsePermissions.mockReturnValue({
        hasPermission: (perm) => {
          if (perm === "lead:status:change") return true;
          if (perm === "lead:view:assigned") return true;
          if (perm === "lead:view:all") return false;
          return false;
        },
        hasAnyPermission: vi.fn(),
        hasAllPermissions: vi.fn(),
        userRole: "Closer",
      });

      const { result } = renderHook(() => useLeadsMock());

      let updatedLead: Lead | null = null;
      await act(async () => {
        updatedLead = await result.current.setLeadGainLoss({
          id: 2,
          status: "Lost",
          value: 0,
          reason: "Orçamento insuficiente",
        });
      });

      expect(updatedLead).not.toBeNull();
      expect(updatedLead?.status).toBe("Lost");
      expect(updatedLead?.gainLossValue).toBe(0);
      expect(updatedLead?.gainLossReason).toBe("Orçamento insuficiente");
    });

    it("should throw error when SDR tries to mark lead as Gained/Lost", async () => {
      mockUseAuthContext.mockReturnValue({
        user: { id: 2, email: "sdr@test.com", nome: "SDR User", role: "SDR" },
        isLoading: false,
        error: null,
        isAuthenticated: true,
        login: vi.fn(),
        logout: vi.fn(),
      });

      mockUsePermissions.mockReturnValue({
        hasPermission: (perm) => perm !== "lead:status:change", // SDR doesn't have this permission
        hasAnyPermission: vi.fn(),
        hasAllPermissions: vi.fn(),
        userRole: "SDR",
      });

      const { result } = renderHook(() => useLeadsMock());

      await expect(
        act(async () => {
          await result.current.setLeadGainLoss({
            id: 1,
            status: "Gained",
            value: 25000,
          });
        })
      ).rejects.toThrow(
        "Você não tem permissão para marcar leads como Ganho/Perdido (requer Closer ou superior)"
      );
    });
  });
});
