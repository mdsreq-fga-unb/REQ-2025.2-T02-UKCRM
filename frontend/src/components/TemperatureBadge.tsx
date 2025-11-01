import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type TemperatureVariant = "Quente" | "Morno" | "Frio" | "Neutro";

export interface TemperatureBadgeProps {
  variant: TemperatureVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<TemperatureVariant, string> = {
  Quente:
    "bg-destructive/10 text-destructive border-transparent",
  Morno:
    "bg-yellow-500/10 text-yellow-600 border-transparent",
  Frio:
    "bg-blue-500/10 text-blue-500 border-transparent",
  Neutro:
    "bg-muted text-muted-foreground border-transparent",
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
