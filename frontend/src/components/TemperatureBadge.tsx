import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import * as React from "react";

export type TemperatureVariant = "Quente" | "Morno" | "Frio" | "Neutro";

export const temperatureSortOrder: Record<TemperatureVariant, number> = {
  Quente: 1,
  Morno: 2,
  Neutro: 3,
  Frio: 4,
};

export interface TemperatureBadgeProps {
  variant: TemperatureVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<TemperatureVariant, string> = {
  Quente: "bg-destructive/10 text-destructive border-transparent",
  Morno: "bg-yellow-500/10 text-yellow-600 border-transparent",
  Frio: "bg-blue-500/10 text-blue-500 border-transparent",
  Neutro: "bg-muted text-muted-foreground border-transparent",
};

export function TemperatureBadge({
  variant,
  className,
  children,
}: TemperatureBadgeProps) {
  const classes = variantClasses[variant];

  return (
    <Badge variant="outline" className={cn(classes, className)}>
      {children}
    </Badge>
  );
}
