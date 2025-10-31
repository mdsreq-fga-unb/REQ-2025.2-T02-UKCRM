import ActionBar from "./ActionBar";
import { KanbanBoard } from "@/components/KanbanBoard";

function Funnel() {
  return (
    <main className="flex flex-col gap-4">
      <ActionBar />
      <KanbanBoard />
    </main>
  );
}

export default Funnel;
