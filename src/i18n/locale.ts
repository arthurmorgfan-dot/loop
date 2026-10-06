import { en, nl, type MessageKey } from "./messages";
export type Locale = "nl" | "en";
export function translations(locale: Locale) {
  const messages = locale === "en" ? en : nl;
  return (key: MessageKey, values: Record<string, string | number> = {}) =>
    messages[key].replace(/\{(\w+)\}/g, (match, name: string) =>
      String(values[name] ?? match),
    );
}
export function localePath(locale: Locale, path = "/") {
  return locale === "en" ? `/en${path === "/" ? "" : path}` : path;
}
export const numberLocale = (locale: Locale) =>
  locale === "en" ? "en-GB" : "nl-NL";
export function datePeriod(start: string, end: string, locale: Locale) {
  return new Intl.DateTimeFormat(numberLocale(locale), {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  })
    .formatRange(new Date(`${start}T12:00:00Z`), new Date(`${end}T12:00:00Z`))
    .replace(/[\u00a0\u2009\u202f]/g, " ")
    .replace(/\s*–\s*/g, "–");
}
export type Weekday = "wednesday" | "thursday" | "friday";
export function dayName(day: Weekday, locale: Locale) {
  const date = {
    wednesday: "2026-10-07",
    thursday: "2026-10-08",
    friday: "2026-10-09",
  }[day];
  const name = new Intl.DateTimeFormat(numberLocale(locale), {
    weekday: "long",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
  return name[0].toUpperCase() + name.slice(1);
}
