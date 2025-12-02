import * as z from "zod";

export const createTeamSchema = z.object({
  nome: z.string().min(2, {
    message: "O nome do time deve ter pelo menos 2 caracteres.",
  }),
  memberIds: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Você deve selecionar pelo menos um membro.",
  }),
});

export const updateTeamSchema = z.object({
  id: z.number(),
  nome: z.string().min(2, {
    message: "O nome do time deve ter pelo menos 2 caracteres.",
  }),
  memberIds: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Você deve selecionar pelo menos um membro.",
  }),
});

export type CreateTeamFormValues = z.infer<typeof createTeamSchema>;
export type UpdateTeamFormValues = z.infer<typeof updateTeamSchema>;
