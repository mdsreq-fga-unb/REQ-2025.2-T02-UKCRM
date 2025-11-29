import { useQuery } from "@tanstack/react-query";
import { fetchSalesTeams } from "../api/teams.api";
import { queryKeys } from "./queryKeys";

export const useSalesTeams = () => {
  return useQuery({
    queryKey: queryKeys.teams.all,
    queryFn: ({ signal }) => fetchSalesTeams(signal),
  });
};
