import type { DemoPoint, DemoProvider, DemoSlot } from "@/types/loop";

export const mockProviders: DemoProvider[] = [
  {
    id: "markt-noord",
    name: "Markt Noord",
    description: "Een vertrouwde buurtwinkel",
  },
  {
    id: "vers-dichtbij",
    name: "Vers & Dichtbij",
    description: "Vers, met aandacht samengesteld",
  },
  {
    id: "buurtmarkt",
    name: "Buurtmarkt",
    description: "De basis, dichtbij huis",
  },
];

export const mockSlots: DemoSlot[] = [
  { id: "wednesday-evening", day: "Woensdag", time: "18:00–20:00" },
  { id: "thursday-morning", day: "Donderdag", time: "10:00–12:00" },
  { id: "thursday-afternoon", day: "Donderdag", time: "16:00–18:00" },
  { id: "friday-morning", day: "Vrijdag", time: "10:00–12:00" },
];

export const mockPoints: DemoPoint[] = [
  {
    id: "demo-noord",
    name: "LOOP Point Demo Noord",
    description: "Fictieve afhaallocatie · geen actief punt",
  },
  {
    id: "demo-zuid",
    name: "LOOP Point Demo Zuid",
    description: "Fictieve afhaallocatie · geen actief punt",
  },
];
