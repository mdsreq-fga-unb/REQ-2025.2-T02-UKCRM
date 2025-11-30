import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src="/uk.webp" alt="UK Logo" className="h-10 w-10" />
            <h1 className="text-2xl font-bold text-primary">UK-CRM</h1>
          </div>
          <Button onClick={handleLoginClick} variant="outline">
            Login
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Hero Content */}
          <div className="mb-16 text-center animate-fade-in">
            <div className="mb-8 flex justify-center">
              <img
                src="/uk.webp"
                alt="UK Marketing Digital"
                className="h-32 w-32 drop-shadow-lg"
              />
            </div>

            <h2 className="mb-6 text-5xl font-bold text-foreground">
              Bem-vindo ao UK-CRM
            </h2>

            <p className="mb-8 text-xl text-muted-foreground">
              O sistema completo de gerenciamento de relacionamento com clientes
              da{" "}
              <a
                href="https://ukmarketingdigital.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                UK Marketing Digital
              </a>
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={handleLoginClick} size="lg" className="gap-2">
                Começar Agora
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                onClick={() =>
                  window.open("https://ukmarketingdigital.com.br", "_blank")
                }
                variant="outline"
                size="lg"
              >
                Saiba Mais
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">
                Gerenciamento de Times
              </h3>
              <p className="text-sm text-muted-foreground">
                Organize e gerencie suas equipes de forma eficiente com
                ferramentas colaborativas.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Funis de Vendas</h3>
              <p className="text-sm text-muted-foreground">
                Visualize e otimize seu processo de vendas com funis
                personalizados e análises detalhadas.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">
                Gestão de Organizações
              </h3>
              <p className="text-sm text-muted-foreground">
                Controle múltiplas organizações e projetos em um único lugar
                de forma integrada.
              </p>
            </div>
          </div>

          {/* Footer */}
          <footer className="border-t pt-8 text-center">
            <div className="mb-6 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <a
                href="https://ukmarketingdigital.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary"
              >
                <MapPin className="h-4 w-4" />
                UK Marketing Digital
              </a>
              <a
                href="mailto:contato@ukmarketingdigital.com.br"
                className="flex items-center gap-2 hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                contato@ukmarketingdigital.com.br
              </a>
              <a
                href="tel:+5511999999999"
                className="flex items-center gap-2 hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                (11) 99999-9999
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} UK Marketing Digital. Todos os
              direitos reservados.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Landing;
