import { Outlet } from "react-router";
import ThemeProvider from "@/components/theme/ThemeProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

function App() {
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <div className="flex flex-col h-screen divide-y">
        <header className="flex justify-between w-full flex-row p-2">
          <ThemeToggle />
        </header>
        <div className="flex-1 min-h-0">
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
