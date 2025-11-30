import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/ui/data-table";
import { AlertBanner } from "@/components/ui/alert-banner";
import { usePermissions } from "@/auth/hooks/usePermissions";
import { Plus, RefreshCw, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CreateOrganizationModal } from "@/components/modals/CreateOrganizationModal";
import { DeleteOrganizationModal } from "@/components/modals/DeleteOrganizationModal";
import { useOrganizacoesData } from "./hooks/useOrganizacoesData";
import type { Organization } from "./types/organizations.types";

const columns: Column<Organization>[] = [
  { key: "id", header: "ID" },
  { key: "nome", header: "Nome" },
  { key: "dataCriacao", header: "Data de Criação" },
  { key: "dataAtualizacao", header: "Data de Atualização" },
  { key: "proprietario", header: "Proprietário" },
];

const Organizacoes = () => {
  const { hasPermission } = usePermissions();
  const { organizations, isLoading, handleCreate, handleDelete, handleRefresh } = useOrganizacoesData();
  const [showAlert, setShowAlert] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrganizations = organizations.filter((org) =>
    org.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (item: Organization) => {
    console.log("Edit:", item);
  };

  const onDeleteClick = (item: Organization) => {
    setSelectedOrg(item);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedOrg) {
      try {
        await handleDelete(selectedOrg.id);
        setIsDeleteOpen(false);
        setSelectedOrg(null);
      } catch (error) {
        console.error("Error deleting organization:", error);
        setShowAlert(true);
      }
    }
  };

  const handleCreateOrganization = async (formData: any) => {
    try {
      await handleCreate({
        name: formData.nome,
        owner: formData.proprietario.nome,
        owner_email_input: formData.proprietario.email,
        owner_password: formData.proprietario.senha,
      });
      setIsCreateOpen(false);
    } catch (error) {
      console.error("Error creating organization:", error);
      setShowAlert(true);
    }
  };

  // Permission checks
  const canCreateOrg = hasPermission("organization:create");
  const canEditOrg = hasPermission("organization:edit");
  const canDeleteOrg = hasPermission("organization:delete");

  return (
    <AppShell
      breadcrumbs={[
        { label: "Organizações", href: "/organizacoes" },
        { label: "Gestão de Organizações" },
      ]}
    >
      {showAlert && (
        <AlertBanner
          message="Erro: Mensagem curta do erro"
          onClose={() => setShowAlert(false)}
        />
      )}

      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Gestão de Organizações
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gerencie todas as organizações do sistema
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            {canCreateOrg && (
              <Button onClick={() => setIsCreateOpen(true)}>
                <Plus className="h-4 w-4" />
                Criar Organização
              </Button>
            )}
          </div>
        </div>

        {/* Table Section */}
        <div className="rounded-lg bg-card p-6 shadow-sm border border-border">
          <div className="mb-4 flex items-center gap-4">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Escreva algo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredOrganizations}
            onEdit={canEditOrg ? handleEdit : undefined}
            onDelete={canDeleteOrg ? onDeleteClick : undefined}
          />

          {/* Create Organization Button */}
          {canCreateOrg && (
            <div className="mt-4 flex justify-center">
              <Button
                variant="outline"
                onClick={() => setIsCreateOpen(true)}
                className="text-primary border-primary hover:bg-primary/10"
              >
                <Plus className="h-4 w-4" />
                Criar Organização
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateOrganizationModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSave={handleCreateOrganization}
      />
      <DeleteOrganizationModal
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        organizationName={selectedOrg?.nome || ""}
        onConfirm={confirmDelete}
      />
    </AppShell>
  );
};

export default Organizacoes;
