import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePermissions } from "@/auth/hooks/usePermissions";
import { useAuthContext } from "@/auth/context/AuthContext";
import { Search, ChartNoAxesCombinedIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  useMembers,
  useCreateMember,
  useUpdateMember,
  useDeleteMember,
} from "./hooks/useMembers";
import { DeleteMemberModal } from "@/components/modals/DeleteMemberModal";
import { CreateMemberModal } from "@/components/modals/CreateMemberModal";
import { EditMemberModal } from "@/components/modals/EditMemberModal";
import CreateButton from "@/components/CreateButton";
import SelectButton from "@/components/SelectButton";
import type {
  CreateMemberFormValues,
  EditMemberFormValues,
} from "@/components/modals/schemas/member.schema";
import { HIERARCHY_OPTIONS, HIERARCHY_TO_ROLE_MAP, getHierarchyFromRole } from "@/constants/roles";

interface Member {
  id: number;
  nome: string;
  email?: string;
  photo?: string | null;
  hierarquia: string;
  dataEntrada: string;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const columns: Column<Member>[] = [
  {
    key: "nome",
    header: "Nome do Membro",
    render: (member: Member) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src={member.photo || ""} alt={member.nome} />
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            {getInitials(member.nome)}
          </AvatarFallback>
        </Avatar>
        <span>{member.nome}</span>
      </div>
    ),
  },
  { key: "hierarquia", header: "Nível de Hierarquia" },
  { key: "dataEntrada", header: "Data de Entrada" },
];

const sortOptions = [
  { value: "nome-asc", label: "Nome (A-Z)" },
  { value: "nome-desc", label: "Nome (Z-A)" },
  { value: "hierarquia-asc", label: "Hierarquia (Menor-Maior)" },
  { value: "hierarquia-desc", label: "Hierarquia (Maior-Menor)" },
  { value: "data-desc", label: "Mais Recentes" },
  { value: "data-asc", label: "Mais Antigos" },
];

const Membros = () => {
  const { hasPermission } = usePermissions();
  const { user } = useAuthContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("nome-asc");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Backend integration
  const { data: apiMembersData } = useMembers();
  const { mutate: createMemberMutation } = useCreateMember(() => {
    setIsCreateOpen(false);
  });
  const { mutate: updateMemberMutation } = useUpdateMember(() => {
    setIsEditOpen(false);
    setSelectedMember(null);
  });
  const { mutate: deleteMemberMutation } = useDeleteMember(() => {
    setIsDeleteOpen(false);
    setSelectedMember(null);
  });

  // Transform API data to match component interface
  const members = useMemo(() => {
    if (!apiMembersData) return [];
    return apiMembersData.map(
      (member: {
        id: number;
        name: string;
        email: string;
        hierarchy: string;
        photo?: string | null;
        joined_at: string;
      }) => ({
        id: member.id,
        nome: member.name,
        email: member.email,
        photo: member.photo,
        hierarquia: getHierarchyFromRole(member.hierarchy),
        dataEntrada: new Date(member.joined_at).toLocaleDateString("pt-BR"),
      }),
    );
  }, [apiMembersData]);

  const filteredMembers = useMemo(() => {
    let filtered = members.filter((member) =>
      member.nome.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return filtered.sort((a, b) => {
      switch (sortOption) {
        case "nome-asc":
          return a.nome.localeCompare(b.nome);
        case "nome-desc":
          return b.nome.localeCompare(a.nome);
        case "hierarquia-asc":
          return (
            HIERARCHY_OPTIONS.indexOf(a.hierarquia as any) -
            HIERARCHY_OPTIONS.indexOf(b.hierarquia as any)
          );
        case "hierarquia-desc":
          return (
            HIERARCHY_OPTIONS.indexOf(b.hierarquia as any) -
            HIERARCHY_OPTIONS.indexOf(a.hierarquia as any)
          );
        case "data-desc":
        case "data-asc": {
          const parseDate = (dateStr: string) => {
            const [day, month, year] = dateStr.split("/").map(Number);
            return new Date(year, month - 1, day).getTime();
          };
          const dateA = parseDate(a.dataEntrada);
          const dateB = parseDate(b.dataEntrada);
          return sortOption === "data-desc" ? dateB - dateA : dateA - dateB;
        }
        default:
          return 0;
      }
    });
  }, [members, searchTerm, sortOption]);

  const handleEdit = (member: Member) => {
    setSelectedMember(member);
    setIsEditOpen(true);
  };

  const handleDelete = (member: Member) => {
    setSelectedMember(member);
    setIsDeleteOpen(true);
  };

  const handleCreateMember = (data: CreateMemberFormValues) => {
    if (!user?.organization_id) {
      alert("Erro: organização não encontrada");
      return;
    }
    const role = HIERARCHY_TO_ROLE_MAP[data.hierarchy];
    if (!role) {
      alert("Erro: hierarquia inválida");
      return;
    }
    const payload = {
      name: data.name,
      email: data.email,
      role: role,
      organization_id: user.organization_id,
      password: data.password,
    };
    createMemberMutation(payload);
  };

  const handleEditMember = (data: EditMemberFormValues) => {
    if (!selectedMember) return;

    const payload: { name: string; password?: string } = {
      name: data.name,
    };

    if (data.password) {
      payload.password = data.password;
    }

    updateMemberMutation({
      id: selectedMember.id,
      payload,
    });
  };

  // Get available members from API data for reallocation
  const availableMembersForReallocation = useMemo(() => {
    if (!apiMembersData) return [];
    return apiMembersData
      .filter((m) => m.id !== selectedMember?.id)
      .map((m) => ({ id: String(m.id), name: m.name }));
  }, [apiMembersData, selectedMember]);

  // Permission checks
  const canCreateMember = hasPermission("member:create");
  const canEditMember = hasPermission("member:edit");
  const canDeleteMember = hasPermission("member:delete");

  return (
    <AppShell
      breadcrumbs={[
        { label: "Organizações", href: "/" },
        { label: "Gerenciamento de Membros" },
      ]}
      className="p-0"
    >
      <div className="h-full flex flex-col divide-y">
        {/* Header */}
        <header className="flex justify-between w-full flex-row p-2">
          <div className="flex items-center gap-2">
            {canCreateMember && (
              <CreateButton
                label="Novo Membro"
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
                placeholder="Pesquisar por membro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </header>

        {/* Table */}
        <div className="flex-1 p-2 animate-fade-in">
          <DataTable
            columns={columns}
            data={filteredMembers}
            onEdit={canEditMember ? handleEdit : undefined}
            onDelete={canDeleteMember ? handleDelete : undefined}
          />
        </div>
      </div>

      <CreateMemberModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSave={handleCreateMember}
      />

      <EditMemberModal
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        member={selectedMember}
        onSave={handleEditMember}
      />

      <DeleteMemberModal
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        memberName={selectedMember?.nome || ""}
        availableMembers={availableMembersForReallocation}
        onConfirm={(action: string, targetId?: string) => {
          if (selectedMember) {
            deleteMemberMutation({
              id: selectedMember.id,
              payload: {
                action: action as "delete" | "reallocate",
                target_member_id: targetId ? parseInt(targetId) : undefined,
              },
            });
          }
        }}
      />
    </AppShell>
  );
};

export default Membros;
