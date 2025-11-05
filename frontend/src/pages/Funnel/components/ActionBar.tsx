"use client";

import CreateButton from "@/components/CreateButton";
import DeleteButton from "@/components/DeleteButton";
import { DoRedo } from "@/components/DoRedo";
import FilterButton from "@/components/FilterButton";
import SelectButton from "@/components/SelectButton";
import { ButtonGroup } from "@/components/ui/button-group";
import { ChartNoAxesCombinedIcon, TagIcon } from "lucide-react";
import { useState } from "react";
import { sortOptionsList } from "../constants/action-bar.constants";

type FunnelItem = {
  value: string;
  label: string;
};

type ActionBarProps = {
  funnels: FunnelItem[];
  onCreateFunnelClick: () => void;
  onDeleteFunnelClick: (funnelName: string) => void;
  filterTerm: string;
  onFilterChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

export default function ActionBar({
  funnels,
  onCreateFunnelClick,
  onDeleteFunnelClick,
  filterTerm,
  onFilterChange,
  onSortChange,
}: ActionBarProps) {
  const [selectedFunnel, setSelectedFunnel] = useState<string | null>(null);

  const handleFunnelSelect = (funnelValue: string) => {
    const funnel = funnels.find((f) => f.value === funnelValue);
    setSelectedFunnel(funnel ? funnel.label : null);
  };

  const handleDeleteClick = () => {
    if (selectedFunnel) {
      onDeleteFunnelClick(selectedFunnel);
    }
  };

  return (
    <header className="flex justify-between w-full flex-row">
      <SelectButton
        placeholder="Funils de Venda"
        label="Funils de Venda"
        icon={<TagIcon />}
        items={funnels}
        onValueChange={handleFunnelSelect}
      />
      <ButtonGroup>
        <DeleteButton
          label="Excluir Funil"
          onClick={handleDeleteClick}
          disabled={!selectedFunnel}
        />
        <CreateButton onClick={onCreateFunnelClick} label="Criar Funil" />
      </ButtonGroup>
      <DoRedo />
      <SelectButton
        className="w-40"
        placeholder="Ordenar por"
        label="Ordenar por"
        icon={<ChartNoAxesCombinedIcon />}
        items={sortOptionsList}
        onValueChange={onSortChange}
      />
      <FilterButton
        value={filterTerm}
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </header>
  );
}
