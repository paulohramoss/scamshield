import { z } from "zod";

export const analysisSchema = z
  .object({
    message: z.string().max(5000, "Mensagem muito longa (máx. 5000 caracteres)").optional(),
    url: z.string().url("URL inválida").max(2000).optional().or(z.literal("")),
    context: z.string().max(2000, "Contexto muito longo (máx. 2000 caracteres)").optional(),
    source: z
      .enum(["WhatsApp", "SMS", "E-mail", "Instagram", "Facebook", "Marketplace", "Ligação", "Site", "Outro"])
      .optional(),
  })
  .refine(
    (data) =>
      (data.message && data.message.trim().length > 0) ||
      (data.url && data.url.trim().length > 0) ||
      (data.context && data.context.trim().length > 0),
    {
      message: "Informe pelo menos uma mensagem, link ou contexto para análise.",
      path: ["message"],
    }
  );

export type AnalysisFormData = z.infer<typeof analysisSchema>;

export const authLoginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const authRegisterSchema = z
  .object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type AuthLoginData = z.infer<typeof authLoginSchema>;
export type AuthRegisterData = z.infer<typeof authRegisterSchema>;
