import { useState, useEffect } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, Save } from "lucide-react";

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

interface EditOrganizationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organization: OrganizationDetails | null;
  availableMembers?: Member[];
  onSave?: (data: EditOrganizationFormData) => void;
}

export interface EditOrganizationFormData {
  id: number;
  name: string;
  logo?: File;
  ownerName: string;
  ownerPassword?: string;
}

export function EditOrganizationModal({
  open,
  onOpenChange,
  organization,
  availableMembers = [],
  onSave,
}: EditOrganizationModalProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    ownerName: "",
    ownerPassword: "",
  });
  const [members, setMembers] = useState<Member[]>([]);

  // Reset state when modal opens or organization changes
  useEffect(() => {
    if (open && organization) {
      setFormData({
        name: organization.name,
        ownerName: organization.ownerName,
        ownerPassword: "",
      });
      setLogoPreview(organization.logo || null);
      setMembers(organization.members || []);
    }
  }, [open, organization]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!organization) return;

    const submitData: EditOrganizationFormData = {
      id: organization.id,
      name: formData.name,
      ownerName: formData.ownerName,
    };

    if (formData.ownerPassword) {
      submitData.ownerPassword = formData.ownerPassword;
    }

    onSave?.(submitData);
    onOpenChange(false);
  };

  if (!organization) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Editar Organização
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Altere as informações da organização e gerencie seus membros.
          </p>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-180px)] pr-4">
          <div className="space-y-6 py-4">
            {/* Organization Data Section */}
            <div className="space-y-4">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">
                Dados da Organização
              </Label>
              <Input
                placeholder="Nome da Organização"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
              />

              {/* Logo Upload */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={logoPreview || ""} />
                    <AvatarFallback className="bg-muted text-lg">
                      {formData.name.substring(0, 2).toUpperCase() || "OR"}
                    </AvatarFallback>
                  </Avatar>
                  <label htmlFor="logo-upload">
                    <Button variant="outline" asChild className="cursor-pointer">
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

            {/* Owner Data Section */}
            <div className="space-y-4">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">
                Dados do Proprietário
              </Label>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Nome Completo</Label>
                  <Input
                    placeholder="Nome Completo"
                    value={formData.ownerName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        ownerName: e.target.value,
                      }))
                    }
                  />
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
                    value={formData.ownerPassword}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        ownerPassword: e.target.value,
                      }))
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Preencha apenas se desejar alterar a senha
                  </p>
                </div>
              </div>
            </div>

            {/* Members Section */}
            <div className="space-y-4">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">
                Membros da Organização
              </Label>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Membros Atuais</Label>
                <ScrollArea className="h-[280px] rounded-lg border border-border p-2">
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
                </ScrollArea>
                <p className="text-xs text-muted-foreground">
                  Para adicionar ou remover membros, use a página de Gestão de Membros
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4" />
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
