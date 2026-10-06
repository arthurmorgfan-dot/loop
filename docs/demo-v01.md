# LOOP — functioning product demo v0.1

Completed 6 October 2026. The existing visual design is retained: lowercase wordmark, cream/forest-green palette, typeface, navigation, illustration, spacing and restrained feedback. The dashboard remains a local prototype. No food is ordered, received, paid for or nutritionally validated.

## 1. Files changed

Updated existing files:

- `src/types/loop.ts` — typed ingredient choices, per-item amount state, fictional pickup points, history and current-week schema.
- `src/data/mock-crate.ts` — supplied Candidate 020 ingredient names, constrained alternatives, initial choices and change-summary helpers.
- `src/data/mock-providers.ts` — retains fictional providers; adds two fictional LOOP Points and a Wednesday evening demo window to existing time options.
- `src/lib/use-demo-week.ts` — extends the existing external-store hook to localStorage, item updates, reset and cross-tab updates.
- `src/components/layout/app-shell.tsx` — adds the footer reset action; preserves navigation and account control.
- `src/components/dashboard/dashboard.tsx` — connects all views, live summaries, confirmation and reset.
- `src/components/crate/crate-card.tsx` — uses “Bekijk mijn krat,” reflects changes and confirmation in the existing crate object.
- `src/components/products/product-choice.tsx` — per-item keep/reduce/replace/undo controls.
- `src/components/delivery/delivery-choice.tsx` — home delivery/LOOP Point, fictional point selection and demo time window.
- `src/app/globals.css` — scoped styles for the new interactions, text-enlargement reflow and a 16px native select.

Added:

- `src/data/mock-history.ts` — three fixed, fictional previous-week snapshots.
- `src/data/mock-meals.ts` — four ingredient-based meal concepts.
- `src/lib/demo-state.ts` — saved-state validation and legacy-session migration.
- `src/components/crate/crate-contents.tsx` — calm weekly list, meal disclosure and next action.
- `src/components/history/crate-history.tsx` — expandable previous weeks with contents, fulfilment and modifications.
- `docs/demo-v01.md` — this handover.

No package dependencies, routes, authentication, services or backend infrastructure were added. The original page/root layout, provider component, illustration and app icon are preserved. Earlier uncommitted prototype changes were retained.

## 2. Architecture used

Next.js 16.3.8, React 19.2.8, TypeScript, App Router, one `/` page and the existing plain-CSS design system. The page/layout remain server components; Dashboard remains the client entry point. Four local views reuse the current navigation. Mock content lives in typed data files, and the existing `useSyncExternalStore` hook supplies one shared week to every view.

Per-item choices record an ingredient and either the standard demo amount or “less.” There are no weights, counts or repeated +/- quantity changes. Substitutions are constrained by each item's declared alternatives. “Houden” restores the standard amount for the currently selected ingredient. “Herstel” restores both the original ingredient and its standard demo amount.

History is a separate set of fixed read-only examples; editing this week does not alter an earlier example. Confirming does not advance the calendar or fabricate a received crate.

## 3. What is functional

Open home → view the crate → reduce/replace an item → undo if desired → select home delivery or a LOOP Point and time → return home to see changes → confirm → see the updated weekly overview → reopen/edit → inspect earlier demo weeks.

Home retains its original greeting, primary message, crate illustration and layout after confirmation. Changed ingredients appear in the crate's small change summary. The receipt heading becomes “Ophalen” for a LOOP Point, with the chosen fictional location and time. Confirmation says “Je LOOP is aangepast.” and returns directly to this same overview; no celebration or checkout is introduced. Any new choice reopens confirmation.

“Gebruik wat je hebt” is implemented as a small native disclosure within Mijn krat. It shows only concepts whose required ingredient groups are present in the current crate. Replacing spinach with kale removes spinach-dependent concepts rather than implying equivalence.

The prototype footer includes **Demo opnieuw starten**. It restores the current week to its original choices and returns home. It also works when storage is blocked.

## 4. Demo data introduced

The 13 supplied Candidate 020 names: Havermout, Volkorenbrood, Aardappelen, Groene linzen, Rode linzen, Wortels, Spinazie, Appels, Sinaasappel, Gemengde noten, Koolzaadolie, Zilvervliesrijst and Verrijkte sojadrink. No verified quantities were found in this repository, so none were added.

Small fictional substitution sets include Appels → Sinaasappel/Peer, Spinazie → Boerenkool, and lentil alternatives. These demonstrate the interaction, not nutritional equivalence. Product controls explicitly label alternatives as demo choices, and the crate explains that “Minder” has no established weight or validated nutrition model.

LOOP Point Demo Noord and LOOP Point Demo Zuid are explicitly fictitious, inactive locations with no address or real partner. The original fictional providers remain. Four small demo windows include Wednesday 18:00–20:00 and the original Thursday/Friday windows; the original Thursday morning default is retained to preserve the initial home screen.

Weeks 40, 39 and 38 contain fictional contents, fulfilment methods and modifications. Each is marked DEMO, with explicit text that no delivery, pickup or purchase happened. Meal concepts are Linzensoep, Rijst met linzen en spinazie, Aardappel-spinazie stamppot and Havermout met fruit. They are ideas, not full recipes or a complete validated diet.

## 5. Persistence

The localStorage key is `loop-demo-v01`; its internal schema version is 2 to distinguish it from the earlier prototype's single-food model. This is still product Demo v0.1.

Stored fields: all 13 item choices, keep/less state, substitutions, fictional provider, delivery/pickup, fictional point, window and confirmation. They survive navigation, refresh and a new tab in the same browser origin. Storage events update another open demo tab. Views and open disclosures remain temporary UI state.

Known values are restored individually; unsupported ingredients, substitutions, locations, providers, windows or schema versions cannot introduce arbitrary choices. Invalid JSON falls back safely. The old tab-scoped `loop-demo-week-v01` preferences are read and migrated when no new saved week exists, then saved in the new format on the next interaction. Reset writes a complete default week, preventing old state from reappearing.

If browser storage cannot be read or written, interaction continues in memory. In that case the app cannot preserve choices after a page reload. No personal information is collected.

## 6. Accessibility and responsive checks

Native semantic buttons, labelled radios/fieldsets/select, native disclosures, visible focus, item-specific control labels, a skip link and a polite status region. Undo moves focus to the surviving “Houden” control. View changes and confirmation focus the new main heading. The existing mobile bottom navigation and reduced-motion behavior remain; active choices also have a visible selected state.

Measured interactive targets are at least 44px high; primary controls and radio labels use the existing comfortable 48–54px sizing. Keyboard confirmation remains above the fixed mobile navigation. Text enlargement reflows header/metadata/crate facts and long headings without changing the normal composition.

Local Chromium checks passed at 320, 375, 390, 430, 768, 1024, 1440 and 1920px. Each width exercised home, crate, modified crate with replacement disclosure, LOOP Point selection, confirmed overview and expanded history. No horizontal document overflow or undersized measured targets. axe WCAG 2 A/AA and 2.1 AA scans reported zero automated violations in those states; this is not accessibility certification.

All four views were also checked at all eight widths with explicit CSS font sizes doubled to 200%, including open replacement/history disclosures and LOOP Point controls. All 32 combinations had no horizontal overflow. This is a text-size test, not physical-device or screen-reader certification.

## 7. Tests/build results

- `npm run lint` — passed.
- `npx tsc --noEmit` — passed.
- `npm run build` — passed; the dashboard is statically prerendered.
- `git diff --check` — passed.
- Full consumer flow at all eight widths — passed, including hold/reduce, replacement, undo, provider selection, point selection, time, home reflection, confirmation, reopening, refresh, new-tab persistence, cross-tab synchronization, history and reset.
- Every alternative on all 13 items, standard/less choices and full undo — passed.
- Meal concepts respond to current ingredients — passed.
- Legacy migration, invalid JSON, invalid choices, unsupported schema, blocked storage reads and blocked writes — passed.
- Keyboard-only flow at 375px — passed, including replacement radios, undo, fictional provider/point, native time-select type-ahead, confirmation and reopening.
- Reduced-motion checks — passed.
- No browser runtime exceptions in the full-flow/state-handling runs.
- Desktop/mobile screenshots reviewed; original home composition retained.

Validation used the existing external Playwright/axe installation, with scripts and evidence in `/private/tmp/loop-product-demo-validation/`: `check.mjs`, `keyboard.mjs`, `edges.mjs`, `enlargement.mjs`, JSON results and screenshots. No test packages were added to LOOP. Browser-plugin setup was unavailable earlier in this session, so validation used standalone local Chromium. Production preview runs separately at `http://127.0.0.1:3101`; the existing development server was left untouched.

## 8. Intentionally deferred

All excluded production features remain absent: accounts/authentication, databases, real addresses/partners/locations, payment, checkout, tracking, notifications, actual inventory and nutrition/logistics optimization. No additional catalogue or automatic recipe generation was introduced. History is illustrative rather than an actual received-crate ledger. No Demo v0.2 work was started.

## 9. Human review

Try the connected flow on a physical iOS/Android phone, review the Dutch copy and check with a screen reader. Confirm that the larger 13-item list and constrained replacement model still feel effortless. The “Minder” concept needs product feedback before introducing any quantities, and the nutrition model remains unvalidated. Consider a short usability session to test the ten-second reassurance principle; automated checks cannot establish that experience.
