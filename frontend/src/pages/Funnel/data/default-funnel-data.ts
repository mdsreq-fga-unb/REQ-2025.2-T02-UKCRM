import type { Column } from "@/components/BoardColumn";
import type { Task } from "@/components/TaskCard";

export const defaultCols = [
  {
    id: "novo" as const,
    title: "Novo Lead",
  },
  {
    id: "contato" as const,
    title: "Contato Iniciado",
  },
  {
    id: "qualificacao" as const,
    title: "Qualificação",
  },
  {
    id: "proposta" as const,
    title: "Proposta Enviada",
  },
  {
    id: "negociacao" as const,
    title: "Negociação",
  },
  {
    id: "fechado" as const,
    title: "Fechado (Ganho/Perdido)",
  },
] satisfies Column[];

export const initialTasks: Task[] = [
  // NOVO LEAD (0-2 dias atrás - tasks recentes)
  {
    id: "lead1",
    columnId: "novo",
    title: "Maria Silva",
    content: "Preencheu formulário no site — interesse em plano Premium",
    earning: 8500.0,
    temperature: "Morno",
    date: new Date(2025, 10, 5),
  },
  {
    id: "lead2",
    columnId: "novo",
    title: "Lucas Andrade",
    content: "Contato via Instagram — consultoria de marketing",
    earning: 4000.0,
    temperature: "Quente",
    date: new Date(2025, 10, 4),
  },
  {
    id: "lead3",
    columnId: "novo",
    title: "João Pereira",
    content: "Indicação de cliente atual — empresa de tecnologia",
    earning: 12000.0,
    temperature: "Morno",
    date: new Date(2025, 10, 3),
  },

  // CONTATO INICIADO (2-5 dias atrás)
  {
    id: "lead4",
    columnId: "contato",
    title: "Carla Mendes",
    content: "Ligação feita — pediu retorno amanhã com proposta",
    earning: 5600.0,
    temperature: "Quente",
    date: new Date(2025, 10, 3),
  },
  {
    id: "lead5",
    columnId: "contato",
    title: "Rafael Oliveira",
    content: "E-mail enviado com apresentação da empresa",
    earning: 6200.0,
    temperature: "Neutro",
    date: new Date(2025, 10, 1),
  },
  {
    id: "lead6",
    columnId: "contato",
    title: "Fernanda Costa",
    content: "Conversa pelo WhatsApp — quer agendar reunião",
    earning: 7200.0,
    temperature: "Quente",
    date: new Date(2025, 10, 2),
  },

  // QUALIFICAÇÃO (4-7 dias atrás)
  {
    id: "lead7",
    columnId: "qualificacao",
    title: "André Souza",
    content: "Reunião feita — orçamento alto, precisa de aprovação do gestor",
    earning: 10000.0,
    temperature: "Morno",
    date: new Date(2025, 10, 1),
  },
  {
    id: "lead8",
    columnId: "qualificacao",
    title: "Juliana Lima",
    content: "Empresa pequena, orçamento limitado — avaliar plano básico",
    earning: 3000.0,
    temperature: "Frio",
    date: new Date(2025, 9, 29),
  },
  {
    id: "lead9",
    columnId: "qualificacao",
    title: "Pedro Santos",
    content: "Fit perfeito e urgência para início do projeto",
    earning: 9500.0,
    temperature: "Quente",
    date: new Date(2025, 9, 30),
  },

  // PROPOSTA ENVIADA (5-10 dias atrás)
  {
    id: "lead10",
    columnId: "proposta",
    title: "Beatriz Almeida",
    content: "Proposta enviada ontem — aguardando retorno",
    earning: 8700.0,
    temperature: "Morno",
    date: new Date(2025, 9, 31),
  },
  {
    id: "lead11",
    columnId: "proposta",
    title: "Eduardo Ramos",
    content: "Proposta de R$ 12.000 enviada — pediu prazo até sexta",
    earning: 12000.0,
    temperature: "Quente",
    date: new Date(2025, 9, 28),
  },
  {
    id: "lead12",
    columnId: "proposta",
    title: "Camila Torres",
    content: "Aguardando revisão da proposta pelo jurídico do cliente",
    earning: 6400.0,
    temperature: "Neutro",
    date: new Date(2025, 9, 26),
  },

  // NEGOCIAÇÃO (7-14 dias atrás)
  {
    id: "lead13",
    columnId: "negociacao",
    title: "Rodrigo Martins",
    content: "Negociando desconto de 10% e prazo de pagamento",
    earning: 11000.0,
    temperature: "Quente",
    date: new Date(2025, 9, 29),
  },
  {
    id: "lead14",
    columnId: "negociacao",
    title: "Tatiane Rocha",
    content: "Cliente pediu customização — analisando viabilidade",
    earning: 13500.0,
    temperature: "Morno",
    date: new Date(2025, 9, 24),
  },
  {
    id: "lead15",
    columnId: "negociacao",
    title: "Paulo César",
    content: "Aguardando retorno final após call de alinhamento",
    earning: 9500.0,
    temperature: "Morno",
    date: new Date(2025, 9, 22),
  },

  // FECHADO (GANHO / PERDIDO) (10-30 dias atrás)
  {
    id: "lead16",
    columnId: "fechado",
    title: "Vanessa Ribeiro",
    content: "Fechado — contrato assinado (Ganho)",
    earning: 9800.0,
    temperature: "Quente",
    date: new Date(2025, 9, 26),
  },
  {
    id: "lead17",
    columnId: "fechado",
    title: "Gustavo Nunes",
    content: "Perdido — cliente escolheu concorrente mais barato",
    earning: 7500.0,
    temperature: "Frio",
    date: new Date(2025, 9, 18),
  },
  {
    id: "lead18",
    columnId: "fechado",
    title: "Isabela Freitas",
    content: "Fechado — cliente em onboarding",
    earning: 15000.0,
    temperature: "Quente",
    date: new Date(2025, 9, 8)
  },
];
