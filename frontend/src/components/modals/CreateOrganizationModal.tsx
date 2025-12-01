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
import { Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreateButton from "@/components/CreateButton";

interface CreateOrganizationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (data: OrganizationFormData) => void;
}

interface OrganizationFormData {
  nome: string;
  logo?: File;
  proprietario: {
    nome: string;
    email: string;
    senha: string;
  };
}

export function CreateOrganizationModal({
  open,
  onOpenChange,
  onSave,
}: CreateOrganizationModalProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<OrganizationFormData>({
    nome: "",
    proprietario: { nome: "", email: "", senha: "" },
  });

  // Limpar formulário quando o modal fechar
  useEffect(() => {
    if (!open) {
      setFormData({
        nome: "",
        proprietario: { nome: "", email: "", senha: "" },
      });
      setLogoPreview(null);
    }
  }, [open]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFormData((prev) => ({ ...prev, logo: file }));
    }
  };

  const handleSave = () => {
    onSave?.(formData);
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

        <div className="space-y-6 py-4">
          {/* Organization Data Section */}
          <div className="space-y-4">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">
              Dados da Organização
            </Label>
            <Input
              placeholder="Nome da Organização"
              value={formData.nome}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, nome: e.target.value }))
              }
            />

            {/* Logo Upload */}
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

          {/* Owner Data Section */}
          <div className="space-y-4">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">
              Dados do Proprietário
            </Label>
            <Input
              placeholder="Nome Completo"
              value={formData.proprietario.nome}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  proprietario: { ...prev.proprietario, nome: e.target.value },
                }))
              }
            />
            <Input
              type="email"
              placeholder="E-mail"
              value={formData.proprietario.email}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  proprietario: { ...prev.proprietario, email: e.target.value },
                }))
              }
            />
            <PasswordInput
              placeholder="Senha"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  proprietario: { ...prev.proprietario, senha: e.target.value },
                }))
              }
            />
            <Input type="password" placeholder="Confirmar Senha" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <CreateButton label="Salvar" onClick={handleSave} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
