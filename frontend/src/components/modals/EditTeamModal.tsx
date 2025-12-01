import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Plus, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Member {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
}

interface EditTeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teamName: string;
  currentMembers: Member[];
  availableMembers: Member[];
  onSave?: (teamName: string, members: Member[]) => void;
}

export function EditTeamModal({
  open,
  onOpenChange,
  teamName: initialTeamName,
  currentMembers: initialMembers,
  availableMembers: initialAvailable,
  onSave,
}: EditTeamModalProps) {
  const [teamName, setTeamName] = useState(initialTeamName);
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [available, setAvailable] = useState<Member[]>(initialAvailable);
  const [searchTerm, setSearchTerm] = useState("");

  // Reset state when modal opens or props change
  useEffect(() => {
    if (open) {
      setTeamName(initialTeamName);
      setMembers(initialMembers);
      setAvailable(initialAvailable);
      setSearchTerm("");
    }
  }, [open, initialTeamName, initialMembers, initialAvailable]);

  const filteredAvailable = available.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleRemoveMember = (member: Member) => {
    setMembers((prev) => prev.filter((m) => m.id !== member.id));
    setAvailable((prev) => [...prev, member]);
  };

  const handleAddMember = (member: Member) => {
    setAvailable((prev) => prev.filter((m) => m.id !== member.id));
    setMembers((prev) => [...prev, member]);
  };

  const handleSave = () => {
    onSave?.(teamName, members);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Editar Time
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Altere o nome e a composição de membros do time de vendas.
          </p>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Team Name */}
          <div className="space-y-2">
            <Label>Nome do Time</Label>
            <Input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Ex: Time de Vendas - Sudeste"
            />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-2 gap-6">
            {/* Current Members */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Membros Atuais do Time
              </Label>
              <ScrollArea className="h-[280px] rounded-lg border border-border p-2">
                <div className="space-y-2">
                  {members.length === 0 ? (
                    <p className="text-center text-sm text-muted-foreground py-4">
                      Nenhum membro no time
                    </p>
                  ) : (
                    members.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between rounded-md bg-muted/50 p-3"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback
                              style={{ backgroundColor: member.color }}
                              className="text-xs font-medium text-white"
                            >
                              {member.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {member.role}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveMember(member)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-1 text-xs"
                        >
                          <Trash2 className="h-3 w-3" />
                          Remover
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Available Members */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Adicionar Novos Membros
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou cargo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <ScrollArea className="h-[232px] rounded-lg border border-border p-2">
                <div className="space-y-2">
                  {filteredAvailable.length === 0 ? (
                    <p className="text-center text-sm text-muted-foreground py-4">
                      Nenhum usuário disponível
                    </p>
                  ) : (
                    filteredAvailable.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between rounded-md bg-muted/30 p-3"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback
                              style={{ backgroundColor: member.color }}
                              className="text-xs font-medium text-white"
                            >
                              {member.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {member.role}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleAddMember(member)}
                          className="gap-1 text-xs"
                        >
                          <Plus className="h-3 w-3" />
                          Adicionar
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar Alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
