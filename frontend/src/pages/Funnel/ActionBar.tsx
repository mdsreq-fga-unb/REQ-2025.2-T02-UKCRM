import CreateButton from "@/components/CreateButton";
import DeleteButton from "@/components/DeleteButton";
import { DoRedo } from "@/components/DoRedo";
import FilterButton from "@/components/FilterButton";
import PairButtonGroup from "@/components/PairButton";
import SelectButton from "@/components/SelectButton";
import { ChartNoAxesCombinedIcon, TagIcon } from "lucide-react";

const listaFunis = [
  { value: "funil-a", label: "Funil Principal" },
  { value: "funil-b", label: "Funil de Prospecção" },
  { value: "funil-c", label: "Funil de Onboarding" },
];

const listaCategorias = [
  { value: "categoria-1", label: "Ugi" },
  { value: "categoria-2", label: "Arlos" },
  { value: "categoria-3", label: "Pero" },
];

export default function ActionBar() {
  return (
    <header className="flex justify-between w-full flex-row">
      <SelectButton
        placeholder="Funis de Venda"
        label="Funis de Venda"
        icon={<TagIcon />}
        items={listaFunis}
      />
      <PairButtonGroup>
        <DeleteButton label="Excluir Funil" />
        <CreateButton label="Criar Funil" />
      </PairButtonGroup>
      <DoRedo />
      <SelectButton
        placeholder="Ordenar por"
        label="Categorias"
        icon={<ChartNoAxesCombinedIcon />}
        items={listaCategorias}
      />
      <FilterButton />
    </header>
  );
}
