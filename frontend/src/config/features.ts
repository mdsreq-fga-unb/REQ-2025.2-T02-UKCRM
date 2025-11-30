/**
 * Feature flags configuration
 *
 * This file controls which features are enabled/disabled in the application.
 * Change these flags to switch between mock data and real backend API calls.
 */

export const featureFlags = {
  /**
   * USE_MOCK_DATA
   *
   * When true: Uses local mock data (no backend required)
   * When false: Makes real API calls to the backend
   *
   * Set this to:
   * - true: During frontend development without backend
   * - false: When integrating with real backend API
   */
  USE_MOCK_DATA: true,

  /**
   * USE_MOCK_FUNNEL
   *
   * Specific flag for Funnel feature
   * Overrides USE_MOCK_DATA for funnel-specific functionality
   * If not set (undefined), falls back to USE_MOCK_DATA
   */
  USE_MOCK_FUNNEL: undefined as boolean | undefined,

  /**
   * USE_MOCK_TEAMS
   *
   * Specific flag for Teams feature
   */
  USE_MOCK_TEAMS: undefined as boolean | undefined,

  /**
   * USE_MOCK_MEMBERS
   *
   * Specific flag for Members feature
   */
  USE_MOCK_MEMBERS: undefined as boolean | undefined,

  /**
   * USE_MOCK_ORGANIZATIONS
   *
   * Specific flag for Organizations feature
   */
  USE_MOCK_ORGANIZATIONS: undefined as boolean | undefined,

  /**
   * USE_MOCK_AUTH
   *
   * Specific flag for Authentication feature
   */
  USE_MOCK_AUTH: undefined as boolean | undefined,
} as const;

/**
 * Helper function to check if a specific feature should use mock data
 */
export function shouldUseMock(
  featureFlag?: boolean | undefined
): boolean {
  return featureFlag !== undefined
    ? featureFlag
    : featureFlags.USE_MOCK_DATA;
}

/**
 * Helper to get the current mode for debugging
 */
export function getCurrentMode(): 'mock' | 'backend' {
  return featureFlags.USE_MOCK_DATA ? 'mock' : 'backend';
}

// Log current mode in development
if (import.meta.env.DEV) {
  console.log(`[Features] Running in ${getCurrentMode()} mode`);
  console.log('[Features] Feature flags:', featureFlags);
}
