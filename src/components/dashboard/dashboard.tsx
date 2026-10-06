"use client";
import { useLocale } from "@/i18n/locale-provider";
import { datePeriod, dayName } from "@/i18n/locale";
import { pointName } from "@/i18n/data";

import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { CrateCard } from "@/components/crate/crate-card";
import { CrateContents } from "@/components/crate/crate-contents";
import { CrateHistory } from "@/components/history/crate-history";
import { ProviderChoice } from "@/components/providers/provider-choice";
import { DeliveryChoice } from "@/components/delivery/delivery-choice";
import { Icon } from "@/components/ui/icon";
import { ingredientName, itemChanges, mockCrate } from "@/data/mock-crate";
import { itemQuantity } from "@/data/model-quantities";
import { mockPoints, mockProviders, mockSlots } from "@/data/mock-providers";
import { useDemoWeek } from "@/lib/use-demo-week";
import type {
  CrateItemId,
  ItemChoice,
  View,
  WeekPreferences,
} from "@/types/loop";

export function Dashboard({ initialView = "week" }: { initialView?: View }) {
  const { locale, t } = useLocale();
  const { week, updateWeek, updateItem, resetWeek } = useDemoWeek();
  const [view, setView] = useState<View>(initialView);
  const [notice, setNotice] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const focusNext = useRef(false);
  const provider = mockProviders.find((item) => item.id === week.provider)!;
  const slot = mockSlots.find((item) => item.id === week.slot)!;
  const point = mockPoints.find((item) => item.id === week.point)!;
  const changes = itemChanges(week.items, locale);
  const receipt = week.fulfilment === "delivery" ? t("delivery") : t("pickup");

  useEffect(() => {
    if (focusNext.current) {
      heading.current?.focus();
      focusNext.current = false;
    }
  }, [view, week.confirmed]);

  function navigate(next: View) {
    if (next === view) {
      heading.current?.focus();
      return;
    }
    focusNext.current = true;
    setView(next);
    const url = new URL(window.location.href);
    if (next === "week") url.searchParams.delete("view");
    else url.searchParams.set("view", next);
    window.history.replaceState(window.history.state, "", url);
  }
  function change(patch: Partial<WeekPreferences>) {
    updateWeek({ ...patch, confirmed: false });
    setNotice(
      t("your_delivery_choice_has_been_updated_in_the_demo_confirm_your"),
    );
  }
  function changeItem(id: CrateItemId, patch: Partial<ItemChoice>) {
    updateItem(id, patch);
    const next = { ...week.items[id], ...patch };
    setNotice(
      t("name_replacement_amount_quantity_per_week_in_the_demo_your_dem", {
        name: ingredientName(id, locale),
        replacement: ingredientName(next.ingredient, locale),
        amount: t(
          next.amount === "less"
            ? "less"
            : next.amount === "more"
              ? "more"
              : "standard",
        ).toLowerCase(),
        quantity: itemQuantity(id, next, locale),
      }),
    );
  }
  function confirm() {
    updateWeek({ confirmed: true });
    setNotice(
      t("your_loop_has_been_updated_your_choices_are_confirmed_in_the_d"),
    );
    navigate("week");
    if (view === "week") heading.current?.focus();
  }
  function reset() {
    resetWeek();
    setNotice(t("the_demo_has_restarted_all_choices_have_been_reset"));
    navigate("week");
  }

  const deliveryEditor = (
    <DeliveryChoice
      fulfilment={week.fulfilment}
      point={week.point}
      slot={week.slot}
      onFulfilment={(fulfilment) => change({ fulfilment })}
      onPoint={(point) => change({ point })}
      onSlot={(slot) => change({ slot })}
    />
  );
  const providerEditor = (
    <ProviderChoice
      selected={week.provider}
      onChange={(provider) => change({ provider })}
    />
  );
  const returnCrate = (
    <section className="return-crate" aria-labelledby="return-heading">
      <span className="return-icon">
        <Icon name="return" />
      </span>
      <div>
        <h2 className="eyebrow" id="return-heading">
          {t("previous_crate")}{" "}
        </h2>
        <p>
          {week.fulfilment === "delivery"
            ? t("collected_with_your_next_delivery")
            : t("bring_your_empty_crate_when_you_collect_the_next_one")}
        </p>
        <span className="fine-print">
          {t("a_small_effort_another_round_demo")}{" "}
        </span>
      </div>
    </section>
  );

  return (
    <AppShell view={view} onNavigate={navigate} onReset={reset}>
      <main id="main" className="main" tabIndex={-1}>
        <div className="week-topline">
          <span className="eyebrow">
            {view === "history"
              ? t("previous").toUpperCase()
              : view === "crate"
                ? t("my_crate").toUpperCase()
                : view === "delivery"
                  ? t("delivery").toUpperCase()
                  : t("this_week").toUpperCase()}
          </span>
          <span className="week-date">
            {datePeriod(mockCrate.start, mockCrate.end, locale)}{" "}
            <span className="date-dot" />{" "}
            {t("week_number", { number: mockCrate.week })}
          </span>
        </div>
        <div className="hero">
          <h1 ref={heading} tabIndex={-1}>
            {view === "history"
              ? t("the_previous_rounds")
              : view === "crate"
                ? t("your_crate_your_choices")
                : view === "delivery"
                  ? t("at_a_time_that_suits_you")
                  : t("good_morning")}
          </h1>
          {view === "week" && (
            <>
              <p className="hero-message">
                {t("your_loop_for_this_week_is_ready")}
              </p>
              <p className="hero-subtitle">
                {t("the_basics_are_handled_the_day_is_yours")}{" "}
              </p>
            </>
          )}
          {view === "crate" && (
            <p className="hero-subtitle">
              {t("the_basics_are_ready_choose_what_works_for_you")}{" "}
            </p>
          )}
          {view === "delivery" && (
            <p className="hero-subtitle">
              {t("choose_a_demo_provider_and_a_time_that_suits_you")}{" "}
            </p>
          )}
          {view === "history" && (
            <p className="hero-subtitle">
              {t("your_previous_crates_all_in_one_place_demo")}{" "}
            </p>
          )}
        </div>
        {view === "week" && (
          <div className="overview-grid">
            <CrateCard
              onReview={() => navigate("crate")}
              onSwap={() => navigate("crate")}
              changes={changes}
              confirmed={week.confirmed}
            />
            <aside
              className="week-logistics"
              aria-label={t("your_week_at_a_glance")}
            >
              <section className="delivery-summary">
                <div className="section-label">
                  <Icon
                    name={week.fulfilment === "delivery" ? "truck" : "crate"}
                  />
                  <h2 className="eyebrow">{receipt}</h2>
                  <span className="demo-small">DEMO</span>
                </div>
                <p className="delivery-day">{dayName(slot.day, locale)}</p>
                <p className="delivery-time">{slot.time}</p>
                <p className="muted">
                  {week.fulfilment === "delivery"
                    ? t("at_your_door_in_this_demo")
                    : `${pointName(point.id, locale)} · ${t("fictional_location")}`}
                </p>
                <details
                  className="inline-editor"
                  data-disclosure="delivery-summary"
                >
                  <summary>
                    {t("change_time_or_collection_method")}{" "}
                    <span aria-hidden="true">↗</span>
                  </summary>
                  {deliveryEditor}
                </details>
              </section>
              <section className="provider-summary">
                <h2 className="eyebrow">{t("demo_providers")}</h2>
                <div className="provider-name">
                  <span className="store-icon">
                    <Icon name="crate" />
                  </span>
                  <div>
                    <strong>{provider.name}</strong>
                    <span>{t("prepares_your_demo_crate")}</span>
                  </div>
                </div>
                <details
                  className="inline-editor"
                  data-disclosure="provider-summary"
                >
                  <summary>
                    {t("choose_a_provider")} <span aria-hidden="true">↗</span>
                  </summary>
                  {providerEditor}
                </details>
              </section>
              {returnCrate}
            </aside>
          </div>
        )}
        {view === "crate" && (
          <CrateContents
            items={week.items}
            onChange={changeItem}
            onBack={() => navigate("week")}
            onDelivery={() => navigate("delivery")}
          />
        )}
        {view === "delivery" && (
          <section
            className="detail-panel delivery-panel"
            aria-label={t("choose_provider_and_collection_method")}
          >
            <div>{providerEditor}</div>
            <div>{deliveryEditor}</div>
          </section>
        )}
        {view === "history" && <CrateHistory onBack={() => navigate("week")} />}
        {view !== "history" && !week.confirmed && (
          <section
            className="confirm-bar"
            aria-label={t("confirm_your_demo_week")}
          >
            <div>
              <h2>{t("all_as_you_like_it")}</h2>
              <p>
                {t("your_choices_are_ready_confirm_and_get_on_with_your_day")}
              </p>
              <span className="confirm-summary">
                {provider.name} · {receipt} · {dayName(slot.day, locale)}{" "}
                {slot.time}
                {week.fulfilment === "pickup"
                  ? ` · ${pointName(point.id, locale)}`
                  : ""}
                {changes.length
                  ? ` · ${t(changes.length === 1 ? "count_product_changed" : "count_products_changed", { count: changes.length })}`
                  : ""}
              </span>
            </div>
            <button className="button primary confirm-button" onClick={confirm}>
              {t("confirm_my_week")} <Icon name="check" />
            </button>
            <span className="confirm-demo">
              {t("a_confirmation_in_this_demo_only")}{" "}
            </span>
          </section>
        )}
        {view !== "history" && week.confirmed && (
          <section
            className="confirm-bar confirmed-bar"
            aria-label={t("your_confirmed_demo_week")}
          >
            <div>
              <h2>
                <Icon name="check" /> {t("your_loop_has_been_updated")}{" "}
              </h2>
              <p>{t("the_basics_are_handled_the_day_is_yours")}</p>
              <span className="confirm-summary">
                {receipt} · {dayName(slot.day, locale)} {slot.time} ·{" "}
                {week.fulfilment === "pickup"
                  ? pointName(point.id, locale)
                  : provider.name}{" "}
                · Demo
              </span>
            </div>
            <button
              className="text-button"
              onClick={() => navigate(view === "week" ? "crate" : "week")}
            >
              {view === "week" ? t("edit_my_crate") : t("back_to_this_week")}{" "}
              <Icon name="arrow" />
            </button>
          </section>
        )}
        <div className="quiet-line">
          <Icon name="leaf" />
          <span>{t("basics_you_can_rely_on_room_to_live")}</span>
        </div>
        <span className="sr-only" role="status">
          {notice}
        </span>
      </main>
    </AppShell>
  );
}
