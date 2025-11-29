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
        { label: "Gerenciamento de Funis" },
      ]}
    >
      <div className="space-y-6 animate-fade-in">
        {/* Sidebar Label */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-4 w-4 rounded bg-primary" />
          <span className="font-medium text-foreground">Gerenciamento de Funis</span>
        </div>

        {/* Content */}
        <div className="flex flex-col divide-y border rounded-lg bg-card">
          <ActionBar {...actionBar} />
          <KanbanBoard {...kanban} />
        </div>
      </div>

      {/* Modals */}
      <CreateFunnelDialog {...createDialog} />
      <DeleteFunnelDialog {...deleteDialog} />
    </AppShell>
  );
}

export default Funnel;
