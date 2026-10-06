import { useLocale } from "@/i18n/locale-provider";
import { localePath } from "@/i18n/locale";
import { LanguageSwitch } from "@/i18n/language-switch";
import Link from "next/link";
import { prototypeNotice } from "@/lib/constants";
import type { View } from "@/types/loop";

import { Icon } from "@/components/ui/icon";

export function AppShell({
  view,
  onNavigate,
  children,
  onReset,
}: {
  view: View;
  onNavigate: (view: View) => void;
  children: React.ReactNode;
  onReset: () => void;
}) {
  const { locale, t } = useLocale();
  const navigation: {
    view: View;
    label: string;
    short: string;
    icon: "leaf" | "crate" | "truck" | "return";
  }[] = [
    {
      view: "week",
      label: t("this_week"),
      short: t("this_week"),
      icon: "leaf",
    },
    {
      view: "crate",
      label: t("my_crate"),
      short: t("my_crate"),
      icon: "crate",
    },
    {
      view: "delivery",
      label: t("delivery"),
      short: t("delivery"),
      icon: "truck",
    },
    {
      view: "history",
      label: t("previous_weeks"),
      short: t("previous"),
      icon: "return",
    },
  ];

  const nav = (mobile: boolean) => (
    <nav
      className={mobile ? "mobile-nav" : "desktop-nav"}
      aria-label={mobile ? t("mobile_navigation") : t("main_navigation")}
    >
      {navigation.map((item) => (
        <button
          key={item.view}
          aria-current={view === item.view ? "page" : undefined}
          onClick={() => onNavigate(item.view)}
        >
          {mobile && <Icon name={item.icon} />}
          {mobile ? item.short : item.label}
        </button>
      ))}
    </nav>
  );
  return (
    <>
      <a className="skip-link" href="#main">
        {t("skip_to_content")}{" "}
      </a>
      <header className="site-header">
        <div className="header-inner">
          <button
            className="wordmark"
            aria-label={t("loop_this_week")}
            onClick={() => onNavigate("week")}
          >
            loop<span className="logo-dot">.</span>
          </button>
          {nav(false)}
          <div className="header-controls">
            <LanguageSwitch locale={locale} path="/demo" view={view} />
            <a
              href="#prototype"
              className="account"
              aria-label={t("demo_account_about_this_prototype")}
            >
              <Icon name="user" />
              <span>{t("demo_account")}</span>
              <span className="demo-badge">DEMO</span>
            </a>
          </div>
        </div>
      </header>
      {children}
      <footer id="prototype" className="site-footer">
        <div className="footer-brand">
          loop<span>.</span>{" "}
          <span className="footer-version">{t("prototype_v0_1")}</span>
        </div>
        <div className="footer-demo">
          <p>{prototypeNotice(locale)}</p>
          <button className="text-button demo-reset" onClick={onReset}>
            {t("restart_demo")} <Icon name="return" />
          </button>
          <div>
            <Link href={localePath(locale)} className="text-button demo-reset">
              {t("back_to_loop")} <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </footer>
      {nav(true)}
    </>
  );
}
