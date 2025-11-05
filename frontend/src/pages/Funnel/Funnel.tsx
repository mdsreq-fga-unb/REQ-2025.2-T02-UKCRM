import { KanbanBoard } from "@/components/KanbanBoard";
import ActionBar from "./components/ActionBar";
import { CreateFunnelDialog } from "./components/CreateFunnelDialog";
import { DeleteFunnelDialog } from "./components/DeleteFunnelDialog";
import { defaultCols, initialTasks } from "./data/default-funnel-data";
import { useFunnel } from "./hooks/useFunnel";

function Funnel() {
  const { actionBar, kanban, createDialog, deleteDialog } = useFunnel(
    defaultCols,
    initialTasks,
  );

  return (
    <main className="flex flex-col gap-4">
      <ActionBar {...actionBar} />
      <KanbanBoard {...kanban} />
      <CreateFunnelDialog {...createDialog} />
      <DeleteFunnelDialog {...deleteDialog} />
    </main>
  );
}

export default Funnel;
