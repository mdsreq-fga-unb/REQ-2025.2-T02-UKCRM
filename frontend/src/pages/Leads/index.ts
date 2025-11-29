/**
 * Leads Module - Main exports
 *
 * This module provides complete lead management functionality with:
 * - Type-safe interfaces
 * - Mocked data for development
 * - Role-based permission control
 * - CRUD operations
 * - Lead assignment (Sales Manager)
 * - Gain/Loss tracking (Closer)
 */

// Types
export type {
  Lead,
  LeadStatus,
  LeadCreatePayload,
  LeadUpdatePayload,
  LeadAssignPayload,
  LeadGainLossPayload,
  LeadFilters,
  ContactOrigin,
  Campaign,
} from "./types/lead.types";

// Hooks
export { useLeadsMock } from "./hooks/useLeadsMock";

// Mock Data
export {
  mockLeads,
  CONTACT_ORIGINS,
  CAMPAIGNS,
  INTEREST_OPTIONS,
} from "./data/mockLeads";

// Example Component
export { LeadsExample } from "./examples/LeadsExample";
