export type TemperatureVariant = "Quente" | "Morno" | "Frio" | "Neutro";

export const temperatureSortOrder: Record<TemperatureVariant, number> = {
  Quente: 1,
  Morno: 2,
  Neutro: 3,
  Frio: 4,
};
