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
  return (
    <div className="delivery-choice">
      <fieldset>
        <legend>Hoe ontvang je je krat?</legend>
        <div className="food-options">
          {(
            [
              { id: "delivery", name: "Thuisbezorgd" },
              { id: "pickup", name: "LOOP Point" },
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
          <legend>Demo LOOP Points</legend>
          <p className="fine-print">
            Fictieve locaties, zonder echte adressen of partners. Hier kun je
            niets ophalen.
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
                  <strong>{location.name}</strong>
                  <small>{location.description}</small>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <label className="select-label" htmlFor="time-slot">
        {fulfilment === "delivery" ? "Bezorgmoment" : "Ophaalmoment"}{" "}
        <span className="muted">· demo</span>
      </label>
      <select
        id="time-slot"
        value={slot}
        onChange={(event) => onSlot(event.target.value as SlotId)}
      >
        {mockSlots.map((option) => (
          <option key={option.id} value={option.id}>
            {option.day} · {option.time}
          </option>
        ))}
      </select>
      <p className="fine-print">
        Je keuze wordt alleen in deze demo bewaard. Er wordt niets geboekt.
      </p>
    </div>
  );
}
