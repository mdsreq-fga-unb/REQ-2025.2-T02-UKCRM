import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/ui/data-table";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CreateTeamModal } from "@/components/modals/CreateTeamModal";
import { EditTeamModal } from "@/components/modals/EditTeamModal";
import { DeleteTeamModal } from "@/components/modals/DeleteTeamModal";

interface Team {
  id: number;
  nome: string;
  membros: number;
  dataCriacao: string;
}

const mockTeams: Team[] = [
  { id: 1, nome: "Time Alpha", membros: 5, dataCriacao: "14/10/2025" },
  { id: 2, nome: "Time Beta", membros: 8, dataCriacao: "12/10/2025" },
  { id: 3, nome: "Time Gamma", membros: 3, dataCriacao: "10/10/2025" },
];

const mockMembers = [
  { id: "1", name: "Ana Clara", role: "Closer", initials: "AC", color: "#059669" },
  { id: "2", name: "Bruno Esteves", role: "SDR", initials: "BE", color: "#0891b2" },
  { id: "3", name: "Carla Souza", role: "Closer", initials: "CS", color: "#7c3aed" },
  { id: "4", name: "Daniel Pereira", role: "SDR", initials: "DP", color: "#dc2626" },
];

const columns: Column<Team>[] = [
  { key: "nome", header: "Nome do Time" },
  { key: "membros", header: "Nº de Membros" },
  { key: "dataCriacao", header: "Data de Criação" },
];

const Times = () => {
  const [teams] = useState<Team[]>(mockTeams);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const filteredTeams = teams.filter((team) =>
    team.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (team: Team) => {
    setSelectedTeam(team);
    setIsEditOpen(true);
  };

  const handleDelete = (team: Team) => {
    setSelectedTeam(team);
    setIsDeleteOpen(true);
  };

  return (
    <AppShell
      breadcrumbs={[
        { label: "Organizações", href: "/" },
        { label: "Gerenciamento de Times" },
      ]}
    >
      <div className="space-y-6 animate-fade-in">
        {/* Sidebar Label */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-4 w-4 rounded bg-primary" />
          <span className="font-medium text-foreground">Gerenciamento de Times</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Pesquisar por time..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button onClick={() => setIsCreateOpen(true)}>
            Novo Time
          </Button>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={filteredTeams}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Modals */}
      <CreateTeamModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        availableMembers={mockMembers}
        onSave={(name, members) => console.log("Create team:", name, members)}
      />
      <EditTeamModal
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        teamName={selectedTeam?.nome || ""}
        currentMembers={mockMembers.slice(0, 2)}
        availableMembers={mockMembers.slice(2)}
        onSave={(name, members) => console.log("Edit team:", name, members)}
      />
      <DeleteTeamModal
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        teamName={selectedTeam?.nome || ""}
        onConfirm={() => console.log("Delete confirmed")}
      />
    </AppShell>
  );
};

export default Times;
