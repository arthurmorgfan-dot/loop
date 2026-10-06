import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/landing-page";
import { Dashboard } from "@/components/dashboard/dashboard";
import { localePath, translations, type Locale } from "./locale";
import type { View } from "@/types/loop";
const origin = "https://www.loopfood.nl";
export function localizedMetadata(locale: Locale, demo = false): Metadata {
  const t = translations(locale);
  const path = demo ? "/demo" : "/";
  const url = origin + localePath(locale, path);
  const title = t(
    demo ? "loop_demo_v0_1" : "loop_what_if_good_food_was_simply_taken_care_of",
  );
  const description = t(
    demo
      ? "try_the_loop_product_demo_your_crate_your_choices_all_products"
      : "a_weekly_food_foundation_with_room_for_your_life_discover_the",
  );
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        nl: origin + localePath("nl", path),
        en: origin + localePath("en", path),
        "x-default": origin + path,
      },
    },
    robots: demo ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description: demo
        ? description
        : t("not_one_superfood_a_system_a_food_foundation_in_development_wi"),
      url,
      type: "website",
      locale: locale === "en" ? "en_GB" : "nl_NL",
      alternateLocale: locale === "en" ? "nl_NL" : "en_GB",
      siteName: "loop.",
    },
  };
}
export function PublicPage({ locale }: { locale: Locale }) {
  return <LandingPage locale={locale} />;
}
export type DemoSearchParams = Promise<
  Record<string, string | string[] | undefined>
>;
export async function DemoRoute({
  searchParams,
}: {
  searchParams: DemoSearchParams;
}) {
  const query = await searchParams;
  const view = query.view;
  const initialView: View =
    view === "crate" || view === "delivery" || view === "history"
      ? view
      : "week";
  return <Dashboard initialView={initialView} />;
}
