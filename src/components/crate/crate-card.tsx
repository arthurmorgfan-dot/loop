import Image from "next/image";
import { mockCrate } from "@/data/mock-crate";
import { mockUser } from "@/data/mock-user";
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
  return (
    <section className="crate-card" aria-labelledby="crate-heading">
      <div className="crate-art">
        <div className="art-label">
          <span className="eyebrow">LOOP KRAT</span>
          <span>
            {mockCrate.week} <span aria-hidden="true">↗</span>
          </span>
        </div>
        <Image
          src="/illustrations/loop-crate.svg"
          alt="Illustratie van een herbruikbare LOOP krat met groente, fruit en basisproducten"
          width={620}
          height={410}
          priority
          className="crate-illustration"
        />
        <span className="art-caption">
          <span className="tiny-dot" /> Goed gevuld. Met aandacht.
        </span>
      </div>
      <div className="crate-copy">
        <div className="crate-title-row">
          <h2 id="crate-heading">Deze week</h2>
          <span className="period">{mockCrate.period}</span>
        </div>
        <p className="crate-description">
          Een goede basis voor <br />
          jouw hele week.
        </p>
        <div className="crate-facts">
          <span>
            <strong>{mockCrate.days} dagen</strong>Voedzame basis
          </span>
          <span>
            <strong>{mockUser.household}</strong>Ruimte voor jouw keuzes
          </span>
        </div>
        <p className="status">
          <span className="tiny-dot" />{" "}
          {confirmed ? "Je LOOP is aangepast." : "Klaar om te bevestigen"}
        </p>
        {changes.length > 0 && (
          <p
            className="fine-print crate-change-summary"
            aria-label="Aanpassingen in je krat"
          >
            {changes.map((change) => change.text).join(" · ")}
          </p>
        )}
        <div className="crate-actions">
          <button className="button primary" onClick={onReview}>
            Bekijk mijn krat <Icon name="arrow" />
          </button>
          <button className="text-button" onClick={onSwap}>
            Wissel producten <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}
