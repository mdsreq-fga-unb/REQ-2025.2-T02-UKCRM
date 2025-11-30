import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/ui/data-table";
import { usePermissions } from "@/auth/hooks/usePermissions";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
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

const Membros = () => {
  const { hasPermission } = usePermissions();
  const [members] = useState<Member[]>(mockMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

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
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
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
            <Input placeholder="Nome Completo" />
            <Select>
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
            <Input type="email" placeholder="E-mail" />
            <PasswordInput placeholder="Senha" />
            <Input type="password" placeholder="Confirmar Senha" />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancelar
            </Button>
            <Button variant="invite">
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
        onConfirm={(action, targetId) =>
          console.log("Delete confirmed:", action, targetId)
        }
      />
    </AppShell>
  );
};

export default Membros;
