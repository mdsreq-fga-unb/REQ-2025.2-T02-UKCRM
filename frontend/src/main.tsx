import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";

import App from "./App";
import Funnel from "./pages/Funnel/Funnel.tsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Funnel />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
