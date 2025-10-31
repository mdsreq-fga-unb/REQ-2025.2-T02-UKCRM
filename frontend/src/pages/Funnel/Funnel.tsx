import ActionBar from "./ActionBar";
import "./Funnel.css";
import { KanbanBoard } from "@/components/KanbanBoard";

function Funnel() {
  return (
    <main className="mx-4 flex flex-col gap-6">
      <ActionBar />
      <KanbanBoard />
    </main>
  );
}

export default Funnel;
