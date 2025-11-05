import * as z from "zod";

export const teamsList = [
  { name: "Shikoba", members: 5 },
  { name: "Based", members: 50 },
  { name: "RoyalFlush", members: 1 },
  { name: "Manchester City", members: 3 },
];

export const formSchema = z.object({
  funnelName: z.string().min(2, {
    message: "O nome do funil deve ter pelo menos 2 caracteres.",
  }),
  teamNames: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Você deve selecionar pelo menos um time.",
  }),
});

export type FunnelFormValues = z.infer<typeof formSchema>;
