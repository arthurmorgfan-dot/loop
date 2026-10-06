import { useRef } from "react";
import { ingredientName } from "@/data/mock-crate";
import { Icon } from "@/components/ui/icon";
import type { CrateItem, ItemChoice } from "@/types/loop";

export function ProductChoice({
  item,
  choice,
  onChange,
}: {
  item: CrateItem;
  choice: ItemChoice;
  onChange: (patch: Partial<ItemChoice>) => void;
}) {
  const keepButton = useRef<HTMLButtonElement>(null);
  const original = ingredientName(item.id);
  const name = ingredientName(choice.ingredient);
  const changed = choice.ingredient !== item.id || choice.amount === "less";
  return (
    <li className="crate-item" id={`item-${item.id}`}>
      <div className="item-heading">
        <span className="category-icon">
          <Icon name={item.symbol} />
        </span>
        <div>
          <h3>{name}</h3>
          <p>
            {choice.ingredient !== item.id
              ? `In plaats van ${original} · `
              : ""}
            {item.category}
            {choice.amount === "less" ? " · minder" : ""}
          </p>
        </div>
      </div>
      <div
        className="item-actions"
        role="group"
        aria-label={`Hoeveelheid voor ${name}`}
      >
        <button
          ref={keepButton}
          className="text-button"
          aria-label={`Houden: ${name}`}
          aria-pressed={choice.amount === "standard"}
          onClick={() => onChange({ amount: "standard" })}
        >
          Houden
        </button>
        <button
          className="text-button"
          aria-label={`Minder: ${name}`}
          aria-pressed={choice.amount === "less"}
          onClick={() => onChange({ amount: "less" })}
        >
          Minder
        </button>
        <details className="item-replacement">
          <summary aria-label={`Vervangen: ${original}`}>
            Vervangen <span aria-hidden="true">↗</span>
          </summary>
          <fieldset>
            <legend>Vervang {original}</legend>
            <p className="fine-print">
              Demo-keuzes, niet beoordeeld op voedingskundige gelijkwaardigheid.
            </p>
            <div className="food-options">
              {[item.id, ...item.alternatives].map((id) => (
                <label key={id} className="radio-tile">
                  <input
                    type="radio"
                    name={`replacement-${item.id}`}
                    value={id}
                    checked={choice.ingredient === id}
                    onChange={() => onChange({ ingredient: id })}
                  />
                  <span>
                    {ingredientName(id)}
                    {id === item.id ? " (oorspronkelijk)" : ""}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </details>
      </div>
      {changed && (
        <button
          className="text-button item-undo"
          aria-label={`Herstel: ${original}`}
          onClick={() => {
            keepButton.current?.focus();
            onChange({ ingredient: item.id, amount: "standard" });
          }}
        >
          Herstel <Icon name="return" />
        </button>
      )}
    </li>
  );
}
