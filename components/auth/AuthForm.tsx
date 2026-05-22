"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { authLoginSchema, authRegisterSchema, type AuthLoginData, type AuthRegisterData } from "@/lib/validations";
import { Shield, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface AuthFormProps {
  mode: "login" | "register";
}

export function AuthForm({ mode }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const isLogin = mode === "login";
  const schema = isLogin ? authLoginSchema : authRegisterSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthLoginData | AuthRegisterData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: AuthLoginData | AuthRegisterData) => {
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        if (error) throw error;
        toast.success("Login realizado com sucesso!");
        router.push("/historico");
        router.refresh();
      } else {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });
        if (error) throw error;
        toast.success("Conta criada! Verifique seu e-mail para confirmar o cadastro.");
        router.push("/login");
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Erro desconhecido";
      if (msg.includes("Invalid login credentials")) {
        toast.error("E-mail ou senha incorretos.");
      } else if (msg.includes("User already registered")) {
        toast.error("Este e-mail já está cadastrado.");
      } else if (msg.includes("Email not confirmed")) {
        toast.error("Confirme seu e-mail antes de fazer login.");
      } else {
        toast.error(msg || "Ocorreu um erro. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="text-center space-y-2">
        <div className="flex justify-center mb-2">
          <div className="rounded-full bg-blue-100 p-3">
            <Shield className="h-7 w-7 text-blue-600" />
          </div>
        </div>
        <CardTitle className="text-2xl">
          {isLogin ? "Entrar na sua conta" : "Criar conta grátis"}
        </CardTitle>
        <CardDescription>
          {isLogin
            ? "Acesse seu histórico de análises"
            : "Salve e acompanhe suas análises de segurança"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register("email")}
              disabled={loading}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                disabled={loading}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("confirmPassword" as never)}
                disabled={loading}
              />
              {"confirmPassword" in errors && errors.confirmPassword && (
                <p className="text-xs text-red-500">
                  {(errors.confirmPassword as { message?: string }).message}
                </p>
              )}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 mt-2"
          >
            {loading
              ? isLogin
                ? "Entrando..."
                : "Criando conta..."
              : isLogin
              ? "Entrar"
              : "Criar conta"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          {isLogin ? (
            <>
              Não tem uma conta?{" "}
              <Link href="/cadastro" className="text-blue-600 hover:underline font-medium">
                Criar conta grátis
              </Link>
            </>
          ) : (
            <>
              Já tem uma conta?{" "}
              <Link href="/login" className="text-blue-600 hover:underline font-medium">
                Fazer login
              </Link>
            </>
          )}
        </div>

        <div className="mt-4 text-center">
          <Link href="/analisar" className="text-xs text-gray-400 hover:text-gray-600">
            Continuar sem criar conta →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
