import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

type DeleteButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export default function DeleteButton({
  label,
  className,
  ...props
}: DeleteButtonProps) {
  return (
    <Button
      variant="destructive"
      className={`text-white ${className || ""}`}
      {...props}
    >
      <XIcon /> {label}
    </Button>
  );
}
