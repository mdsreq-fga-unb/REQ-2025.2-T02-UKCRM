import { useState } from "react";
import ActionBar from "./ActionBar";
import { KanbanBoard } from "@/components/KanbanBoard";
import type { Column } from "@/components/BoardColumn";
import type { Task } from "@/components/TaskCard";
import { defaultCols, initialTasks } from "./default-data";

function Funnel() {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  return (
    <main className="flex flex-col gap-4">
      <ActionBar />
      <KanbanBoard
        columns={columns}
        tasks={tasks}
        onColumnsChange={setColumns}
        onTasksChange={setTasks}
      />
    </main>
  );
}

export default Funnel;
