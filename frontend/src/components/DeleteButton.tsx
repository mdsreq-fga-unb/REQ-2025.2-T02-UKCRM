import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

type DeleteButtonProps = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function DeleteButton({
  label,
  onClick,
  disabled,
}: DeleteButtonProps) {
  return (
    <Button variant="destructive" onClick={onClick} disabled={disabled}>
      <XIcon /> {label}
    </Button>
  );
}
