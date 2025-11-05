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
  onValueChange?: (value: string) => void;
  className?: string;
};

export default function SelectButton({
  label,
  placeholder,
  icon,
  items,
  onValueChange,
  className,
}: SelectButtonProps) {
  return (
    <Select onValueChange={onValueChange}>
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
