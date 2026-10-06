import type { mealKeys } from "@/i18n/data";
import type { IngredientId } from "@/types/loop";
export const mockMeals: {
  id: keyof typeof mealKeys;
  groups: IngredientId[][];
}[] = [
  {
    id: "lentil-soup",
    groups: [["red-lentils", "green-lentils"], ["carrots"]],
  },
  {
    id: "rice-lentils-spinach",
    groups: [["brown-rice"], ["red-lentils", "green-lentils"], ["spinach"]],
  },
  { id: "potato-spinach-mash", groups: [["potatoes"], ["spinach"]] },
  {
    id: "oats-fruit",
    groups: [["oats"], ["apples", "orange", "pear"]],
  },
];
