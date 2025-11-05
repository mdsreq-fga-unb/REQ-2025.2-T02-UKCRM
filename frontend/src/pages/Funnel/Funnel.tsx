import ActionBar from "./components/ActionBar";
import { KanbanBoard } from "@/components/KanbanBoard";
import { defaultCols, initialTasks } from "./data/default-funnel-data";
import { CreateFunnelDialog } from "./components/CreateFunnelDialog";
import { DeleteFunnelDialog } from "./components/DeleteFunnelDialog";
import { useFunnel } from "./hooks/useFunnel";

function Funnel() {
  const {
    columns,
    tasks,
    filterTerm,
    sortCriteria,
    createDialog,
    deleteDialog,
    actionBar,
    kanban,
  } = useFunnel(defaultCols, initialTasks);

  return (
    <main className="flex flex-col gap-4">
      <ActionBar {...actionBar} filterTerm={filterTerm} />
      <KanbanBoard
        columns={columns}
        tasks={tasks}
        {...kanban}
        filterTerm={filterTerm}
        sortCriteria={sortCriteria}
      />

      <CreateFunnelDialog {...createDialog} />
      <DeleteFunnelDialog {...deleteDialog} />
    </main>
  );
}

export default Funnel;
