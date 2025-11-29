import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { Topbar } from "./Topbar";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AppShellProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export function AppShell({ children, breadcrumbs }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className="ml-[280px] flex min-h-screen flex-col">
        <Topbar breadcrumbs={breadcrumbs} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
