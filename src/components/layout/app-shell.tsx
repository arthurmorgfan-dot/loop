import type { View } from "@/types/loop";
import { mockUser } from "@/data/mock-user";
import { prototypeNotice } from "@/lib/constants";
import { Icon } from "@/components/ui/icon";

const navigation: {
  view: View;
  label: string;
  short: string;
  icon: "leaf" | "crate" | "truck" | "return";
}[] = [
  { view: "week", label: "Deze week", short: "Deze week", icon: "leaf" },
  { view: "crate", label: "Mijn krat", short: "Mijn krat", icon: "crate" },
  { view: "delivery", label: "Bezorging", short: "Bezorging", icon: "truck" },
  { view: "history", label: "Vorige weken", short: "Eerder", icon: "return" },
];

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
  const nav = (mobile: boolean) => (
    <nav
      className={mobile ? "mobile-nav" : "desktop-nav"}
      aria-label={mobile ? "Mobiele hoofdnavigatie" : "Hoofdnavigatie"}
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
        Naar de inhoud
      </a>
      <header className="site-header">
        <div className="header-inner">
          <button
            className="wordmark"
            aria-label="LOOP — deze week"
            onClick={() => onNavigate("week")}
          >
            loop<span className="logo-dot">.</span>
          </button>
          {nav(false)}
          <a
            href="#prototype"
            className="account"
            aria-label="Demo-account — over dit prototype"
          >
            <Icon name="user" />
            <span>{mockUser.accountLabel}</span>
            <span className="demo-badge">DEMO</span>
          </a>
        </div>
      </header>
      {children}
      <footer id="prototype" className="site-footer">
        <div className="footer-brand">
          loop<span>.</span>{" "}
          <span className="footer-version">Prototype v0.1</span>
        </div>
        <div className="footer-demo">
          <p>{prototypeNotice}</p>
          <button className="text-button demo-reset" onClick={onReset}>
            Demo opnieuw starten <Icon name="return" />
          </button>
        </div>
      </footer>
      {nav(true)}
    </>
  );
}
