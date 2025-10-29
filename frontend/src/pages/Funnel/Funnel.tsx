import "./Funnel.css";
import { KanbanBoard } from "@/components/KanbanBoard";

function Funnel() {
  return (
    <main className="mx-4 flex flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Drag and Drop Kanban Board
      </h1>
      <KanbanBoard />
    </main>
  );
}

export default Funnel;
