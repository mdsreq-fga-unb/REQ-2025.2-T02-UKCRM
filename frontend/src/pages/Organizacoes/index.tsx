import { useState, useMemo } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertBanner } from "@/components/ui/alert-banner";
import { usePermissions } from "@/auth/hooks/usePermissions";
import { RefreshCw, Search, ChartNoAxesCombinedIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CreateOrganizationModal } from "@/components/modals/CreateOrganizationModal";
import { DeleteOrganizationModal } from "@/components/modals/DeleteOrganizationModal";
import {
  EditOrganizationModal,
  type EditOrganizationFormData,
} from "@/components/modals/EditOrganizationModal";
import { useOrganizacoesData } from "./hooks/useOrganizacoesData";
import { fetchOrganizationDetails } from "./api/organizations.api";
import { fetchMembers } from "@/pages/Membros/api/members.api";
import type { Organization } from "./types/organizations.types";
import { CreateOrganizationFormValues } from "@/components/modals/schemas/organization.schema";
import CreateButton from "@/components/CreateButton";
import SelectButton from "@/components/SelectButton";
import { getHierarchyFromRole } from "@/constants/roles";

interface OrganizationMember {
  id: number;
  name: string;
  email: string;
  role: string;
  initials: string;
  color: string;
  organizationId?: number;
}

interface OrganizationDetails {
  id: number;
  name: string;
  logo?: string;
  ownerName: string;
  ownerEmail: string;
  members: OrganizationMember[];
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const columns: Column<Organization>[] = [
  { key: "id", header: "ID" },
  {
    key: "nome",
    header: "Nome",
    render: (org: Organization) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src={org.logo || ""} alt={org.nome} />
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            {getInitials(org.nome)}
          </AvatarFallback>
        </Avatar>
        <span>{org.nome}</span>
      </div>
    ),
  },
  { key: "dataCriacao", header: "Data de Criação" },
  { key: "dataAtualizacao", header: "Data de Atualização" },
  { key: "proprietario", header: "Proprietário" },
];

const sortOptions = [
  { value: "nome-asc", label: "Nome (A-Z)" },
  { value: "nome-desc", label: "Nome (Z-A)" },
  { value: "data-desc", label: "Mais Recentes" },
  { value: "data-asc", label: "Mais Antigos" },
];

const Organizacoes = () => {
  const { hasPermission } = usePermissions();
  const {
    organizations,
    isLoading,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleRefresh,
  } = useOrganizacoesData();
  const [showAlert, setShowAlert] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("nome-asc");
  const [editOrgData, setEditOrgData] = useState<OrganizationDetails | null>(
    null,
  );
  const [allMembers, setAllMembers] = useState<OrganizationMember[]>([]);

  const filteredOrganizations = useMemo(() => {
    let filtered = organizations.filter((org) =>
      org.nome.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return filtered.sort((a, b) => {
      switch (sortOption) {
        case "nome-asc":
          return a.nome.localeCompare(b.nome);
        case "nome-desc":
          return b.nome.localeCompare(a.nome);
        case "data-desc":
        case "data-asc": {
          const parseDate = (dateStr: string) => {
            const [day, month, year] = dateStr.split("/").map(Number);
            return new Date(year, month - 1, day).getTime();
          };
          const dateA = parseDate(a.dataCriacao);
          const dateB = parseDate(b.dataCriacao);
          return sortOption === "data-desc" ? dateB - dateA : dateA - dateB;
        }
        default:
          return 0;
      }
    });
  }, [organizations, searchTerm, sortOption]);

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
        const colors = [
          "#8B5CF6",
          "#EC4899",
          "#10B981",
          "#F59E0B",
          "#3B82F6",
          "#EF4444",
        ];
        return colors[id % colors.length];
      };

      // Transform members data
      const transformedMembers = members.map((member) => ({
        id: member.id,
        name: member.name,
        email: member.email,
        role: getHierarchyFromRole(member.hierarchy),
        initials: getInitials(member.name),
        color: getColor(member.id),
        organizationId: member.organization,
      }));

      // Separate organization members from available members
      const organizationMembers = transformedMembers.filter(
        (member) => member.organizationId === item.id,
      );
      const availableMembers = transformedMembers.filter(
        (member) => member.organizationId !== item.id,
      );

      setAllMembers(availableMembers);

      // Set organization data for editing
      setEditOrgData({
        id: orgDetails.id,
        name: orgDetails.name,
        logo: orgDetails.logo,
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

  const handleCreateOrganization = async (
    formData: CreateOrganizationFormValues,
  ) => {
    try {
      await handleCreate({
        name: formData.nome,
        owner: formData.ownerName,
        owner_email_input: formData.ownerEmail,
        owner_password: formData.ownerPassword,
      });
      setIsCreateOpen(false);
    } catch (error) {
      console.error("Error creating organization:", error);
      setShowAlert(true);
    }
  };

  const handleEditOrganization = async (formData: EditOrganizationFormData) => {
    try {
      const updatePayload: {
        name: string;
        owner_name_input: string;
        owner_password?: string;
        logo?: File;
      } = {
        name: formData.name,
        owner_name_input: formData.ownerName,
      };

      if (formData.ownerPassword) {
        updatePayload.owner_password = formData.ownerPassword;
      }

      if (formData.logo) {
        updatePayload.logo = formData.logo;
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
        { label: "Início", href: "/" },
        { label: "Gestão de Organizações" },
      ]}
      className="p-0"
    >
      {showAlert && (
        <AlertBanner
          message="Erro: Mensagem curta do erro"
          onClose={() => setShowAlert(false)}
        />
      )}

      <div className="h-full flex flex-col divide-y">
        {/* Header */}
        <header className="flex justify-between w-full flex-row p-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
            </Button>
            {canCreateOrg && (
              <CreateButton
                label="Criar Organização"
                onClick={() => setIsCreateOpen(true)}
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <SelectButton
              className="w-50"
              placeholder="Ordenar por"
              label="Ordenar por"
              icon={<ChartNoAxesCombinedIcon className="h-4 w-4" />}
              items={sortOptions}
              value={sortOption}
              onValueChange={setSortOption}
            />
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Escreva algo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </header>

        {/* Table Section */}
        <div className="flex-1 p-2 animate-fade-in">
          <DataTable
            columns={columns}
            data={filteredOrganizations}
            onEdit={canEditOrg ? handleEdit : undefined}
            onDelete={canDeleteOrg ? onDeleteClick : undefined}
          />
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
