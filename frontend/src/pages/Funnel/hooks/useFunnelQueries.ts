import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as funnelApi from "../api/funnelApi";
import type { ApiFunnelDetails, ApiStage } from "../api/funnelApi";
import type { FunnelFormValues } from "../schemas/funnel.schema";
import type { Lead } from "../types/kanban.types";
import { mapApiLeadToKanbanLead } from "../utils/funnelTransformers";

export const funnelKeys = {
  all: ["funnels"] as const,
  list: () => [...funnelKeys.all, "list"] as const,
  detail: (id: string | number | null | undefined) =>
    [...funnelKeys.all, "detail", id] as const,
};

export const useFunnelsList = () => {
  return useQuery({
    queryKey: funnelKeys.list(),
    queryFn: ({ signal }) => funnelApi.fetchFunnels(signal),
  });
};

export const useFunnelDetails = (funnelId: string | null | undefined) => {
  return useQuery({
    queryKey: funnelKeys.detail(funnelId),
    queryFn: () => funnelApi.fetchFunnelDetails(Number(funnelId!)),
    enabled: !!funnelId,
  });
};

// --- MUTAÇÕES ---

export const useCreateFunnel = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FunnelFormValues) => {
      return funnelApi.createFunnel({
        name: formData.funnelName,
        teams: formData.teamNames.map((id) => parseInt(id, 10)),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: funnelKeys.list() });
      onSuccess?.();
    },
  });
};

export const useDeleteFunnel = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: funnelApi.deleteFunnel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: funnelKeys.list() });
      onSuccess?.();
    },
  });
};

export const useCreateLead = (
  funnelId: string | null,
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: funnelApi.createLead,
    onMutate: async (payload) => {
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
    onSuccess: (createdLead, _, context) => {
      const realLead = mapApiLeadToKanbanLead(createdLead, context?.tempId);
      setLeads((prev) =>
        prev.map((l) => (l.id === context?.tempId ? realLead : l)),
      );
      queryClient.invalidateQueries({ queryKey: funnelKeys.detail(funnelId) });
    },
    onError: (_, __, context) => {
      setLeads((prev) => prev.filter((l) => l.id !== context?.tempId));
    },
  });
};

export const useCreateStage = (funnelId: string | null) => {
  const queryClient = useQueryClient();
  const queryKey = funnelKeys.detail(funnelId);

  return useMutation({
    mutationFn: funnelApi.createStage,

    onMutate: async (newStagePayload) => {
      await queryClient.cancelQueries({ queryKey });

      const previousFunnel =
        queryClient.getQueryData<ApiFunnelDetails>(queryKey);
      const tempId = Date.now();

      if (previousFunnel) {
        const optimisticStage: ApiStage = {
          id: tempId,
          name: newStagePayload.name,
          order: newStagePayload.order,
          funnel: Number(newStagePayload.funnel),
          leads: [],
        };

        queryClient.setQueryData<ApiFunnelDetails>(queryKey, (old) => {
          if (!old) return old;
          return { ...old, stages: [...old.stages, optimisticStage] };
        });
      }

      return { previousFunnel, tempId };
    },

    onError: (_err, _newStage, context) => {
      if (context?.previousFunnel) {
        queryClient.setQueryData(queryKey, context.previousFunnel);
      }
    },

    onSuccess: (serverResponseStage, _, context) => {
      queryClient.setQueryData<ApiFunnelDetails>(queryKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          stages: old.stages.map((stage) =>
            stage.id === context?.tempId ? serverResponseStage : stage,
          ),
        };
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export const useUpdateStage = (funnelId: string | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: funnelApi.updateStage,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: funnelKeys.detail(funnelId) });
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

export const useUpdateLead = (
  funnelId: string | null,
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: funnelApi.updateLead,

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: funnelKeys.detail(funnelId),
      });

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
      console.error("Erro no DND:", err);
      if (context?.previousLeads) {
        setLeads(context.previousLeads);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: funnelKeys.detail(funnelId) });
    },
  });
};
