import { FilterIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FilterButtonProps = {
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FilterButton({
  className,
  value,
  onChange,
}: FilterButtonProps) {
  return (
    <ButtonGroup className={cn(className)}>
      <Input placeholder="Filtrar..." value={value} onChange={onChange} />
      <Button variant="outline">
        <FilterIcon />
      </Button>
    </ButtonGroup>
  );
}
