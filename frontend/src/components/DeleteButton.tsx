import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

type DeleteButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export default function DeleteButton({ label, ...props }: DeleteButtonProps) {
  return (
    <Button
      variant="destructive"
      onClick={props.onClick}
      disabled={props.disabled}
      className="text-white"
    >
      <XIcon /> {label}
    </Button>
  );
}
