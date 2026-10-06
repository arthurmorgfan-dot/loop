import { mockUser } from "@/data/mock-user";
import { useLocale } from "@/i18n/locale-provider";
import { crateItems, ingredientName, mockCrate } from "@/data/mock-crate";
import { mockMeals } from "@/data/mock-meals";
import { mealKeys } from "@/i18n/data";
import { ProductChoice } from "@/components/products/product-choice";
import { Icon } from "@/components/ui/icon";
import type { CrateItemId, ItemChoice, WeekPreferences } from "@/types/loop";

export function CrateContents({
  items,
  onChange,
  onBack,
  onDelivery,
}: {
  items: WeekPreferences["items"];
  onChange: (id: CrateItemId, patch: Partial<ItemChoice>) => void;
  onBack: () => void;
  onDelivery: () => void;
}) {
  const { locale, t } = useLocale();
  const available = new Set(
    Object.values(items).map((choice) => choice.ingredient),
  );
  const meals = mockMeals.filter((meal) =>
    meal.groups.every((group) =>
      group.some((ingredient) => available.has(ingredient)),
    ),
  );
  return (
    <section className="detail-panel" aria-labelledby="contents-heading">
      <div className="panel-top">
        <div>
          <p className="eyebrow">
            {t("count_days", { count: mockCrate.days }).toUpperCase()} ·{" "}
            {t("for_count_person", {
              count: mockUser.householdSize,
            }).toUpperCase()}
          </p>
          <h2 id="contents-heading">{t("what_s_in_your_crate")}</h2>
        </div>
        <button className="text-button" onClick={onBack}>
          {t("back_to_this_week")} <Icon name="arrow" />
        </button>
      </div>
      <p className="crate-inventory-summary">
        <strong>{t("count_products", { count: crateItems.length })}</strong> ·{" "}
        {t("the_basics_for_this_week")}
      </p>
      <details className="crate-model-note" data-disclosure="model-note">
        <summary>
          {t("demo_candidate_020")} <span aria-hidden="true">ⓘ</span>
        </summary>
        <p className="fine-print">
          {t(
            "the_contents_and_weekly_quantities_come_from_candidate_020_mod",
          )}{" "}
        </p>
      </details>
      <ul className="category-list item-list">
        {crateItems.map((item) => (
          <ProductChoice
            key={item.id}
            item={item}
            choice={items[item.id]}
            onChange={(patch) => onChange(item.id, patch)}
          />
        ))}
      </ul>
      <details
        className="inline-editor meal-ideas"
        data-disclosure="meal-ideas"
      >
        <summary>
          {t("use_what_you_have")} <span aria-hidden="true">↗</span>
        </summary>
        <h3>{t("a_few_ideas_for_your_week")}</h3>
        <p className="fine-print">
          {t(
            "demo_meal_ideas_using_ingredients_in_your_current_crate_not_co",
          )}{" "}
        </p>
        {meals.length ? (
          <ul>
            {meals.map((meal) => (
              <li key={meal.id}>
                <strong>{t(mealKeys[meal.id])}</strong>
                <span>
                  {meal.groups
                    .map((group) =>
                      ingredientName(
                        group.find((id) => available.has(id))!,
                        locale,
                      ),
                    )
                    .join(" · ")}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">
            {t(
              "there_are_no_demo_ideas_for_this_combination_yet_your_crate_is",
            )}{" "}
          </p>
        )}
      </details>
      <button className="button secondary crate-next" onClick={onDelivery}>
        {t("continue_to_delivery")} <Icon name="arrow" />
      </button>
    </section>
  );
}
