import { useMemo, useState } from "react";
import type { Column } from "@/components/BoardColumn";
import type { Task } from "@/components/TaskCard";
import type { ColumnId } from "@/components/KanbanBoard";
import { type FunnelFormValues } from "../funnel.schema";

export function useFunnel(initialCols: Column[], initialTasks: Task[]) {
  const [columns, setColumns] = useState<Column[]>(initialCols);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [funnelToDelete, setFunnelToDelete] = useState<string | null>(null);
  const [filterTerm, setFilterTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState<string | null>(null);

  // --- Diálogos ---

  const onCreateFunnelClick = () => {
    setIsCreateOpen(true);
  };

  const handleCreateFunnel = (values: FunnelFormValues) => {
    console.log("Novo funil a ser criado:", values);
    setIsCreateOpen(false);
  };

  const onDeleteFunnelClick = (funnelName: string) => {
    setFunnelToDelete(funnelName);
    setIsDeleteOpen(true);
  };

  const handleDeleteFunnel = () => {
    if (!funnelToDelete) return;
    console.log("Excluindo funil:", funnelToDelete);
    setIsDeleteOpen(false);
    setFunnelToDelete(null);
  };

  // --- Kanban ---

  const handleAddTask = (columnId: ColumnId) => {
    const newId = `task-${crypto.randomUUID()}`;
    const newTask: Task = {
      id: newId,
      columnId: columnId,
      title: "Titulo",
      content: "Descricao...",
      earning: 0,
      temperature: "Neutro",
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const handleAddColumn = () => {
    const newId = `col-${crypto.randomUUID()}`;
    const newColumn: Column = {
      id: newId,
      title: "Nova Etapa",
      subtitle_left: "0 negócios",
      subtitle_right: "R$ 0,00",
    };
    setColumns((prevCols) => [...prevCols, newColumn]);
  };

  // --- Dados ---

  const funnelsList = [
    { value: "funil-a", label: "Funil Principal" },
    { value: "funil-b", label: "Funil de Prospecção" },
    { value: "funil-c", label: "Funil de Onboarding" },
  ];

  const columnsWithSubtitles = useMemo(() => {
    return columns.map((col) => {
      const tasksInColumn = tasks.filter((task) => task.columnId === col.id);
      const count = tasksInColumn.length;
      const totalEarnings = tasksInColumn.reduce(
        (sum, task) => sum + task.earning,
        0,
      );

      return {
        ...col,
        subtitle_left: `${count} negócio${count !== 1 ? "s" : ""}`,
        subtitle_right: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(totalEarnings),
      };
    });
  }, [columns, tasks]);

  // --- Retorno ---

  return {
    columns: columnsWithSubtitles,
    tasks,
    filterTerm,
    sortCriteria,
    createDialog: {
      open: isCreateOpen,
      onOpenChange: setIsCreateOpen,
      onSubmit: handleCreateFunnel,
    },
    deleteDialog: {
      open: isDeleteOpen,
      onOpenChange: setIsDeleteOpen,
      onSubmit: handleDeleteFunnel,
      funnelName: funnelToDelete || "",
    },
    actionBar: {
      onCreateFunnelClick,
      onDeleteFunnelClick,
      onFilterChange: setFilterTerm,
      onSortChange: setSortCriteria,
      funnels: funnelsList,
    },
    kanban: {
      onColumnsChange: setColumns,
      onTasksChange: setTasks,
      onAddTask: handleAddTask,
      onAddColumn: handleAddColumn,
    },
  };
}
