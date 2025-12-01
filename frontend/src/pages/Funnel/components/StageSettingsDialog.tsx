"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Trash2 } from "lucide-react";

type StageSettingsDialogProps = {
  open: boolean;
  stageName: string;
  stageId: number;
  visibleToSdr: boolean;
  visibleToCloser: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSaveVisibility: (stageId: number, visibility: { visible_to_sdr: boolean; visible_to_closer: boolean }) => void;
  onDelete: (stageId: number) => void;
  isPending?: boolean;
};

export function StageSettingsDialog({
  open,
  stageName,
  stageId,
  visibleToSdr,
  visibleToCloser,
  onOpenChange,
  onSaveVisibility,
  onDelete,
  isPending,
}: StageSettingsDialogProps) {
  const [localVisibleToSdr, setLocalVisibleToSdr] = useState(visibleToSdr);
  const [localVisibleToCloser, setLocalVisibleToCloser] = useState(visibleToCloser);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Update local state when props change
  useState(() => {
    setLocalVisibleToSdr(visibleToSdr);
    setLocalVisibleToCloser(visibleToCloser);
  });

  const handleSave = () => {
    onSaveVisibility(stageId, {
      visible_to_sdr: localVisibleToSdr,
      visible_to_closer: localVisibleToCloser,
    });
    onOpenChange(false);
  };

  const handleDelete = () => {
    onDelete(stageId);
    setShowDeleteConfirm(false);
    onOpenChange(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setShowDeleteConfirm(false);
      // Reset to props values when closing
      setLocalVisibleToSdr(visibleToSdr);
      setLocalVisibleToCloser(visibleToCloser);
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configurações da Etapa</DialogTitle>
          <DialogDescription>{stageName}</DialogDescription>
        </DialogHeader>

        {!showDeleteConfirm ? (
          <>
            <div className="space-y-4 py-4">
              <div className="space-y-3">
                <Label className="text-base font-semibold">Visibilidade</Label>
                <p className="text-sm text-muted-foreground">
                  Controle quem pode visualizar esta etapa no funil
                </p>

                <div className="space-y-3 mt-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="sdr"
                      checked={localVisibleToSdr}
                      onCheckedChange={(checked) => setLocalVisibleToSdr(checked === true)}
                      disabled={isPending}
                    />
                    <Label htmlFor="sdr" className="font-normal cursor-pointer">
                      Visível para SDR
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="closer"
                      checked={localVisibleToCloser}
                      onCheckedChange={(checked) => setLocalVisibleToCloser(checked === true)}
                      disabled={isPending}
                    />
                    <Label htmlFor="closer" className="font-normal cursor-pointer">
                      Visível para Closer
                    </Label>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Label className="text-base font-semibold text-destructive">Zona de Perigo</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Ações irreversíveis
                </p>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={isPending}
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Deletar Etapa
                </Button>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={() => handleOpenChange(false)}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={isPending}>
                {isPending ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div className="py-6">
              <p className="text-center text-muted-foreground">
                Tem certeza que deseja deletar a etapa <strong>{stageName}</strong>?
              </p>
              <p className="text-center text-sm text-destructive mt-2">
                Todos os leads nesta etapa também serão deletados. Esta ação não pode ser desfeita.
              </p>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isPending}
              >
                {isPending ? "Deletando..." : "Deletar"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
