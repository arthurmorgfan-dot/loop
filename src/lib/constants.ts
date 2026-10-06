import { translations, type Locale } from "@/i18n/locale";
export const prototypeNotice = (locale: Locale = "nl") =>
  translations(locale)(
    "loop_is_currently_a_prototype_providers_delivery_and_public_fu",
  );
