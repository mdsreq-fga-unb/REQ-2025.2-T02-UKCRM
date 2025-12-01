import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertBanner } from "@/components/ui/alert-banner";
import { useAuthContext } from "@/auth/context/AuthContext";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { loginSchema, type LoginFormValues } from "./schemas/login.schema";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-secondary/10">
      <PublicHeader showBackButton />

      <main className="container mx-auto flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md animate-fade-in">
          <div className="rounded-lg border bg-card p-8 shadow-lg">
            {/* Logo e Título */}
            <div className="mb-8 text-center">
              <div className="mb-4 flex justify-center">
                <img
                  src="/uk.webp"
                  alt="UK Marketing Digital"
                  className="h-20 w-[138px] drop-shadow-md"
                />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">
                Bem-vindo de volta
              </h2>
              <p className="text-sm text-muted-foreground">
                Entre com suas credenciais para acessar o sistema
              </p>
            </div>

            {/* Alerta de Erro */}
            {error && (
              <div className="mb-6">
                <AlertBanner message={error} />
              </div>
            )}

            {/* Formulário de Login */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  disabled={isLoading}
                  autoComplete="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    disabled={isLoading}
                    autoComplete="current-password"
                    className="pr-10"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    disabled={isLoading}
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
};

export default Login;
