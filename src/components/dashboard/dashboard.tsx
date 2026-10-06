"use client";

import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { CrateCard } from "@/components/crate/crate-card";
import { CrateContents } from "@/components/crate/crate-contents";
import { CrateHistory } from "@/components/history/crate-history";
import { ProviderChoice } from "@/components/providers/provider-choice";
import { DeliveryChoice } from "@/components/delivery/delivery-choice";
import { Icon } from "@/components/ui/icon";
import { ingredientName, itemChanges, mockCrate } from "@/data/mock-crate";
import { mockPoints, mockProviders, mockSlots } from "@/data/mock-providers";
import { useDemoWeek } from "@/lib/use-demo-week";
import type {
  CrateItemId,
  ItemChoice,
  View,
  WeekPreferences,
} from "@/types/loop";

export function Dashboard() {
  const { week, updateWeek, updateItem, resetWeek } = useDemoWeek();
  const [view, setView] = useState<View>("week");
  const [notice, setNotice] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const focusNext = useRef(false);
  const provider = mockProviders.find((item) => item.id === week.provider)!;
  const slot = mockSlots.find((item) => item.id === week.slot)!;
  const point = mockPoints.find((item) => item.id === week.point)!;
  const changes = itemChanges(week.items);
  const receipt = week.fulfilment === "delivery" ? "Bezorging" : "Ophalen";

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
  }
  function change(patch: Partial<WeekPreferences>) {
    updateWeek({ ...patch, confirmed: false });
    setNotice(
      "Je ontvangstkeuze is aangepast in de demo. Bevestig je week wanneer alles naar wens is.",
    );
  }
  function changeItem(id: CrateItemId, patch: Partial<ItemChoice>) {
    updateItem(id, patch);
    const next = { ...week.items[id], ...patch };
    setNotice(
      `${ingredientName(id)}: ${ingredientName(next.ingredient)}${next.amount === "less" ? ", minder" : ""}. Je demo-krat is bijgewerkt.`,
    );
  }
  function confirm() {
    updateWeek({ confirmed: true });
    setNotice("Je LOOP is aangepast. Je keuzes zijn bevestigd in de demo.");
    navigate("week");
    if (view === "week") heading.current?.focus();
  }
  function reset() {
    resetWeek();
    setNotice("De demo is opnieuw gestart. Alle keuzes zijn teruggezet.");
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
          Vorige krat
        </h2>
        <p>
          {week.fulfilment === "delivery"
            ? "Wordt meegenomen bij je volgende bezorging."
            : "Neem je lege krat mee als je de volgende ophaalt."}
        </p>
        <span className="fine-print">
          Een kleine moeite. Een nieuwe ronde. · Demo
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
              ? "EERDER"
              : view === "crate"
                ? "MIJN KRAT"
                : view === "delivery"
                  ? "BEZORGING"
                  : "DEZE WEEK"}
          </span>
          <span className="week-date">
            {mockCrate.period} <span className="date-dot" /> {mockCrate.week}
          </span>
        </div>
        <div className="hero">
          <h1 ref={heading} tabIndex={-1}>
            {view === "history"
              ? "De vorige rondes."
              : view === "crate"
                ? "Jouw krat. Jouw keuzes."
                : view === "delivery"
                  ? "Op jouw moment."
                  : "Goedemorgen."}
          </h1>
          {view === "week" && (
            <>
              <p className="hero-message">Je LOOP voor deze week is klaar.</p>
              <p className="hero-subtitle">
                De basis is geregeld. De dag is van jou.
              </p>
            </>
          )}
          {view === "crate" && (
            <p className="hero-subtitle">
              De basis staat klaar. Kies wat bij je past.
            </p>
          )}
          {view === "delivery" && (
            <p className="hero-subtitle">
              Kies een demo-aanbieder en een moment dat je uitkomt.
            </p>
          )}
          {view === "history" && (
            <p className="hero-subtitle">
              Je eerdere kratten, rustig op een rij. · Demo
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
            <aside className="week-logistics" aria-label="Je week in het kort">
              <section className="delivery-summary">
                <div className="section-label">
                  <Icon
                    name={week.fulfilment === "delivery" ? "truck" : "crate"}
                  />
                  <h2 className="eyebrow">{receipt}</h2>
                  <span className="demo-small">DEMO</span>
                </div>
                <p className="delivery-day">{slot.day}</p>
                <p className="delivery-time">{slot.time}</p>
                <p className="muted">
                  {week.fulfilment === "delivery"
                    ? "Aan je deur, in deze demo."
                    : `${point.name} · Fictieve locatie`}
                </p>
                <details className="inline-editor">
                  <summary>
                    Moment of ontvangst wijzigen{" "}
                    <span aria-hidden="true">↗</span>
                  </summary>
                  {deliveryEditor}
                </details>
              </section>
              <section className="provider-summary">
                <h2 className="eyebrow">DEMO-AANBIEDERS</h2>
                <div className="provider-name">
                  <span className="store-icon">
                    <Icon name="crate" />
                  </span>
                  <div>
                    <strong>{provider.name}</strong>
                    <span>Stelt je demo-krat samen</span>
                  </div>
                </div>
                <details className="inline-editor">
                  <summary>
                    Aanbieder kiezen <span aria-hidden="true">↗</span>
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
            aria-label="Aanbieder en ontvangst kiezen"
          >
            <div>{providerEditor}</div>
            <div>{deliveryEditor}</div>
          </section>
        )}
        {view === "history" && <CrateHistory onBack={() => navigate("week")} />}
        {view !== "history" && !week.confirmed && (
          <section className="confirm-bar" aria-label="Je demo-week bevestigen">
            <div>
              <h2>Alles naar wens?</h2>
              <p>Je keuzes staan klaar. Bevestig en laat het los.</p>
              <span className="confirm-summary">
                {provider.name} · {receipt} · {slot.day} {slot.time}
                {week.fulfilment === "pickup" ? ` · ${point.name}` : ""}
                {changes.length
                  ? ` · ${changes.length} ${changes.length === 1 ? "product aangepast" : "producten aangepast"}`
                  : ""}
              </span>
            </div>
            <button className="button primary confirm-button" onClick={confirm}>
              Bevestig mijn week <Icon name="check" />
            </button>
            <span className="confirm-demo">
              Alleen een bevestiging in deze demo
            </span>
          </section>
        )}
        {view !== "history" && week.confirmed && (
          <section
            className="confirm-bar confirmed-bar"
            aria-label="Je bevestigde demo-week"
          >
            <div>
              <h2>
                <Icon name="check" /> Je LOOP is aangepast.
              </h2>
              <p>De basis is geregeld. De dag is van jou.</p>
              <span className="confirm-summary">
                {receipt} · {slot.day} {slot.time} ·{" "}
                {week.fulfilment === "pickup" ? point.name : provider.name} ·
                Demo
              </span>
            </div>
            <button
              className="text-button"
              onClick={() => navigate(view === "week" ? "crate" : "week")}
            >
              {view === "week" ? "Mijn krat aanpassen" : "Terug naar deze week"}{" "}
              <Icon name="arrow" />
            </button>
          </section>
        )}
        <div className="quiet-line">
          <Icon name="leaf" />
          <span>Een basis om op te vertrouwen. Ruimte om te leven.</span>
        </div>
        <span className="sr-only" role="status">
          {notice}
        </span>
      </main>
    </AppShell>
  );
}
