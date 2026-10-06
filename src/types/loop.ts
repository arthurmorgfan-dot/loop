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
  name: string;
}
export interface CrateItem {
  id: CrateItemId;
  category: string;
  symbol: FoodSymbol;
  alternatives: IngredientId[];
}
export interface ItemChoice {
  ingredient: IngredientId;
  amount: "standard" | "less";
}
export interface DemoProvider {
  id: ProviderId;
  name: string;
  description: string;
}
export interface DemoPoint {
  id: PointId;
  name: string;
  description: string;
}
export interface DemoSlot {
  id: SlotId;
  day: string;
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
  label: string;
  period: string;
  fulfilment: Fulfilment;
  point?: PointId;
  day: string;
  time: string;
  items: Record<CrateItemId, ItemChoice>;
}
