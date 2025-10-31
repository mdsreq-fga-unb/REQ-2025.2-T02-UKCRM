import { Button } from "@/components/ui/button";
import PairButtonGroup from "./PairButton";
import { RotateCcwIcon, RotateCwIcon } from "lucide-react";
import { ButtonGroupSeparator } from "./ui/button-group";

export function DoRedo() {
  return (
    <PairButtonGroup>
      <Button size="icon" variant="secondary">
        <RotateCcwIcon />
      </Button>
      <ButtonGroupSeparator />
      <Button size="icon" variant="secondary">
        <RotateCwIcon />
      </Button>
    </PairButtonGroup>
  );
}
