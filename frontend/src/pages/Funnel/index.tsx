import { AppShell } from "@/components/layout/AppShell";
import ActionBar from "./components/ActionBar";
import { CreateFunnelDialog } from "./components/CreateFunnelDialog";
import { DeleteFunnelDialog } from "./components/DeleteFunnelDialog";
import { KanbanBoard } from "./components/KanbanBoard";
import { defaultCols, initialLeads } from "./data/defaultKanbanData";
import { useFunnelData } from "./hooks/useFunnelData";

function Funnel() {
  const { actionBar, kanban, createDialog, deleteDialog } = useFunnelData(
    defaultCols,
    initialLeads,
  );

  return (
    <AppShell
      breadcrumbs={[
        { label: "Organizações", href: "/" },
        { label: "Gerenciamento de Funils" },
      ]}
      className="p-0"
    >
      <div className="h-full flex flex-col divide-y">
        <ActionBar {...actionBar} />
        <KanbanBoard {...kanban} />
      </div>

      {/* Modals */}
      <CreateFunnelDialog {...createDialog} />
      <DeleteFunnelDialog {...deleteDialog} />
    </AppShell>
  );
}

export default Funnel;
