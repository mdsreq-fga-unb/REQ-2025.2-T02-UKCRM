import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import Organizacoes from "./pages/Organizacoes";
import Times from "./pages/Times/index.tsx";
import Membros from "./pages/Membros/index.tsx";
import NotFound from "./pages/NotFound";
import Funnel from "./pages/Funnel/index.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Organizacoes />} />
          <Route path="/organizacoes" element={<Organizacoes />} />
          <Route path="/times" element={<Times />} />
          <Route path="/membros" element={<Membros />} />
          <Route path="/funis" element={<Funnel />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;