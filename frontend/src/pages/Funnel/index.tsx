import { AppShell } from "@/components/layout/AppShell";
import ActionBar from "./components/ActionBar";
import { CreateFunnelDialog } from "./components/CreateFunnelDialog";
import { DeleteFunnelDialog } from "./components/DeleteFunnelDialog";
import { KanbanBoard } from "./components/KanbanBoard";
import { defaultCols, initialLeads } from "./data/defaultKanbanData";
import { useFunnel } from "./hooks/useFunnel";

function Funnel() {
  const { actionBar, kanban, createDialog, deleteDialog } = useFunnel(
    defaultCols,
    initialLeads,
  );

  return (
    <AppShell
      breadcrumbs={[
        { label: "Funils", href: "/" },
        { label: "Funils de Venda" },
      ]}
      className="p-0"
    >
      <div className="h-full flex flex-col divide-y">
        <ActionBar {...actionBar} />
        <KanbanBoard {...kanban} />
        <CreateFunnelDialog {...createDialog} />
        <DeleteFunnelDialog {...deleteDialog} />
      </div>
    </AppShell>
  );
}

export default Funnel;
