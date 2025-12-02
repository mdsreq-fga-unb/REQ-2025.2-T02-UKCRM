import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

import CreateButton from "@/components/CreateButton";
import {
  createTeamSchema,
  type CreateTeamFormValues,
} from "./schemas/team.schema";

interface Member {
  id: string;
  name: string;
  role: string;
  photo?: string | null;
  initials: string;
  color: string;
}

interface CreateTeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableMembers: Member[];
  onSave?: (data: CreateTeamFormValues) => void;
}

export function CreateTeamModal({
  open,
  onOpenChange,
  availableMembers,
  onSave,
}: CreateTeamModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<CreateTeamFormValues>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      name: "",
      memberIds: [],
    },
  });

  const selectedIds = watch("memberIds");

  // Limpar formulário quando o modal fechar
  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const toggleMember = (memberId: string) => {
    const currentIds = selectedIds || [];
    const newIds = currentIds.includes(memberId)
      ? currentIds.filter((id) => id !== memberId)
      : [...currentIds, memberId];
    setValue("memberIds", newIds, { shouldValidate: true });
  };

  const onSubmit = (data: CreateTeamFormValues) => {
    onSave?.(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Criar Novo Time
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Defina o nome e selecione os membros para o novo time de vendas.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nome do Time</Label>
              <Input
                placeholder="Ex: Time de Vendas - Sudeste"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Membros do Time</Label>
              <ScrollArea className="h-[280px] rounded-lg border border-border">
                <div className="p-2 space-y-1">
                  {availableMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between rounded-md p-3 hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={member.photo || ""} alt={member.name} />
                          <AvatarFallback
                            style={{ backgroundColor: member.color }}
                            className="text-xs font-medium text-white"
                          >
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {member.role}
                          </p>
                        </div>
                      </div>
                      <Checkbox
                        checked={selectedIds?.includes(member.id)}
                        onCheckedChange={() => toggleMember(member.id)}
                      />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <CreateButton label="Salvar Time" disabled={!isValid} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
