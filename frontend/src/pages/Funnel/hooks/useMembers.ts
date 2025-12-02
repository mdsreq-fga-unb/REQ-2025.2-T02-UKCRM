import { useQuery } from "@tanstack/react-query";
import { fetchMembers } from "../api/members.api";

export const useMembers = () => {
  return useQuery({
    queryKey: ["members"],
    queryFn: ({ signal }) => fetchMembers(signal),
  });
};
