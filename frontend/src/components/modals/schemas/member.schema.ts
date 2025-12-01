import { z } from "zod";

export const hierarchyOptions = [
  "Closer",
  "SDR",
  "Coordenador de Vendas",
  "Gerente",
  "Diretor",
] as const;

export const createMemberSchema = z
  .object({
    name: z.string().min(1, "O nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    hierarchy: z.enum(hierarchyOptions, {
      errorMap: () => ({ message: "Selecione um nível de hierarquia válido" }),
    }),
    password: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
      .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
      .regex(/\d/, "A senha deve conter pelo menos um número")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "A senha deve conter pelo menos um símbolo",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type CreateMemberFormValues = z.infer<typeof createMemberSchema>;

export const editMemberSchema = z
  .object({
    name: z.string().min(1, "O nome é obrigatório"),
    password: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
        (val) => {
          if (!val) return true;
          return (
            val.length >= 8 &&
            /[A-Z]/.test(val) &&
            /[a-z]/.test(val) &&
            /\d/.test(val) &&
            /[!@#$%^&*(),.?":{}|<>]/.test(val)
          );
        },
        {
          message:
            "A senha deve ter 8+ caracteres, maiúscula, minúscula, número e símbolo",
        },
      ),
    confirmPassword: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      if (!data.password) return true;
      return data.password === data.confirmPassword;
    },
    {
      message: "As senhas não coincidem",
      path: ["confirmPassword"],
    },
  );

export type EditMemberFormValues = z.infer<typeof editMemberSchema>;
