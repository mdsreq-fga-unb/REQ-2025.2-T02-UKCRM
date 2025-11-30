import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/ui/data-table";
import { usePermissions } from "@/auth/hooks/usePermissions";
import { useAuthContext } from "@/auth/context/AuthContext";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMembers, useCreateMember, useDeleteMember } from "./hooks/useMembers";
import { shouldUseMock } from "@/config/features";
import { featureFlags } from "@/config/features";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PasswordInput } from "@/components/ui/password-input";
import { DeleteMemberModal } from "@/components/modals/DeleteMemberModal";
import { Send } from "lucide-react";

interface Member {
  id: number;
  nome: string;
  hierarquia: string;
  dataEntrada: string;
}

const mockMembers: Member[] = [
  { id: 1, nome: "Ugi Nam", hierarquia: "Closer", dataEntrada: "14/10/2025" },
  { id: 2, nome: "Brenda Silva", hierarquia: "SDR", dataEntrada: "12/10/2025" },
  { id: 3, nome: "Luis Terra", hierarquia: "Coordenador de Vendas", dataEntrada: "10/10/2025" },
];

const hierarchyOptions = [
  "Closer",
  "SDR",
  "Coordenador de Vendas",
  "Gerente",
  "Diretor",
];

const columns: Column<Member>[] = [
  { key: "nome", header: "Nome do Membro" },
  { key: "hierarquia", header: "Nível de Hierarquia" },
  { key: "dataEntrada", header: "Data de Entrada" },
];

// Map frontend hierarchy values to backend role values
const hierarchyToRoleMap: Record<string, string> = {
  "Closer": "closer",
  "SDR": "sdr",
  "Coordenador de Vendas": "coordinator",
  "Gerente": "manager",
  "Diretor": "owner",
};

const Membros = () => {
  const { hasPermission } = usePermissions();
  const { user } = useAuthContext();
  const useMockData = shouldUseMock(featureFlags.USE_MOCK_MEMBERS);

  // Backend integration
  const { data: apiMembersData } = useMembers();
  const { mutate: createMemberMutation } = useCreateMember(() => setIsCreateOpen(false));
  const { mutate: deleteMemberMutation } = useDeleteMember(() => {
    setIsDeleteOpen(false);
    setSelectedMember(null);
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    hierarchy: "",
    password: "",
    confirmPassword: "",
  });

  // Transform API data to match component interface
  const members = useMemo(() => {
    if (useMockData) {
      return mockMembers;
    }
    if (!apiMembersData) return [];
    return apiMembersData.map((member: { id: number; name: string; hierarchy: string; joined_at: string }) => ({
      id: member.id,
      nome: member.name,
      hierarquia: member.hierarchy,
      dataEntrada: new Date(member.joined_at).toLocaleDateString("pt-BR"),
    }));
  }, [useMockData, apiMembersData]);

  const filteredMembers = members.filter((member) =>
    member.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (member: Member) => {
    console.log("Edit:", member);
  };

  const handleDelete = (member: Member) => {
    setSelectedMember(member);
    setIsDeleteOpen(true);
  };

  const availableMembersForReallocation = mockMembers
    .filter((m) => m.id !== selectedMember?.id)
    .map((m) => ({ id: String(m.id), name: m.nome }));

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
    >
      <div className="space-y-6 animate-fade-in">
        {/* Sidebar Label */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-4 w-4 rounded bg-primary" />
          <span className="font-medium text-foreground">Gerenciamento de Membros</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Pesquisar por membro..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          {canCreateMember && (
            <Button onClick={() => setIsCreateOpen(true)}>
              Novo Membro
            </Button>
          )}
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={filteredMembers}
          onEdit={canEditMember ? handleEdit : undefined}
          onDelete={canDeleteMember ? handleDelete : undefined}
        />
      </div>

      {/* Create Member Modal */}
      <Dialog open={isCreateOpen} onOpenChange={(open: boolean) => {
        setIsCreateOpen(open);
        if (!open) {
          setFormData({ name: "", email: "", hierarchy: "", password: "", confirmPassword: "" });
        }
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold">
              Novo Membro
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">
              Dados do Membro
            </Label>
            <Input
              placeholder="Nome Completo"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Select
              value={formData.hierarchy}
              onValueChange={(value: string) => setFormData({ ...formData, hierarchy: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Nível de Hierarquia" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {hierarchyOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
            />
            <PasswordInput
              placeholder="Senha"
              value={formData.password}
              onChange={(e: any) => setFormData({ ...formData, password: e.target.value })}
            />
            <Input
              type="password"
              placeholder="Confirmar Senha"
              value={formData.confirmPassword}
              onChange={(e: any) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="invite"
              onClick={() => {
                if (useMockData) {
                  console.log("Create member:", formData);
                  setIsCreateOpen(false);
                } else {
                  if (formData.password !== formData.confirmPassword) {
                    alert("As senhas não coincidem");
                    return;
                  }
                  if (!user?.organization_id) {
                    alert("Erro: organização não encontrada");
                    return;
                  }
                  const role = hierarchyToRoleMap[formData.hierarchy];
                  if (!role) {
                    alert("Erro: hierarquia inválida");
                    return;
                  }
                  const payload = {
                    name: formData.name,
                    email: formData.email,
                    role: role,
                    organization_id: user.organization_id,
                  };
                  console.log("Sending payload:", payload);
                  createMemberMutation(payload);
                }
              }}
            >
              <Send className="h-4 w-4" />
              Convidar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Member Modal */}
      <DeleteMemberModal
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        memberName={selectedMember?.nome || ""}
        availableMembers={availableMembersForReallocation}
        onConfirm={(action: string, targetId?: string) => {
          if (useMockData) {
            console.log("Delete confirmed:", action, targetId);
            setIsDeleteOpen(false);
            setSelectedMember(null);
          } else if (selectedMember) {
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
