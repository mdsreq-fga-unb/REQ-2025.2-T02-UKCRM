import ActionBar from "./components/ActionBar";
import { CreateFunnelDialog } from "./components/CreateFunnelDialog";
import { DeleteFunnelDialog } from "./components/DeleteFunnelDialog";
import { EditLeadDialog } from "./components/EditLeadDialog";
import { KanbanBoard } from "./components/KanbanBoard";
import { defaultCols, initialLeads } from "./data/defaultKanbanData";
import { useFunnel } from "./hooks/useFunnel";

function Funnel() {
  const { actionBar, kanban, createDialog, deleteDialog, editLeadDialog } = useFunnel(
    defaultCols,
    initialLeads,
  );

  return (
    <main className="h-full flex flex-col divide-y">
      <ActionBar {...actionBar} />
      <KanbanBoard {...kanban} />
      <CreateFunnelDialog {...createDialog} />
      <DeleteFunnelDialog {...deleteDialog} />
      <EditLeadDialog {...editLeadDialog} />
    </main>
  );
}

export default Funnel;
