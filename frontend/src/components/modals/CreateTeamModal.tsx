import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

import CreateButton from "@/components/CreateButton";

interface Member {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
}

interface CreateTeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableMembers: Member[];
  onSave?: (teamName: string, selectedMembers: Member[]) => void;
}

export function CreateTeamModal({
  open,
  onOpenChange,
  availableMembers,
  onSave,
}: CreateTeamModalProps) {
  const [teamName, setTeamName] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleMember = (memberId: string) => {
    setSelectedIds((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId],
    );
  };

  const handleSave = () => {
    const selected = availableMembers.filter((m) => selectedIds.includes(m.id));
    onSave?.(teamName, selected);
    onOpenChange(false);
    setTeamName("");
    setSelectedIds([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Criar Novo Time
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Defina o nome e selecione os membros para o novo time de vendas.
          </p>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Nome do Time</Label>
            <Input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Ex: Time de Vendas - Sudeste"
            />
          </div>

          <div className="space-y-2">
            <Label>Membros do Time</Label>
            <ScrollArea className="h-[280px] rounded-lg border border-border">
              <div className="p-2 space-y-1">
                {availableMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between rounded-md p-3 hover:bg-muted/50 cursor-pointer"
                    onClick={() => toggleMember(member.id)}
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
                    <Checkbox
                      checked={selectedIds.includes(member.id)}
                      onCheckedChange={() => toggleMember(member.id)}
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <CreateButton
            label="Salvar Time"
            onClick={handleSave}
            disabled={!teamName}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
