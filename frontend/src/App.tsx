import { Outlet } from "react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ThemeToggle";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col">
        <header className="flex justify-between w-full flex-row p-4">
          <ThemeToggle />
        </header>
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default App;
