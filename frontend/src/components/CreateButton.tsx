import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React from "react";

type CreateButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export default function CreateButton({ label, ...props }: CreateButtonProps) {
  return (
    <Button variant="default" {...props}>
      <PlusIcon /> {label}
    </Button>
  );
}