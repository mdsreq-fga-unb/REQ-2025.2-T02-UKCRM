import { ButtonGroup } from "@/components/ui/button-group";
import React from "react";

type PairButtonProps = {
  children: React.ReactNode;
};

export default function PairButtonGroup({ children }: PairButtonProps) {
  return <ButtonGroup>{children}</ButtonGroup>;
}
