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
import { PasswordInput } from "@/components/ui/password-input";
import {
  editMemberSchema,
  type EditMemberFormValues,
} from "./schemas/member.schema";

interface Member {
  id: number;
  nome: string;
  email?: string;
  hierarquia: string;
}

interface EditMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: Member | null;
  onSave?: (data: EditMemberFormValues) => void;
}

export function EditMemberModal({
  open,
  onOpenChange,
  member,
  onSave,
}: EditMemberModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditMemberFormValues>({
    resolver: zodResolver(editMemberSchema),
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (open && member) {
      reset({
        name: member.nome,
        password: "",
        confirmPassword: "",
      });
    }
  }, [open, member, reset]);

  const onSubmit = (data: EditMemberFormValues) => {
    onSave?.(data);
    onOpenChange(false);
  };

  if (!member) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Editar Membro
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <Label className="text-muted-foreground text-xs uppercase tracking-wide">
            Dados do Membro
          </Label>

          <div className="space-y-2">
            <Input placeholder="Nome Completo" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              type="email"
              placeholder="E-mail"
              value={member.email || ""}
              disabled
              className="bg-muted cursor-not-allowed"
            />
          </div>

          <Label className="text-muted-foreground text-xs uppercase tracking-wide">
            Alterar Senha (Opcional)
          </Label>

          <div className="space-y-2">
            <PasswordInput placeholder="Nova Senha" {...register("password")} />
            <p className="text-xs text-muted-foreground">
              Deixe em branco para manter a senha atual.
            </p>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Confirmar Nova Senha"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
