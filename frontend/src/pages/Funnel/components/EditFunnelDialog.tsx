"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { formSchema } from "../schemas/funnel.schema";
import { useSalesTeams } from "../hooks/useTeams";
import { useQuery } from "@tanstack/react-query";
import { fetchFunnelStatistics } from "../api/funnels.api";
import { queryKeys } from "../hooks/queryKeys";

type EditFunnelDialogProps = {
  open: boolean;
  funnelId: string | null;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isPending?: boolean;
};

export function EditFunnelDialog({
  open,
  funnelId,
  onOpenChange,
  onSubmit,
  isPending,
}: EditFunnelDialogProps) {

  const { data: apiTeamsData, isLoading: isLoadingApiTeams } = useSalesTeams();
  const { data: statistics, isLoading: isLoadingStatistics } = useQuery({
    queryKey: queryKeys.funnels.statistics(funnelId || ""),
    queryFn: ({ signal }) => fetchFunnelStatistics(Number(funnelId), signal),
    enabled: open && !!funnelId,
  });

  const teamsData =  apiTeamsData || [];
  const isLoadingTeams = isLoadingApiTeams;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      funnelName: "",
      teamIds: [],
    },
  });

  const [filterTerm, setFilterTerm] = useState("");

  useEffect(() => {
    if (statistics && open) {
      form.reset({
        funnelName: statistics.name,
        teamIds: statistics.teams.map((t) => t.id.toString()),
      });
    }
  }, [statistics, open, form]);

  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
    setFilterTerm("");
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset();
      setFilterTerm("");
    }
    onOpenChange(isOpen);
  };

  const filteredTeams = useMemo(() => {
    if (!filterTerm) {
      return teamsData;
    }
    return teamsData.filter((team) =>
      team.name.toLowerCase().includes(filterTerm.toLowerCase()),
    );
  }, [filterTerm, teamsData]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const isLoading = isLoadingStatistics || isLoadingTeams;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[700px] max-h-[90vh] overflow-y-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-4"
          >
            <DialogHeader>
              <DialogTitle>Editar Funil</DialogTitle>
            </DialogHeader>

            {isLoading ? (
              <div className="py-8 text-center text-muted-foreground">
                Carregando informações do funil...
              </div>
            ) : (
              <>
                {/* Statistics Section */}
                <div className="space-y-3">
                  <span className="text-left w-full text-muted-foreground font-medium">
                    Estatísticas do Funil
                  </span>

                  <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Total de Leads
                      </p>
                      <p className="text-2xl font-bold">
                        {statistics?.total_leads || 0}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Número de Etapas
                      </p>
                      <p className="text-2xl font-bold">
                        {statistics?.total_stages || 0}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Leads Ativos
                      </p>
                      <p className="text-2xl font-bold text-blue-600">
                        {statistics?.active_leads || 0}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Leads Ganhos
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        {statistics?.gained_leads || 0}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Leads Perdidos
                      </p>
                      <p className="text-2xl font-bold text-red-600">
                        {statistics?.lost_leads || 0}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Taxa de Conversão
                      </p>
                      <p className="text-2xl font-bold">
                        {statistics?.conversion_rate || 0}%
                      </p>
                    </div>

                    <div className="space-y-1 col-span-2">
                      <p className="text-sm text-muted-foreground">
                        Total de Ganhos
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(statistics?.total_gains || 0)}
                      </p>
                    </div>

                    <div className="space-y-1 col-span-2">
                      <p className="text-sm text-muted-foreground">
                        Total de Perdas
                      </p>
                      <p className="text-2xl font-bold text-red-600">
                        {formatCurrency(statistics?.total_losses || 0)}
                      </p>
                    </div>

                    <div className="space-y-1 col-span-2">
                      <p className="text-sm text-muted-foreground">
                        Ganho/Perda Líquido
                      </p>
                      <p
                        className={`text-3xl font-bold ${
                          (statistics?.net_gain_loss || 0) >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {formatCurrency(statistics?.net_gain_loss || 0)}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Editable Section */}
                <span className="text-left w-full text-muted-foreground font-medium">
                  Dados do Funil de Vendas
                </span>

                <FormField
                  control={form.control}
                  name="funnelName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Nome do Funil</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do Funil de Vendas" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <span className="text-left w-full text-muted-foreground">
                    Time de Vendas
                  </span>

                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Buscar time..."
                      value={filterTerm}
                      onChange={(e) => setFilterTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="teamIds"
                    render={({ field }) => (
                      <FormItem>
                        <ScrollArea className="h-[300px] rounded-md border border-border">
                          {isLoadingTeams ? (
                            <div className="text-center py-4 text-muted-foreground">
                              Carregando...
                            </div>
                          ) : filteredTeams.length === 0 ? (
                            <div className="text-center py-4 text-muted-foreground">
                              Nenhum time encontrado
                            </div>
                          ) : (
                            <div className="p-2 space-y-1">
                              {filteredTeams.map((team) => {
                                const teamIdStr = team.id.toString();
                                const isChecked = field.value?.includes(teamIdStr);

                                const handleToggle = () => {
                                  const currentSelection = field.value || [];
                                  if (isChecked) {
                                    field.onChange(
                                      currentSelection.filter(
                                        (value: string) => value !== teamIdStr,
                                      ),
                                    );
                                  } else {
                                    field.onChange([
                                      ...currentSelection,
                                      teamIdStr,
                                    ]);
                                  }
                                };

                                return (
                                  <div
                                    key={team.id}
                                    className="flex items-center justify-between rounded-md p-3 hover:bg-muted/50 cursor-pointer"
                                    onClick={handleToggle}
                                  >
                                    <div>
                                      <p className="text-sm font-medium">{team.name}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {team.members.length} {team.members.length === 1 ? 'membro' : 'membros'}
                                      </p>
                                    </div>
                                    <div onClick={(e) => e.stopPropagation()}>
                                      <Checkbox
                                        checked={isChecked}
                                        onCheckedChange={handleToggle}
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </ScrollArea>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={() => handleOpenChange(false)}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isPending || isLoadingTeams || isLoadingStatistics}
              >
                {isPending ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
