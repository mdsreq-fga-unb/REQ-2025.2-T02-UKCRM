import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DeleteButton from "@/components/DeleteButton";
import type { Lead } from "../types/kanban.types";

interface DeleteLeadDialogProps {
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
  onDelete: (leadId: number) => void;
  isPending?: boolean;
}

export function DeleteLeadDialog({
  lead,
  open,
  onClose,
  onDelete,
  isPending = false,
}: DeleteLeadDialogProps) {
  const handleDelete = () => {
    if (lead) {
      // Extract numeric ID from string format "lead-123"
      const leadId =
        typeof lead.id === "string"
          ? parseInt(lead.id.replace("lead-", ""), 10)
          : lead.id;
      onDelete(leadId);
    }
  };

  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
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
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>

          <DeleteButton
            label={isPending ? "Excluindo..." : "Excluir Lead"}
            onClick={handleDelete}
            disabled={isPending}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
