"use client";
import { useEffect } from "react";
import { localePath, translations, type Locale } from "./locale";
import type { View } from "@/types/loop";

const positionKey = "loop-language-position";
// Presentation-only handoff across root layouts. Product choices stay in the existing store.
export function LanguageSwitch({
  locale,
  path,
  view,
}: {
  locale: Locale;
  path: "/" | "/demo";
  view?: View;
}) {
  const t = translations(locale);
  useEffect(() => {
    let restoreFrame = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      const raw = sessionStorage.getItem(positionKey);
      if (!raw) return;
      const saved: unknown = JSON.parse(raw);
      if (!saved || typeof saved !== "object") return;
      const data = saved as {
        path?: unknown;
        y?: unknown;
        open?: unknown;
      };
      if (data.path !== window.location.pathname) return;
      const restore = () => {
        if (Array.isArray(data.open))
          for (const id of data.open) {
            if (typeof id !== "string") continue;
            const detail = [
              ...document.querySelectorAll<HTMLDetailsElement>(
                "details[data-disclosure]",
              ),
            ].find((e) => e.dataset.disclosure === id);
            if (detail) detail.open = true;
          }
        if (typeof data.y === "number" && Number.isFinite(data.y))
          window.scrollTo({ top: Math.max(0, data.y), behavior: "instant" });
      };
      restoreFrame = requestAnimationFrame(() => {
        restore();
        timer = setTimeout(() => {
          restore();
          sessionStorage.removeItem(positionKey);
        }, 150);
      });
    } catch {
      /* Navigation still works when session storage is unavailable. */
    }
    return () => {
      cancelAnimationFrame(restoreFrame);
      if (timer) clearTimeout(timer);
    };
  }, []);
  function remember(
    target: Locale,
    event: React.MouseEvent<HTMLAnchorElement>,
  ) {
    const destination = new URL(event.currentTarget.href);
    destination.hash = window.location.hash;
    destination.search = window.location.search;
    event.currentTarget.href = destination.href;
    try {
      sessionStorage.setItem(
        positionKey,
        JSON.stringify({
          path: localePath(target, path),
          y: window.scrollY,
          open: [
            ...document.querySelectorAll<HTMLDetailsElement>(
              "details[data-disclosure][open]",
            ),
          ].map((e) => e.dataset.disclosure),
        }),
      );
    } catch {}
  }
  return (
    <nav className="language-switch" aria-label={t("choose_your_language")}>
      {(["nl", "en"] as const).map((target, index) => (
        <span key={target}>
          {index === 1 && (
            <span className="language-divider" aria-hidden="true">
              /
            </span>
          )}
          <a
            href={`${localePath(target, path)}${view && view !== "week" ? `?view=${view}` : ""}`}
            hrefLang={target}
            lang={target}
            aria-label={target === "nl" ? "Nederlands" : "English"}
            aria-current={locale === target ? "page" : undefined}
            onClick={(event) => remember(target, event)}
          >
            {target.toUpperCase()}
          </a>
        </span>
      ))}
    </nav>
  );
}
