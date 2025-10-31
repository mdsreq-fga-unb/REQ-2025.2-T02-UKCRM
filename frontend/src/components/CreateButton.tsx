import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

type CreateButtonProps = {
  label: string;
};

export default function CreateButton({ label }: CreateButtonProps) {
  return (
    <Button variant="default">
      <PlusIcon /> {label}
    </Button>
  );
}
