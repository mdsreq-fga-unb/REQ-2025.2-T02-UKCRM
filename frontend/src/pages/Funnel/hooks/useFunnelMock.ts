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
import type { FunnelFormValues } from "../schemas/funnel.schema";
import type {
  Column,
  ColumnId,
  Lead,
  LeadDropEvent,
} from "../types/kanban.types";

import {
  getColumnsWithSubtitles,
  getFilteredAndSortedLeads,
} from "../utils/funnelTransformers";

// Mock data for funnels list
const mockFunnelsList = [
  { id: 1, name: "Funil de Vendas Principal", teams: [1, 2] },
  { id: 2, name: "Funil de Novos Clientes", teams: [1] },
  { id: 3, name: "Funil de Expansão", teams: [2, 3] },
];

// Type for storing funnel data
type FunnelData = {
  columns: Column[];
  leads: Lead[];
};

export function useFunnelMock(initialCols: Column[], initialLeads: Lead[]) {
  // Store data per funnel ID
  const [funnelDataMap, setFunnelDataMap] = useState<
    Record<string, FunnelData>
  >({});

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [funnelToDelete, setFunnelToDelete] = useState<string | null>(null);
  const [filterTerm, setFilterTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState<string | null>(null);

  const [selectedFunnelId, setSelectedFunnelId] = useState<string | null>(null);
  const [funnels, setFunnels] = useState(mockFunnelsList);

  // Get current funnel's data or return defaults
  const currentFunnelData = selectedFunnelId
    ? funnelDataMap[selectedFunnelId] || {
        columns: initialCols,
        leads: initialLeads,
      }
    : { columns: initialCols, leads: initialLeads };

  const columns = currentFunnelData.columns;
  const leads = currentFunnelData.leads;

  // Helper function to update current funnel's data
  const updateFunnelData = useCallback(
    (updater: (prev: FunnelData) => FunnelData) => {
      if (!selectedFunnelId) return;

      setFunnelDataMap((prev) => {
        const currentData = prev[selectedFunnelId] || {
          columns: initialCols,
          leads: initialLeads,
        };
        return {
          ...prev,
          [selectedFunnelId]: updater(currentData),
        };
      });
    },
    [selectedFunnelId, initialCols, initialLeads],
  );

  // DADOS

  const funnelsList = useMemo(() => {
    return funnels.map((f) => ({
      value: f.id.toString(),
      label: f.name,
    }));
  }, [funnels]);

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

      updateFunnelData((prev) => ({
        ...prev,
        leads: reorderLeadsLocally(prev.leads, leadId, newColumnId, newOrder),
      }));
    },
    [updateFunnelData],
  );

  const handleColumnDrop = useCallback(
    (columnId: UniqueIdentifier, newOrder: number) => {
      updateFunnelData((prev) => {
        const oldIndex = prev.columns.findIndex((c) => c.id === columnId);
        if (oldIndex === -1) return prev;
        return {
          ...prev,
          columns: arrayMove(prev.columns, oldIndex, newOrder),
        };
      });
    },
    [updateFunnelData],
  );

  const handleColumnsChange = useCallback<Dispatch<SetStateAction<Column[]>>>(
    (updater) => {
      updateFunnelData((prev) => {
        const newColumns =
          typeof updater === "function" ? updater(prev.columns) : updater;
        return { ...prev, columns: newColumns };
      });
    },
    [updateFunnelData],
  );

  const handleAddLead = useCallback(
    (columnId: ColumnId) => {
      const newLead: Lead = {
        id: `lead-temp-${crypto.randomUUID()}`,
        columnId: columnId,
        name: "Novo Lead",
        earning: 0,
        temperature: "Neutro",
        createdAt: new Date(),
        updatedAt: new Date(),
        content: "email@exemplo.com | (00) 00000-0000",
      };

      updateFunnelData((prev) => ({
        ...prev,
        leads: [newLead, ...prev.leads],
      }));
    },
    [updateFunnelData],
  );

  const handleAddColumn = useCallback(() => {
    const newColumn: Column = {
      id: `col-temp-${crypto.randomUUID()}`,
      title: "Nova Etapa",
      subtitle_left: "0 negócios",
      subtitle_right: "R$ 0,00",
    };

    updateFunnelData((prev) => ({
      ...prev,
      columns: [...prev.columns, newColumn],
    }));
  }, [updateFunnelData]);

  const handleEditColumnName = useCallback(
    (columnId: UniqueIdentifier, newName: string) => {
      updateFunnelData((prev) => ({
        ...prev,
        columns: prev.columns.map((col) =>
          col.id === columnId ? { ...col, title: newName } : col,
        ),
      }));
    },
    [updateFunnelData],
  );

  const handleCreateFunnel = useCallback((vals: FunnelFormValues) => {
    const newFunnel = {
      id: Date.now(),
      name: vals.funnelName,
      teams: vals.teamIds.map((id) => parseInt(id, 10)),
    };

    setFunnels((prev) => [...prev, newFunnel]);
    setSelectedFunnelId(newFunnel.id.toString());
    setIsCreateOpen(false);
  }, []);

  const handleDeleteFunnel = useCallback(() => {
    if (selectedFunnelId) {
      setFunnels((prev) =>
        prev.filter((f) => f.id.toString() !== selectedFunnelId),
      );

      // Clean up funnel data
      setFunnelDataMap((prev) => {
        const newMap = { ...prev };
        delete newMap[selectedFunnelId];
        return newMap;
      });

      setSelectedFunnelId(null);
      setIsDeleteOpen(false);
      setFunnelToDelete(null);
    }
  }, [selectedFunnelId]);

  // RETORNO
  return useMemo(
    () => ({
      createDialog: {
        open: isCreateOpen,
        onOpenChange: setIsCreateOpen,
        onSubmit: handleCreateFunnel,
        isPending: false,
      },
      deleteDialog: {
        open: isDeleteOpen,
        onOpenChange: setIsDeleteOpen,
        onSubmit: handleDeleteFunnel,
        funnelName: funnelToDelete || "",
        isPending: false,
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
        isLoading: false,
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
        onEditColumnName: handleEditColumnName,
        isLoading: false,
      },
    }),
    [
      isCreateOpen,
      isDeleteOpen,
      funnelToDelete,
      selectedFunnelId,
      selectedFunnelName,
      filterTerm,
      funnelsList,
      columnsWithSubtitles,
      leads,
      handleCreateFunnel,
      handleDeleteFunnel,
      getLeadsForColumn,
      handleColumnsChange,
      handleColumnDrop,
      handleLeadDrop,
      handleAddLead,
      handleAddColumn,
      handleEditColumnName,
    ],
  );
}

function reorderLeadsLocally(
  oldLeads: Lead[],
  movedLeadId: string | UniqueIdentifier,
  targetColumnId: string | UniqueIdentifier,
  targetOrder: number,
): Lead[] {
  const leadId =
    typeof movedLeadId === "string" ? movedLeadId : movedLeadId.toString();
  const columnId =
    typeof targetColumnId === "string"
      ? targetColumnId
      : targetColumnId.toString();

  const leadToMove = oldLeads.find((l) => l.id === leadId);
  if (!leadToMove) return oldLeads;

  const updatedLead = { ...leadToMove, columnId: columnId };
  const allOtherLeads = oldLeads.filter((l) => l.id !== leadId);

  const leadsInTargetColumn = allOtherLeads.filter(
    (l) => l.columnId === columnId,
  );

  const leadsInOtherColumns = allOtherLeads.filter(
    (l) => l.columnId !== columnId,
  );

  const newTargetList = [...leadsInTargetColumn];
  newTargetList.splice(targetOrder, 0, updatedLead);
  return [...leadsInOtherColumns, ...newTargetList];
}
