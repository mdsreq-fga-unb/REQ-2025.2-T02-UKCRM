"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import FilterButton from "@/components/FilterButton";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useMemo, useState } from "react";
import { formSchema } from "../schemas/funnel.schema";
import { useSalesTeams } from "../hooks/useTeams";

type CreateFunnelDialogProps = {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isPending?: boolean;
};

export function CreateFunnelDialog({
  open,
  onOpenChange,
  onSubmit,
  isPending,
}: CreateFunnelDialogProps) {
  const { data: teamsData = [], isLoading: isLoadingTeams } = useSalesTeams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      funnelName: "",
      teamIds: [],
    },
  });

  const [filterTerm, setFilterTerm] = useState("");

  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
    form.reset();
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

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[600px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-4"
          >
            <DialogHeader>
              <DialogTitle>Criar Novo Funil</DialogTitle>
            </DialogHeader>

            <span className="text-left w-full text-muted-foreground">
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

            <div className="flex flex-col items-center gap-4">
              <span className="text-left w-full text-muted-foreground">
                Time de Vendas
              </span>
              <FilterButton
                className="mr-auto"
                value={filterTerm}
                onChange={(e) => setFilterTerm(e.target.value)}
              />

              <FormField
                control={form.control}
                name="teamIds"
                render={({ field }) => (
                  <FormItem className="w-full rounded-md border gap-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]"></TableHead>
                          <TableHead className="w-auto">Nome do Time</TableHead>
                          {/* Backend atual não manda contagem de membros, removido por enquanto */}
                          {/* <TableHead className="w-[100px] text-right pr-3">Membros</TableHead> */}
                        </TableRow>
                      </TableHeader>
                    </Table>
                    <ScrollArea className="h-[150px]">
                      <Table>
                        <TableBody>
                          {isLoadingTeams ? (
                            <TableRow>
                              <TableCell
                                colSpan={2}
                                className="text-center py-4"
                              >
                                Carregando times...
                              </TableCell>
                            </TableRow>
                          ) : filteredTeams.length === 0 ? (
                            <TableRow>
                              <TableCell
                                colSpan={2}
                                className="text-center py-4"
                              >
                                Nenhum time encontrado.
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredTeams.map((team) => {
                              const teamIdStr = team.id.toString();
                              return (
                                <TableRow key={team.id}>
                                  <TableCell className="w-[50px]">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          teamIdStr,
                                        )}
                                        onCheckedChange={(isChecked) => {
                                          const currentSelection =
                                            field.value || [];
                                          if (isChecked) {
                                            field.onChange([
                                              ...currentSelection,
                                              teamIdStr,
                                            ]);
                                          } else {
                                            field.onChange(
                                              currentSelection.filter(
                                                (value) => value !== teamIdStr,
                                              ),
                                            );
                                          }
                                        }}
                                      />
                                    </FormControl>
                                  </TableCell>
                                  <TableCell className="w-auto">
                                    {team.name}
                                  </TableCell>
                                </TableRow>
                              );
                            })
                          )}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={() => handleOpenChange(false)}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending || isLoadingTeams}>
                {isPending ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
