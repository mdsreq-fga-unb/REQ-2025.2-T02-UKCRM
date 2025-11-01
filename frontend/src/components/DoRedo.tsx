import { Button } from "@/components/ui/button";
import PairButtonGroup from "./PairButton";
import { RedoIcon, UndoIcon } from "lucide-react";
import { ButtonGroupSeparator } from "./ui/button-group";

export function DoRedo() {
  return (
    <PairButtonGroup>
      <Button size="icon" variant="secondary" className="text-secondary-foreground/30">
        <UndoIcon />
      </Button>
      <ButtonGroupSeparator />
      <Button size="icon" variant="secondary">
        <RedoIcon />
      </Button>
    </PairButtonGroup>
  );
}
