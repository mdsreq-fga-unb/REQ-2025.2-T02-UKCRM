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
import { EditOrganizationModal, type EditOrganizationFormData } from "@/components/modals/EditOrganizationModal";
import { useOrganizacoesData } from "./hooks/useOrganizacoesData";
import { fetchOrganizationDetails } from "./api/organizations.api";
import { fetchMembers } from "@/pages/Membros/api/members.api";
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
  const { organizations, isLoading, handleCreate, handleUpdate, handleDelete, handleRefresh } = useOrganizacoesData();
  const [showAlert, setShowAlert] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editOrgData, setEditOrgData] = useState<any>(null);
  const [allMembers, setAllMembers] = useState<any[]>([]);

  const filteredOrganizations = organizations.filter((org) =>
    org.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = async (item: Organization) => {
    try {
      // Fetch organization details and all members
      const [orgDetails, members] = await Promise.all([
        fetchOrganizationDetails(item.id),
        fetchMembers(),
      ]);

      // Helper function to generate initials
      const getInitials = (name: string) => {
        return name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .substring(0, 2);
      };

      // Helper function to generate color
      const getColor = (id: number) => {
        const colors = ["#8B5CF6", "#EC4899", "#10B981", "#F59E0B", "#3B82F6", "#EF4444"];
        return colors[id % colors.length];
      };

      // Transform members data
      const transformedMembers = members.map((member) => ({
        id: member.id,
        name: member.name,
        email: member.email,
        role: member.hierarchy,
        initials: getInitials(member.name),
        color: getColor(member.id),
        organizationId: member.organization,
      }));

      // Separate organization members from available members
      const organizationMembers = transformedMembers.filter(
        (member) => member.organizationId === item.id
      );
      const availableMembers = transformedMembers.filter(
        (member) => member.organizationId !== item.id
      );

      setAllMembers(availableMembers);

      // Set organization data for editing
      setEditOrgData({
        id: orgDetails.id,
        name: orgDetails.name,
        logo: undefined,
        ownerName: orgDetails.owner_name,
        ownerEmail: orgDetails.owner_email,
        members: organizationMembers,
      });

      setIsEditOpen(true);
    } catch (error) {
      console.error("Error loading organization details:", error);
      setShowAlert(true);
    }
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

  const handleEditOrganization = async (formData: EditOrganizationFormData) => {
    try {
      const updatePayload: any = {
        name: formData.name,
        owner_name_input: formData.ownerName,
      };

      if (formData.ownerPassword) {
        updatePayload.owner_password = formData.ownerPassword;
      }

      // Update organization details
      await handleUpdate(formData.id, updatePayload);

      setIsEditOpen(false);
      setEditOrgData(null);
      handleRefresh();
    } catch (error) {
      console.error("Error updating organization:", error);
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
      <EditOrganizationModal
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        organization={editOrgData}
        availableMembers={allMembers}
        onSave={handleEditOrganization}
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
