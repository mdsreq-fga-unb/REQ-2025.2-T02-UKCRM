import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { DataTable, type Column } from "@/components/ui/data-table";
import { usePermissions } from "@/auth/hooks/usePermissions";
import { useAuthContext } from "@/auth/context/AuthContext";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  useMembers,
  useCreateMember,
  useUpdateMember,
  useDeleteMember,
} from "./hooks/useMembers";
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
import CreateButton from "@/components/CreateButton";

interface Member {
  id: number;
  nome: string;
  email?: string;
  hierarquia: string;
  dataEntrada: string;
}

const mockMembers: Member[] = [
  { id: 1, nome: "Ugi Nam", hierarquia: "Closer", dataEntrada: "14/10/2025" },
  { id: 2, nome: "Brenda Silva", hierarquia: "SDR", dataEntrada: "12/10/2025" },
  {
    id: 3,
    nome: "Luis Terra",
    hierarquia: "Coordenador de Vendas",
    dataEntrada: "10/10/2025",
  },
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
  Closer: "closer",
  SDR: "sdr",
  "Coordenador de Vendas": "coordinator",
  Gerente: "manager",
  Diretor: "owner",
};

const Membros = () => {
  const { hasPermission } = usePermissions();
  const { user } = useAuthContext();
  const useMockData = shouldUseMock(featureFlags.USE_MOCK_MEMBERS);

  // Backend integration
  const { data: apiMembersData } = useMembers();
  const { mutate: createMemberMutation } = useCreateMember(() =>
    setIsCreateOpen(false),
  );
  const { mutate: updateMemberMutation } = useUpdateMember(() => {
    setIsEditOpen(false);
    setSelectedMember(null);
  });
  const { mutate: deleteMemberMutation } = useDeleteMember(() => {
    setIsDeleteOpen(false);
    setSelectedMember(null);
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    hierarchy: "",
    password: "",
    confirmPassword: "",
  });
  const [editFormData, setEditFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });

  // Transform API data to match component interface
  const members = useMemo(() => {
    if (useMockData) {
      return mockMembers;
    }
    if (!apiMembersData) return [];
    return apiMembersData.map(
      (member: {
        id: number;
        name: string;
        email: string;
        hierarchy: string;
        joined_at: string;
      }) => ({
        id: member.id,
        nome: member.name,
        email: member.email,
        hierarquia: member.hierarchy,
        dataEntrada: new Date(member.joined_at).toLocaleDateString("pt-BR"),
      }),
    );
  }, [useMockData, apiMembersData]);

  const filteredMembers = members.filter((member) =>
    member.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleEdit = (member: Member) => {
    setSelectedMember(member);
    setEditFormData({
      name: member.nome,
      password: "",
      confirmPassword: "",
    });
    setIsEditOpen(true);
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
          <span className="font-medium text-foreground">
            Gerenciamento de Membros
          </span>
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
            <CreateButton
              label="Novo Membro"
              onClick={() => setIsCreateOpen(true)}
            />
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
      <Dialog
        open={isCreateOpen}
        onOpenChange={(open: boolean) => {
          setIsCreateOpen(open);
          if (!open) {
            setFormData({
              name: "",
              email: "",
              hierarchy: "",
              password: "",
              confirmPassword: "",
            });
          }
        }}
      >
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
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Select
              value={formData.hierarchy}
              onValueChange={(value: string) =>
                setFormData({ ...formData, hierarchy: value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <PasswordInput
              placeholder="Senha"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <Input
              type="password"
              placeholder="Confirmar Senha"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
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

      {/* Edit Member Modal */}
      <Dialog
        open={isEditOpen}
        onOpenChange={(open: boolean) => {
          setIsEditOpen(open);
          if (!open) {
            setEditFormData({ name: "", password: "", confirmPassword: "" });
            setSelectedMember(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold">
              Editar Membro
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">
              Dados do Membro
            </Label>
            <Input
              placeholder="Nome Completo"
              value={editFormData.name}
              onChange={(e) =>
                setEditFormData({ ...editFormData, name: e.target.value })
              }
            />
            <Input
              type="email"
              placeholder="E-mail"
              value={selectedMember?.email || ""}
              disabled
              className="bg-muted cursor-not-allowed"
            />
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">
              Alterar Senha (Opcional)
            </Label>
            <PasswordInput
              placeholder="Nova Senha"
              value={editFormData.password}
              onChange={(e) =>
                setEditFormData({ ...editFormData, password: e.target.value })
              }
            />
            <Input
              type="password"
              placeholder="Confirmar Nova Senha"
              value={editFormData.confirmPassword}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                if (useMockData) {
                  console.log("Edit member:", editFormData);
                  setIsEditOpen(false);
                } else {
                  if (!selectedMember) return;

                  // Validate passwords if user is trying to change password
                  if (editFormData.password || editFormData.confirmPassword) {
                    if (
                      editFormData.password !== editFormData.confirmPassword
                    ) {
                      alert("As senhas não coincidem");
                      return;
                    }
                    if (editFormData.password.length < 8) {
                      alert("A senha deve ter pelo menos 8 caracteres");
                      return;
                    }
                    if (!/[A-Z]/.test(editFormData.password)) {
                      alert("A senha deve conter letras maiúsculas");
                      return;
                    }
                    if (!/[a-z]/.test(editFormData.password)) {
                      alert("A senha deve conter letras minúsculas");
                      return;
                    }
                    if (!/\d/.test(editFormData.password)) {
                      alert("A senha deve conter números");
                      return;
                    }
                    if (!/[!@#$%^&*(),.?":{}|<>]/.test(editFormData.password)) {
                      alert("A senha deve conter símbolos");
                      return;
                    }
                  }

                  const payload: { name: string; password?: string } = {
                    name: editFormData.name,
                  };

                  // Only include password if it's being changed
                  if (editFormData.password) {
                    payload.password = editFormData.password;
                  }

                  updateMemberMutation({
                    id: selectedMember.id,
                    payload,
                  });
                }
              }}
            >
              Salvar
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
