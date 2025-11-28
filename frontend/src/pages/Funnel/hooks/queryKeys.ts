export const queryKeys = {
  teams: { all: ["teams"] as const },
  funnels: {
    all: ["funnels"] as const,
    list: () => [...queryKeys.funnels.all, "list"] as const,
    detail: (id: string | number | null | undefined) =>
      [...queryKeys.funnels.all, "detail", id] as const,
  },
};
