import type { UniqueIdentifier } from "@dnd-kit/core";
import type { TemperatureVariant } from "@/lib/temperature";

// --- ENTIDADES ---

export interface Column {
  id: UniqueIdentifier;
  title: string;
  subtitle_left?: string;
  subtitle_right?: string;
}

export type ColumnId = Column["id"];

export interface Lead {
  id: UniqueIdentifier;
  columnId: ColumnId;
  name: string;
  earning: number;
  content: string;
  temperature: TemperatureVariant;
  createdAt: Date;
  updatedAt: Date;
}

// --- DRAG & DROP DATA (Payloads) ---

export type ColumnType = "Column";
export type LeadType = "Lead";

export interface ColumnDragData {
  type: ColumnType;
  column: Column;
}

export interface LeadDragData {
  type: LeadType;
  lead: Lead;
}

export type LeadDropEvent = {
  leadId: UniqueIdentifier;
  newColumnId: ColumnId;
  newOrder: number;
};
