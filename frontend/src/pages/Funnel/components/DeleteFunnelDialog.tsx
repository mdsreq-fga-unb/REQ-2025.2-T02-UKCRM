"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

type DeleteFunnelDialogProps = {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: () => void;
  funnelName: string;
  isPending?: boolean;
};

type FormValues = {
  confirmationName: string;
};

export function DeleteFunnelDialog({
  open,
  onOpenChange,
  onSubmit,
  funnelName,
  isPending,
}: DeleteFunnelDialogProps) {
  const formSchema = z.object({
    confirmationName: z.string().refine((data) => data === funnelName, {
      message: "O nome digitado não corresponde ao nome do funil.",
    }),
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmationName: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (open) {
      form.reset({ confirmationName: "" });
    }
  }, [open, form]);

  function handleFormSubmit() {
    onSubmit();
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
            className="space-y-6"
          >
            <DialogHeader>
              <DialogTitle>Excluir Funil?</DialogTitle>
              <DialogDescription>
                Esta ação não pode ser desfeita. <br />
                Ao excluir o funil de vendas, todos os membros do time de vendas
                terão o seu acesso ao funil revogado. <br />
                Para confirmar a exclusão, digite o nome exato do funil:{" "}
                <strong className="text-foreground">{funnelName}</strong>
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="confirmationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Digite o nome do funil</FormLabel>
                  <FormControl>
                    <Input placeholder={funnelName} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                variant="destructive"
                disabled={!form.formState.isValid || isPending}
              >
                {isPending ? "Excluindo..." : "Excluir"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
