import { crateItems, ingredientName } from "@/data/mock-crate";
import { mockMeals } from "@/data/mock-meals";
import { mockUser } from "@/data/mock-user";
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
            7 DAGEN · {mockUser.household.toUpperCase()}
          </p>
          <h2 id="contents-heading">Dit zit in je demo-krat</h2>
        </div>
        <button className="text-button" onClick={onBack}>
          Terug naar deze week <Icon name="arrow" />
        </button>
      </div>
      <p className="fine-print crate-demo-note">
        Candidate 020 · Demo-inhoud, zonder vastgestelde hoeveelheden of
        voedingskundige validatie. Minder is een voorbeeldkeuze, geen exact
        gewicht.
      </p>
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
      <details className="inline-editor meal-ideas">
        <summary>
          Gebruik wat je hebt <span aria-hidden="true">↗</span>
        </summary>
        <h3>Een paar ideeën voor je week</h3>
        <p className="fine-print">
          Demo-maaltijdideeën met ingrediënten uit jouw huidige krat. Geen
          complete recepten of gevalideerd voedingsplan.
        </p>
        {meals.length ? (
          <ul>
            {meals.map((meal) => (
              <li key={meal.name}>
                <strong>{meal.name}</strong>
                <span>
                  {meal.groups
                    .map((group) =>
                      ingredientName(group.find((id) => available.has(id))!),
                    )
                    .join(" · ")}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">
            Voor deze combinatie zijn er nog geen demo-ideeën. Je krat blijft
            helemaal jouw keuze.
          </p>
        )}
      </details>
      <button className="button secondary crate-next" onClick={onDelivery}>
        Verder naar bezorging <Icon name="arrow" />
      </button>
    </section>
  );
}
