import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { TemperatureBadge } from "@/components/TemperatureBadge";
import type { Lead } from "../types/kanban.types";

interface LeadDetailDialogProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LeadDetailDialog({
  lead,
  isOpen,
  onClose,
}: LeadDetailDialogProps) {
  if (!lead) return null;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {lead.name}
            <TemperatureBadge variant={lead.temperature}>
              {lead.temperature}
            </TemperatureBadge>
            {lead.status && (
              <Badge
                variant={
                  lead.status === "Gained"
                    ? "default"
                    : lead.status === "Lost"
                    ? "destructive"
                    : "secondary"
                }
              >
                {lead.status === "Gained"
                  ? "Ganho"
                  : lead.status === "Lost"
                  ? "Perdido"
                  : "Ativo"}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6">
          {/* Personal Information */}
          <section>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
              Informações Pessoais
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Nome</p>
                <p className="font-medium">{lead.name}</p>
              </div>
              {lead.cpf && (
                <div>
                  <p className="text-xs text-muted-foreground">CPF</p>
                  <p className="font-medium">{lead.cpf}</p>
                </div>
              )}
              {lead.phone && (
                <div>
                  <p className="text-xs text-muted-foreground">Telefone</p>
                  <p className="font-medium">{lead.phone}</p>
                </div>
              )}
              {lead.email && (
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium">{lead.email}</p>
                </div>
              )}
            </div>
          </section>

          {/* Professional Information */}
          {(lead.career || lead.income) && (
            <section>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
                Informações Profissionais
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {lead.career && (
                  <div>
                    <p className="text-xs text-muted-foreground">Carreira</p>
                    <p className="font-medium">{lead.career}</p>
                  </div>
                )}
                {lead.income && (
                  <div>
                    <p className="text-xs text-muted-foreground">Renda</p>
                    <p className="font-medium">{formatCurrency(lead.income)}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Interests */}
          {lead.interests && lead.interests.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
                Interesses
              </h3>
              <div className="flex flex-wrap gap-2">
                {lead.interests.map((interest, index) => (
                  <Badge key={index} variant="outline">
                    {interest}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          {/* Marketing Information */}
          <section>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
              Origem do Lead
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {lead.campaign && (
                <div>
                  <p className="text-xs text-muted-foreground">Campanha</p>
                  <p className="font-medium">{lead.campaign}</p>
                </div>
              )}
              {lead.contactOrigin && (
                <div>
                  <p className="text-xs text-muted-foreground">
                    Origem do Contato
                  </p>
                  <p className="font-medium">{lead.contactOrigin}</p>
                </div>
              )}
            </div>
          </section>

          {/* Sales Information */}
          <section>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
              Informações de Venda
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">
                  Valor Potencial
                </p>
                <p className="font-medium text-lg">
                  {formatCurrency(lead.earning)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Temperatura</p>
                <TemperatureBadge variant={lead.temperature}>
                  {lead.temperature}
                </TemperatureBadge>
              </div>
              {lead.assignedTo && (
                <div>
                  <p className="text-xs text-muted-foreground">Atribuído a</p>
                  <p className="font-medium">Membro #{lead.assignedTo}</p>
                </div>
              )}
            </div>
          </section>

          {/* Gain/Loss Information */}
          {(lead.status === "Gained" || lead.status === "Lost") && (
            <section>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
                Resultado da Negociação
              </h3>
              <div className="grid gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Badge
                    variant={
                      lead.status === "Gained" ? "default" : "destructive"
                    }
                    className="mt-1"
                  >
                    {lead.status === "Gained" ? "Ganho" : "Perdido"}
                  </Badge>
                </div>
                {lead.gainLossValue !== null &&
                  lead.gainLossValue !== undefined && (
                    <div>
                      <p className="text-xs text-muted-foreground">Valor</p>
                      <p className="font-medium text-lg">
                        {formatCurrency(lead.gainLossValue)}
                      </p>
                    </div>
                  )}
                {lead.gainLossReason && (
                  <div>
                    <p className="text-xs text-muted-foreground">Motivo</p>
                    <p className="font-medium">{lead.gainLossReason}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Additional Information */}
          {lead.content && (
            <section>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
                Observações
              </h3>
              <p className="text-sm whitespace-pre-wrap">{lead.content}</p>
            </section>
          )}

          {/* Metadata */}
          <section>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
              Informações do Sistema
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Criado em</p>
                <p>{formatDate(lead.createdAt)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Última atualização
                </p>
                <p>{formatDate(lead.updatedAt)}</p>
              </div>
              {lead.createdBy && (
                <div>
                  <p className="text-xs text-muted-foreground">Criado por</p>
                  <p>Membro #{lead.createdBy}</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
