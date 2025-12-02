import type { TemperatureVariant } from "@/lib/temperature";

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

/**
 * Complete Lead interface with all fields
 */
export interface Lead {
  id: number;
  name: string;
  cpf: string | null;
  email: string | null;
  phone: string;
  career: string | null;
  income: number | null;
  interests: string[];
  campaign: Campaign;
  contactOrigin: ContactOrigin;
  temperature: TemperatureVariant;
  status: LeadStatus;
  assignedTo: number | null; // Member ID
  earning: number; // Potential/actual value
  gainLossValue: number | null; // Value when marked as Gained/Lost
  gainLossReason: string | null; // Reason for Gained/Lost status
  stage: number; // Funnel stage ID
  order: number; // Order within stage
  createdAt: string;
  updatedAt: string;
  createdBy: number; // Member ID who created the lead
}

/**
 * Payload for creating a new lead
 */
export interface LeadCreatePayload {
  name: string;
  cpf?: string;
  email?: string;
  phone: string;
  career?: string;
  income?: number;
  interests?: string[];
  campaign?: Campaign;
  contactOrigin?: ContactOrigin;
  temperature?: TemperatureVariant;
  assignedTo?: number;
  earning?: number;
  stage: number;
  order: number;
}

/**
 * Payload for updating a lead
 */
export interface LeadUpdatePayload {
  id: number;
  name?: string;
  cpf?: string;
  email?: string;
  phone?: string;
  career?: string;
  income?: number;
  interests?: string[];
  campaign?: Campaign;
  contactOrigin?: ContactOrigin;
  temperature?: TemperatureVariant;
  assignedTo?: number;
  earning?: number;
  stage?: number;
  order?: number;
}

/**
 * Payload for assigning a lead to a team member
 */
export interface LeadAssignPayload {
  id: number;
  assignedTo: number;
}

/**
 * Payload for marking a lead as Gained or Lost
 */
export interface LeadGainLossPayload {
  id: number;
  status: "Gained" | "Lost";
  value: number;
  reason?: string;
}

/**
 * Filters for querying leads
 */
export interface LeadFilters {
  status?: LeadStatus[];
  assignedTo?: number[];
  temperature?: TemperatureVariant[];
  campaign?: Campaign[];
  contactOrigin?: ContactOrigin[];
  stage?: number[];
}
