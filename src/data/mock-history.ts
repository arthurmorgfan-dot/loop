import { initialItems } from "@/data/mock-crate";
import type { DemoHistoryWeek } from "@/types/loop";

// Fixed fictional snapshots, separate from editable current-week preferences.
export const mockHistory: DemoHistoryWeek[] = [
  {
    id: "week-40",
    label: "Week 40",
    period: "28 september–4 oktober",
    fulfilment: "delivery",
    day: "Woensdag",
    time: "18:00–20:00",
    items: {
      ...initialItems,
      apples: { ingredient: "pear", amount: "standard" },
    },
  },
  {
    id: "week-39",
    label: "Week 39",
    period: "21–27 september",
    fulfilment: "pickup",
    point: "demo-zuid",
    day: "Donderdag",
    time: "16:00–18:00",
    items: {
      ...initialItems,
      potatoes: { ingredient: "potatoes", amount: "less" },
      spinach: { ingredient: "kale", amount: "standard" },
    },
  },
  {
    id: "week-38",
    label: "Week 38",
    period: "14–20 september",
    fulfilment: "delivery",
    day: "Vrijdag",
    time: "10:00–12:00",
    items: { ...initialItems },
  },
];
