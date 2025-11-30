import { AppShell } from "@/components/layout/AppShell";
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
      <EditLeadDialog {...editLeadDialog} />
    </AppShell>
  );
}

export default Funnel;
