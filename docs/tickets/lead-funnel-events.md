---
ticket: lead-funnel-events
status: implemented
pr: https://github.com/fabiopaitra/clinica-san-gabriel/pull/6
source: free text
updated: 2026-10-16T20:09:39Z
---
# lead-funnel-events: Lead event for the funnel, exam carousel and clickable convênios

## Description

Most of the funnel is already tracked: WhatsApp, phone and directions clicks, `section_view` and `faq_open`. What's missing is one lead event GA4 can use as a key event and Google Ads conversion, so every WhatsApp, phone and directions click also fires GA4's recommended `generate_lead`. The exams carousel gets an event for slide changes the visitor causes, and each convênio in the scrolling strip becomes a WhatsApp link that names the plan. No patient data: only CTA type, location and public page copy (exam and plan names).

## Acceptance Criteria

1. Given any element with `data-track-event` set to `whatsapp_click`, `phone_click` or `directions_click`, when it's clicked, should also send `generate_lead` to PostHog, GA4 and Hotjar through `trackEvent()`, with `method` (`whatsapp`, `phone` or `directions`) and the same `location`.
2. Given the mobile exams carousel, when the visitor swipes or taps a dot and the slide changes, should send `exam_carousel_navigate` with `exam` set to the selected exam's name in kebab-case (e.g. `paquimetria`).
3. Given the exams carousel autoplays, when the slide changes on its own, should send nothing.
4. Given the convênios strip, when a plan name is clicked, should open WhatsApp with "Olá, gostaria de agendar uma consulta pelo convênio <nome>." and send `whatsapp_click` with `location: convenios-lista` and `convenio` set to the plan name in kebab-case.
5. Given the convênios strip, when it's hovered or one of its links has keyboard focus, should pause the scroll animation.
6. Given a screen reader or keyboard user, when they reach the convênios strip, should reach each plan link once; the duplicate copy used for the loop stays hidden and out of the tab order.
7. Given `docs/ANALYTICS.md`, should list `generate_lead`, `exam_carousel_navigate` and the `convenios-lista` location with its `convenio` property in the event table, and the GA4 funnel steps should use `generate_lead` as the key event and register `method`, `exam` and `convenio` as custom dimensions.

## Decisions

- Already tracked (no new work): WhatsApp/"Agendar" CTAs, click-to-call, Google Maps links incl. the map overlay, FAQ opens, the convênios "Dúvidas? Fale conosco" CTA and `section_view` for every section (code)
- There's no separate "agendar" button; every "Agendar" CTA is a WhatsApp link (code)
- What counts as a lead → WhatsApp, phone and directions clicks (user answer)
- How GA4 sees a lead → new `generate_lead` alongside the existing events, not just key events in GA4 Admin (user answer)
- Where `generate_lead` goes → all tools via `trackEvent()`, accepting that it duplicates the PostHog **Contato** action (user answer)
- Exames Realizados → track carousel slide changes from swipes and dot taps; desktop hover stays untracked (user answer)
- Convênios → make each plan a WhatsApp link, a UI change beyond tracking (user answer)
- Plan link message → "Olá, gostaria de agendar uma consulta pelo convênio <nome>." (user answer)
- Strip behaviour → pause on hover/focus, links reachable by keyboard and screen readers (user answer)
- Plan link `location` → `convenios-lista`, so it stays separate from the existing `convenios` CTA (default, follows `docs/ANALYTICS.md` naming)

## Plan

`generate_lead` hangs off `CtaClickTracker`, so every existing and future lead CTA gets it from its `data-track-event` with no per-button changes. The exams carousel tells user moves from autoplay with a flag that embla's `pointerDown` and the dot clicks set, and the next `select` consumes. The convênios strip renders each plan as a tracked WhatsApp link through the same `data-track-*` attributes, pauses its CSS animation on hover and focus, and hides the duplicate copy used for the loop. Exam and plan names are slugged with a small shared helper.

### Steps

1. `components/layout/cta-click-tracker.tsx`: add a `LEAD_METHODS` map (`whatsapp_click` → `whatsapp`, `phone_click` → `phone`, `directions_click` → `directions`). In `trackCtaClick`, after the existing `trackEvent`, when the event has a method, also call `trackEvent("generate_lead", { method, location })`. Satisfies AC 1. Verify: `npm run dev`, click the hero WhatsApp, the hero phone and the Localização map; the console shows `[analytics] generate_lead` with the right `method` and `location` after each original event. `email_click` and `nav_click` don't fire it.
2. `lib/utils.ts`: add `toSlug(text)`, which strips accents (`normalize("NFD")`), lowercases, and joins with `-` (`"São Camilo"` → `sao-camilo`). Supports AC 2 and 4. Verify: `npx tsc --noEmit`.
3. `components/sections/exams-section.tsx`: add a `userNavigatedRef`. In `handleCarouselApi`, listen to `api.on("pointerDown")` to set it (and `off` it next to `select`). Pass `onClickCapture` to `CarouselDots` that sets it only when the target is an unselected dot (`[role=tab][aria-selected=false]`), so tapping the active dot can't leave it set. In `onSelect`, when the ref is set, clear it and call `trackEvent("exam_carousel_navigate", { exam: toSlug(EXAMS[index].name) })`. Autoplay's default `stopOnInteraction` stops it after a `pointerDown`, so a tap that doesn't change the slide can't make a later autoplay move count as the visitor's. Satisfies AC 2 and 3. Verify: dev server at mobile width, wait through two autoplay moves (no log), swipe once and tap one dot (one `exam_carousel_navigate` each, with the right slug).
4. `components/sections/convenios-section.tsx`: remove `aria-hidden` from the strip wrapper and label the strip "Convênios aceitos". Render the first copy of `CONVENIOS` as `<a>` links to `CLINIC.whatsappMessage(\`Olá, gostaria de agendar uma consulta pelo convênio ${name}.\`)` with `target="_blank"`, `rel="noopener noreferrer"`, `data-track-event="whatsapp_click"`, `data-track-location="convenios-lista"` and `data-track-convenio={toSlug(name)}`. Wrap the second copy in an `aria-hidden` group whose links get `tabIndex={-1}`. Add `hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]` to the `animate-convenios-scroll` element, plus a visible focus ring on the links. Satisfies AC 4, 5 and 6. Verify: hover stops the strip; clicking "Unimed Curitiba" opens WhatsApp with the message and logs `whatsapp_click` (`location: convenios-lista`, `convenio: unimed-curitiba`) and then `generate_lead`; Tab reaches each of the 18 plans once and pauses the strip; VoiceOver reads each plan once.
5. `docs/ANALYTICS.md`: add `generate_lead` (`method`, `location`, fired from `CtaClickTracker` on every lead click) and `exam_carousel_navigate` (`exam`, fired from `ExamsSection`) to the event table, and add `convenios-lista` with its `convenio` property to the `whatsapp_click` row. In the GA4 funnel, make `generate_lead` the key event and the last step, and add `method`, `exam` and `convenio` to the custom dimensions. In the PostHog funnel, add one line: `generate_lead` duplicates the **Contato** action, so use one or the other. Satisfies AC 7. Verify: read the diff against the ACs.

### Files affected

| File | Change |
|------|--------|
| `components/layout/cta-click-tracker.tsx` | modify: also fire `generate_lead` for lead CTAs |
| `lib/utils.ts` | modify: add `toSlug` |
| `components/sections/exams-section.tsx` | modify: track slide changes the visitor causes |
| `components/sections/convenios-section.tsx` | modify: plan names become tracked WhatsApp links; the strip pauses and is accessible |
| `docs/ANALYTICS.md` | modify: event table and funnel setup |

### Verification

- `npm run lint`, `npx tsc --noEmit`, `npm run build`
- Manual, in `npm run dev` with the console open: the checks in steps 1, 3 and 4
- Vercel preview: click through steps 1, 3 and 4 to check the UI. Previews send no analytics, because the env vars are set for Production only, so the dev console is the event check. After release, confirm `generate_lead` in GA4 → Realtime.

### AC mapping

- AC 1 → step 1
- AC 2 → steps 2, 3
- AC 3 → step 3
- AC 4 → steps 2, 4 (`generate_lead` comes from step 1)
- AC 5 → step 4
- AC 6 → step 4
- AC 7 → step 5
