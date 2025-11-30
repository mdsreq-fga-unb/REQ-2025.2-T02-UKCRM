import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Lead } from "../types/kanban.types";
import { mockMembers } from "@/pages/Times/data/mockTeams";

interface AssignLeadDialogProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onAssign: (leadId: number | string, memberId: number) => void;
}

export function AssignLeadDialog({
  lead,
  isOpen,
  onClose,
  onAssign,
}: AssignLeadDialogProps) {
  const [selectedMember, setSelectedMember] = useState<string>("");

  // Filter members to only show SDRs and Closers
  const assignableMembers = mockMembers.filter(
    (member) => member.role === "SDR" || member.role === "Closer"
  );

  useEffect(() => {
    if (lead && lead.assignedTo) {
      setSelectedMember(lead.assignedTo.toString());
    } else {
      setSelectedMember("");
    }
  }, [lead, isOpen]);

  const handleAssign = () => {
    if (lead && selectedMember) {
      onAssign(lead.id, parseInt(selectedMember));
      onClose();
    }
  };

  if (!lead) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atribuir Lead</DialogTitle>
          <DialogDescription>
            Atribua o lead "{lead.name}" a um membro da equipe (SDR ou Closer).
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="member">Selecione o membro</Label>
            <Select value={selectedMember} onValueChange={setSelectedMember}>
              <SelectTrigger id="member">
                <SelectValue placeholder="Escolha um membro" />
              </SelectTrigger>
              <SelectContent>
                {assignableMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id.toString()}>
                    {member.name} - {member.role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {lead.assignedTo && (
            <div className="text-sm text-muted-foreground">
              Atualmente atribuído a: Membro #{lead.assignedTo}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleAssign} disabled={!selectedMember}>
            Atribuir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
