"use client";

import CreateButton from "@/components/CreateButton";
import DeleteButton from "@/components/DeleteButton";
import { DoRedo } from "@/components/DoRedo";
import FilterButton from "@/components/FilterButton";
import SelectButton from "@/components/SelectButton";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { ChartNoAxesCombinedIcon, PencilIcon, TagIcon } from "lucide-react";
import { sortOptionsList } from "../constants/actionBar.constants";

type FunnelItem = {
  value: string;
  label: string;
};

type ActionBarProps = {
  funnels: FunnelItem[];
  onCreateFunnelClick: () => void;
  onDeleteFunnelClick: () => void;
  filterTerm: string;
  onFilterChange: (value: string) => void;
  onSortChange: (value: string) => void;
  selectedFunnelId: string | null;
  onFunnelSelect: (value: string | null) => void;
  isLoading?: boolean;
};

export default function ActionBar({
  funnels,
  onCreateFunnelClick,
  onDeleteFunnelClick,
  filterTerm,
  onFilterChange,
  onSortChange,
  selectedFunnelId,
  onFunnelSelect,
  isLoading,
}: ActionBarProps) {
  const handleDeleteClick = () => {
    onDeleteFunnelClick();
  };

  const handleEditClick = () => {
    if (selectedFunnelId) {
      onCreateFunnelClick(); // TODO: Distinguir Criar de Editar
    }
  };

  return (
    <header className="flex justify-between w-full flex-row p-2">
      <ButtonGroup>
        <SelectButton
          placeholder="Funils de Venda"
          label="Funils de Venda"
          icon={<TagIcon />}
          items={funnels}
          value={selectedFunnelId}
          onValueChange={onFunnelSelect}
          disabled={isLoading}
        />
        <Button
          onClick={handleEditClick}
          disabled={!selectedFunnelId}
          size={"icon"}
          variant={"outline"}
        >
          <PencilIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <DeleteButton
          onClick={handleDeleteClick}
          disabled={!selectedFunnelId}
          label="Excluir Funil"
        />
        <CreateButton onClick={onCreateFunnelClick} label="Criar Funil" />
      </ButtonGroup>
      <DoRedo />
      <SelectButton
        className="w-50"
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
