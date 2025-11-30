import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProfile, updateProfile } from "../api/profile.api";
import { transformApiProfile, transformUpdateProfilePayload } from "../utils/profileTransformers";
import type { UpdateProfilePayload } from "../types/profile.types";

const PROFILE_QUERY_KEY = ["profile"];

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
      return transformApiProfile(apiProfile);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(PROFILE_QUERY_KEY, data);
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
}
