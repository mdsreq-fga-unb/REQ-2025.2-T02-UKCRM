import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface InactivityBadgeProps {
  days: number;
  className?: string;
}

export default function InactivityBadge({ days, className }: InactivityBadgeProps) {
  return (
    <Badge variant="outline" className={cn("text-muted-foreground border-transparent", className)}>
      {days}d
    </Badge>
  );
}
