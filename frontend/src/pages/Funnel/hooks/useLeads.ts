import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiFunnelDetails } from "../api/funnels.api";
import * as leadApi from "../api/leads.api";
import type { Lead } from "../types/kanban.types";
import { mapApiLeadToKanbanLead } from "../utils/funnelTransformers";
import { queryKeys } from "./queryKeys";

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
      const previousFunnel =
        queryClient.getQueryData<ApiFunnelDetails>(detailKey);
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
      return { tempId, previousFunnel };
    },

    onError: (_err, _vars, context) => {
      setLeads((prev) => prev.filter((l) => l.id !== context?.tempId));
      if (context?.previousFunnel) {
        queryClient.setQueryData(detailKey, context.previousFunnel);
      }
    },

    onSuccess: (createdLead, _, context) => {
      const realLead = mapApiLeadToKanbanLead(createdLead, context?.tempId);

      setLeads((prev) =>
        prev.map((l) => (l.id === context?.tempId ? realLead : l)),
      );

      queryClient.setQueryData<ApiFunnelDetails>(detailKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          stages: old.stages.map((stage) => {
            if (stage.id === createdLead.stage) {
              return {
                ...stage,
                leads: [...stage.leads, createdLead],
              };
            }
            return stage;
          }),
        };
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: detailKey });
    },
  });
};

export const useUpdateLead = (
  funnelId: string | null,
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>,
) => {
  const queryClient = useQueryClient();
  const detailKey = queryKeys.funnels.detail(funnelId);

  return useMutation({
    mutationFn: leadApi.updateLead,

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
      console.error("Erro ao atualizar lead:", err);
      if (context?.previousLeads) {
        setLeads(context.previousLeads);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: detailKey });
    },
  });
};

function reorderLeadsLocally(
  oldLeads: Lead[],
  movedLeadId: string,
  targetColumnId: string,
  targetOrder: number,
): Lead[] {
  const leadToMove = oldLeads.find((l) => l.id === movedLeadId);
  if (!leadToMove) return oldLeads;
  const updatedLead = { ...leadToMove, columnId: targetColumnId };
  const allOtherLeads = oldLeads.filter((l) => l.id !== movedLeadId);

  const leadsInTargetColumn = allOtherLeads.filter(
    (l) => l.columnId === targetColumnId,
  );

  const leadsInOtherColumns = allOtherLeads.filter(
    (l) => l.columnId !== targetColumnId,
  );

  const newTargetList = [...leadsInTargetColumn];
  newTargetList.splice(targetOrder, 0, updatedLead);
  return [...leadsInOtherColumns, ...newTargetList];
}
