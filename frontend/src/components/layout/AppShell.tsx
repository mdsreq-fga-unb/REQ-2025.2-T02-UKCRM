import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { Topbar } from "./Topbar";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AppShellProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
}

export function AppShell({ children, breadcrumbs, className }: AppShellProps) {
  return (
    <div className="h-screen bg-background">
      <AppSidebar />
      <div className="ml-[280px] h-full flex flex-col">
        <Topbar breadcrumbs={breadcrumbs} />
        <main className={cn("flex-1 p-6 min-h-0", className)}>{children}</main>
      </div>
    </div>
  );
}
