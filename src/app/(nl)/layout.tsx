import { translations } from "@/i18n/locale";
import { LocaleDocument } from "@/i18n/locale-document";
export const metadata = {
  title: "loop.",
  description: translations("nl")("an_idea_in_development_a_demo_to_try_it"),
};
export default function DutchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LocaleDocument locale="nl">{children}</LocaleDocument>;
}
