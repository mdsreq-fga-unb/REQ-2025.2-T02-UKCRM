import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme/theme.context";

interface PublicHeaderProps {
  showLoginButton?: boolean;
  showBackButton?: boolean;
}

export const PublicHeader = ({
  showLoginButton = false,
  showBackButton = false,
}: PublicHeaderProps) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <header className="border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <img src="/uk.webp" alt="UK Logo" className="h-10 w-[69px]" />
          <h1 className="text-2xl font-semibold tracking-tight text-primary">UK-CRM</h1>
        </div>
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {showLoginButton && (
            <Button onClick={() => navigate("/login")} variant="outline">
              Login
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          {showBackButton && (
            <Button onClick={() => navigate("/")} variant="ghost">
              Voltar
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
