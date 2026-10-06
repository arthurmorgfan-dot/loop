import { mockProviders } from "@/data/mock-providers";
import type { ProviderId } from "@/types/loop";

export function ProviderChoice({
  selected,
  onChange,
}: {
  selected: ProviderId;
  onChange: (id: ProviderId) => void;
}) {
  return (
    <fieldset className="provider-choice">
      <legend>Demo-aanbieders</legend>
      <p className="muted">
        In een toekomstige LOOP-dienst zouden deelnemende aanbieders je weekkrat
        kunnen samenstellen via bestaande voedsel- en bezorgnetwerken.
      </p>
      <div className="provider-options">
        {mockProviders.map((provider) => (
          <label key={provider.id} className="radio-tile provider-option">
            <input
              name="provider"
              type="radio"
              checked={selected === provider.id}
              onChange={() => onChange(provider.id)}
            />
            <span>
              <strong>{provider.name}</strong>
              <small>{provider.description}</small>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
