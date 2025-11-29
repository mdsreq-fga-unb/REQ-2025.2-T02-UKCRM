import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import { RedoIcon, UndoIcon } from "lucide-react";

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
