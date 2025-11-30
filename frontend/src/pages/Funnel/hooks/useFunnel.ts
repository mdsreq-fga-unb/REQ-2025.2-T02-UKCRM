import { useQueryClient } from "@tanstack/react-query";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  type ApiFunnel,
  createStage as apiCreateStage,
} from "../api/funnels.api";
import { queryKeys } from "./queryKeys";
import { createLead as apiCreateLead } from "../api/leads.api";
import type { EditLeadFormValues } from "../components/EditLeadDialog";
import { type FunnelFormValues } from "../schemas/funnel.schema";
import type {
  Column,
  ColumnId,
  Lead,
  LeadDropEvent,
} from "../types/kanban.types";

import {
  useCreateFunnel,
  useCreateStage,
  useDeleteFunnel,
  useFunnelDetails,
  useFunnelsList,
  useMoveStage,
} from "./useFunnels";

import { useCreateLead, useEditLeadDetails, useMoveLead } from "./useLeads";

import {
  extractId,
  getColumnsWithSubtitles,
  getFilteredAndSortedLeads,
  mapApiDetailsToKanban,
} from "../utils/funnelTransformers";

export function useFunnel(initialCols: Column[], initialLeads: Lead[]) {
  const queryClient = useQueryClient();
  const [columns, setColumns] = useState<Column[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);
  const [funnelToDelete, setFunnelToDelete] = useState<string | null>(null);
  const [filterTerm, setFilterTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState<string | null>(null);
  const [selectedFunnelId, setSelectedFunnelId] = useState<string | null>(null);

  // LEITURA

  const { data: funnelsData, isLoading: isLoadingFunnels } = useFunnelsList();

  const { data: funnelDetailsData, isLoading: isLoadingFunnelDetails } =
    useFunnelDetails(selectedFunnelId);

  // ESCRITA - FUNIS

  const { mutate: createFunnel, isPending: isCreatingFunnel } = useCreateFunnel(
    async (newFunnel) => {
      try {
        // 1. Criar etapas padrão
        const stagePromises = initialCols.map((col, index) =>
          apiCreateStage({
            name: col.title,
            funnel: newFunnel.id,
            order: index,
          }),
        );

        const createdStages = await Promise.all(stagePromises);

        // Mapa de ID temporário para ID real
        const colIdMap: Record<string, number> = {};
        initialCols.forEach((col, index) => {
          if (createdStages[index]) {
            colIdMap[col.id] = createdStages[index].id;
          }
        });

        // 2. Criar leads padrão
        const leadsPerColumn: Record<number, number> = {};
        const leadPromises = initialLeads.map((lead) => {
          const stageId = colIdMap[lead.columnId];
          if (!stageId) return Promise.resolve(null);

          const currentOrder = leadsPerColumn[stageId] || 0;
          leadsPerColumn[stageId] = currentOrder + 1;

          const [emailPart, phonePart] = lead.content.split("|");

          return apiCreateLead({
            name: lead.name,
            stage: stageId,
            order: currentOrder,
            email: emailPart?.trim() || null,
            phone: phonePart?.trim() || "",
            earning: lead.earning,
            temperature: lead.temperature,
            content: lead.content,
          });
        });

        await Promise.all(leadPromises);

        await queryClient.invalidateQueries({
          queryKey: queryKeys.funnels.detail(newFunnel.id.toString()),
        });
      } catch (error) {
        console.error("Erro ao popular dados iniciais:", error);
      }

      setIsCreateOpen(false);
      setSelectedFunnelId(newFunnel.id.toString());
    },
  );

  const { mutate: deleteFunnel, isPending: isDeletingFunnel } = useDeleteFunnel(
    () => {
      setIsDeleteOpen(false);
      setFunnelToDelete(null);
      setSelectedFunnelId(null);
    },
  );

  // ESCRITA - LEADS E ETAPAS

  const { mutate: moveLead } = useMoveLead(selectedFunnelId, setLeads);
  const { mutate: moveStage } = useMoveStage(selectedFunnelId);
  const { mutate: createLead, isPending: isCreatingLead } = useCreateLead(
    selectedFunnelId,
    setLeads,
  );

  const { mutate: editLead, isPending: isEditingLead } = useEditLeadDetails(
    selectedFunnelId,
    setLeads,
  );

  const { mutate: createStage, isPending: isCreatingStage } =
    useCreateStage(selectedFunnelId);

  // DADOS

  const funnelsList = useMemo(() => {
    const data = funnelsData as ApiFunnel[] | undefined;
    return (
      data?.map((f) => ({
        value: f.id.toString(),
        label: f.name,
      })) || []
    );
  }, [funnelsData]);

  const selectedFunnelName = useMemo(() => {
    return funnelsList.find((f) => f.value === selectedFunnelId)?.label || "";
  }, [funnelsList, selectedFunnelId]);

  const filteredLeads = useMemo(
    () => getFilteredAndSortedLeads(leads, filterTerm, sortCriteria),
    [leads, filterTerm, sortCriteria],
  );

  const columnsWithSubtitles = useMemo(
    () => getColumnsWithSubtitles(columns, leads),
    [columns, leads],
  );

  // EFEITOS

  useEffect(() => {
    if (funnelsList.length > 0) {
      const currentExists = funnelsList.some(
        (f) => f.value === selectedFunnelId,
      );
      if (!selectedFunnelId || !currentExists) {
        setSelectedFunnelId(funnelsList[0].value);
      }
    } else if (funnelsList.length === 0 && selectedFunnelId) {
      setSelectedFunnelId(null);
    }
  }, [funnelsList, selectedFunnelId]);

  useEffect(() => {
    if (!funnelDetailsData) {
      setColumns([]);
      setLeads([]);
      return;
    }
    const mapped = mapApiDetailsToKanban(funnelDetailsData);
    setColumns(mapped.columns);
    setLeads(mapped.leads);
  }, [funnelDetailsData, initialCols, initialLeads]);

  useEffect(() => {
    setFilterTerm("");
    setSortCriteria(null);
  }, [selectedFunnelId]);

  // HANDLERS

  const getLeadsForColumn = useCallback(
    (columnId: ColumnId) =>
      filteredLeads.filter((l) => l.columnId === columnId),
    [filteredLeads],
  );

  const handleLeadDrop = useCallback(
    (event: LeadDropEvent) => {
      const { leadId, newColumnId, newOrder } = event;
      moveLead({
        id: extractId(leadId),
        stage: extractId(newColumnId),
        order: newOrder,
      });
    },
    [moveLead],
  );

  const handleColumnDrop = useCallback(
    (columnId: UniqueIdentifier, newOrder: number) => {
      setColumns((prev) => {
        const oldIndex = prev.findIndex((c) => c.id === columnId);
        if (oldIndex === -1) return prev;
        return arrayMove(prev, oldIndex, newOrder);
      });

      moveStage({
        id: extractId(columnId),
        order: newOrder,
      });
    },
    [moveStage],
  );

  const handleColumnsChange = useCallback<Dispatch<SetStateAction<Column[]>>>(
    (updater) => {
      setColumns((prev) => {
        return typeof updater === "function" ? updater(prev) : updater;
      });
    },
    [],
  );

  const handleAddLead = useCallback(
    (columnId: ColumnId) => {
      createLead({
        name: "Novo Lead",
        stage: extractId(columnId),
        order: 0,
      });
    },
    [createLead],
  );

  const handleAddColumn = useCallback(() => {
    if (selectedFunnelId) {
      createStage({
        name: "Nova Etapa",
        funnel: Number(selectedFunnelId),
        order: columns.length,
      });
    }
  }, [selectedFunnelId, createStage, columns.length]);

  // RETORNO
  return useMemo(
    () => ({
      createDialog: {
        open: isCreateOpen,
        onOpenChange: setIsCreateOpen,
        onSubmit: (vals: FunnelFormValues) => createFunnel(vals),
        isPending: isCreatingFunnel,
      },
      deleteDialog: {
        open: isDeleteOpen,
        onOpenChange: setIsDeleteOpen,
        onSubmit: () => {
          if (selectedFunnelId) deleteFunnel(Number(selectedFunnelId));
        },
        funnelName: funnelToDelete || "",
        isPending: isDeletingFunnel,
      },
      editLeadDialog: {
        open: !!editingLead,
        lead: editingLead,
        onOpenChange: (isOpen: boolean) => !isOpen && setEditingLead(null),
        onSubmit: (values: EditLeadFormValues) => {
          if (editingLead) {
            editLead({
              id: extractId(editingLead.id),
              ...values,
            });
            setEditingLead(null);
          }
        },
        isPending: isEditingLead,
      },
      viewLeadDialog: {
        open: !!viewingLead,
        lead: viewingLead,
        onOpenChange: (isOpen: boolean) => !isOpen && setViewingLead(null),
        onSubmit: () => setViewingLead(null),
        isPending: false,
        readOnly: true,
      },
      actionBar: {
        onCreateFunnelClick: () => setIsCreateOpen(true),
        onDeleteFunnelClick: () => {
          if (selectedFunnelId) {
            setFunnelToDelete(selectedFunnelName);
            setIsDeleteOpen(true);
          }
        },
        onFilterChange: setFilterTerm,
        onSortChange: setSortCriteria,
        funnels: funnelsList,
        filterTerm,
        isLoading: isLoadingFunnels,
        selectedFunnelId: selectedFunnelId || "",
        onFunnelSelect: setSelectedFunnelId,
      },
      kanban: {
        columns: columnsWithSubtitles,
        leads,
        getFilteredAndSortedLeads: getLeadsForColumn,
        onColumnsChange: handleColumnsChange,
        onColumnDrop: handleColumnDrop,
        onLeadDrop: handleLeadDrop,
        onAddLead: handleAddLead,
        onAddColumn: handleAddColumn,
        onLeadEdit: setEditingLead,
        onLeadView: setViewingLead,
        isLoading: isLoadingFunnelDetails || isCreatingLead || isCreatingStage,
      },
    }),
    [
      isCreateOpen,
      isCreatingFunnel,
      isDeleteOpen,
      isDeletingFunnel,
      funnelToDelete,
      editingLead,
      viewingLead,
      isEditingLead,
      selectedFunnelId,
      selectedFunnelName,
      filterTerm,
      funnelsList,
      isLoadingFunnels,
      isLoadingFunnelDetails,
      isCreatingLead,
      isCreatingStage,
      columnsWithSubtitles,
      leads,
      createFunnel,
      deleteFunnel,
      editLead,
      getLeadsForColumn,
      handleColumnsChange,
      handleColumnDrop,
      handleLeadDrop,
      handleAddLead,
      handleAddColumn,
    ],
  );
}
