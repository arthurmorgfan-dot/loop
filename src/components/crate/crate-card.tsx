import { mockUser } from "@/data/mock-user";
import { useLocale } from "@/i18n/locale-provider";
import Image from "next/image";
import { mockCrate } from "@/data/mock-crate";
import { datePeriod } from "@/i18n/locale";
import { Icon } from "@/components/ui/icon";

export function CrateCard({
  onReview,
  onSwap,
  changes,
  confirmed,
}: {
  onReview: () => void;
  onSwap: () => void;
  changes: { id: string; text: string }[];
  confirmed: boolean;
}) {
  const { locale, t } = useLocale();
  return (
    <section className="crate-card" aria-labelledby="crate-heading">
      <div className="crate-art">
        <div className="art-label">
          <span className="eyebrow">{t("loop_crate")}</span>
          <span>
            {t("week_number", { number: mockCrate.week })}{" "}
            <span aria-hidden="true">↗</span>
          </span>
        </div>
        <Image
          src="/illustrations/loop-crate.svg"
          alt={t(
            "illustration_of_a_reusable_loop_crate_with_vegetables_fruit_an",
          )}
          width={620}
          height={410}
          priority
          className="crate-illustration"
        />
        <span className="art-caption">
          <span className="tiny-dot" /> {t("thoughtfully_filled")}{" "}
        </span>
      </div>
      <div className="crate-copy">
        <div className="crate-title-row">
          <h2 id="crate-heading">{t("this_week")}</h2>
          <span className="period">
            {datePeriod(mockCrate.start, mockCrate.end, locale)}
          </span>
        </div>
        <p className="crate-description">
          {t("a_good_foundation_for")} <br />
          {t("your_whole_week")}{" "}
        </p>
        <div className="crate-facts">
          <span>
            <strong>{t("count_days", { count: mockCrate.days })}</strong>
            {t("a_nourishing_foundation")}{" "}
          </span>
          <span>
            <strong>
              {t("for_count_person", { count: mockUser.householdSize })}
            </strong>
            {t("room_for_your_choices")}{" "}
          </span>
        </div>
        <p className="status">
          <span className="tiny-dot" />{" "}
          {confirmed ? t("your_loop_has_been_updated") : t("ready_to_confirm")}
        </p>
        {changes.length > 0 && (
          <p
            className="fine-print crate-change-summary"
            aria-label={t("changes_to_your_crate")}
          >
            {changes.map((change) => change.text).join(" · ")}
          </p>
        )}
        <div className="crate-actions">
          <button className="button primary" onClick={onReview}>
            {t("view_my_crate")} <Icon name="arrow" />
          </button>
          <button className="text-button" onClick={onSwap}>
            {t("swap_products")} <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}
