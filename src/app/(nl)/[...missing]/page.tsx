import { notFound } from "next/navigation";
import { translations } from "@/i18n/locale";
const t = translations("nl");
export const metadata = {
  title: `loop. — ${t("page_not_found")}`,
  description: t("this_page_doesn_t_exist_head_back_to_loop"),
};
export default function MissingRoute() {
  notFound();
}
