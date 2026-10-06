import { numberLocale, translations, type Locale } from "@/i18n/locale";
import type { CrateItemId, ItemChoice } from "@/types/loop";

// User-supplied Candidate 020 modeled weekly inputs for one person.
// No measured consumption, nutritional validation or finalized commercial quantities.
export const candidate020Quantities: Record<
  CrateItemId,
  { value: number; unit: "g" | "L" }
> = {
  oats: { value: 420, unit: "g" },
  "wholegrain-bread": { value: 1470, unit: "g" },
  potatoes: { value: 1225, unit: "g" },
  "green-lentils": { value: 414, unit: "g" },
  "red-lentils": { value: 286, unit: "g" },
  carrots: { value: 1225, unit: "g" },
  spinach: { value: 525, unit: "g" },
  apples: { value: 1393, unit: "g" },
  orange: { value: 707, unit: "g" },
  "mixed-nuts": { value: 70, unit: "g" },
  "rapeseed-oil": { value: 201, unit: "g" },
  "brown-rice": { value: 757, unit: "g" },
  "soy-drink": { value: 4.2, unit: "L" },
};
const factors = { less: 0.75, standard: 1, more: 1.25 };
const dry = new Set([
  "green-lentils",
  "red-lentils",
  "brown-rice",
  "bulgur",
  "chickpeas",
  "beans",
]);
export function itemQuantity(
  id: CrateItemId,
  choice: ItemChoice,
  locale: Locale = "nl",
) {
  const base = candidate020Quantities[id];
  const value = base.value * factors[choice.amount];
  let amount: string;
  if (base.unit === "L") {
    amount = `${new Intl.NumberFormat(numberLocale(locale), { maximumFractionDigits: 1 }).format(value)} L`;
  } else if (value >= 1000) {
    // Coarse 100 g increments for adjustments; baseline shown to two kg decimals.
    const kg =
      (choice.amount === "standard" ? value : Math.round(value / 100) * 100) /
      1000;
    amount = `${new Intl.NumberFormat(numberLocale(locale), { maximumFractionDigits: 2 }).format(kg)} kg`;
  } else {
    const grams =
      choice.amount === "standard" && value % 5 === 0
        ? value
        : Math.round(value / 10) * 10;
    amount = `${grams} g`;
  }
  return `${amount}${dry.has(choice.ingredient) ? ` ${translations(locale)("dry")}` : ""}`;
}
