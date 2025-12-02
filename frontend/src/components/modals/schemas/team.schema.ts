import { z } from "zod";

export const createTeamSchema = z.object({
  name: z.string().min(1, "O nome do time é obrigatório"),
  memberIds: z.array(z.string()).default([]),
});

export type CreateTeamFormValues = z.infer<typeof createTeamSchema>;

export const editTeamSchema = createTeamSchema;
export type EditTeamFormValues = z.infer<typeof editTeamSchema>;
