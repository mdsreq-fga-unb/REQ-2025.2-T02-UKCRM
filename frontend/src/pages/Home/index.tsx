import { AppShell } from "@/components/layout/AppShell";

const Home = () => {
  return (
    <AppShell
      breadcrumbs={[
        { label: "Início" },
      ]}
    >
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-4 w-4 rounded bg-primary" />
          <span className="font-medium text-foreground">Bem-vindo ao UK-CRM</span>
        </div>
      </div>
    </AppShell>
  );
};

export default Home;
