import { dayName } from "@/i18n/locale";
import { pointName } from "@/i18n/data";
import { useLocale } from "@/i18n/locale-provider";
import { mockPoints, mockSlots } from "@/data/mock-providers";
import type { Fulfilment, PointId, SlotId } from "@/types/loop";

export function DeliveryChoice({
  fulfilment,
  point,
  slot,
  onFulfilment,
  onPoint,
  onSlot,
}: {
  fulfilment: Fulfilment;
  point: PointId;
  slot: SlotId;
  onFulfilment: (value: Fulfilment) => void;
  onPoint: (value: PointId) => void;
  onSlot: (value: SlotId) => void;
}) {
  const { locale, t } = useLocale();
  return (
    <div className="delivery-choice">
      <fieldset>
        <legend>{t("how_would_you_like_to_receive_your_crate")}</legend>
        <div className="food-options">
          {(
            [
              { id: "delivery", name: t("home_delivery") },
              { id: "pickup", name: t("loop_point") },
            ] as const
          ).map((option) => (
            <label key={option.id} className="radio-tile">
              <input
                name="fulfilment"
                type="radio"
                checked={fulfilment === option.id}
                onChange={() => onFulfilment(option.id)}
              />
              <span>{option.name}</span>
            </label>
          ))}
        </div>
      </fieldset>
      {fulfilment === "pickup" && (
        <fieldset className="pickup-points">
          <legend>{t("demo_loop_points")}</legend>
          <p className="fine-print">
            {t(
              "fictional_locations_with_no_real_addresses_or_partners_nothing",
            )}{" "}
          </p>
          <div className="provider-options">
            {mockPoints.map((location) => (
              <label key={location.id} className="radio-tile provider-option">
                <input
                  name="point"
                  type="radio"
                  checked={point === location.id}
                  onChange={() => onPoint(location.id)}
                />
                <span>
                  <strong>{pointName(location.id, locale)}</strong>
                  <small>
                    {t("fictional_pickup_location_not_an_active_point")}
                  </small>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <label className="select-label" htmlFor="time-slot">
        {fulfilment === "delivery" ? t("delivery_time") : t("pickup_time")}{" "}
        <span className="muted">· demo</span>
      </label>
      <select
        id="time-slot"
        value={slot}
        onChange={(event) => onSlot(event.target.value as SlotId)}
      >
        {mockSlots.map((option) => (
          <option key={option.id} value={option.id}>
            {dayName(option.day, locale)} · {option.time}
          </option>
        ))}
      </select>
      <p className="fine-print">
        {t("your_choice_is_saved_in_this_demo_only_nothing_is_booked")}{" "}
      </p>
    </div>
  );
}
