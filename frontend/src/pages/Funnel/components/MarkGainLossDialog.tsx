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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import type { Lead } from "../types/kanban.types";

interface MarkGainLossDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: Lead | null;
  onSubmit: (status: "Gained" | "Lost", value: number, reason?: string) => void;
  isPending?: boolean;
}

export function MarkGainLossDialog({
  open,
  onOpenChange,
  lead,
  onSubmit,
  isPending,
}: MarkGainLossDialogProps) {
  const [status, setStatus] = useState<"Gained" | "Lost">("Gained");
  const [value, setValue] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  useEffect(() => {
    if (open && lead) {
      setStatus("Gained");
      setValue(lead.earning.toString());
      setReason("");
    }
  }, [open, lead]);

  const handleSubmit = () => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue >= 0) {
      onSubmit(status, numericValue, reason || undefined);
    }
  };

  const isValid = value && !isNaN(parseFloat(value)) && parseFloat(value) >= 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Marcar Ganho/Perda</DialogTitle>
          <DialogDescription>
            Registre o resultado da negociação com {lead?.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Status</Label>
            <RadioGroup
              value={status}
              onValueChange={(val) => setStatus(val as "Gained" | "Lost")}
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

          <div className="space-y-2">
            <Label htmlFor="value">Valor (R$)</Label>
            <Input
              id="value"
              type="number"
              min="0"
              step="0.01"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Motivo (opcional)</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Descreva o motivo do ganho ou perda..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid || isPending}>
            {isPending ? "Salvando..." : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
