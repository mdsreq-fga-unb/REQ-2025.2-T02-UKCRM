import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Lead } from "../types/kanban.types";

interface DeleteLeadDialogProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (leadId: number | string) => void;
}

export function DeleteLeadDialog({
  lead,
  isOpen,
  onClose,
  onDelete,
}: DeleteLeadDialogProps) {
  const handleDelete = () => {
    if (lead) {
      onDelete(lead.id);
      onClose();
    }
  };

  if (!lead) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir o lead "{lead.name}"?
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Esta ação não pode ser desfeita. O lead será permanentemente
            removido do sistema.
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Excluir Lead
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
