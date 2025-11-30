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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Imports de tipos - ajuste os caminhos conforme sua estrutura real
import type { Lead, Campaign, ContactOrigin } from "../types/kanban.types";
// Se TemperatureVariant não existir, defina localmente ou importe
type TemperatureVariant = "Frio" | "Morno" | "Quente" | "Neutro";

// Interfaces adaptadas para o código atual
interface EditLeadDialogProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  lead: Lead | null;
  onSubmit: (values: any) => void; // Aceita any aqui para flexibilidade com o novo formato
  isPending?: boolean;
}

const CAMPAIGNS: Campaign[] = [
  "Summer Sale 2025",
  "Black Friday 2024",
  "Product Launch",
  "Retargeting",
  "LinkedIn Ads",
  "Google Ads",
  "Organic",
  "None",
];

const CONTACT_ORIGINS: ContactOrigin[] = [
  "Website",
  "Social Media",
  "Referral",
  "Cold Call",
  "Email Campaign",
  "Event",
  "Other",
];

const TEMPERATURES: TemperatureVariant[] = [
  "Frio",
  "Morno",
  "Quente",
  "Neutro",
];

const INTEREST_OPTIONS = [
  "Technology",
  "AI",
  "Cloud Computing",
  "Marketing",
  "Sales",
  "Business Strategy",
  "Enterprise Software",
  "SaaS",
  "Digital Transformation",
  "Business Growth",
  "Team Management",
  "CRM",
  "Startup Scaling",
  "Investment",
  "Innovation",
];

export function EditLeadDialog({
  open,
  onOpenChange,
  lead,
  onSubmit,
  isPending,
}: EditLeadDialogProps) {
  const [interestInput, setInterestInput] = useState("");

  // Estado inicial do formulário
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    email: "",
    phone: "",
    career: "",
    income: "",
    interests: [] as string[],
    campaign: "None" as Campaign,
    contactOrigin: "Other" as ContactOrigin,
    temperature: "Morno" as TemperatureVariant,
    earning: "",
    content: "",
  });

  // Popula o formulário quando o modal abre ou o lead muda
  useEffect(() => {
    if (lead && open) {
      setFormData({
        name: lead.name || "",
        cpf: lead.cpf || "",
        email: lead.email || "",
        phone: lead.phone || "",
        career: lead.career || "",
        income: lead.income?.toString() || "",
        interests: lead.interests || [],
        campaign: lead.campaign || "None",
        contactOrigin: lead.contactOrigin || "Other",
        temperature: (lead.temperature as TemperatureVariant) || "Morno",
        earning: lead.earning?.toString() || "",
        content: lead.content || "", // Observações
      });
    } else if (!open) {
      // Opcional: Limpar formulário ao fechar
      setInterestInput("");
    }
  }, [lead, open]);

  const handleAddInterest = () => {
    if (
      interestInput.trim() &&
      !formData.interests.includes(interestInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, interestInput.trim()],
      }));
      setInterestInput("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedValues = {
      ...formData,
      // Converte strings numéricas para números reais
      income: formData.income ? parseFloat(formData.income) : 0,
      earning: formData.earning ? parseFloat(formData.earning) : 0,
      // Garante campos nulos se vazios
      cpf: formData.cpf || null,
      email: formData.email || null,
      career: formData.career || null,
    };

    onSubmit(formattedValues);
    // Nota: Não fechamos o modal aqui (onOpenChange(false)) pois geralmente esperamos a Promise do isPending resolver no pai
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <div className="max-h-[90vh] overflow-y-auto p-6">
          <DialogHeader>
            <DialogTitle>Editar Lead</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações Pessoais */}
            <section className="space-y-4">
              <h3 className="text-sm font-semibold border-b pb-1">
                Informações Pessoais
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">
                    Nome <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    value={formData.cpf}
                    onChange={(e) =>
                      setFormData({ ...formData, cpf: e.target.value })
                    }
                    placeholder="000.000.000-00"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
            </section>

            {/* Informações Profissionais */}
            <section className="space-y-4">
              <h3 className="text-sm font-semibold border-b pb-1">
                Informações Profissionais
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="career">Carreira</Label>
                  <Input
                    id="career"
                    value={formData.career}
                    onChange={(e) =>
                      setFormData({ ...formData, career: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="income">Renda (R$)</Label>
                  <Input
                    id="income"
                    type="number"
                    value={formData.income}
                    onChange={(e) =>
                      setFormData({ ...formData, income: e.target.value })
                    }
                  />
                </div>
              </div>
            </section>

            {/* Interesses */}
            <section className="space-y-4">
              <h3 className="text-sm font-semibold border-b pb-1">
                Interesses
              </h3>
              <div className="flex gap-2">
                <Select value={interestInput} onValueChange={setInterestInput}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um interesse" />
                  </SelectTrigger>
                  <SelectContent>
                    {INTEREST_OPTIONS.map((interest) => (
                      <SelectItem key={interest} value={interest}>
                        {interest}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  onClick={handleAddInterest}
                  variant="secondary"
                >
                  Adicionar
                </Button>
              </div>

              {formData.interests.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.interests.map((interest) => (
                    <div
                      key={interest}
                      className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm flex items-center gap-2"
                    >
                      {interest}
                      <button
                        type="button"
                        onClick={() => handleRemoveInterest(interest)}
                        className="hover:text-destructive font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Origem e Vendas */}
            <section className="space-y-4">
              <h3 className="text-sm font-semibold border-b pb-1">
                Detalhes da Venda
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="campaign">Campanha</Label>
                  <Select
                    value={formData.campaign}
                    onValueChange={(value) =>
                      setFormData({ ...formData, campaign: value as Campaign })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CAMPAIGNS.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="origin">Origem</Label>
                  <Select
                    value={formData.contactOrigin}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        contactOrigin: value as ContactOrigin,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CONTACT_ORIGINS.map((o) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="earning">
                    Valor Potencial (R$){" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="earning"
                    type="number"
                    value={formData.earning}
                    onChange={(e) =>
                      setFormData({ ...formData, earning: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="temperature">Temperatura</Label>
                  <Select
                    value={formData.temperature}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        temperature: value as TemperatureVariant,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TEMPERATURES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* Observações */}
            <section className="space-y-4">
              <Label htmlFor="obs" className="text-sm font-semibold">
                Observações
              </Label>
              <Textarea
                id="obs"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Notas sobre o lead..."
                rows={3}
              />
            </section>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
