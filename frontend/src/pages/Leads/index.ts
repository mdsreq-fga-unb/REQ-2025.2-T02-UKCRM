/**
 * Leads Module - Main exports
 *
 * This module provides complete lead management functionality with:
 * - Type-safe interfaces
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
