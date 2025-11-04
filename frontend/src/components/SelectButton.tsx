import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
};

export default function SelectButton({
  label,
  placeholder,
  icon,
  items,
  onValueChange,
}: SelectButtonProps) {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-[200px]">
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
