import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as leadApi from "../api/leads.api";
import type { LeadFormValues } from "../schemas/lead.schema";
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

    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: detailKey });

      const tempId = `lead-temp-${crypto.randomUUID()}`;
      const newColumnId = `col-${payload.stage}`;

      const optimisticLead: Lead = {
        id: tempId,
        columnId: newColumnId,
        name: payload.name,
        earning: 0,
        temperature: "Neutro",
        createdAt: new Date(),
        updatedAt: new Date(),
        content: "...",
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
    mutationFn: (vals: { id: number } & LeadFormValues) => {
      return leadApi.updateLead({
        id: vals.id,
        name: vals.name,
        email: vals.email || null,
        phone: vals.phone || "",
        earning: vals.earning,
        temperature: vals.temperature,
      });
    },
    onSuccess: (updatedApiLead) => {
      setLeads((prev) =>
        prev.map((l) => {
          if (l.id === `lead-${updatedApiLead.id}`) {
            return {
              ...l,
              name: updatedApiLead.name,
              earning: Number(updatedApiLead.earning),
              temperature: updatedApiLead.temperature,
              content:
                [updatedApiLead.email, updatedApiLead.phone]
                  .filter(Boolean)
                  .join(" | ") || "...",
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
