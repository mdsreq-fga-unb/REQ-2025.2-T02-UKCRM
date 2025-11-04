import { useMemo, useState } from "react";
import ActionBar from "./ActionBar";
import { KanbanBoard } from "@/components/KanbanBoard";
import type { Column } from "@/components/BoardColumn";
import type { Task } from "@/components/TaskCard";
import { defaultCols, initialTasks } from "./default-data";
import { CreateFunnelDialog } from "./CreateFunnelDialog";
import { DeleteFunnelDialog } from "./DeleteFunnelDialog";
import { formSchema } from "./funnel.schema";
import * as z from "zod";
import { type ColumnId } from "@/components/KanbanBoard";

type FunnelFormValues = z.infer<typeof formSchema>;

function Funnel() {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [funnelToDelete, setFunnelToDelete] = useState<string | null>(null);
  const [filterTerm, setFilterTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState<string | null>(null);

  const onCreateFunnelClick = () => {
    setIsCreateOpen(true);
  };

  const handleCreateFunnel = (values: FunnelFormValues) => {
    console.log("Novo funil a ser criado:", values);
    console.log("Nome:", values.funnelName);
    console.log("Times selecionados:", values.teamNames);

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

  const handleAddTask = (columnId: ColumnId) => {
    const newId = `task-${crypto.randomUUID()}`;

    // dps mudar isso pra abrir um modal e tals
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

  return (
    <main className="flex flex-col gap-4">
      <ActionBar
        onCreateFunnelClick={onCreateFunnelClick}
        onDeleteFunnelClick={onDeleteFunnelClick}
        filterTerm={filterTerm}
        onFilterChange={setFilterTerm}
        onSortChange={setSortCriteria}
      />
      <KanbanBoard
      columns={columnsWithSubtitles}
        tasks={tasks}
        onColumnsChange={setColumns}
        onTasksChange={setTasks}
        filterTerm={filterTerm}
        sortCriteria={sortCriteria}
        onAddTask={handleAddTask}
        onAddColumn={handleAddColumn}
      />

      <CreateFunnelDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreateFunnel}
      />

      <DeleteFunnelDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onSubmit={handleDeleteFunnel}
        funnelName={funnelToDelete || ""}
      />
    </main>
  );
}

export default Funnel;
