import { z } from "zod";

export const CAMPAIGNS = [
  "Summer Sale 2025",
  "Black Friday 2024",
  "Product Launch",
  "Retargeting",
  "LinkedIn Ads",
  "Google Ads",
  "Organic",
  "None",
] as const;

export const CONTACT_ORIGINS = [
  "Website",
  "Social Media",
  "Referral",
  "Cold Call",
  "Email Campaign",
  "Event",
  "Other",
] as const;

export const TEMPERATURES = ["Neutro", "Frio", "Morno", "Quente"] as const;

export const leadFormSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  cpf: z.string().optional().or(z.literal("")),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  career: z.string().optional().or(z.literal("")),
  income: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => {
        if (!val) return true;
        const num = Number(val);
        return !isNaN(num) && num >= 0;
      },
      { message: "A renda deve ser um número positivo" },
    ),
  interests: z.array(z.string()).default([]),
  campaign: z.enum(CAMPAIGNS).default("None"),
  contactOrigin: z.enum(CONTACT_ORIGINS).default("Other"),
  temperature: z.enum(TEMPERATURES).default("Morno"),
  earning: z
    .string()
    .min(1, "O valor potencial é obrigatório")
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num >= 0;
      },
      { message: "O valor deve ser um número positivo" },
    ),
  content: z.string().optional().or(z.literal("")),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;
