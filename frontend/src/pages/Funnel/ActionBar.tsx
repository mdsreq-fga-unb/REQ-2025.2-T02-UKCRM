"use client";

import { useState } from "react";
import CreateButton from "@/components/CreateButton";
import DeleteButton from "@/components/DeleteButton";
import { DoRedo } from "@/components/DoRedo";
import FilterButton from "@/components/FilterButton";
import SelectButton from "@/components/SelectButton";
import { ChartNoAxesCombinedIcon, TagIcon } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";

const funnelsList = [
  { value: "funil-a", label: "Funil Principal" },
  { value: "funil-b", label: "Funil de Prospecção" },
  { value: "funil-c", label: "Funil de Onboarding" },
];

const sortOptionsList = [
  { value: "padrao", label: "Padrão" },
  { value: "valor-desc", label: "Valor (Maior)" },
  { value: "valor-asc", label: "Valor (Menor)" },
  { value: "temperatura", label: "Temperatura (Quente > Frio)" },
];

type ActionBarProps = {
  onCreateFunnelClick: () => void;
  onDeleteFunnelClick: (funnelName: string) => void;
  filterTerm: string;
  onFilterChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

export default function ActionBar({
  onCreateFunnelClick,
  onDeleteFunnelClick,
  filterTerm,
  onFilterChange,
  onSortChange,
}: ActionBarProps) {
  const [selectedFunnel, setSelectedFunnel] = useState<string | null>(null);

  const handleFunnelSelect = (funnelValue: string) => {
    const funnel = funnelsList.find((f) => f.value === funnelValue);
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
        items={funnelsList}
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
        placeholder="Ordenar por"
        label="Categorias"
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
