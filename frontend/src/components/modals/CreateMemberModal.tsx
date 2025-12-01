import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PasswordInput } from "@/components/ui/password-input";
import { Send } from "lucide-react";
import {
  createMemberSchema,
  type CreateMemberFormValues,
  hierarchyOptions,
} from "./schemas/member.schema";

interface CreateMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (data: CreateMemberFormValues) => void;
}

export function CreateMemberModal({
  open,
  onOpenChange,
  onSave,
}: CreateMemberModalProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateMemberFormValues>({
    resolver: zodResolver(createMemberSchema),
    defaultValues: {
      name: "",
      email: "",
      hierarchy: undefined,
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = (data: CreateMemberFormValues) => {
    onSave?.(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Novo Membro
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
            <Controller
              control={control}
              name="hierarchy"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Nível de Hierarquia" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {hierarchyOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.hierarchy && (
              <p className="text-sm text-red-500">{errors.hierarchy.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input type="email" placeholder="E-mail" {...register("email")} />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <PasswordInput placeholder="Senha" {...register("password")} />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Confirmar Senha"
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
            <Button type="submit" variant="invite">
              <Send className="h-4 w-4 mr-2" />
              Convidar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
