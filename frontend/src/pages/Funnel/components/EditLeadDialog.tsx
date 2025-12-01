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
import type { Lead, Campaign, ContactOrigin } from "../types/kanban.types";
import {
  leadFormSchema,
  type LeadFormValues,
  CAMPAIGNS,
  CONTACT_ORIGINS,
  TEMPERATURES,
} from "../schemas/lead.schema";

// TemperatureVariant is exported from schemas/lead.schema implicitly via TEMPERATURES const if needed,
// but here we use the type from kanban.types or infer from schema.
type TemperatureVariant = (typeof TEMPERATURES)[number];

export interface EditLeadFormValues {
  name: string;
  phone: string;
  interests: string[];
  campaign: Campaign;
  contactOrigin: ContactOrigin;
  temperature: TemperatureVariant;
  content: string;
  income: number;
  earning: number;
  cpf: string | null;
  email: string | null;
  career: string | null;
}

interface EditLeadDialogProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  lead: Lead | null;
  onSubmit: (values: EditLeadFormValues) => void;
  isPending?: boolean;
  readOnly?: boolean;
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

export function EditLeadDialog({
  open,
  onOpenChange,
  lead,
  onSubmit,
  isPending,
  readOnly,
}: EditLeadDialogProps) {
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
    if (lead && open) {
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
        temperature: (lead.temperature as TemperatureVariant) || "Morno",
        earning: lead.earning?.toString() || "",
        content: lead.content || "",
      });
    } else if (!open) {
      setInterestInput("");
    }
  }, [lead, open, reset]);

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

  const onFormSubmit = (data: LeadFormValues) => {
    const formattedValues: EditLeadFormValues = {
      name: data.name,
      phone: data.phone || "",
      interests: data.interests,
      campaign: data.campaign as Campaign,
      contactOrigin: data.contactOrigin as ContactOrigin,
      temperature: data.temperature as TemperatureVariant,
      content: data.content || "",
      income: data.income ? parseFloat(data.income) : 0,
      earning: data.earning ? parseFloat(data.earning) : 0,
      cpf: data.cpf || null,
      email: data.email || null,
      career: data.career || null,
    };

    onSubmit(formattedValues);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <div className="max-h-[90vh] overflow-y-auto p-6">
          <DialogHeader>
            <DialogTitle>
              {readOnly ? "Detalhes do Lead" : "Editar Lead"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            {/* Informações Pessoais */}
            <section className="space-y-4">
              <h3 className="text-sm font-semibold border-b pb-1">
                Informações Pessoais
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Nome <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    {...register("name")}
                    required
                    disabled={readOnly}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    placeholder="000.000.000-00"
                    {...register("cpf")}
                    disabled={readOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    placeholder="(00) 00000-0000"
                    {...register("phone")}
                    disabled={readOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    disabled={readOnly}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Informações Profissionais */}
            <section className="space-y-4">
              <h3 className="text-sm font-semibold border-b pb-1">
                Informações Profissionais
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="career">Carreira</Label>
                  <Input
                    id="career"
                    {...register("career")}
                    disabled={readOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="income">Renda (R$)</Label>
                  <Input
                    id="income"
                    type="number"
                    {...register("income")}
                    disabled={readOnly}
                  />
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
              <h3 className="text-sm font-semibold border-b pb-1">
                Interesses
              </h3>
              <div className="flex gap-2">
                <Select
                  value={interestInput}
                  onValueChange={setInterestInput}
                  disabled={readOnly}
                >
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
                  disabled={readOnly}
                >
                  Adicionar
                </Button>
              </div>

              {currentInterests.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentInterests.map((interest) => (
                    <div
                      key={interest}
                      className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm flex items-center gap-2"
                    >
                      {interest}
                      {!readOnly && (
                        <button
                          type="button"
                          onClick={() => handleRemoveInterest(interest)}
                          className="hover:text-destructive font-bold"
                        >
                          ×
                        </button>
                      )}
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
                <div className="space-y-2">
                  <Label htmlFor="campaign">Campanha</Label>
                  <Controller
                    control={control}
                    name="campaign"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={readOnly}
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
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactOrigin">Origem</Label>
                  <Controller
                    control={control}
                    name="contactOrigin"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={readOnly}
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
                    )}
                  />
                </div>

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
                    disabled={readOnly}
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={readOnly}
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
                    )}
                  />
                </div>
              </div>
            </section>

            {/* Observações */}
            <section className="space-y-4">
              <Label htmlFor="content" className="text-sm font-semibold">
                Observações
              </Label>
              <Textarea
                id="content"
                {...register("content")}
                placeholder="Notas sobre o lead..."
                rows={3}
                disabled={readOnly}
              />
            </section>

            <DialogFooter>
              {readOnly ? (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => onOpenChange(false)}
                >
                  Fechar
                </Button>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => onOpenChange(false)}
                    disabled={isPending}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Salvando..." : "Salvar Alterações"}
                  </Button>
                </>
              )}
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
