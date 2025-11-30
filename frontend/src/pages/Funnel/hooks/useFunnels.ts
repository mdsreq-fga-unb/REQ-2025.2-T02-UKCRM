import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ApiFunnel, ApiFunnelDetails, ApiStage } from "../api/funnels.api";
import * as funnelApi from "../api/funnels.api";
import type { FunnelFormValues } from "../schemas/funnel.schema";
import { queryKeys } from "./queryKeys";

// LEITURA

export const useFunnelsList = () => {
  return useQuery({
    queryKey: queryKeys.funnels.list(),
    queryFn: ({ signal }) => funnelApi.fetchFunnels(signal),
  });
};

export const useFunnelDetails = (
  funnelId: string | number | null | undefined,
) => {
  return useQuery({
    queryKey: queryKeys.funnels.detail(funnelId),
    queryFn: () => funnelApi.fetchFunnelDetails(Number(funnelId!)),
    enabled: !!funnelId,
  });
};

// ESCRITA

export const useCreateFunnel = (onSuccess?: (data: ApiFunnel) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FunnelFormValues) => {
      return funnelApi.createFunnel({
        name: formData.funnelName,
        team_ids: formData.teamIds.map((id) => parseInt(id, 10)),
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.funnels.list() });
      onSuccess?.(data);
    },
  });
};

export const useDeleteFunnel = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: funnelApi.deleteFunnel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.funnels.list() });
      onSuccess?.();
    },
  });
};

export const useCreateStage = (funnelId: string | null) => {
  const queryClient = useQueryClient();
  const detailKey = queryKeys.funnels.detail(funnelId);

  return useMutation({
    mutationFn: funnelApi.createStage,

    onMutate: async (newStagePayload) => {
      await queryClient.cancelQueries({ queryKey: detailKey });
      const previousFunnel =
        queryClient.getQueryData<ApiFunnelDetails>(detailKey);
      const tempId = Date.now();

      if (previousFunnel) {
        const optimisticStage: ApiStage = {
          id: tempId,
          name: newStagePayload.name,
          order: newStagePayload.order,
          funnel: Number(newStagePayload.funnel),
          leads: [],
        };

        queryClient.setQueryData<ApiFunnelDetails>(detailKey, (old) => {
          if (!old) return old;
          return {
            ...old,
            stages: [...old.stages, optimisticStage],
          };
        });
      }

      return { previousFunnel, tempId };
    },

    onError: (_err, _newStage, context) => {
      if (context?.previousFunnel) {
        queryClient.setQueryData(detailKey, context.previousFunnel);
      }
    },

    onSuccess: (serverResponseStage, _, context) => {
      queryClient.setQueryData<ApiFunnelDetails>(detailKey, (old) => {
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
      queryClient.invalidateQueries({ queryKey: detailKey });
    },
  });
};

export const useMoveStage = (funnelId: string | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: funnelApi.updateStage,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.funnels.detail(funnelId),
      });
    },
  });
};
