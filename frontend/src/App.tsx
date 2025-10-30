import { Outlet } from "react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ThemeToggle";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <header className="flex justify-between w-full flex-row p-4">
        <ThemeToggle />
      </header>
      <main className="grow">
        <Outlet />
      </main>
    </ThemeProvider>
  );
}

export default App;
