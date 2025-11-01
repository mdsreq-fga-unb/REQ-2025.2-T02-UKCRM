import CreateButton from "@/components/CreateButton";
import DeleteButton from "@/components/DeleteButton";
import { DoRedo } from "@/components/DoRedo";
import FilterButton from "@/components/FilterButton";
import PairButtonGroup from "@/components/PairButton";
import SelectButton from "@/components/SelectButton";
import { ChartNoAxesCombinedIcon, TagIcon } from "lucide-react";

const funnelsList = [
  { value: "funil-a", label: "Funil Principal" },
  { value: "funil-b", label: "Funil de Prospecção" },
  { value: "funil-c", label: "Funil de Onboarding" },
];

const categoriesList = [
  { value: "categoria-1", label: "Ugi" },
  { value: "categoria-2", label: "Arlos" },
  { value: "categoria-3", label: "Pero" },
];

type ActionBarProps = {
  onCreateFunnelClick: () => void;
};

export default function ActionBar({ onCreateFunnelClick }: ActionBarProps) {
  return (
    <header className="flex justify-between w-full flex-row">
      <SelectButton
        placeholder="Funils de Venda"
        label="Funils de Venda"
        icon={<TagIcon />}
        items={funnelsList}
      />
      <PairButtonGroup>
        <DeleteButton label="Excluir Funil" />
        <CreateButton onClick={onCreateFunnelClick} label="Criar Funil" />
      </PairButtonGroup>
      <DoRedo />
      <SelectButton
        placeholder="Ordenar por"
        label="Categorias"
        icon={<ChartNoAxesCombinedIcon />}
        items={categoriesList}
      />
      <FilterButton />
    </header>
  );
}
