import * as z from "zod";

export const formSchema = z.object({
  funnelName: z.string().min(2, {
    message: "O nome do funil deve ter pelo menos 2 caracteres.",
  }),
  teamIds: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Você deve selecionar pelo menos um time.",
  }),
});

export type FunnelFormValues = z.infer<typeof formSchema>;
