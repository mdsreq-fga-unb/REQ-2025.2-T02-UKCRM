import type { Column, Lead } from "../types/kanban.types";

/**
 * Colunas padrão para exibir o quadro Kanban
 * quando nenhum funil estiver selecionado.
 */
export const defaultCols: Column[] = [
  {
    id: "col-1",
    title: "Prospecção",
    subtitle_left: "0 negócios",
    subtitle_right: "R$ 0,00",
  },
  {
    id: "col-2",
    title: "Qualificação",
    subtitle_left: "0 negócios",
    subtitle_right: "R$ 0,00",
  },
  {
    id: "col-3",
    title: "Proposta",
    subtitle_left: "0 negócios",
    subtitle_right: "R$ 0,00",
  },
  {
    id: "col-4",
    title: "Fechamento",
    subtitle_left: "0 negócios",
    subtitle_right: "R$ 0,00",
  },
];

/**
 * Leads de exemplo para preencher o quadro Kanban
 * (geralmente usado durante o desenvolvimento ou como placeholder).
 */
export const initialLeads: Lead[] = [
  // Coluna 1: Prospecção
  {
    id: "lead-1",
    columnId: "col-1",
    name: "Empresa Alpha",
    earning: 15000,
    content: "contato@alpha.com | (11) 98888-1111",
    temperature: "Frio",
    createdAt: new Date("2025-10-20T10:00:00"),
    updatedAt: new Date("2025-10-28T14:30:00"),
  },
  {
    id: "lead-2",
    columnId: "col-1",
    name: "Companhia Beta",
    earning: 8000,
    content: "financeiro@beta.com | (21) 97777-2222",
    temperature: "Morno",
    createdAt: new Date("2025-10-25T09:00:00"),
    updatedAt: new Date("2025-10-29T11:00:00"),
  },

  // Coluna 2: Qualificação
  {
    id: "lead-3",
    columnId: "col-2",
    name: "Soluções Gama",
    earning: 35000,
    content: "diretoria@gama.com | (41) 96666-3333",
    temperature: "Quente",
    createdAt: new Date("2025-10-15T13:00:00"),
    updatedAt: new Date("2025-10-27T16:00:00"),
  },

  // Coluna 3: Proposta
  {
    id: "lead-4",
    columnId: "col-3",
    name: "Holding Delta",
    earning: 120000,
    content: "compras@delta.com | (51) 95555-4444",
    temperature: "Quente",
    createdAt: new Date("2025-09-30T17:00:00"),
    updatedAt: new Date("2025-10-25T10:15:00"),
  },

  // Coluna 4: Fechamento
  {
    id: "lead-5",
    columnId: "col-4",
    name: "Serviços Epsilon",
    earning: 22000,
    content: "ceo@epsilon.com | (61) 94444-5555",
    temperature: "Morno",
    createdAt: new Date("2025-10-05T11:00:00"),
    updatedAt: new Date("2025-10-20T09:45:00"),
  },
];