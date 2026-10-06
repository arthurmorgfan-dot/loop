import Link from "next/link";
import { localePath, translations, type Locale } from "./locale";
import { LanguageSwitch } from "./language-switch";
export function MissingPage({ locale }: { locale: Locale }) {
  const t = translations(locale);
  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link className="wordmark" href={localePath(locale)}>
            loop<span className="logo-dot">.</span>
          </Link>
          <LanguageSwitch locale={locale} path="/" />
        </div>
      </header>
      <main className="main fallback-page">
        <p className="eyebrow">404</p>
        <h1>{t("page_not_found")}</h1>
        <p>{t("this_page_doesn_t_exist_head_back_to_loop")}</p>
        <Link className="button primary" href={localePath(locale)}>
          {t("back_to_the_start")}
        </Link>
      </main>
    </>
  );
}
