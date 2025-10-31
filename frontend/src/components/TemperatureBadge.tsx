import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TemperatureVariant = "hot" | "warm" | "cold";

export interface TemperatureBadgeProps {
  variant: TemperatureVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<TemperatureVariant, string> = {
  hot: "bg-red-100 text-red-400 border-transparent",
  warm: "bg-yellow-100 text-yellow-600 border-transparent",
  cold: "bg-blue-100 text-blue-400 border-transparent",
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
