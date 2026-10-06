import { translations } from "@/i18n/locale";
import { LocaleDocument } from "@/i18n/locale-document";
export const metadata = {
  title: "loop.",
  description: translations("en")("an_idea_in_development_a_demo_to_try_it"),
};
export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LocaleDocument locale="en">{children}</LocaleDocument>;
}
