import { Search, Sun, Moon, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/components/theme/theme.context";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface TopbarProps {
  breadcrumbs?: BreadcrumbItem[];
}

export function Topbar({ breadcrumbs = [] }: TopbarProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    // Toggle between light and dark (ignore system for simplicity)
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((item, index) => (
          <span key={index} className="flex items-center gap-2">
            {index > 0 && (
              <span className="text-muted-foreground">/</span>
            )}
            {item.href ? (
              <a
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <span className="font-medium text-foreground">{item.label}</span>
            )}
          </span>
        ))}
      </nav>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Pesquisar pelo website..."
            className="w-64 pl-9 bg-background"
          />
        </div>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="text-muted-foreground hover:text-foreground"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground"
        >
          <Bell className="h-5 w-5" />
          <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-info p-0 text-[10px] text-info-foreground">
            12
          </Badge>
        </Button>
      </div>
    </header>
  );
}
