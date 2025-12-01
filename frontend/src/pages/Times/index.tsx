import { useState, useMemo } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { DataTable, type Column } from "@/components/ui/data-table";
import { usePermissions } from "@/auth/hooks/usePermissions";
import { Search, ChartNoAxesCombinedIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CreateTeamModal } from "@/components/modals/CreateTeamModal";
import { EditTeamModal } from "@/components/modals/EditTeamModal";
import { DeleteTeamModal } from "@/components/modals/DeleteTeamModal";
import {
  useTeams,
  useCreateTeam,
  useUpdateTeam,
  useDeleteTeam,
} from "./hooks/useTeams";
import { useMembers } from "@/pages/Membros/hooks/useMembers";
import CreateButton from "@/components/CreateButton";
import SelectButton from "@/components/SelectButton";

interface Team {
  id: number;
  nome: string;
  membros: number;
  dataCriacao: string;
  memberIds?: number[];
}

const columns: Column<Team>[] = [
  { key: "nome", header: "Nome do Time" },
  { key: "membros", header: "Nº de Membros" },
  { key: "dataCriacao", header: "Data de Criação" },
];

const sortOptions = [
  { value: "nome-asc", label: "Nome (A-Z)" },
  { value: "nome-desc", label: "Nome (Z-A)" },
  { value: "membros-desc", label: "Mais Membros" },
  { value: "membros-asc", label: "Menos Membros" },
  { value: "data-desc", label: "Mais Recentes" },
  { value: "data-asc", label: "Mais Antigos" },
];

const Times = () => {
  const { hasPermission } = usePermissions();

  // Backend integration
  const { data: apiTeamsData } = useTeams();
  const { data: apiMembersData } = useMembers();
  const { mutate: createTeamMutation } = useCreateTeam(() =>
    setIsCreateOpen(false),
  );
  const { mutate: updateTeamMutation } = useUpdateTeam(() =>
    setIsEditOpen(false),
  );
  const { mutate: deleteTeamMutation } = useDeleteTeam(() => {
    setIsDeleteOpen(false);
    setSelectedTeam(null);
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("nome-asc");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<number[]>([]);

  // Transform API data to match component interface
  const teams = useMemo(() => {
    if (!apiTeamsData) return [];
    return apiTeamsData.map(
      (team: {
        id: number;
        name: string;
        member_count: number;
        created_at: string;
        members: number[];
      }) => ({
        id: team.id,
        nome: team.name,
        membros: team.member_count,
        dataCriacao: new Date(team.created_at).toLocaleDateString("pt-BR"),
        memberIds: team.members || [],
      }),
    );
  }, [apiTeamsData]);

  // Transform members data for the modal
  const availableMembers = useMemo(() => {
    if (!apiMembersData) return [];

    return apiMembersData.map(
      (member: { id: number; name: string; hierarchy: string }) => {
        const initials = member.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .substring(0, 2);

        const colors = [
          "#059669",
          "#0891b2",
          "#7c3aed",
          "#dc2626",
          "#ea580c",
          "#ca8a04",
        ];
        const color = colors[member.id % colors.length];

        return {
          id: String(member.id),
          name: member.name,
          role: member.hierarchy,
          initials,
          color,
        };
      },
    );
  }, [apiMembersData]);

  const filteredTeams = useMemo(() => {
    let filtered = teams.filter((team) =>
      team.nome.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return filtered.sort((a, b) => {
      switch (sortOption) {
        case "nome-asc":
          return a.nome.localeCompare(b.nome);
        case "nome-desc":
          return b.nome.localeCompare(a.nome);
        case "membros-desc":
          return b.membros - a.membros;
        case "membros-asc":
          return a.membros - b.membros;
        // Note: Comparing localized date strings is tricky.
        // Ideally, we should store the original Date object or ISO string in the data.
        // For now, let's assume we can parse them back or relying on current structure might be flaky if format changes.
        // Better approach: Use the `apiTeamsData` directly if possible or store raw date in `teams`.
        // Let's try to parse the PT-BR date string for sorting.
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
  }, [teams, searchTerm, sortOption]);

  const handleEdit = (team: Team & { memberIds?: number[] }) => {
    console.log("Editing team:", team);
    console.log("Team member IDs:", team.memberIds);
    console.log("Available members:", availableMembers);
    const currentMembersFiltered = availableMembers.filter(
      (m: { id: string }) => (team.memberIds || []).includes(parseInt(m.id)),
    );
    console.log("Current members filtered:", currentMembersFiltered);
    setSelectedTeam(team);
    setSelectedTeamMembers(team.memberIds || []);
    setIsEditOpen(true);
  };

  const handleDelete = (team: Team) => {
    setSelectedTeam(team);
    setIsDeleteOpen(true);
  };

  // Permission checks
  const canCreateTeam = hasPermission("team:create");
  const canEditTeam = hasPermission("team:edit");
  const canDeleteTeam = hasPermission("team:delete");

  return (
    <AppShell
      breadcrumbs={[
        { label: "Organizações", href: "/" },
        { label: "Gerenciamento de Times" },
      ]}
      className="p-0"
    >
      <div className="h-full flex flex-col divide-y">
        {/* Header */}
        <header className="flex justify-between w-full flex-row p-2">
          <div className="flex items-center gap-2">
            {canCreateTeam && (
              <CreateButton
                label="Novo Time"
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
                placeholder="Pesquisar por time..."
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
            data={filteredTeams}
            onEdit={canEditTeam ? handleEdit : undefined}
            onDelete={canDeleteTeam ? handleDelete : undefined}
          />
        </div>
      </div>

      {/* Modals */}
      <CreateTeamModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        availableMembers={availableMembers}
        onSave={(name, members) => {
          createTeamMutation({
            name,
            member_ids: members.map((m) =>
              parseInt(typeof m === "string" ? m : m.id),
            ),
          });
        }}
      />
      <EditTeamModal
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        teamName={selectedTeam?.nome || ""}
        currentMembers={availableMembers.filter((m: { id: string }) =>
          selectedTeamMembers.includes(parseInt(m.id)),
        )}
        availableMembers={availableMembers.filter(
          (m: { id: string }) => !selectedTeamMembers.includes(parseInt(m.id)),
        )}
        onSave={(name, members) => {
          if (selectedTeam) {
            updateTeamMutation({
              id: selectedTeam.id,
              payload: {
                name,
                member_ids: members.map((m) =>
                  parseInt(typeof m === "string" ? m : m.id),
                ),
              },
            });
          }
        }}
      />
      <DeleteTeamModal
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        teamName={selectedTeam?.nome || ""}
        onConfirm={() => {
          if (selectedTeam) {
            deleteTeamMutation(selectedTeam.id);
          }
        }}
      />
    </AppShell>
  );
};

export default Times;
