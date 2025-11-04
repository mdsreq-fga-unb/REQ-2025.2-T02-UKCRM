import { Outlet } from "react-router";
import ThemeProvider from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="flex flex-col gap-4 p-4">
        <header className="flex justify-between w-full flex-row">
          <ThemeToggle />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
