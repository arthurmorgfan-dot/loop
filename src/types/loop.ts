import type { Weekday } from "@/i18n/locale";
export type ProviderId = "markt-noord" | "vers-dichtbij" | "buurtmarkt";
export type Fulfilment = "delivery" | "pickup";
export type PointId = "demo-noord" | "demo-zuid";
export type SlotId =
  | "wednesday-evening"
  | "thursday-morning"
  | "thursday-afternoon"
  | "friday-morning";
export type View = "week" | "crate" | "delivery" | "history";
export type FoodSymbol = "leaf" | "apple" | "grain" | "seed";
export type CrateItemId =
  | "oats"
  | "wholegrain-bread"
  | "potatoes"
  | "green-lentils"
  | "red-lentils"
  | "carrots"
  | "spinach"
  | "apples"
  | "orange"
  | "mixed-nuts"
  | "rapeseed-oil"
  | "brown-rice"
  | "soy-drink";
export type IngredientId =
  | CrateItemId
  | "pear"
  | "chickpeas"
  | "beans"
  | "rye-bread"
  | "bulgur"
  | "kale"
  | "pumpkin"
  | "pumpkin-seeds"
  | "olive-oil"
  | "oat-drink"
  | "buckwheat-flakes";
export interface DemoIngredient {
  id: IngredientId;
}
export type CategoryId =
  | "grains"
  | "potatoes"
  | "legumes"
  | "vegetables"
  | "fruit"
  | "nuts-seeds"
  | "plant-staples";
export interface CrateItem {
  id: CrateItemId;
  category: CategoryId;
  symbol: FoodSymbol;
  alternatives: IngredientId[];
}
export interface ItemChoice {
  ingredient: IngredientId;
  amount: "standard" | "less" | "more";
}
export interface DemoProvider {
  id: ProviderId;
  name: string;
}
export interface DemoPoint {
  id: PointId;
  name: string;
}
export interface DemoSlot {
  id: SlotId;
  day: Weekday;
  time: string;
}
export interface WeekPreferences {
  version: 2;
  items: Record<CrateItemId, ItemChoice>;
  provider: ProviderId;
  fulfilment: Fulfilment;
  point: PointId;
  slot: SlotId;
  confirmed: boolean;
}
export interface DemoHistoryWeek {
  id: string;
  week: number;
  start: string;
  end: string;
  fulfilment: Fulfilment;
  point?: PointId;
  day: Weekday;
  time: string;
  items: Record<CrateItemId, ItemChoice>;
}
