import { z } from "zod";

export const profileSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
  password: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => {
        if (!val) return true;
        return val.length >= 8;
      },
      {
        message: "A senha deve ter no mínimo 8 caracteres",
      },
    ),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
