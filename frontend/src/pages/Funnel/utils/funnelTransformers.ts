import { temperatureSortOrder } from "@/lib/temperature";
import type { UniqueIdentifier } from "@dnd-kit/core";
import type { ApiFunnelDetails } from "../api/funnels.api";
import type { ApiLead } from "../api/leads.api";
import type { Column, ColumnId, Lead } from "../types/kanban.types";

// HELPERS DE ID

const COL_PREFIX = "col-";
const LEAD_PREFIX = "lead-";

export const toColumnId = (id: number | string): ColumnId =>
  `${COL_PREFIX}${id}`;
export const toLeadId = (id: number | string): string => `${LEAD_PREFIX}${id}`;

export const extractId = (id: UniqueIdentifier): number => {
  const str = String(id);
  if (str.startsWith(COL_PREFIX)) return Number(str.replace(COL_PREFIX, ""));
  if (str.startsWith(LEAD_PREFIX)) return Number(str.replace(LEAD_PREFIX, ""));
  return Number(str);
};

// HELPERS DE FORMATAÇÃO

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function mapApiLeadToKanbanLead(lead: ApiLead, tempId?: string): Lead {
  return {
    id: tempId || toLeadId(lead.id),
    columnId: toColumnId(lead.stage),
    name: lead.name,
    earning: Number(lead.earning) || 0,
    temperature: lead.temperature,
    createdAt: new Date(lead.created_at),
    updatedAt: new Date(lead.updated_at),
    content: lead.content || "",
    email: lead.email,
    phone: lead.phone,
    cpf: lead.cpf,
    career: lead.career,
    income: lead.income ? Number(lead.income) : null,
    interests: lead.interests,
    campaign: lead.campaign,
    contactOrigin: lead.contactOrigin,
  };
}

export function mapApiDetailsToKanban(data: ApiFunnelDetails): {
  columns: Column[];
  leads: Lead[];
} {
  const columns = data.stages
    .sort((a, b) => a.order - b.order)
    .map(
      (stage): Column => ({
        id: toColumnId(stage.id),
        title: stage.name,
        subtitle_left: "",
        subtitle_right: "",
      }),
    );

  const leads = data.stages.flatMap((stage) =>
    stage.leads.map((lead) => mapApiLeadToKanbanLead(lead)),
  );

  return { columns, leads };
}

export function getColumnsWithSubtitles(
  columns: Column[],
  leads: Lead[],
): Column[] {
  const statsByColumn = leads.reduce(
    (acc, lead) => {
      const colId = lead.columnId;

      if (!acc[colId]) {
        acc[colId] = { count: 0, total: 0 };
      }

      acc[colId].count += 1;
      acc[colId].total += lead.earning;

      return acc;
    },
    {} as Record<string, { count: number; total: number }>,
  );

  return columns.map((col) => {
    const stats = statsByColumn[col.id] || { count: 0, total: 0 };
    const { count, total } = stats;

    return {
      ...col,
      subtitle_left: `${count} negócio${count !== 1 ? "s" : ""}`,
      subtitle_right: currencyFormatter.format(total),
    };
  });
}

// ORDENAÇÃO

type SortStrategy = (a: Lead, b: Lead) => number;

const sortStrategies: Record<string, SortStrategy> = {
  "valor-desc": (a, b) => b.earning - a.earning,
  "valor-asc": (a, b) => a.earning - b.earning,
  "inatividade-desc": (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime(),
  "inatividade-asc": (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime(),
  temperatura: (a, b) =>
    temperatureSortOrder[a.temperature] - temperatureSortOrder[b.temperature],
};

export function getFilteredAndSortedLeads(
  leads: Lead[],
  filterTerm: string,
  sortCriteria: string | null,
): Lead[] {
  const term = filterTerm.toLowerCase().trim();

  let result = leads;

  if (term) {
    result = result.filter(
      (lead) =>
        lead.name.toLowerCase().includes(term) ||
        lead.content.toLowerCase().includes(term),
    );
  }

  if (sortCriteria && sortStrategies[sortCriteria]) {
    return [...result].sort(sortStrategies[sortCriteria]);
  }

  return result;
}
