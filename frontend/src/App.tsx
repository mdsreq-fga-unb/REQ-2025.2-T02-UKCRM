import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "@/auth/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Organizacoes from "./pages/Organizacoes";
import Times from "./pages/Times/index.tsx";
import Membros from "./pages/Membros/index.tsx";
import NotFound from "./pages/NotFound";
import Funnel from "./pages/Funnel/index.tsx";
import Profile from "./pages/Profile"; 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/landing" element={<Landing />} />
            <Route path="/login" element={<Login />} />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Organizacoes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organizacoes"
              element={
                <ProtectedRoute>
                  <Organizacoes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/times"
              element={
                <ProtectedRoute>
                  <Times />
                </ProtectedRoute>
              }
            />
            <Route
              path="/membros"
              element={
                <ProtectedRoute>
                  <Membros />
                </ProtectedRoute>
              }
            />
            <Route
              path="/funis"
              element={
                <ProtectedRoute>
                  <Funnel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;