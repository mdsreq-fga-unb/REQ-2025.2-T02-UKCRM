import { featureFlags, shouldUseMock } from "@/config/features";
import { useAuthMock } from "./useAuthMock";
import { useAuthBackend } from "./useAuthBackend";

export function useAuth() {
  const useMockData = shouldUseMock(featureFlags.USE_MOCK_AUTH);

  if (useMockData) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useAuthMock();
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useAuthBackend();
  }
}
