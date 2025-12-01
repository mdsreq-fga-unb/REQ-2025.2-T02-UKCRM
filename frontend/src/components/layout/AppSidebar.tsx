import { Building, Users, Filter, Chrome, UserCircle, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import { UserProfileCard } from "@/components/ui/UserProfileCard";
import { useAuth } from "@/auth/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { hasPageAccess, type PageKey } from "@/auth/config/permissions";
import { getRoleLabel } from "@/constants/roles";

const navItems: Array<{ title: string; href: string; icon: typeof Building; pageKey: PageKey }> = [
  { title: "Organizações", href: "/organizacoes", icon: Building, pageKey: "organizacoes" },
  { title: "Times", href: "/times", icon: Users, pageKey: "times" },
  { title: "Membros", href: "/membros", icon: UserCircle, pageKey: "membros" },
  { title: "Funis", href: "/funis", icon: Filter, pageKey: "funis" },
];

export function AppSidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/landing");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  // Filter navigation items based on user role
  const visibleNavItems = navItems.filter((item) => {
    if (!user?.role) return false;
    return hasPageAccess(user.role, item.pageKey);
  });

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[280px] flex-col border-r border-sidebar-border bg-sidebar">
      <div className="border-b border-sidebar-border p-4">
        {user && (
          <UserProfileCard
            nome={user.nome}
            cargo={getRoleLabel(user.role)}
          />
        )}
      </div>

      <nav className="flex-1 space-y-1 p-4">
        <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Menu Principal
        </p>
        {visibleNavItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
            activeClassName="bg-sidebar-accent text-sidebar-primary font-semibold"
          >
            <item.icon className="h-5 w-5" />
            {item.title}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-4 p-4">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full justify-start gap-3"
        >
          <LogOut className="h-5 w-5" />
          Sair
        </Button>

        <div className="rounded-lg bg-muted p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-card">
              <Chrome className="h-5 w-5 text-info" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-foreground">
                Instalar Extensão
              </p>
              <a
                href="#"
                className="text-xs text-muted-foreground hover:text-primary hover:underline"
              >
                Ir para chrome web store →
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center py-4">
          <img src="/uk.webp" alt="UK Logo" className="h-12 w-[83px]" />
        </div>
      </div>
    </aside>
  );
}