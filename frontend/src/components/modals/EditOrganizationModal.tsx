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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Save } from "lucide-react";
import {
  editOrganizationSchema,
  type EditOrganizationFormValues,
} from "./schemas/organization.schema";

interface Member {
  id: number;
  name: string;
  email: string;
  role: string;
  initials: string;
  color: string;
  organizationId?: number;
}

interface OrganizationDetails {
  id: number;
  name: string;
  logo?: string;
  ownerName: string;
  ownerEmail: string;
  members: Member[];
}

export interface EditOrganizationFormData extends EditOrganizationFormValues {
  id: number;
  logo?: File;
}

interface EditOrganizationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organization: OrganizationDetails | null;
  availableMembers?: Member[];
  onSave?: (data: EditOrganizationFormData) => void;
}

export function EditOrganizationModal({
  open,
  onOpenChange,
  organization,
  onSave,
}: EditOrganizationModalProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [members, setMembers] = useState<Member[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EditOrganizationFormValues>({
    resolver: zodResolver(editOrganizationSchema),
    defaultValues: {
      name: "",
      ownerName: "",
      ownerPassword: "",
    },
  });

  // Resetar estado quando o modal abre ou a organização muda
  useEffect(() => {
    if (open && organization) {
      reset({
        name: organization.name,
        ownerName: organization.ownerName,
        ownerPassword: "",
      });
      setLogoPreview(organization.logo || null);
      setMembers(organization.members || []);
    }
  }, [open, organization, reset]);

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

  const onSubmit = (data: EditOrganizationFormValues) => {
    if (!organization) return;

    onSave?.({
      ...data,
      id: organization.id,
    });
    onOpenChange(false);
  };

  if (!organization) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Editar Organização
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Altere as informações da organização e gerencie seus membros.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col overflow-hidden">
          <div className="overflow-y-auto pr-4 flex-1">
            <div className="space-y-6 py-4">
              {/* Seção de Dados da Organização */}
              <div className="space-y-4">
                <Label className="text-muted-foreground text-xs uppercase tracking-wide">
                  Dados da Organização
                </Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Nome da Organização"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Upload de Logo */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={logoPreview || ""} />
                      <AvatarFallback className="bg-muted text-lg">
                        {organization.name.substring(0, 2).toUpperCase() ||
                          "OR"}
                      </AvatarFallback>
                    </Avatar>
                    <label htmlFor="logo-upload">
                      <Button
                        type="button"
                        variant="outline"
                        asChild
                        className="cursor-pointer"
                      >
                        <span>
                          <Upload className="h-4 w-4 mr-2" />
                          Alterar Logo
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
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Nome Completo</Label>
                    <Input
                      placeholder="Nome Completo"
                      {...register("ownerName")}
                    />
                    {errors.ownerName && (
                      <p className="text-sm text-red-500">
                        {errors.ownerName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>E-mail</Label>
                    <Input
                      type="email"
                      value={organization.ownerEmail}
                      disabled
                      className="bg-muted cursor-not-allowed"
                    />
                    <p className="text-xs text-muted-foreground">
                      O e-mail do proprietário não pode ser alterado
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Nova Senha (opcional)</Label>
                    <PasswordInput
                      placeholder="Deixe em branco para manter a senha atual"
                      {...register("ownerPassword")}
                    />
                    <p className="text-xs text-muted-foreground">
                      Preencha apenas se desejar alterar a senha
                    </p>
                    {errors.ownerPassword && (
                      <p className="text-sm text-red-500">
                        {errors.ownerPassword.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Seção de Membros */}
              <div className="space-y-4">
                <Label className="text-muted-foreground text-xs uppercase tracking-wide">
                  Membros da Organização
                </Label>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Membros Atuais</Label>
                  <div className="h-[280px] rounded-lg border border-border p-2 overflow-y-auto">
                    <div className="space-y-2">
                      {members.length === 0 ? (
                        <p className="text-center text-sm text-muted-foreground py-4">
                          Nenhum membro na organização
                        </p>
                      ) : (
                        members.map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center gap-3 rounded-md bg-muted/50 p-3"
                          >
                            <Avatar className="h-9 w-9">
                              <AvatarFallback
                                style={{ backgroundColor: member.color }}
                                className="text-xs font-medium text-white"
                              >
                                {member.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm font-medium">
                                {member.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {member.email} • {member.role}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Para adicionar ou remover membros, use a página de Gestão de
                    Membros
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4" />
              Salvar Alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
