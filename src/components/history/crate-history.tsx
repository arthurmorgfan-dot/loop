import { datePeriod, dayName } from "@/i18n/locale";
import { pointName } from "@/i18n/data";
import { useLocale } from "@/i18n/locale-provider";
import { crateItems, ingredientName, itemChanges } from "@/data/mock-crate";
import { mockHistory } from "@/data/mock-history";
import { mockPoints } from "@/data/mock-providers";
import { Icon } from "@/components/ui/icon";

export function CrateHistory({ onBack }: { onBack: () => void }) {
  const { locale, t } = useLocale();
  return (
    <section
      className="detail-panel history-panel"
      aria-label={t("previous_demo_crates")}
    >
      <p className="fine-print">
        {t(
          "fictional_demo_weeks_no_deliveries_pickups_or_purchases_have_t",
        )}{" "}
      </p>
      <div className="history-weeks">
        {mockHistory.map((week) => {
          const changes = itemChanges(week.items, locale);
          const point = mockPoints.find((item) => item.id === week.point);
          return (
            <details
              key={week.id}
              className="inline-editor history-week"
              data-disclosure={week.id}
            >
              <summary>
                <span>
                  <strong>{t("week_number", { number: week.week })}</strong>
                  <span className="history-period">
                    {datePeriod(week.start, week.end, locale)} · DEMO
                  </span>
                </span>
                <span aria-hidden="true">↗</span>
              </summary>
              <div className="history-receipt">
                <p>
                  {week.fulfilment === "delivery"
                    ? t("home_delivery")
                    : t("loop_point")}{" "}
                  · {dayName(week.day, locale)} {week.time}
                </p>
                {point && (
                  <p className="fine-print">
                    {pointName(point.id, locale)} · {t("fictional_location")}
                  </p>
                )}
              </div>
              <h3>{t("in_this_demo_crate")}</h3>
              <ul className="history-contents">
                {crateItems.map((item) => (
                  <li key={item.id}>
                    {ingredientName(week.items[item.id].ingredient, locale)}
                    {week.items[item.id].amount === "standard"
                      ? ""
                      : ` · ${t(week.items[item.id].amount === "less" ? "less" : "more").toLowerCase()}`}
                  </li>
                ))}
              </ul>
              <h3>{t("changes_in_this_demo_week")}</h3>
              {changes.length ? (
                <ul className="history-changes">
                  {changes.map((change) => (
                    <li key={change.id}>{change.text}</li>
                  ))}
                </ul>
              ) : (
                <p className="muted">{t("no_changes_in_this_example")}</p>
              )}
            </details>
          );
        })}
      </div>
      <button className="text-button" onClick={onBack}>
        {t("go_to_this_week")} <Icon name="arrow" />
      </button>
    </section>
  );
}
