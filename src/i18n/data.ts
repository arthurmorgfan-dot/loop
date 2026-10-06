import type {
  IngredientId,
  CategoryId,
  ProviderId,
  PointId,
} from "@/types/loop";
import { translations, type Locale } from "./locale";
import type { MessageKey } from "./messages";
export const ingredientKeys: Record<IngredientId, MessageKey> = {
  oats: "oats",
  "wholegrain-bread": "whole_grain_bread",
  potatoes: "potatoes",
  "green-lentils": "green_lentils",
  "red-lentils": "red_lentils",
  carrots: "carrots",
  spinach: "spinach",
  apples: "apples",
  orange: "orange",
  "mixed-nuts": "mixed_nuts",
  "rapeseed-oil": "rapeseed_oil",
  "brown-rice": "brown_rice",
  "soy-drink": "fortified_soy_drink",
  pear: "pear",
  chickpeas: "chickpeas",
  beans: "beans",
  "rye-bread": "whole_grain_rye_bread",
  bulgur: "whole_grain_bulgur",
  kale: "kale",
  pumpkin: "pumpkin",
  "pumpkin-seeds": "pumpkin_seeds",
  "olive-oil": "olive_oil",
  "oat-drink": "fortified_oat_drink",
  "buckwheat-flakes": "buckwheat_flakes",
};
export const categoryKeys: Record<CategoryId, MessageKey> = {
  grains: "grains",
  potatoes: "potatoes",
  legumes: "legumes",
  vegetables: "vegetables",
  fruit: "fruit",
  "nuts-seeds": "nuts_seeds",
  "plant-staples": "plant_based_staples",
};
export const providerKeys: Record<ProviderId, MessageKey> = {
  "markt-noord": "a_familiar_neighbourhood_shop",
  "vers-dichtbij": "fresh_food_thoughtfully_put_together",
  buurtmarkt: "the_basics_close_to_home",
};
export const pointKeys: Record<PointId, MessageKey> = {
  "demo-noord": "loop_point_demo_north",
  "demo-zuid": "loop_point_demo_south",
};
export const mealKeys = {
  "lentil-soup": "lentil_soup",
  "rice-lentils-spinach": "rice_with_lentils_and_spinach",
  "potato-spinach-mash": "mashed_potatoes_with_spinach",
  "oats-fruit": "oats_with_fruit",
} as const;
export function categoryName(category: CategoryId, locale: Locale) {
  return translations(locale)(categoryKeys[category]);
}
export function providerDescription(id: ProviderId, locale: Locale) {
  return translations(locale)(providerKeys[id]);
}
export function pointName(id: PointId, locale: Locale) {
  return translations(locale)(pointKeys[id]);
}
