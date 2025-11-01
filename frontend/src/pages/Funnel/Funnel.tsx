import { useState } from "react";
import ActionBar from "./ActionBar";
import { KanbanBoard } from "@/components/KanbanBoard";
import type { Column } from "@/components/BoardColumn";
import type { Task } from "@/components/TaskCard";
import { defaultCols, initialTasks } from "./default-data";
import { CreateFunnelDialog } from "./CreateFunnelDialog";

function Funnel() {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isCreateFunnelOpen, setIsCreateFunnelOpen] = useState(false);

  const handleCreateFunnel = (funnelName: string) => {
    console.log("Novo funil a ser criado:", funnelName);
    setIsCreateFunnelOpen(false);
  };

  return (
    <main className="flex flex-col gap-4">
      <ActionBar onCreateFunnelClick={() => setIsCreateFunnelOpen(true)} />
      <KanbanBoard
        columns={columns}
        tasks={tasks}
        onColumnsChange={setColumns}
        onTasksChange={setTasks}
      />

      <CreateFunnelDialog
        open={isCreateFunnelOpen}
        onOpenChange={setIsCreateFunnelOpen}
        onSubmit={handleCreateFunnel}
      />
    </main>
  );
}

export default Funnel;
