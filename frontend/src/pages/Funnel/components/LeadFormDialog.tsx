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
import type {
  Lead,
  Campaign,
  ContactOrigin,
  ColumnId,
} from "../types/kanban.types";
import type { TemperatureVariant } from "@/lib/temperature";

interface LeadFormDialogProps {
  lead: Lead | null; // null for create, Lead for edit
  isOpen: boolean;
  onClose: () => void;
  onSave: (leadData: Partial<Lead>) => void;
  columnId?: ColumnId; // For creating new leads
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

const TEMPERATURES: TemperatureVariant[] = ["Frio", "Morno", "Quente"];

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

export function LeadFormDialog({
  lead,
  isOpen,
  onClose,
  onSave,
  columnId,
}: LeadFormDialogProps) {
  const isEditMode = lead !== null;

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

  const [interestInput, setInterestInput] = useState("");

  // Initialize form data when lead changes
  useEffect(() => {
    if (lead) {
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
        temperature: lead.temperature || "Morno",
        earning: lead.earning?.toString() || "",
        content: lead.content || "",
      });
    } else {
      // Reset for new lead
      setFormData({
        name: "",
        cpf: "",
        email: "",
        phone: "",
        career: "",
        income: "",
        interests: [],
        campaign: "None",
        contactOrigin: "Other",
        temperature: "Morno",
        earning: "",
        content: "",
      });
    }
  }, [lead, isOpen]);

  const handleAddInterest = () => {
    if (
      interestInput.trim() &&
      !formData.interests.includes(interestInput.trim())
    ) {
      setFormData({
        ...formData,
        interests: [...formData.interests, interestInput.trim()],
      });
      setInterestInput("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((i) => i !== interest),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const leadData: Partial<Lead> = {
      name: formData.name,
      cpf: formData.cpf || null,
      email: formData.email || null,
      phone: formData.phone,
      career: formData.career || null,
      income: formData.income ? parseFloat(formData.income) : null,
      interests: formData.interests,
      campaign: formData.campaign,
      contactOrigin: formData.contactOrigin,
      temperature: formData.temperature,
      earning: parseFloat(formData.earning) || 0,
      content: formData.content,
    };

    if (!isEditMode && columnId) {
      leadData.columnId = columnId;
    }

    onSave(leadData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Editar Lead" : "Criar Novo Lead"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold">Informações Pessoais</h3>
            <div className="grid grid-cols-2 gap-4">
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

          {/* Professional Information */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold">Informações Profissionais</h3>
            <div className="grid grid-cols-2 gap-4">
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

          {/* Interests */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold">Interesses</h3>
            <div className="flex gap-2">
              <Select value={interestInput} onValueChange={setInterestInput}>
                <SelectTrigger>
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
              <Button type="button" onClick={handleAddInterest}>
                Adicionar
              </Button>
            </div>
            {formData.interests.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.interests.map((interest) => (
                  <div
                    key={interest}
                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm flex items-center gap-2"
                  >
                    {interest}
                    <button
                      type="button"
                      onClick={() => handleRemoveInterest(interest)}
                      className="hover:text-destructive"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Marketing Information */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold">Origem do Lead</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="campaign">Campanha</Label>
                <Select
                  value={formData.campaign}
                  onValueChange={(value) =>
                    setFormData({ ...formData, campaign: value as Campaign })
                  }
                >
                  <SelectTrigger id="campaign">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CAMPAIGNS.map((campaign) => (
                      <SelectItem key={campaign} value={campaign}>
                        {campaign}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="contactOrigin">Origem do Contato</Label>
                <Select
                  value={formData.contactOrigin}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      contactOrigin: value as ContactOrigin,
                    })
                  }
                >
                  <SelectTrigger id="contactOrigin">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTACT_ORIGINS.map((origin) => (
                      <SelectItem key={origin} value={origin}>
                        {origin}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* Sales Information */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold">Informações de Venda</h3>
            <div className="grid grid-cols-2 gap-4">
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
                  <SelectTrigger id="temperature">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TEMPERATURES.map((temp) => (
                      <SelectItem key={temp} value={temp}>
                        {temp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* Observations */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold">Observações</h3>
            <Textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              placeholder="Notas sobre o lead..."
              rows={3}
            />
          </section>

          <DialogFooter>
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {isEditMode ? "Salvar Alterações" : "Criar Lead"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
