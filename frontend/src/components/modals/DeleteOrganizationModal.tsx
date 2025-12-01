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
import { } from "lucide-react";
import DeleteButton from "@/components/DeleteButton";

interface DeleteOrganizationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizationName: string;
  onConfirm?: () => void;
}

export function DeleteOrganizationModal({
  open,
  onOpenChange,
  organizationName,
  onConfirm,
}: DeleteOrganizationModalProps) {
  const [confirmText, setConfirmText] = useState("");

  const isConfirmEnabled = confirmText === organizationName;

  const handleConfirm = () => {
    if (isConfirmEnabled) {
      onConfirm?.();
      onOpenChange(false);
      setConfirmText("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Excluir Organização
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4 text-center">
          <p className="text-lg font-semibold text-destructive">Aviso!</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Ao excluir a organização, todos os membros (incluindo o
            proprietário) terão o seu acesso ao sistema revogado e todos os
            dados relacionados à essa organização serão apagados{" "}
            <strong>PERMANENTEMENTE</strong> do Banco de Dados. Para confirmar a
            exclusão, digite o nome da organização abaixo ({organizationName}).
          </p>

          <Input
            placeholder={organizationName}
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="text-center"
          />
        </div>

        <DialogFooter className="justify-center gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <DeleteButton
            label="Excluir"
            onClick={handleConfirm}
            disabled={!isConfirmEnabled}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
