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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Lead } from "../types/kanban.types";

interface GainLossDialogProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    leadId: number | string,
    status: "Gained" | "Lost",
    value: number,
    reason: string,
  ) => void;
}

export function GainLossDialog({
  lead,
  isOpen,
  onClose,
  onSubmit,
}: GainLossDialogProps) {
  const [status, setStatus] = useState<"Gained" | "Lost">("Gained");
  const [value, setValue] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (lead) {
      // Pre-fill with current values if already marked
      if (lead.status === "Gained" || lead.status === "Lost") {
        setStatus(lead.status);
        setValue(lead.gainLossValue?.toString() || "");
        setReason(lead.gainLossReason || "");
      } else {
        // Default for new gain/loss
        setStatus("Gained");
        setValue(lead.earning?.toString() || "");
        setReason("");
      }
    }
  }, [lead, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lead) {
      onSubmit(lead.id, status, parseFloat(value) || 0, reason);
      onClose();
    }
  };

  if (!lead) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Resultado da Negociação</DialogTitle>
          <DialogDescription>
            Marque o lead "{lead.name}" como Ganho ou Perdido e registre os
            detalhes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div>
            <Label>Status da Negociação</Label>
            <RadioGroup
              value={status}
              onValueChange={(value) => setStatus(value as "Gained" | "Lost")}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Gained" id="gained" />
                <Label htmlFor="gained" className="font-normal cursor-pointer">
                  Ganho
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Lost" id="lost" />
                <Label htmlFor="lost" className="font-normal cursor-pointer">
                  Perdido
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="value">
              Valor (R$) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="value"
              type="number"
              step="0.01"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={status === "Lost" ? "0" : "Valor do contrato"}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              {status === "Gained"
                ? "Informe o valor total do contrato fechado"
                : "Normalmente 0 para negociações perdidas"}
            </p>
          </div>

          <div>
            <Label htmlFor="reason">Motivo / Observações</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={
                status === "Gained"
                  ? "Ex: Cliente fechou contrato anual completo"
                  : "Ex: Não tinha budget aprovado para este ano"
              }
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant={status === "Gained" ? "default" : "destructive"}
            >
              Marcar como {status === "Gained" ? "Ganho" : "Perdido"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
