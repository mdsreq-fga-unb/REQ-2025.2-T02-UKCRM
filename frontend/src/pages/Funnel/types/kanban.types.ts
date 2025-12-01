import type { TemperatureVariant } from "@/lib/temperature";
import type { UniqueIdentifier } from "@dnd-kit/core";

// ENTIDADES

export interface Column {
  id: UniqueIdentifier;
  title: string;
  subtitle_left?: string;
  subtitle_right?: string;
  visible_to_sdr?: boolean;
  visible_to_closer?: boolean;
}

export type ColumnId = Column["id"];

export type LeadStatus = "Active" | "Gained" | "Lost";

export type ContactOrigin =
  | "Website"
  | "Social Media"
  | "Referral"
  | "Cold Call"
  | "Email Campaign"
  | "Event"
  | "Other";

export type Campaign =
  | "Summer Sale 2025"
  | "Black Friday 2024"
  | "Product Launch"
  | "Retargeting"
  | "LinkedIn Ads"
  | "Google Ads"
  | "Organic"
  | "None";

export interface Lead {
  id: UniqueIdentifier;
  columnId: ColumnId;
  name: string;
  earning: number;
  content: string;
  temperature: TemperatureVariant;
  createdAt: Date;
  updatedAt: Date;

  // Extended fields for detailed lead management
  cpf?: string | null;
  email?: string | null;
  phone?: string;
  career?: string | null;
  income?: number | null;
  interests?: string[];
  campaign?: Campaign;
  contactOrigin?: ContactOrigin;
  status?: LeadStatus;
  assignedTo?: number | null; // Member ID
  gainLossValue?: number | null;
  gainLossReason?: string | null;
  createdBy?: number; // Member ID who created the lead
}

// DRAG & DROP DATA

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
