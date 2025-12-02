import { z } from "zod";

export const createOrganizationSchema = z
  .object({
    nome: z.string().min(1, "O nome da organização é obrigatório"),
    logo: z.any().optional(), // File validation is tricky in Zod, usually handled separately or with custom checks
    ownerName: z.string().min(1, "O nome do proprietário é obrigatório"),
    ownerEmail: z.string().email("E-mail inválido"),
    ownerPassword: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres"),
    ownerPasswordConfirm: z.string().min(1, "Confirmação de senha obrigatória"),
  })
  .refine((data) => data.ownerPassword === data.ownerPasswordConfirm, {
    message: "As senhas não coincidem",
    path: ["ownerPasswordConfirm"],
  });

export type CreateOrganizationFormValues = z.infer<
  typeof createOrganizationSchema
>;

export const editOrganizationSchema = z.object({
  name: z.string().min(1, "O nome da organização é obrigatório"),
  logo: z.any().optional(),
  ownerName: z.string().min(1, "O nome do proprietário é obrigatório"),
  ownerPassword: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .optional()
    .or(z.literal("")),
});

export type EditOrganizationFormValues = z.infer<typeof editOrganizationSchema>;
