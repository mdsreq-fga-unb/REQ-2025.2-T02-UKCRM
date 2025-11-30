import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, AlertTriangle } from "lucide-react";

interface Member {
  id: string;
  name: string;
}

interface DeleteMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberName: string;
  availableMembers: Member[];
  onConfirm?: (action: string, targetMemberId?: string) => void;
}

export function DeleteMemberModal({
  open,
  onOpenChange,
  memberName,
  availableMembers,
  onConfirm,
}: DeleteMemberModalProps) {
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [targetMember, setTargetMember] = useState<string>("");

  const isConfirmEnabled =
    selectedAction === "delete" ||
    selectedAction === "hold" ||
    (selectedAction === "reallocate" && targetMember);

  const handleConfirm = () => {
    if (isConfirmEnabled) {
      onConfirm?.(selectedAction, targetMember);
      onOpenChange(false);
      setSelectedAction("");
      setTargetMember("");
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setSelectedAction("");
    setTargetMember("");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Excluir Membro
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Warning Icon */}
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/20">
              <AlertTriangle className="h-6 w-6 text-warning" />
            </div>
          </div>

          {/* Warning Text */}
          <div className="text-center">
            <p className="text-lg font-semibold text-destructive mb-2">Aviso!</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A exclusão de um membro é uma ação <strong>IRREVERSÍVEL</strong> que requer uma
              decisão sobre o destino dos dados de negócios associados a ele,
              principalmente os leads sob sua responsabilidade.
            </p>
          </div>

          {/* Radio Group */}
          <RadioGroup
            value={selectedAction}
            onValueChange={setSelectedAction}
            className="space-y-3"
          >
            {/* Option 1: Reallocate */}
            <div className="flex items-center space-x-3 rounded-md border border-border p-3">
              <RadioGroupItem value="reallocate" id="reallocate" />
              <Label
                htmlFor="reallocate"
                className="flex-1 cursor-pointer flex items-center justify-between"
              >
                <span className="text-sm">Realocar os Leads para</span>
                <Select
                  value={targetMember}
                  onValueChange={setTargetMember}
                  disabled={selectedAction !== "reallocate"}
                >
                  <SelectTrigger className="w-[160px] h-8">
                    <SelectValue placeholder="Selecionar..." />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {availableMembers.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Label>
            </div>

            {/* Option 2: Delete */}
            <div className="flex items-center space-x-3 rounded-md border border-border p-3">
              <RadioGroupItem value="delete" id="delete" />
              <Label htmlFor="delete" className="flex-1 cursor-pointer text-sm">
                Excluir os Leads do Usuário
              </Label>
            </div>

            {/* Option 3: Hold */}
            <div className="flex items-center space-x-3 rounded-md border border-border p-3">
              <RadioGroupItem value="hold" id="hold" />
              <Label htmlFor="hold" className="flex-1 cursor-pointer text-sm">
                Deixar os Leads "Em Espera"
              </Label>
            </div>
          </RadioGroup>
        </div>

        <DialogFooter className="justify-center gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={!isConfirmEnabled}
          >
            <X className="h-4 w-4" />
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
