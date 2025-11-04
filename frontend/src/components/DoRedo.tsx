import { Button } from "@/components/ui/button";
import { RedoIcon, UndoIcon } from "lucide-react";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";

export function DoRedo() {
  return (
    <ButtonGroup>
      <Button size="icon" variant="secondary" disabled={true}>
        <UndoIcon />
      </Button>
      <ButtonGroupSeparator />
      <Button size="icon" variant="secondary">
        <RedoIcon />
      </Button>
    </ButtonGroup>
  );
}
