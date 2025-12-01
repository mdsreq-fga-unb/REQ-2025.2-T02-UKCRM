import { useState, useEffect } from "react";
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
import { Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreateButton from "@/components/CreateButton";
import {
  createOrganizationSchema,
  type CreateOrganizationFormValues,
} from "./schemas/organization.schema";

interface CreateOrganizationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (data: CreateOrganizationFormValues) => void;
}

export function CreateOrganizationModal({
  open,
  onOpenChange,
  onSave,
}: CreateOrganizationModalProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateOrganizationFormValues>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      nome: "",
      ownerName: "",
      ownerEmail: "",
      ownerPassword: "",
      ownerPasswordConfirm: "",
    },
  });

  // Limpar formulário quando o modal fechar
  useEffect(() => {
    if (!open) {
      reset();
      setLogoPreview(null);
    }
  }, [open, reset]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue("logo", file);
    }
  };

  const onSubmit = (data: CreateOrganizationFormValues) => {
    onSave?.(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Criar Organização
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
          {/* Seção de Dados da Organização */}
          <div className="space-y-4">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">
              Dados da Organização
            </Label>
            <div className="space-y-2">
              <Input placeholder="Nome da Organização" {...register("nome")} />
              {errors.nome && (
                <p className="text-sm text-red-500">{errors.nome.message}</p>
              )}
            </div>

            {/* Upload de Logo */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={logoPreview || ""} />
                  <AvatarFallback className="bg-muted">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                <label htmlFor="logo-upload">
                  <Button variant="outline" asChild className="cursor-pointer">
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      Escolher Logo
                    </span>
                  </Button>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/jpeg,image/png"
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                </label>
              </div>
              <p className="text-xs text-muted-foreground">
                Tamanho máx: 2 MB. Formatos permitidos: JPG e PNG
              </p>
            </div>
          </div>

          {/* Seção de Dados do Proprietário */}
          <div className="space-y-4">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">
              Dados do Proprietário
            </Label>
            <div className="space-y-2">
              <Input placeholder="Nome Completo" {...register("ownerName")} />
              {errors.ownerName && (
                <p className="text-sm text-red-500">
                  {errors.ownerName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="E-mail"
                {...register("ownerEmail")}
              />
              {errors.ownerEmail && (
                <p className="text-sm text-red-500">
                  {errors.ownerEmail.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <PasswordInput
                placeholder="Senha"
                {...register("ownerPassword")}
              />
              {errors.ownerPassword && (
                <p className="text-sm text-red-500">
                  {errors.ownerPassword.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Confirmar Senha"
                {...register("ownerPasswordConfirm")}
              />
              {errors.ownerPasswordConfirm && (
                <p className="text-sm text-red-500">
                  {errors.ownerPasswordConfirm.message}
                </p>
              )}
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
            <CreateButton label="Salvar" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
