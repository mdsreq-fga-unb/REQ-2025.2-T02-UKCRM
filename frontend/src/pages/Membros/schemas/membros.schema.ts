import * as z from "zod";

export const createMemberSchema = z.object({
  nome: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  hierarquia: z.string().min(1, {
    message: "Você deve selecionar uma hierarquia.",
  }),
  email: z.string().email({
    message: "E-mail inválido.",
  }),
  senha: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
  confirmarSenha: z.string(),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não coincidem.",
  path: ["confirmarSenha"],
});

export const updateMemberSchema = z.object({
  id: z.number(),
  nome: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }).optional(),
  hierarquia: z.string().min(1, {
    message: "Você deve selecionar uma hierarquia.",
  }).optional(),
  email: z.string().email({
    message: "E-mail inválido.",
  }).optional(),
});

export type CreateMemberFormValues = z.infer<typeof createMemberSchema>;
export type UpdateMemberFormValues = z.infer<typeof updateMemberSchema>;
