# LOOP Dashboard v0.1 — implementation and validation

Completed on 6 October 2026. This is a local consumer-interaction prototype in a hypothetical signed-in state. No authentication, public funding, eligibility decision, provider connection, ordering, payment or delivery takes place.

## 1. Files created

- `src/components/layout/app-shell.tsx` — wordmark, navigation, demo-account link and persistent prototype footer.
- `src/components/dashboard/dashboard.tsx` — weekly overview, view transitions, confirmation, editing and previous-week example.
- `src/components/crate/crate-card.tsx` — main weekly crate object.
- `src/components/products/product-choice.tsx` — demo legume swap.
- `src/components/providers/provider-choice.tsx` — fictional provider radio group.
- `src/components/delivery/delivery-choice.tsx` — fulfilment and time selection.
- `src/components/ui/icon.tsx` — small decorative SVG icon set.
- `src/lib/use-demo-week.ts` — validated, tab-scoped mock preferences with an in-memory fallback.
- `src/app/icon.svg` — LOOP app icon.
- `public/illustrations/loop-crate.svg` — original, local vector crate illustration.

## 2. Files changed or removed

Changed:

- `src/app/page.tsx` — replaced starter screen with the dashboard entry point.
- `src/app/layout.tsx` — Dutch document language and LOOP metadata; system fonts remove the external font-fetch requirement.
- `src/app/globals.css` — own mobile-first design system and responsive layouts.
- `src/types/loop.ts` — typed food, provider, slot, fulfilment, view and week models.
- `src/data/mock-crate.ts` — example categories, food choices and initial weekly state.
- `src/data/mock-providers.ts` — fictional providers and demo time slots.
- `src/data/mock-user.ts` — hypothetical household and previous-week labels.
- `src/lib/constants.ts` — prototype disclosure.
- `docs/dashboard-v01.md` — this report, replacing an empty file.

Removed:

- `src/app/favicon.ico` — starter favicon, replaced by the LOOP SVG icon.
- `postcss.config.mjs` — unused starter Tailwind pipeline. The UI uses plain CSS; no new package dependencies were added. The original Tailwind dependencies remain in the package manifest.

## 3. Component architecture

The App Router page and root layout remain Server Components. `Dashboard` is the interactive client boundary. It owns the selected view and swap disclosure, and composes the shell, crate, product, provider and delivery components. Mock content lives in the requested data files; the shared types define valid choices.

Navigation switches local views within the single `/` route. There are no additional backend routes, requests to a food service, or account integrations. The storage hook keeps preferences separate from presentation. SVG artwork and system fonts are served locally.

## 4. Mobile behavior

At 320–430px the experience is a single column: a short greeting, one weekly crate object, then compact receipt/provider/return information. Four bottom navigation controls stay within thumb reach, with device safe-area padding. The desktop navigation is hidden. The account link reads as a small demo control and leads to the prototype explanation.

Crate review uses a readable list instead of a table. At 320px food options stack; wider phones use two columns. The confirmation button spans the available width. Selected choices are visible in the pre-confirmation summary. Confirmation removes the editing overview and exposes a compact status, receipt moment and an explicit edit action.

## 5. Tablet and desktop behavior

From 600px the crate illustration and description sit side by side; logistics use two columns below it. From 960px the header contains desktop navigation, the bottom navigation disappears, and logistics sit beside the main crate. Provider and delivery editors use two columns. The layout stops growing at 1248px, preserving whitespace on 1440px and 1920px screens.

## 6. Mock interactions

- Review all seven representative food categories.
- Choose red lentils, green lentils, chickpeas or beans; the category list reflects the selection.
- Select Markt Noord, Vers & Dichtbij or Buurtmarkt.
- Choose delivery or pickup and one of three example time slots.
- Change the provider or receipt moment directly from overview disclosures, or use the dedicated delivery view.
- Confirm the current choices, show a calm summary, reopen and edit, and confirm again.
- Read the example previous-week and empty-crate status. Return instructions respond to delivery versus pickup; no actual return is registered.

The swap is labelled as a product-choice example. The crate is explicitly not nutrition-validated, and no equivalence between options is claimed. Provider selection is labelled DEMO-AANBIEDERS. Confirmation is explicitly a demo action. The persistent footer states that providers, delivery and public reimbursement are inactive.

## 7. Local persistence

`sessionStorage`, under `loop-demo-week-v01`, stores food, provider, fulfilment, time slot and confirmation state. These choices survive reloads in the same browser tab. Views and open disclosures are temporary React state. No personal information is collected. Saved data is validated before use; malformed values fall back to defaults. When storage is blocked, choices still work in memory for the mounted application.

## 8. Accessibility

Dutch semantic HTML, a skip link, labelled fieldsets and native radios/selects, native keyboard-operable disclosures, active navigation state, decorative icons hidden from assistive technology, and an informative crate-image alternative. Main content and swap headings receive focus after view changes; confirmation has a polite status announcement. Keyboard controls have visible focus, including the full radio-option tile.

Buttons, disclosure summaries, select controls and radio labels provide at least 44px-high targets (primary buttons and selects at least 50px). Scroll padding/margins account for fixed mobile navigation. Select text is 16px. Text contrast was checked by axe. Restrained feedback transitions are removed under `prefers-reduced-motion`.

## 9. Validation

- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- `npm run build`: passed with Next.js 16.3.8/Turbopack; `/` is statically prerendered.
- `git diff --check`: passed.
- Local Chromium/Playwright checks against the production build passed at **320, 375, 390, 430, 768, 1024, 1440 and 1920px** (900px viewport height).
- Nine UI states per width checked: overview, inline provider editor, inline delivery editor, crate contents, swaps, pickup, confirmation, edited delivery and earlier week. Reconfirmation also passed as part of the full workflow.
- No horizontal document overflow or undersized interactive targets in the measured states.
- Product changes, all provider choices, delivery/pickup, time changes, confirmation, editing and reload persistence passed.
- Keyboard skip-link/focus, arrow-key radio changes and Enter-operated disclosures passed. A separate keyboard-only flow at 375px passed review, swapping, provider selection, pickup, native time-select type-ahead, confirmation and reopening. The focused confirmation button remained above the fixed mobile navigation. Reduced-motion rules passed.
- axe WCAG 2 A/AA and WCAG 2.1 AA scans found **zero automated violations** across the checked states. This is not a claim of full accessibility certification.
- Malformed saved state and unavailable storage both passed fallback checks.
- No browser runtime exceptions recorded.
- Overview and confirmation screenshots captured for every requested width; layouts reviewed visually.

Temporary validation tools and evidence are in `/private/tmp/loop-dashboard-validation/`: `check.mjs`, `keyboard.mjs`, `results.json`, and viewport screenshots. These use the existing external Playwright/axe installation and do not add dependencies to this project.

The Browser plugin could not bootstrap in this environment. Validation used standalone local Playwright instead. The existing development server rejected the test host's development connection, so checks ran against a separate production preview at `http://127.0.0.1:3100`, leaving the existing server untouched.

## 10. Human review

Review the Dutch copy, crate illustration and the overall feeling on a physical phone. Actual iOS Safari, Android browsers and screen-reader testing remain for human/device review. The roughly ten-second reassurance goal needs a short usability session; automated checks cannot establish it. The food list is conceptual and requires a future nutritional model before any adequacy or food-equivalence claim. All activity remains fictional and local.

To run locally: `npm run dev`. To inspect production: `npm run build`, then `npm run start`. No environment variables or account setup are required.
