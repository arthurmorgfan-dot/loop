# LOOP — Dutch + English milestone

Completed 6 October 2026. One product, one component system, one week-preference store and two languages. The existing visual identity, demo behavior and food-first crate refinement are retained. This work is local; it does not publish or deploy the website.

## 1. Files changed

Moved the original route wrappers into the URL-neutral Dutch group:
- `src/app/page.tsx` → `src/app/(nl)/page.tsx`
- `src/app/demo/page.tsx` → `src/app/(nl)/demo/page.tsx`
- `src/app/layout.tsx` → `src/app/(nl)/layout.tsx`

Added English wrappers and localized fallbacks:
- `src/app/en/layout.tsx`, `src/app/en/page.tsx`, `src/app/en/demo/page.tsx`
- `src/app/(nl)/[...missing]/page.tsx`, `src/app/(nl)/not-found.tsx`, `src/app/(nl)/error.tsx`
- `src/app/en/[...missing]/page.tsx`, `src/app/en/not-found.tsx`, `src/app/en/error.tsx`

Added shared localization modules:
- `src/i18n/messages.ts` — complete typed Dutch/English copy, including accessible labels and metadata.
- `src/i18n/locale.ts` — locale paths, translation interpolation, date/weekdays and number locale.
- `src/i18n/data.ts` — ingredient/category/provider/point/meal display mappings keyed by stable IDs.
- `src/i18n/locale-provider.tsx` — the shared client locale context.
- `src/i18n/locale-document.tsx` — shared document markup with server-rendered document language.
- `src/i18n/route-content.tsx` — shared page renderers, metadata and demo-view parsing.
- `src/i18n/language-switch.tsx` — restrained NL / EN links and presentation-only scroll/disclosure handoff.
- `src/i18n/header-offset.tsx` — measured sticky-header offset for anchors and focus.
- `src/i18n/fallbacks.tsx`, `src/i18n/error-page.tsx` — shared localized fallback components.

Updated existing presentation/data files:
- `src/components/landing/landing-page.tsx`, `src/components/landing/landing.module.css`
- `src/components/layout/app-shell.tsx`
- `src/components/dashboard/dashboard.tsx`
- `src/components/crate/crate-card.tsx`, `src/components/crate/crate-contents.tsx`
- `src/components/products/product-choice.tsx`
- `src/components/providers/provider-choice.tsx`, `src/components/delivery/delivery-choice.tsx`
- `src/components/history/crate-history.tsx`
- `src/data/mock-crate.ts`, `src/data/mock-providers.ts`, `src/data/mock-history.ts`, `src/data/mock-meals.ts`, `src/data/mock-user.ts`, `src/data/model-quantities.ts`
- `src/types/loop.ts`, `src/lib/constants.ts`, `src/app/globals.css`

Updated `public/images/demo-v01.webp` and added `public/images/demo-v01-en.webp`: real localized demo screenshots. Added this handover, `docs/i18n-nl-en.md`.

The persistence hook and parser were not changed by this milestone. Existing uncommitted crate-refinement work remains in place; its ingredient artwork, schema support for more, and earlier handover are not new internationalization work. No dependencies, translation APIs, middleware, backend or extra language were added.

## 2. Architecture

Static, authored dictionaries have one shared typed key set. TypeScript requires an English value for every Dutch message. Server landing pages use the same renderer; all client product components consume the same locale context. Translation is a dictionary lookup and interpolation, not machine translation.

Two thin root layouts delegate to one `LocaleDocument`. This sets `html lang="nl"` or `html lang="en"` in the server response, including with JavaScript disabled. Moving between these root layouts uses a full navigation, which is intentional; product choices are restored by the unchanged local store. There are no separate Dutch/English component trees or behaviors.

## 3. Routes and deep links

| Dutch | English |
| --- | --- |
| `/` | `/en` |
| `/demo` | `/en/demo` |
| `/demo?view=crate` | `/en/demo?view=crate` |
| `/demo?view=delivery` | `/en/demo?view=delivery` |
| `/demo?view=history` | `/en/demo?view=history` |

Original Dutch URLs work. The existing button navigation remains; it now also synchronizes its stable view ID to the query string. Refresh and language switching reopen the same view. Invalid or repeated view parameters fall back to This week. Existing landing anchor IDs are preserved, including Dutch-looking IDs, to protect links; they are not user-facing copy.

Landing pages remain statically generated. Demo pages are server-rendered to read the initial view query; this adds no product service or backend logic. Unmatched routes return localized 404 responses under the appropriate locale; unsupported locale prefixes return the Dutch fallback. Shared error boundaries provide localized retry copy.

## 4. Language switching and sticky headers

Native NL / EN links use correct `hrefLang`, native language names and current-language state. URLs preserve the current demo view, query and hash. Product choices remain in localStorage. A separate temporary sessionStorage key, `loop-language-position`, transfers only scroll position and open disclosure IDs, then is removed. It is not a second product-state store.

Sticky headers retain the logo, navigation, typography, colors, flat border and normal heights. There is no blur, floating container, shadow, shrinking or scroll animation. At standard sizes the mobile header remains 79px including its border and desktop 95px. A ResizeObserver measures actual height, including enlarged text, so anchor and focus positioning clear the header. Skip-link and mobile-navigation stacking remain correct.

The mobile landing-header demo link uses the concise “Demo” label to fit NL / EN without shrinking type or increasing normal header height. Main demo CTAs retain their full text. The existing demo-account icon remains visible, including at 320px.

## 5. Language-independent data

Saved preferences still contain ingredient IDs, amount states, provider/point/slot IDs, fulfilment and confirmation. Display names never enter product state. Ingredient IDs and all 13 Candidate 020 numeric inputs are unchanged.

Categories now use stable category IDs; meals use stable IDs; slots/history use weekday IDs. Mock dates are ISO data and week numbers are numeric. Shared Intl formatters produce Dutch/English display dates and decimal separators. Date-range whitespace is normalized because server/browser Intl implementations can differ in Unicode separator spacing; this prevents hydration mismatches.

Dutch and English amounts use exactly the same constrained rounding and less/standard/more factors. Dry-food labels localize. No nutritional optimization, currency switching, country selection or international fulfilment has been added.

## 6. Persistence and migration

No persisted-state migration was necessary. `loop-demo-v01`, schema version 2, legacy `loop-demo-week-v01` migration, parsing, reset, storage fallbacks and cross-tab synchronization remain unchanged. Language switching does not write product preferences. Tests compare the full saved object before/after switching and refresh.

## 7. Copy decisions and research honesty

Preferred core translations are used, including “Good morning,” “Your LOOP for this week is ready,” and “The basics are handled. The day is yours.” The lowercase `loop.` wordmark and period remain unchanged.

A few intent-based choices:
- “Goed gevuld. Met aandacht.” → “Thoughtfully filled.”
- “Op jouw moment.” → “At a time that suits you.”
- “Je keuzes staan klaar. Bevestig en laat het los.” → “Your choices are ready. Confirm and get on with your day.”
- “Aardappel-spinazie stamppot” → “Mashed potatoes with spinach,” a readable meal description.
- The landing concept remains explicitly an idea in development, rather than suggesting a launched service.

Candidate 020, MODEL/DEMO status, modeled quantities, unvalidated nutritional suitability, non-equivalent substitutions, fictional locations, fictional historical weeks and inactive delivery/funding remain explicit. No recommended quantities, measured consumption, nutritional completeness, commercial activity, actual customers or international operations are implied.

## 8. Metadata / SEO

Each landing/demo route supplies localized title, description and Open Graph text. Canonicals use `https://www.loopfood.nl` with the appropriate locale path, without presentation query parameters. Both equivalents advertise `nl`, `en` and `x-default` alternates. Open Graph locales are `nl_NL` and `en_GB`.

The existing demo noindex policy is preserved in both languages. Localized 404 pages have proper titles and descriptions; Next.js adds their noindex status. No automatic browser-language redirect was introduced.

## 9. Accessibility

Visible copy, aria labels, image alternatives, legends, select labels, status announcements, empty states, reset/confirmation copy and fallbacks are localized. Document language is correct before hydration. Language names use their own language (`Nederlands` / `English`) with matching `lang` attributes.

Existing native disclosures, exclusive ingredient editing, keyboard focus, touch-target sizes and reduced-motion handling are retained. Sticky-header offsets protect both headings and interactive focus targets, including at 200% text. No locale-specific interaction was added.

## 10. Validation

Production preview: `http://127.0.0.1:3114` and `/en`.

- `npm run lint`: passed with no warnings.
- `npx tsc --noEmit`: passed.
- `npm run build`: passed.
- Both languages at 320, 375, 390, 430, 768, 1024, 1440 and 1920px: landing, home, inventory, expanded controls, pickup/delivery, history and confirmation passed.
- No horizontal overflow; visible targets at least 44px; normal header dimensions unchanged on scroll.
- Axe WCAG 2 A/AA and 2.1 AA: zero violations in tested landing/demo states and localized 404 pages.
- Existing full-loop regression checks passed in both languages at all eight widths: substitutions, undo, delivery/provider/time, confirmation/reopen, history, meals, reset, refresh/new-tab persistence and cross-tab updates.
- Existing corrupt/invalid/unsupported state, legacy migration, blocked storage and all 13 substitution checks passed in both languages.
- Keyboard-only full loop passed in both languages, including ingredient disclosures, more/less and localized select type-ahead.
- 200% text checks passed for both landings and all demo views at all widths. Enlarged controls and navigation headings remain visible between the sticky header and mobile navigation.
- Exact requested Dutch changes → more → another substitution → pickup/provider/time → English same screen → refresh → Dutch scenario passed with identical saved state.
- Native pointer/touch NL → EN and EN → NL while scrolled passed, preserving view, disclosure state and scroll position. Landing query/hash/scroll handoff also passed.
- Routes, equivalent links, canonicals, hreflang, document language, invalid-view fallback and localized 404/noindex checked. Landing navigation works without JavaScript in both languages.
- English rendered-copy/accessibility scan found no unintended Dutch text. Dictionary completeness, placeholder parity, deterministic date output and unchanged quantity inputs/rounding passed.
- Mobile/desktop screenshots and the real localized app preview images were visually inspected. The final runs contain no hydration or page errors.

Browser scripts, screenshots and results live in `/private/tmp/loop-i18n-validation`. No test framework or package dependency was introduced. Automated browser checks use local Chromium; they do not substitute for physical-device or assistive-technology review.

## 11. Human review

Review the authored English copy, physical iPhone/Safari behavior and VoiceOver/NVDA output before publication. This milestone does not perform deployment, DNS changes or production commerce setup. The local preview is ready for review. No other language or Demo v0.2 work was started.

## 12. Intentionally unchanged names/text

`loop.`, LOOP, LOOP Point, Candidate 020, DEMO and BOUW retain their names/status. Fictional provider names Markt Noord, Vers & Dichtbij and Buurtmarkt remain proper names; their descriptions localize. The language selector uses the native name Nederlands. Point direction labels translate to North/South. Stable IDs, URL query values and original landing-anchor IDs are not translated. The external BOUW research itself remains Dutch and is outside this LOOP milestone.

There is no intentionally untranslated Dutch interface prose on `/en`.
