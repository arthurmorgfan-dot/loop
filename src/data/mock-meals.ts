import type { IngredientId } from "@/types/loop";
export const mockMeals: { name: string; groups: IngredientId[][] }[] = [
  {
    name: "Linzensoep",
    groups: [["red-lentils", "green-lentils"], ["carrots"]],
  },
  {
    name: "Rijst met linzen en spinazie",
    groups: [["brown-rice"], ["red-lentils", "green-lentils"], ["spinach"]],
  },
  { name: "Aardappel-spinazie stamppot", groups: [["potatoes"], ["spinach"]] },
  {
    name: "Havermout met fruit",
    groups: [["oats"], ["apples", "orange", "pear"]],
  },
];
