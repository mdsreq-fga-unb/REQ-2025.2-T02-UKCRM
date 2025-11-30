import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProfile, updateProfile } from "../api/profile.api";
import { transformApiProfile, transformUpdateProfilePayload } from "../utils/profileTransformers";
import type { UpdateProfilePayload } from "../types/profile.types";

export const PROFILE_QUERY_KEY = ["profile"];

export function useProfile() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: async ({ signal }) => {
      const apiProfile = await fetchProfile(signal);
      return transformApiProfile(apiProfile);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
      const apiPayload = transformUpdateProfilePayload(payload);
      const apiProfile = await updateProfile(apiPayload);
      return { profile: transformApiProfile(apiProfile), hasPasswordChange: !!payload.password };
    },
    onSuccess: (data) => {
      // Update the profile data immediately
      queryClient.setQueryData(PROFILE_QUERY_KEY, data.profile);

      // Invalidate auth queries to refetch user data with updated name
      queryClient.invalidateQueries({ queryKey: ["auth"] });

      // If password was changed, user needs to re-login
      if (data.hasPasswordChange) {
        // Clear all queries and force logout
        queryClient.clear();
        localStorage.removeItem("authToken");
        window.location.href = "/login";
      }
    },
  });
}
