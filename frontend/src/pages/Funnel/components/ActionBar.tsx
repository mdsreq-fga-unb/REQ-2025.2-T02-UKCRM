"use client";

import CreateButton from "@/components/CreateButton";
import DeleteButton from "@/components/DeleteButton";
import { DoRedo } from "@/components/DoRedo";
import FilterButton from "@/components/FilterButton";
import SelectButton from "@/components/SelectButton";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { usePermissions } from "@/auth/hooks/usePermissions";
import { ChartNoAxesCombinedIcon, PencilIcon, TagIcon } from "lucide-react";
import { sortOptionsList } from "../constants/actionBar.constants";

type FunnelItem = {
  value: string;
  label: string;
};

type ActionBarProps = {
  funnels: FunnelItem[];
  onCreateFunnelClick: () => void;
  onEditFunnelClick: () => void;
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
  onEditFunnelClick,
  onDeleteFunnelClick,
  filterTerm,
  onFilterChange,
  onSortChange,
  selectedFunnelId,
  onFunnelSelect,
  isLoading,
}: ActionBarProps) {
  const { hasPermission } = usePermissions();

  const handleDeleteClick = () => {
    onDeleteFunnelClick();
  };

  const handleEditClick = () => {
    if (selectedFunnelId) {
      onEditFunnelClick();
    }
  };

  // Permission checks
  const canCreateFunnel = hasPermission("funnel:create");
  const canEditFunnel = hasPermission("funnel:edit");
  const canDeleteFunnel = hasPermission("funnel:delete");

  return (
    <header className="flex justify-between w-full flex-row p-2">
      <ButtonGroup>
        <SelectButton
          placeholder="Funils de Venda"
          label="Funils de Venda"
          icon={<TagIcon className="h-4 w-4" />}
          items={funnels}
          value={selectedFunnelId}
          onValueChange={onFunnelSelect}
          disabled={isLoading}
        />
        {canEditFunnel && (
          <Button
            onClick={handleEditClick}
            disabled={!selectedFunnelId}
            size={"icon"}
            variant={"outline"}
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
        )}
      </ButtonGroup>
      <ButtonGroup>
        {canDeleteFunnel && (
          <DeleteButton
            onClick={handleDeleteClick}
            disabled={!selectedFunnelId}
            label="Excluir Funil"
          />
        )}
        {canCreateFunnel && (
          <CreateButton onClick={onCreateFunnelClick} label="Criar Funil" />
        )}
      </ButtonGroup>
      <DoRedo />
      <SelectButton
        className="w-50"
        placeholder="Ordenar por"
        label="Ordenar por"
        icon={<ChartNoAxesCombinedIcon className="h-4 w-4" />}
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
