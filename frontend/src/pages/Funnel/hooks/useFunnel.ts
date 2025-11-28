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
import type { ApiFunnel } from "../api/funnels.api";
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
  useUpdateStage,
} from "./useFunnels";

import { useCreateLead, useUpdateLead } from "./useLeads";

import {
  extractId,
  getColumnsWithSubtitles,
  getFilteredAndSortedLeads,
  mapApiDetailsToKanban,
} from "../utils/funnelTransformers";

export function useFunnel(initialCols: Column[], initialLeads: Lead[]) {
  const [columns, setColumns] = useState<Column[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [funnelToDelete, setFunnelToDelete] = useState<string | null>(null);
  const [filterTerm, setFilterTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState<string | null>(null);

  const [selectedFunnelId, setSelectedFunnelId] = useState<string | null>(null);

  // LEITURA
  
  const { data: funnelsData, isLoading: isLoadingFunnels } = useFunnelsList();

  const { data: funnelDetailsData, isLoading: isLoadingFunnelDetails } =
    useFunnelDetails(selectedFunnelId);

  // ESCRITA

  // FUNILS
  
  const { mutate: createFunnel, isPending: isCreatingFunnel } = useCreateFunnel(
    (newFunnel) => {
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

  // LEADS E ETAPAS
  
  const { mutate: updateLead } = useUpdateLead(selectedFunnelId, setLeads);
  const { mutate: updateStage } = useUpdateStage(selectedFunnelId);
  const { mutate: createLead, isPending: isCreatingLead } = useCreateLead(
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
    if (!funnelDetailsData) {
      setColumns(initialCols);
      setLeads(initialLeads);
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
      updateLead({
        id: extractId(leadId), 
        stage: extractId(newColumnId), 
        order: newOrder,
      });
    },
    [updateLead],
  );

  const handleColumnDrop = useCallback(
    (columnId: UniqueIdentifier, newOrder: number) => {
      setColumns((prev) => {
        const oldIndex = prev.findIndex((c) => c.id === columnId);
        if (oldIndex === -1) return prev;
        return arrayMove(prev, oldIndex, newOrder);
      });

      updateStage({
        id: extractId(columnId),
        order: newOrder,
      });
    },
    [updateStage],
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
        isLoading: isLoadingFunnelDetails || isCreatingLead || isCreatingStage,
      },
    }),
    [
      isCreateOpen,
      isCreatingFunnel,
      isDeleteOpen,
      isDeletingFunnel,
      funnelToDelete,
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

      getLeadsForColumn,
      handleColumnsChange,
      handleColumnDrop,
      handleLeadDrop,
      handleAddLead,
      handleAddColumn,
    ],
  );
}
