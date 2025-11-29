import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteTeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teamName: string;
  onConfirm?: () => void;
}

export function DeleteTeamModal({
  open,
  onOpenChange,
  teamName,
  onConfirm,
}: DeleteTeamModalProps) {
  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Excluir Time
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Warning Icon */}
          <div className="flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-warning/20">
              <AlertTriangle className="h-7 w-7 text-warning" />
            </div>
          </div>

          {/* Warning Text */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Você tem certeza que deseja excluir o "{teamName}"?
              <br />
              Esta ação não poderá ser desfeita.
            </p>
          </div>
        </div>

        <DialogFooter className="justify-center gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Sim, Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
