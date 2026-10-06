# loop. public landing page v0.1

## Routes and architecture

`/` is a server-rendered, statically generated Dutch landing page. `src/app/page.tsx` supplies page metadata and renders `LandingPage`. The page uses one presentation component and a scoped CSS Module. It reuses the existing global palette, typeface, wordmark, buttons, focus styles, reduced-motion rules and line icons. It adds no dependencies, parallel design system, forms, commerce services or backend.

`/demo` renders the existing Dashboard unchanged. Its metadata explicitly marks it noindex. Existing localStorage keys, migration, product state and internal navigation remain unchanged. The demo footer adds a normal link back to `/`. Landing links open `/demo`; returning does not reset choices.

## Files

Changed:
- `src/app/page.tsx`: public root and landing metadata.
- `src/components/layout/app-shell.tsx`: demo footer return link.

Created:
- `src/app/demo/page.tsx`: preserved dashboard route and demo metadata.
- `src/components/landing/landing-page.tsx`: semantic page, copy and shared-icon CTAs.
- `src/components/landing/landing.module.css`: responsive editorial layout using existing tokens.
- `public/images/loop-food-composition.webp`: generated concept photograph, 1536 × 1024.
- `public/images/demo-v01.webp`: actual Demo v0.1 screenshot, 780 × 1688.
- `public/illustrations/ingredient-study.svg`: code-native illustration in the existing crate style.
- `docs/landing-v01.md`: this handover.

The existing `loop-crate.svg`, dashboard components, data, state hook and global CSS are unchanged.

## Story and design

1. “Wat als goed eten gewoon geregeld was?” Everyday idea, demo and explanatory anchor.
2. “Wat heeft een mens eigenlijk nodig?” Six needs, without a nutrition lecture.
3. “Niet één superfood. Een systeem.” Ordinary foods contributing together; explicitly unvalidated concept.
4. “Je basis. Iedere week.” Small recurring foundation, personal freedom and crate return concept.
5. “Zo weinig mogelijk gedoe.” Actual app screenshot and four existing demo capabilities.
6. “We zijn dit nog aan het testen.” Contents, costs, eating, cooking and practical research, linked to BOUW experiment 001. Explicit B12/context-dependent vitamin D consideration; no validated complete diet, active deliveries or LOOP Points.
7. “De basis is geregeld. De dag is van jou.” Quiet forest-green ending with the lowercase loop. wordmark.

Mobile prioritizes copy and a naturally proportioned food image, a minimal header, comfortable CTAs and deliberate section spacing. Desktop uses editorial split compositions and wider whitespace. No scroll-dependent reveal hides content. Shared hover feedback respects reduced motion.

No real customers, commercial availability, proven cost, validated quantities, nutritional equivalence or commercial delivery are claimed.

## Visual assets

The food photograph was generated using the built-in image generation tool and converted to WebP. It is labelled a concept on the page and is not a real LOOP product photograph. Original output: `/Users/raydatema/.codex/generated_images/01a110e3-5dab-75f3-a0a3-b150c9638304/exec-23761f83-f84b-4395-894b-5c099c4baefd.png`.

Generation brief: natural-light editorial food photography, warm cream background and forest-green reusable crate with lowercase loop. wordmark; ordinary oats, wholegrain bread, lentils, potatoes, carrots, leafy greens, apples, oranges, nuts and an unbranded soy-drink carton. Modest everyday abundance, realistic textures, complete central crate with breathing room, 3:2 composition. No people, delivery vehicles, other brands, prices, verified portion quantities, nutrition labels, decorative overlays or commercial claims.

The app screenshot was captured from the actual existing dashboard in Chromium at 390 × 844 CSS pixels and device scale 2, then compressed without compositing or invented UI. It must be refreshed when the demo interface changes. The ingredient SVG is an illustration, not evidence of validated portions or combinations.

## Validation

Production browser preview: `http://127.0.0.1:3102`.

- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- `npm run build`: passed; `/` and `/demo` statically generated.
- Chromium checks at 320, 375, 390, 430, 768, 1024, 1440 and 1920 px: landing and demo pass, no horizontal overflow.
- Axe WCAG 2 A/AA and 2.1 AA: zero violations for landing and every tested demo state at all eight widths.
- Landing visible links have at least 44px height. Existing demo controls retain at least 44px targets.
- Skip link, visible keyboard focus, semantic landmarks and headings, labelled images, native links and reduced-motion behavior verified.
- Landing text at 200% root font size: no horizontal overflow at all eight widths.
- Landing works without JavaScript; its demo link navigates correctly. The interactive demo continues to require JavaScript.
- Landing → demo → landing → demo, reload and saved product choices: passed.
- Full demo loop at every width: item changes/undo, provider, pickup point, time, delivery, confirmation, reopen, history, reset, meal ideas, reload/new-tab persistence and cross-tab updates passed.
- Keyboard-only demo loop, all 13 item alternatives, corrupt/invalid/unsupported state, legacy migration and blocked storage checks passed.
- Full-page mobile and desktop screenshots inspected. All images decode successfully; BOUW research page and experiment anchor verified.

Validation scripts, results and screenshots are in `/private/tmp/loop-landing-validation`. Automated checks complement visual review; they do not replace real-device or screen-reader review.

## Human review and intentionally deferred work

The referenced landing mockup was not present in the available attachments. Only an earlier pasted-text attachment was available. This implementation follows the written visual brief and the existing app; a comparison against the missing mockup remains for human review.

Review the generated concept photograph, final Dutch wording and real-device/screen-reader experience. No deployment or DNS change was performed. Canonical metadata uses the requested future domain `https://loopfood.nl`; it does not mean the page has been published there.

Commerce, authentication, real delivery/points, nutritional validation, pricing and production integrations remain outside this task. No additional feature has been started.
