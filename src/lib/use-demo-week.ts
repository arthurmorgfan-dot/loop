"use client";

import { useSyncExternalStore } from "react";
import { defaultWeek } from "@/data/mock-crate";
import {
  demoStorageKey,
  legacyStorageKey,
  migrateLegacyWeek,
  parseDemoWeek,
} from "@/lib/demo-state";
import type { CrateItemId, ItemChoice, WeekPreferences } from "@/types/loop";

const initial = JSON.stringify(defaultWeek);
let fallback = initial;
let memoryOnly = false;
function getSnapshot() {
  if (memoryOnly) return fallback;
  try {
    const saved = localStorage.getItem(demoStorageKey);
    if (saved !== null) return saved;
    const legacy = sessionStorage.getItem(legacyStorageKey);
    return legacy ? JSON.stringify(migrateLegacyWeek(legacy)) : initial;
  } catch {
    return fallback;
  }
}
function subscribe(callback: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === demoStorageKey || event.key === null) callback();
  };
  window.addEventListener("loop-week-change", callback);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener("loop-week-change", callback);
    window.removeEventListener("storage", onStorage);
  };
}
function saveWeek(week: WeekPreferences) {
  fallback = JSON.stringify(week);
  try {
    localStorage.setItem(demoStorageKey, fallback);
  } catch {
    memoryOnly = true;
  }
  window.dispatchEvent(new Event("loop-week-change"));
}
export function useDemoWeek() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => initial);
  const week = parseDemoWeek(raw);
  function updateWeek(patch: Partial<WeekPreferences>) {
    saveWeek(
      parseDemoWeek(
        JSON.stringify({ ...parseDemoWeek(getSnapshot()), ...patch }),
      ),
    );
  }
  function updateItem(id: CrateItemId, patch: Partial<ItemChoice>) {
    const current = parseDemoWeek(getSnapshot());
    updateWeek({
      items: { ...current.items, [id]: { ...current.items[id], ...patch } },
      confirmed: false,
    });
  }
  function resetWeek() {
    saveWeek(defaultWeek);
  }
  return { week, updateWeek, updateItem, resetWeek };
}
