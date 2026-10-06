# Mijn krat refinement — Demo v0.1

The existing LOOP design and complete product loop remain intact. This refinement changes the hierarchy within Mijn krat: food first, weekly quantity second, controls on demand.

## Files

Changed: `src/components/crate/crate-contents.tsx`, `src/components/products/product-choice.tsx`, `src/app/globals.css`, `src/data/mock-crate.ts`, `src/lib/demo-state.ts`, `src/types/loop.ts`, `src/components/dashboard/dashboard.tsx`.

Created: `src/data/model-quantities.ts`, `src/components/products/ingredient-art.tsx`, `docs/crate-refinement-v01.md`.

The dashboard change only updates the existing live-region announcement to include more/less/standard and the resulting demo amount. Navigation, fulfilment, history data, landing page and persistence hook are unchanged.

## Interaction

The default inventory has no visible quantity controls. Each native details/summary row shows a decorative food illustration, name, category, weekly amount and a subtle arrow. The shared details group allows only one ingredient editor open at once. Enter/Space and touch open it. The inline actions are Standaard, Minder, Meer and the existing constrained replacement disclosure. Herstel returns the original ingredient and baseline; Standaard retains a replacement while restoring its baseline amount. Closing an editor does not change the choice.

The original one-column mobile / two-column desktop inventory is retained. No modal, animated height, new navigation, dependency or quantity stepper is introduced. Illustrations are code-native SVG shapes using restrained greens, cream and natural grain colors. They are decorative; text names identify the food.

## Model and honesty

The 13 exact user-supplied Candidate 020 weekly model inputs live in the data module: 420 g oats, 1470 g bread, 1225 g potatoes, 414 g green lentils, 286 g red lentils, 1225 g carrots, 525 g spinach, 1393 g apples, 707 g orange, 70 g nuts, 201 g oil, 757 g rice and 4.2 L soy drink. These are model data, not validated production quantities, measured consumption or dietary recommendations.

Customer display uses Dutch formatting, kg above 1000 g, no more than two kg decimals and one liter decimal. Approximate gram values are rounded to 10 g; baseline values already divisible by 5 g are retained (e.g. spinach 525 g). Dry foods are labelled droog. Every amount refers to the displayed seven-day, one-person crate.

Minder = 75% and Meer = 125% of the modeled baseline; they are deliberately arbitrary product-interaction examples, not optimized nutrition. Adjustments above 1000 g use coarse 100 g rounding, below use 10 g; liters use one decimal. Thus carrots show 1,23 kg → 1,5 kg (more) or 920 g (less). Replacements inherit the original slot amount/unit solely as a demo convention, with explicit disclosure that this is not equivalent nutritional value.

The persistent visible “DEMO · Candidate 020 ⓘ” disclosure explains model data, unmeasured quantities, unvalidated nutritional suitability and unfinished commercial contents. Open ingredient editors also explain demo amounts and lack of nutritional optimization/equivalence. The existing global prototype statement remains.

## Persistence

Same `loop-demo-v01` localStorage key, version 2, external-store hook and legacy migration. The existing amount enum adds `more`; parsing recognizes it and continues to fall back to standard for unknown values. Existing standard/less saved choices, replacements and fulfilment choices are preserved. No gram values or disclosure-open state are persisted. Existing reset, blocked-storage fallback and cross-tab synchronization remain intact. The shared change-summary helper reflects “meer” on the home and confirmation views.

## Verification

- Lint, TypeScript and production build passed.
- Existing full demo regression test adapted only for the intentional row disclosures and Standaard label: passed at 320, 375, 390, 430, 768, 1024, 1440 and 1920 px.
- New hierarchy/quantity checks at all eight widths: default controls hidden, 13 illustrated products, exclusive disclosure, quantities, more/less, replacements, undo, refresh, confirmation/edit, reset and reduced motion passed.
- Axe WCAG 2 A/AA and 2.1 AA: zero violations in resting and edited/undo states at all widths. Comfortable >=44px visible controls, keyboard focus and native disclosures verified.
- Existing storage corruption, invalid/unsupported state, legacy migration, blocked read/write and all 13 substitutions passed.
- Existing keyboard-only full loop passed, including opening ingredients and more/less.
- 200% pixel-font enlargement through all demo views at all widths: zero overflow states.
- Mobile and desktop resting-inventory screenshots inspected: food dominates and controls are absent until opened.

Scripts/results/screenshots: `/private/tmp/loop-crate-refinement`. Browser preview: `http://127.0.0.1:3112/demo`.

Real nutritional validation, actual commercial amounts, nutritional equivalence, delivery and production commerce remain intentionally deferred. No Demo v0.2 feature was started and no deployment was performed. Real-device and screen-reader review remain useful; older browser engines without native details grouping may allow multiple rows to stay open, without preventing access to controls.
