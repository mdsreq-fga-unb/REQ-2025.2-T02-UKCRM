import { useState } from "react";
import ActionBar from "./ActionBar";
import { KanbanBoard } from "@/components/KanbanBoard";
import type { Column } from "@/components/BoardColumn";
import type { Task } from "@/components/TaskCard";
import { defaultCols, initialTasks } from "./default-data";
import { CreateFunnelDialog } from "./CreateFunnelDialog";
import { DeleteFunnelDialog } from "./DeleteFunnelDialog";
import { formSchema } from "./funnel.schema";
import * as z from "zod";

type FunnelFormValues = z.infer<typeof formSchema>;

function Funnel() {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [funnelToDelete, setFunnelToDelete] = useState<string | null>(null);

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

  return (
    <main className="flex flex-col gap-4">
      <ActionBar
        onCreateFunnelClick={onCreateFunnelClick}
        onDeleteFunnelClick={onDeleteFunnelClick}
      />
      <KanbanBoard
        columns={columns}
        tasks={tasks}
        onColumnsChange={setColumns}
        onTasksChange={setTasks}
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
