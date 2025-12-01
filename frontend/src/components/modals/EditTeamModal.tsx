import { useState, useMemo, useEffect } from "react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Plus, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { editTeamSchema, type EditTeamFormValues } from "./schemas/team.schema";

interface Member {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
}

interface EditTeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teamName: string;
  currentMembers: Member[];
  availableMembers: Member[];
  onSave?: (data: EditTeamFormValues) => void;
}

export function EditTeamModal({
  open,
  onOpenChange,
  teamName: initialTeamName,
  currentMembers: initialMembers,
  availableMembers: initialAvailable,
  onSave,
}: EditTeamModalProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const allMembers = useMemo(
    () => [...initialMembers, ...initialAvailable],
    [initialMembers, initialAvailable],
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<EditTeamFormValues>({
    resolver: zodResolver(editTeamSchema),
    defaultValues: {
      name: initialTeamName,
      memberIds: initialMembers.map((m) => m.id),
    },
  });

  // Atualizar formulário quando o modal abre ou props mudam
  useEffect(() => {
    if (open) {
      reset({
        name: initialTeamName,
        memberIds: initialMembers.map((m) => m.id),
      });
      setSearchTerm("");
    }
  }, [open, initialTeamName, initialMembers, reset]);

  const selectedIds = watch("memberIds");

  const currentMembersList = useMemo(
    () => allMembers.filter((m) => selectedIds?.includes(m.id)),
    [allMembers, selectedIds],
  );

  const availableMembersList = useMemo(
    () => allMembers.filter((m) => !selectedIds?.includes(m.id)),
    [allMembers, selectedIds],
  );

  const filteredAvailable = availableMembersList.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleRemoveMember = (member: Member) => {
    const newIds = selectedIds.filter((id) => id !== member.id);
    setValue("memberIds", newIds, { shouldValidate: true });
  };

  const handleAddMember = (member: Member) => {
    const newIds = [...(selectedIds || []), member.id];
    setValue("memberIds", newIds, { shouldValidate: true });
  };

  const onSubmit = (data: EditTeamFormValues) => {
    onSave?.(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Editar Time
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Altere o nome e a composição de membros do time de vendas.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 py-4">
            {/* Nome do Time */}
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

            {/* Layout de Duas Colunas */}
            <div className="grid grid-cols-2 gap-6">
              {/* Membros Atuais */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Membros Atuais do Time
                </Label>
                <ScrollArea className="h-[280px] rounded-lg border border-border p-2">
                  <div className="space-y-2">
                    {currentMembersList.length === 0 ? (
                      <p className="text-center text-sm text-muted-foreground py-4">
                        Nenhum membro no time
                      </p>
                    ) : (
                      currentMembersList.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between rounded-md bg-muted/50 p-3"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback
                                style={{ backgroundColor: member.color }}
                                className="text-xs font-medium text-white"
                              >
                                {member.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                {member.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {member.role}
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveMember(member)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-1 text-xs"
                          >
                            <Trash2 className="h-3 w-3" />
                            Remover
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>

              {/* Membros Disponíveis */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Adicionar Novos Membros
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome ou cargo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <ScrollArea className="h-[232px] rounded-lg border border-border p-2">
                  <div className="space-y-2">
                    {filteredAvailable.length === 0 ? (
                      <p className="text-center text-sm text-muted-foreground py-4">
                        Nenhum usuário disponível
                      </p>
                    ) : (
                      filteredAvailable.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between rounded-md bg-muted/30 p-3"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback
                                style={{ backgroundColor: member.color }}
                                className="text-xs font-medium text-white"
                              >
                                {member.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                {member.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {member.role}
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => handleAddMember(member)}
                            className="gap-1 text-xs"
                          >
                            <Plus className="h-3 w-3" />
                            Adicionar
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>
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
            <Button type="submit">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
