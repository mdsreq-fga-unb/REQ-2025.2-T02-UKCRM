import * as React from "react";
import { AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertBannerProps {
  message: string;
  onClose?: () => void;
  className?: string;
}

export function AlertBanner({ message, onClose, className }: AlertBannerProps) {
  return (
    <div
      className={cn(
        "fixed left-1/2 top-4 z-50 -translate-x-1/2 animate-fade-in",
        className
      )}
    >
      <div className="flex items-center gap-3 rounded-lg bg-foreground px-4 py-3 text-sm shadow-lg">
        <AlertTriangle className="h-5 w-5 shrink-0 text-warning" />
        <span className="text-background">{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-2 text-muted-foreground hover:text-background transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
