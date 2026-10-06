import { categoryName } from "@/i18n/data";
import { useLocale } from "@/i18n/locale-provider";
import { useRef } from "react";
import { ingredientName } from "@/data/mock-crate";
import { itemQuantity } from "@/data/model-quantities";
import { IngredientArt } from "./ingredient-art";
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
  const { locale, t } = useLocale();
  const keepButton = useRef<HTMLButtonElement>(null);
  const original = ingredientName(item.id, locale);
  const name = ingredientName(choice.ingredient, locale);
  const changed = choice.ingredient !== item.id || choice.amount !== "standard";
  return (
    <li className="crate-item" id={`item-${item.id}`}>
      <details
        className="ingredient-editor"
        name="crate-ingredient"
        data-disclosure={`ingredient-${item.id}`}
      >
        <summary className="item-heading" aria-label={t("edit_name", { name })}>
          <span className="category-icon">
            <IngredientArt ingredient={choice.ingredient} />
          </span>
          <div>
            <h3>{name}</h3>
            <p>
              {choice.ingredient !== item.id
                ? t("instead_of_name", { name: original })
                : ""}
              {categoryName(item.category, locale)} ·{" "}
              {itemQuantity(item.id, choice, locale)}
              {choice.amount === "less"
                ? ` · ${t("less").toLowerCase()}`
                : choice.amount === "more"
                  ? ` · ${t("more").toLowerCase()}`
                  : ""}
            </p>
          </div>
          <span className="ingredient-open" aria-hidden="true">
            <Icon name="arrow" />
          </span>
        </summary>
        <div
          className="item-actions"
          role="group"
          aria-label={t("quantity_for_name", { name })}
        >
          <button
            ref={keepButton}
            className="text-button"
            aria-label={t("standard_name", { name })}
            aria-pressed={choice.amount === "standard"}
            onClick={() => onChange({ amount: "standard" })}
          >
            {t("standard")}{" "}
          </button>
          <button
            className="text-button"
            aria-label={t("less_name", { name })}
            aria-pressed={choice.amount === "less"}
            onClick={() => onChange({ amount: "less" })}
          >
            {t("less")}{" "}
          </button>
          <button
            className="text-button"
            aria-label={t("more_name", { name })}
            aria-pressed={choice.amount === "more"}
            onClick={() => onChange({ amount: "more" })}
          >
            {t("more")}{" "}
          </button>
          <details
            className="item-replacement"
            data-disclosure={`replacement-${item.id}`}
          >
            <summary aria-label={t("replace_name", { name: original })}>
              {t("replace")} <span aria-hidden="true">↗</span>
            </summary>
            <fieldset>
              <legend>{t("replace_name_alt", { name: original })}</legend>
              <p className="fine-print">
                {t(
                  "demo_choices_not_assessed_for_nutritional_equivalence",
                )}{" "}
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
                      {ingredientName(id, locale)}
                      {id === item.id ? t("original") : ""}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </details>
        </div>
        <p className="fine-print item-quantity-note">
          {t("demo_quantity_for_this_week_less_and_more_are_example_settings")}{" "}
          {choice.ingredient !== item.id
            ? t(
                "this_replacement_uses_the_original_crate_item_s_quantity_for_t",
              )
            : ""}
        </p>
        {changed && (
          <button
            className="text-button item-undo"
            aria-label={t("undo_name", { name: original })}
            onClick={() => {
              keepButton.current?.focus();
              onChange({ ingredient: item.id, amount: "standard" });
            }}
          >
            {t("undo")} <Icon name="return" />
          </button>
        )}
      </details>
    </li>
  );
}
