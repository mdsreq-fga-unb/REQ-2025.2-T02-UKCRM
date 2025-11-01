"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FilterButton from "@/components/FilterButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

const teamsList = [
  { name: "Shikoba", members: 5 },
  { name: "Based", members: 50 },
  { name: "RoyalFlush", members: 1 },
  { name: "Manchester City", members: 3 },
];

const formSchema = z.object({
  funnelName: z.string().min(2, {
    message: "O nome do funil deve ter pelo menos 2 caracteres.",
  }),
  teamNames: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Você deve selecionar pelo menos um time.",
  }),
});

type CreateFunnelDialogProps = {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
};

export function CreateFunnelDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateFunnelDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      funnelName: "",
      teamNames: [],
    },
  });

  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
    form.reset();
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset();
    }
    onOpenChange(isOpen);
  };

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

            <span className="text-left w-full text-secondary-foreground/50">
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
              <span className="text-left w-full text-secondary-foreground/50">
                Time de Vendas
              </span>
              <FilterButton className="mr-auto" />

              <FormField
                control={form.control}
                name="teamNames"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[50px]"></TableHead>
                            <TableHead>Nome do Time</TableHead>
                            <TableHead className="text-right">
                              Membros
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {teamsList.map((team) => (
                            <TableRow key={team.name}>
                              <TableCell>
                                <Checkbox
                                  checked={field.value?.includes(team.name)}
                                  onCheckedChange={(isChecked) => {
                                    const currentSelection = field.value || [];
                                    if (isChecked) {
                                      field.onChange([
                                        ...currentSelection,
                                        team.name,
                                      ]);
                                    } else {
                                      field.onChange(
                                        currentSelection.filter(
                                          (name) => name !== team.name,
                                        ),
                                      );
                                    }
                                  }}
                                  aria-label={`Selecionar ${team.name}`}
                                />
                              </TableCell>
                              <TableCell>{team.name}</TableCell>
                              <TableCell className="text-right">
                                {team.members}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
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
                disabled={form.formState.isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
