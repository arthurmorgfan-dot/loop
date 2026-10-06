import { translations, type Locale } from "@/i18n/locale";
import { ingredientKeys } from "@/i18n/data";
import type {
  CrateItem,
  CrateItemId,
  DemoIngredient,
  IngredientId,
  ItemChoice,
  WeekPreferences,
} from "@/types/loop";

export const ingredients: DemoIngredient[] = (
  Object.keys(ingredientKeys) as IngredientId[]
).map((id) => ({ id }));

// Candidate 020 model ingredients. Quantities are supplied model inputs, not validated dietary recommendations.
export const crateItems: CrateItem[] = [
  {
    id: "oats",
    category: "grains",
    symbol: "grain",
    alternatives: ["buckwheat-flakes"],
  },
  {
    id: "wholegrain-bread",
    category: "grains",
    symbol: "grain",
    alternatives: ["rye-bread"],
  },
  {
    id: "potatoes",
    category: "potatoes",
    symbol: "seed",
    alternatives: ["brown-rice", "bulgur"],
  },
  {
    id: "green-lentils",
    category: "legumes",
    symbol: "seed",
    alternatives: ["chickpeas", "beans"],
  },
  {
    id: "red-lentils",
    category: "legumes",
    symbol: "seed",
    alternatives: ["green-lentils", "chickpeas", "beans"],
  },
  {
    id: "carrots",
    category: "vegetables",
    symbol: "leaf",
    alternatives: ["pumpkin"],
  },
  {
    id: "spinach",
    category: "vegetables",
    symbol: "leaf",
    alternatives: ["kale"],
  },
  {
    id: "apples",
    category: "fruit",
    symbol: "apple",
    alternatives: ["orange", "pear"],
  },
  {
    id: "orange",
    category: "fruit",
    symbol: "apple",
    alternatives: ["apples", "pear"],
  },
  {
    id: "mixed-nuts",
    category: "nuts-seeds",
    symbol: "seed",
    alternatives: ["pumpkin-seeds"],
  },
  {
    id: "rapeseed-oil",
    category: "plant-staples",
    symbol: "leaf",
    alternatives: ["olive-oil"],
  },
  {
    id: "brown-rice",
    category: "grains",
    symbol: "grain",
    alternatives: ["bulgur"],
  },
  {
    id: "soy-drink",
    category: "plant-staples",
    symbol: "leaf",
    alternatives: ["oat-drink"],
  },
];
export const mockCrate = {
  start: "2026-10-05",
  end: "2026-10-11",
  week: 41,
  days: 7,
};
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
export function ingredientName(id: IngredientId, locale: Locale = "nl") {
  return translations(locale)(ingredientKeys[id]);
}
export function itemChanges(
  items: WeekPreferences["items"],
  locale: Locale = "nl",
) {
  const t = translations(locale);
  return crateItems.flatMap((item) => {
    const choice = items[item.id];
    const changed =
      choice.ingredient !== item.id || choice.amount !== "standard";
    if (!changed) return [];
    const replacement =
      choice.ingredient !== item.id
        ? `${ingredientName(item.id, locale)} → ${ingredientName(choice.ingredient, locale)}`
        : ingredientName(item.id, locale);
    return [
      {
        id: item.id,
        text: `${replacement}${choice.amount === "standard" ? "" : ` · ${t(choice.amount === "less" ? "less" : "more").toLowerCase()}`}`,
      },
    ];
  });
}
