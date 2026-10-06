import { initialItems } from "@/data/mock-crate";
import type { DemoHistoryWeek } from "@/types/loop";

// Fixed fictional snapshots, separate from editable current-week preferences.
export const mockHistory: DemoHistoryWeek[] = [
  {
    id: "week-40",
    week: 40,
    start: "2026-09-28",
    end: "2026-10-04",
    fulfilment: "delivery",
    day: "wednesday",
    time: "18:00–20:00",
    items: {
      ...initialItems,
      apples: { ingredient: "pear", amount: "standard" },
    },
  },
  {
    id: "week-39",
    week: 39,
    start: "2026-09-21",
    end: "2026-09-27",
    fulfilment: "pickup",
    point: "demo-zuid",
    day: "thursday",
    time: "16:00–18:00",
    items: {
      ...initialItems,
      potatoes: { ingredient: "potatoes", amount: "less" },
      spinach: { ingredient: "kale", amount: "standard" },
    },
  },
  {
    id: "week-38",
    week: 38,
    start: "2026-09-14",
    end: "2026-09-20",
    fulfilment: "delivery",
    day: "friday",
    time: "10:00–12:00",
    items: { ...initialItems },
  },
];
