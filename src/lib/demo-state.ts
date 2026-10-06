import { crateItems, defaultWeek } from "@/data/mock-crate";
import { mockPoints, mockProviders, mockSlots } from "@/data/mock-providers";
import type { CrateItemId, ItemChoice, WeekPreferences } from "@/types/loop";

export const demoStorageKey = "loop-demo-v01";
export const legacyStorageKey = "loop-demo-week-v01";

function record(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

// Only known demo items, permitted substitutions and valid fulfilment choices are restored.
export function parseDemoWeek(raw: string | null): WeekPreferences {
  if (!raw) return defaultWeek;
  try {
    const value = record(JSON.parse(raw));
    if (value.version !== 2) return defaultWeek;
    const savedItems = record(value.items);
    const items = Object.fromEntries(
      crateItems.map((item) => {
        const choice = record(savedItems[item.id]);
        const ingredient =
          [item.id, ...item.alternatives].find(
            (id) => id === choice.ingredient,
          ) ?? item.id;
        return [
          item.id,
          {
            ingredient,
            amount: choice.amount === "less" ? "less" : "standard",
          },
        ];
      }),
    ) as Record<CrateItemId, ItemChoice>;
    return {
      version: 2,
      items,
      provider:
        mockProviders.find((provider) => provider.id === value.provider)?.id ??
        defaultWeek.provider,
      fulfilment: value.fulfilment === "pickup" ? "pickup" : "delivery",
      point:
        mockPoints.find((point) => point.id === value.point)?.id ??
        defaultWeek.point,
      slot:
        mockSlots.find((slot) => slot.id === value.slot)?.id ??
        defaultWeek.slot,
      confirmed: value.confirmed === true,
    };
  } catch {
    return defaultWeek;
  }
}

export function migrateLegacyWeek(raw: string | null): WeekPreferences {
  if (!raw) return defaultWeek;
  try {
    const value = record(JSON.parse(raw));
    const redLentils = crateItems.find((item) => item.id === "red-lentils")!;
    const ingredient =
      [redLentils.id, ...redLentils.alternatives].find(
        (id) => id === value.food,
      ) ?? redLentils.id;
    return parseDemoWeek(
      JSON.stringify({
        ...defaultWeek,
        ...value,
        version: 2,
        items: {
          ...defaultWeek.items,
          "red-lentils": { ingredient, amount: "standard" },
        },
      }),
    );
  } catch {
    return defaultWeek;
  }
}
