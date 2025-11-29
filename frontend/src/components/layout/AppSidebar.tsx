import { Building, Users, Filter, Chrome, UserCircle } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Organizações", href: "/", icon: Building },
  { title: "Times", href: "/times", icon: Users },
  { title: "Membros", href: "/membros", icon: UserCircle },
  { title: "Funis", href: "/funis", icon: Filter },
];

export function AppSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[280px] flex-col border-r border-sidebar-border bg-sidebar">
      {/* User Profile Card */}
      <div className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="" alt="Udson Witer" />
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              UW
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-sidebar-foreground">
              Udson Witer
            </span>
            <span className="text-xs text-muted-foreground">Administrador</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Menu Principal
        </p>
        {navItems.map((item) => (
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

      {/* Footer Section */}
      <div className="mt-auto space-y-4 p-4">
        {/* Chrome Extension Card */}
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

        {/* UK Logo */}
        <div className="flex items-center justify-center py-4">
          <div className="text-4xl font-bold tracking-tight">
            <span className="text-primary">U</span>
            <span className="text-warning">K</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
