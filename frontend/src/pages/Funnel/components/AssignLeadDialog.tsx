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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMembers } from "../hooks/useMembers";
import type { Lead } from "../types/kanban.types";

interface AssignLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: Lead | null;
  onSubmit: (memberId: number) => void;
  isPending?: boolean;
  allowedMemberIds?: number[];
}

export function AssignLeadDialog({
  open,
  onOpenChange,
  lead,
  onSubmit,
  isPending,
  allowedMemberIds,
}: AssignLeadDialogProps) {
  const { data: members = [], isLoading } = useMembers();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  useEffect(() => {
    if (open) {
      if (lead?.assignedTo) {
        setSelectedMemberId(lead.assignedTo);
      } else {
        setSelectedMemberId(null);
      }
      setSearchTerm("");
    }
  }, [open, lead]);

  const filteredMembers = members.filter(
    (m) =>
      (m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.role.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!allowedMemberIds || allowedMemberIds.includes(m.id)),
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const getColor = (name: string) => {
    const colors = [
      "#EF4444",
      "#F59E0B",
      "#10B981",
      "#3B82F6",
      "#6366F1",
      "#8B5CF6",
      "#EC4899",
    ];
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    return colors[sum % colors.length];
  };

  const handleSave = () => {
    if (selectedMemberId !== null) {
      onSubmit(selectedMemberId);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Atribuir Lead</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar membro..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <ScrollArea className="h-[300px] rounded-md border p-2">
            {isLoading ? (
              <div className="text-center py-4 text-muted-foreground">
                Carregando...
              </div>
            ) : filteredMembers.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                Nenhum membro encontrado
              </div>
            ) : (
              <div className="space-y-1">
                {filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className={`flex items-center justify-between rounded-md p-2 cursor-pointer hover:bg-muted/50 transition-colors ${selectedMemberId === member.id ? "bg-muted ring-1 ring-primary" : ""}`}
                    onClick={() => setSelectedMemberId(member.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback
                          style={{ backgroundColor: getColor(member.name) }}
                          className="text-white text-xs"
                        >
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {member.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {member.role}
                        </p>
                      </div>
                    </div>
                    {selectedMemberId === member.id && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={selectedMemberId === null || isPending}
          >
            {isPending ? "Salvando..." : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
