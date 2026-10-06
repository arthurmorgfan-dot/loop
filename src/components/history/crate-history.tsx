import { crateItems, ingredientName, itemChanges } from "@/data/mock-crate";
import { mockHistory } from "@/data/mock-history";
import { mockPoints } from "@/data/mock-providers";
import { Icon } from "@/components/ui/icon";

export function CrateHistory({ onBack }: { onBack: () => void }) {
  return (
    <section
      className="detail-panel history-panel"
      aria-label="Eerdere demo-kratten"
    >
      <p className="fine-print">
        Fictieve demo-weken. Er hebben geen bezorgingen, afhalingen of aankopen
        plaatsgevonden.
      </p>
      <div className="history-weeks">
        {mockHistory.map((week) => {
          const changes = itemChanges(week.items);
          const point = mockPoints.find((item) => item.id === week.point);
          return (
            <details key={week.id} className="inline-editor history-week">
              <summary>
                <span>
                  <strong>{week.label}</strong>
                  <span className="history-period">{week.period} · DEMO</span>
                </span>
                <span aria-hidden="true">↗</span>
              </summary>
              <div className="history-receipt">
                <p>
                  {week.fulfilment === "delivery"
                    ? "Thuisbezorgd"
                    : "LOOP Point"}{" "}
                  · {week.day} {week.time}
                </p>
                {point && (
                  <p className="fine-print">{point.name} · Fictieve locatie</p>
                )}
              </div>
              <h3>In dit demo-krat</h3>
              <ul className="history-contents">
                {crateItems.map((item) => (
                  <li key={item.id}>
                    {ingredientName(week.items[item.id].ingredient)}
                    {week.items[item.id].amount === "less" ? " · minder" : ""}
                  </li>
                ))}
              </ul>
              <h3>Aanpassingen in deze demo-week</h3>
              {changes.length ? (
                <ul className="history-changes">
                  {changes.map((change) => (
                    <li key={change.id}>{change.text}</li>
                  ))}
                </ul>
              ) : (
                <p className="muted">Geen aanpassingen in dit voorbeeld.</p>
              )}
            </details>
          );
        })}
      </div>
      <button className="text-button" onClick={onBack}>
        Naar deze week <Icon name="arrow" />
      </button>
    </section>
  );
}
