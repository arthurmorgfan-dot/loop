"use client";
import { useLocale } from "./locale-provider";
export function ErrorPage({ reset }: { reset: () => void }) {
  const { t } = useLocale();
  return (
    <main className="main fallback-page">
      <h1>{t("something_went_wrong")}</h1>
      <p>{t("try_again_your_saved_demo_choices_are_kept")}</p>
      <button className="button primary" onClick={reset}>
        {t("try_again")}
      </button>
    </main>
  );
}
