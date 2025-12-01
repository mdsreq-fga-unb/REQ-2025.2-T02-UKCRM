import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Lead, ColumnId } from "../types/kanban.types";
import {
  leadFormSchema,
  type LeadFormValues,
  CAMPAIGNS,
  CONTACT_ORIGINS,
  TEMPERATURES,
} from "../schemas/lead.schema";

interface LeadFormDialogProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (leadData: Partial<Lead>) => void;
  columnId?: ColumnId;
}

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
  const [interestInput, setInterestInput] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
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
    },
  });

  const currentInterests = watch("interests");

  useEffect(() => {
    if (isOpen) {
      if (lead) {
        reset({
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
        reset({
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
    }
  }, [lead, isOpen, reset]);

  const handleAddInterest = () => {
    if (
      interestInput.trim() &&
      !currentInterests.includes(interestInput.trim())
    ) {
      setValue("interests", [...currentInterests, interestInput.trim()]);
      setInterestInput("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setValue(
      "interests",
      currentInterests.filter((i) => i !== interest),
    );
  };

  const onSubmit = (data: LeadFormValues) => {
    const leadData: Partial<Lead> = {
      name: data.name,
      cpf: data.cpf || null,
      email: data.email || null,
      phone: data.phone,
      career: data.career || null,
      income: data.income ? parseFloat(data.income) : null,
      interests: data.interests,
      campaign: data.campaign,
      contactOrigin: data.contactOrigin,
      temperature: data.temperature,
      earning: parseFloat(data.earning) || 0,
      content: data.content,
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Informações Pessoais */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold">Informações Pessoais</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Nome <span className="text-destructive">*</span>
                </Label>
                <Input id="name" {...register("name")} />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  {...register("cpf")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  placeholder="(00) 00000-0000"
                  {...register("phone")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>
          </section>

          {/* Informações Profissionais */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold">Informações Profissionais</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="career">Carreira</Label>
                <Input id="career" {...register("career")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="income">Renda (R$)</Label>
                <Input id="income" type="number" {...register("income")} />
                {errors.income && (
                  <p className="text-sm text-red-500">
                    {errors.income.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Interesses */}
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
            {currentInterests.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {currentInterests.map((interest) => (
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

          {/* Origem do Lead */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold">Origem do Lead</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="campaign">Campanha</Label>
                <Controller
                  control={control}
                  name="campaign"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
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
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactOrigin">Origem do Contato</Label>
                <Controller
                  control={control}
                  name="contactOrigin"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
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
                  )}
                />
              </div>
            </div>
          </section>

          {/* Informações de Venda */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold">Informações de Venda</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="earning">
                  Valor Potencial (R$){" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="earning"
                  type="number"
                  {...register("earning")}
                  required
                />
                {errors.earning && (
                  <p className="text-sm text-red-500">
                    {errors.earning.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="temperature">Temperatura</Label>
                <Controller
                  control={control}
                  name="temperature"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
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
                  )}
                />
              </div>
            </div>
          </section>

          {/* Observações */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold">Observações</h3>
            <Textarea
              placeholder="Notas sobre o lead..."
              rows={3}
              {...register("content")}
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
