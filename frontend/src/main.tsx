import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import Funnel from "@/pages/Funnel/index.tsx";

const queryClient = new QueryClient();
const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Funnel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>,
);
