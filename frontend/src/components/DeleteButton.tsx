import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

type DeleteButtonProps = {
  label: string;
};

export default function DeleteButton({ label }: DeleteButtonProps) {
  return (
    <Button variant="destructive">
      <XIcon /> {label}
    </Button>
  );
}
