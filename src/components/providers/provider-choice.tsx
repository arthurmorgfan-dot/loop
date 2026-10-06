import { providerDescription } from "@/i18n/data";
import { useLocale } from "@/i18n/locale-provider";
import { mockProviders } from "@/data/mock-providers";
import type { ProviderId } from "@/types/loop";

export function ProviderChoice({
  selected,
  onChange,
}: {
  selected: ProviderId;
  onChange: (id: ProviderId) => void;
}) {
  const { locale, t } = useLocale();
  return (
    <fieldset className="provider-choice">
      <legend>{t("demo_providers_alt")}</legend>
      <p className="muted">
        {t(
          "in_a_future_loop_service_participating_providers_could_prepare",
        )}{" "}
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
              <small>{providerDescription(provider.id, locale)}</small>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
