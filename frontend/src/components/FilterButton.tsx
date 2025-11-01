import { FilterIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FilterButtonProps = {
  className?: string;
};

export default function FilterButton({ className }: FilterButtonProps) {
  return (
    <ButtonGroup className={cn(className)}>
      <Input placeholder="Filtrar..." />
      <Button variant="outline" aria-label="Filter">
        <FilterIcon />
      </Button>
    </ButtonGroup>
  );
}
