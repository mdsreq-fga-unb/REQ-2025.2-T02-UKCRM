import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as leadApi from "../api/leads.api";
// import type { LeadFormValues } from "../schemas/lead.schema";
import type { Lead } from "../types/kanban.types";
import { mapApiLeadToKanbanLead } from "../utils/funnelTransformers";
import { queryKeys } from "./queryKeys";

// HOOKS

export const useCreateLead = (
  funnelId: string | null,
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>,
) => {
  const queryClient = useQueryClient();
  const detailKey = queryKeys.funnels.detail(funnelId);

  return useMutation({
    mutationFn: leadApi.createLead,

    onMutate: async (payload: any) => {
      await queryClient.cancelQueries({ queryKey: detailKey });

      const tempId = `lead-temp-${crypto.randomUUID()}`;
      const newColumnId = `col-${payload.stage}`;

      // Cria lead otimista com TODOS os dados do formulário
      const optimisticLead: Lead = {
        id: tempId,
        columnId: newColumnId,
        name: payload.name,
        // Novos campos com fallbacks seguros
        cpf: payload.cpf || null,
        email: payload.email || null,
        phone: payload.phone || "",
        career: payload.career || null,
        income: payload.income ? Number(payload.income) : 0,
        interests: payload.interests || [],
        campaign: payload.campaign || "None",
        contactOrigin: payload.contactOrigin || "Other",
        earning: payload.earning ? Number(payload.earning) : 0,
        temperature: payload.temperature || "Neutro",
        content: payload.content || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setLeads((prev) => [optimisticLead, ...prev]);

      return { tempId };
    },

    onError: (_err, _vars, context) => {
      setLeads((prev) => prev.filter((l) => l.id !== context?.tempId));
    },

    onSuccess: (createdLead, _, context) => {
      const realLead = mapApiLeadToKanbanLead(createdLead, context?.tempId);

      setLeads((prev) =>
        prev.map((l) => (l.id === context?.tempId ? realLead : l)),
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: detailKey });
    },
  });
};

export const useEditLeadDetails = (
  funnelId: string | null,
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>,
) => {
  const queryClient = useQueryClient();
  const detailKey = queryKeys.funnels.detail(funnelId);

  return useMutation({
    // Aceita objeto flexível para cobrir todos os novos campos
    mutationFn: (vals: { id: number } & any) => {
      return leadApi.updateLead({
        id: vals.id,
        // Espalha todos os campos (name, cpf, income, interests, etc.)
        ...vals,
      });
    },
    onSuccess: (updatedApiLead) => {
      setLeads((prev) =>
        prev.map((l) => {
          // Verifica ID (assumindo formato 'lead-ID' no front e ID numérico vindo da API)
          if (l.id === `lead-${updatedApiLead.id}`) {
            return {
              ...l,
              // Atualização granular do estado local
              name: updatedApiLead.name,
              cpf: updatedApiLead.cpf,
              email: updatedApiLead.email,
              phone: updatedApiLead.phone,
              career: updatedApiLead.career,
              income: Number(updatedApiLead.income),
              interests: updatedApiLead.interests,
              campaign: updatedApiLead.campaign,
              contactOrigin: updatedApiLead.contactOrigin,
              temperature: updatedApiLead.temperature,
              earning: Number(updatedApiLead.earning),
              content: updatedApiLead.content, // Agora mapeia o conteúdo real (obs)
              assignedTo: updatedApiLead.account,
              updatedAt: new Date(),
            };
          }
          return l;
        }),
      );
      queryClient.invalidateQueries({ queryKey: detailKey });
    },
  });
};

type MoveLeadVariables = {
  id: number;
  stage: number;
  order: number;
};

export const useMoveLead = (
  funnelId: string | null,
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>,
) => {
  const queryClient = useQueryClient();
  const detailKey = queryKeys.funnels.detail(funnelId);

  return useMutation({
    mutationFn: (vars: MoveLeadVariables) => leadApi.updateLead(vars),

    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: detailKey });
      let previousLeads: Lead[] = [];

      setLeads((currentLeads) => {
        previousLeads = currentLeads;

        return reorderLeadsLocally(
          currentLeads,
          `lead-${variables.id}`,
          `col-${variables.stage}`,
          variables.order,
        );
      });

      return { previousLeads };
    },

    onError: (err, _, context) => {
      console.error("Erro ao mover lead:", err);
      if (context?.previousLeads) {
        setLeads(context.previousLeads);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: detailKey });
    },
  });
};

// HELPERS

function reorderLeadsLocally(
  oldLeads: Lead[],
  movedLeadId: string,
  targetColumnId: string,
  targetOrder: number,
): Lead[] {
  const leadToMove = oldLeads.find((l) => l.id === movedLeadId);
  if (!leadToMove) return oldLeads;
  const updatedLead = { ...leadToMove, columnId: targetColumnId };
  const remainingLeads = oldLeads.filter((l) => l.id !== movedLeadId);
  const targetColumnLeads = remainingLeads.filter(
    (l) => l.columnId === targetColumnId,
  );
  const otherColumnLeads = remainingLeads.filter(
    (l) => l.columnId !== targetColumnId,
  );
  targetColumnLeads.splice(targetOrder, 0, updatedLead);
  return [...otherColumnLeads, ...targetColumnLeads];
}
