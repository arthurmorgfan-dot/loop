import type {
  CrateItem,
  CrateItemId,
  DemoIngredient,
  IngredientId,
  ItemChoice,
  WeekPreferences,
} from "@/types/loop";

export const ingredients: DemoIngredient[] = [
  { id: "oats", name: "Havermout" },
  { id: "wholegrain-bread", name: "Volkorenbrood" },
  { id: "potatoes", name: "Aardappelen" },
  { id: "green-lentils", name: "Groene linzen" },
  { id: "red-lentils", name: "Rode linzen" },
  { id: "carrots", name: "Wortels" },
  { id: "spinach", name: "Spinazie" },
  { id: "apples", name: "Appels" },
  { id: "orange", name: "Sinaasappel" },
  { id: "mixed-nuts", name: "Gemengde noten" },
  { id: "rapeseed-oil", name: "Koolzaadolie" },
  { id: "brown-rice", name: "Zilvervliesrijst" },
  { id: "soy-drink", name: "Verrijkte sojadrink" },
  { id: "pear", name: "Peer" },
  { id: "chickpeas", name: "Kikkererwten" },
  { id: "beans", name: "Bonen" },
  { id: "rye-bread", name: "Volkoren roggebrood" },
  { id: "bulgur", name: "Volkoren bulgur" },
  { id: "kale", name: "Boerenkool" },
  { id: "pumpkin", name: "Pompoen" },
  { id: "pumpkin-seeds", name: "Pompoenpitten" },
  { id: "olive-oil", name: "Olijfolie" },
  { id: "oat-drink", name: "Verrijkte haverdrink" },
  { id: "buckwheat-flakes", name: "Boekweitvlokken" },
];

// Candidate 020 ingredient names supplied for the product demo. No verified weights or nutrition model.
export const crateItems: CrateItem[] = [
  {
    id: "oats",
    category: "Granen",
    symbol: "grain",
    alternatives: ["buckwheat-flakes"],
  },
  {
    id: "wholegrain-bread",
    category: "Granen",
    symbol: "grain",
    alternatives: ["rye-bread"],
  },
  {
    id: "potatoes",
    category: "Aardappelen",
    symbol: "seed",
    alternatives: ["brown-rice", "bulgur"],
  },
  {
    id: "green-lentils",
    category: "Peulvruchten",
    symbol: "seed",
    alternatives: ["chickpeas", "beans"],
  },
  {
    id: "red-lentils",
    category: "Peulvruchten",
    symbol: "seed",
    alternatives: ["green-lentils", "chickpeas", "beans"],
  },
  {
    id: "carrots",
    category: "Groente",
    symbol: "leaf",
    alternatives: ["pumpkin"],
  },
  {
    id: "spinach",
    category: "Groente",
    symbol: "leaf",
    alternatives: ["kale"],
  },
  {
    id: "apples",
    category: "Fruit",
    symbol: "apple",
    alternatives: ["orange", "pear"],
  },
  {
    id: "orange",
    category: "Fruit",
    symbol: "apple",
    alternatives: ["apples", "pear"],
  },
  {
    id: "mixed-nuts",
    category: "Noten/zaden",
    symbol: "seed",
    alternatives: ["pumpkin-seeds"],
  },
  {
    id: "rapeseed-oil",
    category: "Plantaardige basisproducten",
    symbol: "leaf",
    alternatives: ["olive-oil"],
  },
  {
    id: "brown-rice",
    category: "Granen",
    symbol: "grain",
    alternatives: ["bulgur"],
  },
  {
    id: "soy-drink",
    category: "Plantaardige basisproducten",
    symbol: "leaf",
    alternatives: ["oat-drink"],
  },
];
export const mockCrate = { period: "5–11 oktober", week: "Week 41", days: 7 };
export const initialItems = Object.fromEntries(
  crateItems.map((item) => [
    item.id,
    { ingredient: item.id, amount: "standard" },
  ]),
) as Record<CrateItemId, ItemChoice>;
export const defaultWeek: WeekPreferences = {
  version: 2,
  items: initialItems,
  provider: "markt-noord",
  fulfilment: "delivery",
  point: "demo-noord",
  slot: "thursday-morning",
  confirmed: false,
};
export function ingredientName(id: IngredientId) {
  return ingredients.find((ingredient) => ingredient.id === id)!.name;
}
export function itemChanges(items: WeekPreferences["items"]) {
  return crateItems.flatMap((item) => {
    const choice = items[item.id];
    const changed = choice.ingredient !== item.id || choice.amount === "less";
    if (!changed) return [];
    const replacement =
      choice.ingredient !== item.id
        ? `${ingredientName(item.id)} → ${ingredientName(choice.ingredient)}`
        : ingredientName(item.id);
    return [
      {
        id: item.id,
        text: `${replacement}${choice.amount === "less" ? " · minder" : ""}`,
      },
    ];
  });
}
