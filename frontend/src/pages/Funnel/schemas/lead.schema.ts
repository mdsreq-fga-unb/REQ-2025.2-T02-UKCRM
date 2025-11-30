import * as z from "zod";

export const leadFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  email: z.email({ message: "Email inválido." }).optional().or(z.literal("")),
  phone: z.string().optional(),
  earning: z.coerce
    .number()
    .min(0, { message: "O valor não pode ser negativo." }),
  temperature: z.enum(["Quente", "Morno", "Frio", "Neutro"]),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;
