import type { DemoPoint, DemoProvider, DemoSlot } from "@/types/loop";

export const mockProviders: DemoProvider[] = [
  {
    id: "markt-noord",
    name: "Markt Noord",
  },
  {
    id: "vers-dichtbij",
    name: "Vers & Dichtbij",
  },
  {
    id: "buurtmarkt",
    name: "Buurtmarkt",
  },
];

export const mockSlots: DemoSlot[] = [
  { id: "wednesday-evening", day: "wednesday", time: "18:00–20:00" },
  { id: "thursday-morning", day: "thursday", time: "10:00–12:00" },
  { id: "thursday-afternoon", day: "thursday", time: "16:00–18:00" },
  { id: "friday-morning", day: "friday", time: "10:00–12:00" },
];

export const mockPoints: DemoPoint[] = [
  {
    id: "demo-noord",
    name: "LOOP Point Demo Noord",
  },
  {
    id: "demo-zuid",
    name: "LOOP Point Demo Zuid",
  },
];
