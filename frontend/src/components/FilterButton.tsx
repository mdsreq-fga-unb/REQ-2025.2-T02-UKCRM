import { FilterIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";

export default function FilterButton() {
  return (
    <ButtonGroup>
      <Input placeholder="Filtrar..." />
      <Button variant="outline" aria-label="Filter">
        <FilterIcon />
      </Button>
    </ButtonGroup>
  );
}
