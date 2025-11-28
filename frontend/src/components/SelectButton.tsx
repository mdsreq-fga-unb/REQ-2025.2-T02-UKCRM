import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import React from "react";

export type Item = {
  value: string;
  label: string;
};

type SelectButtonProps = {
  placeholder: string;
  label: string;
  icon: React.ReactNode;
  items: Item[];
  value?: string | null;
  onValueChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
};

export default function SelectButton({
  label,
  placeholder,
  icon,
  items,
  value,
  onValueChange,
  className,
  disabled,
}: SelectButtonProps) {
  return (
    <Select value={value ?? undefined} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={cn("w-[220px]", className)}>
        {icon}
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
