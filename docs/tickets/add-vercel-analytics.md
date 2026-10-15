---
ticket: add-vercel-analytics
status: implemented
source: free text
updated: 2026-10-15T12:48:34Z
---
# add-vercel-analytics: Add Vercel Analytics and Speed Insights

## Description

Install `@vercel/analytics` and `@vercel/speed-insights` and mount them in the root layout, so every page reports page views and Core Web Vitals to the Vercel dashboard. On top of page views, track every click on a contact CTA (WhatsApp, phone, directions, email) as a custom event, tagged with where on the site it was clicked, so we can see which CTA actually brings patients in. Both tools are cookieless and anonymous, so there's no consent banner. Analytics and Speed Insights need to be switched on in the Vercel project settings, and custom events only show up on a Vercel Pro or Enterprise plan.

## Acceptance Criteria

1. Given a production deployment, when any page loads, should send a page view to Vercel Web Analytics.
2. Given a production deployment, when any page loads, should send Web Vitals to Vercel Speed Insights.
3. Given any WhatsApp CTA (FAB, hero, convênios "Dúvidas? Fale conosco", footer), when it's clicked, should send a WhatsApp click event that says which of those CTAs it was.
4. Given any phone CTA (hero, footer, Termos de Uso, Política de Privacidade), when it's clicked, should send a phone click event that says which of those CTAs it was.
5. Given any Google Maps directions link (localização section button, localização map overlay, footer), when it's clicked, should send a directions click event that says which of those links it was.
6. Given any email link (Termos de Uso, Política de Privacidade), when it's clicked, should send an email click event that says which of those links it was.

## Decisions

- Custom events → in scope (user answer)
- What "everything should be tracked" covers → every outbound contact CTA: WhatsApp, phone, Maps directions, email. Internal navigation is already covered by page views; Instagram/Facebook are in `lib/clinic-data.ts:39` but not rendered anywhere, so there's nothing to track (user answer + code)
- Telling CTAs apart → each event carries its location on the site (user answer: "everything should be tracked")
- Privacy policy (`app/politica-privacidade/page.tsx:32`) only lists appointment data → left unchanged in this ticket (default, not confirmed by user)
- Enabling Analytics and Speed Insights in the Vercel dashboard → manual step outside the code (code: packages only report, they don't enable the product)

## Open questions

- Which Vercel plan the project is on. Custom events (ACs 3–6) need Pro or Enterprise; on Hobby the code ships but the events don't show up in the dashboard.

## Plan

Mount `<Analytics />` and `<SpeedInsights />` (the `/next` entry points) in `app/layout.tsx`. For CTA clicks, most of the links live in server components (`whatsapp-fab.tsx`, `footer.tsx`, `localizacao-section.tsx`, both policy pages), so instead of turning those into client components, each CTA gets two data attributes: `data-track-event` and `data-track-location`. One small client component, mounted once in the layout, listens for clicks on the document, finds the closest element with `data-track-event`, and calls `track(event, { location })`. Event names: `whatsapp_click`, `phone_click`, `directions_click`, `email_click`.

### Steps

1. `package.json`, `app/layout.tsx` — `npm i @vercel/analytics @vercel/speed-insights`; render `<Analytics />` from `@vercel/analytics/next` and `<SpeedInsights />` from `@vercel/speed-insights/next` at the end of `<body>` — satisfies AC 1, 2. Verify: lint, `tsc` and build pass; `npm run dev` shows the Vercel Analytics debug log for the page view in the browser console.
2. `components/layout/cta-click-tracker.tsx` (new, `"use client"`), `components/layout/index.ts`, `app/layout.tsx` — `CtaClickTracker` adds a `click` listener on `document` in a `useEffect`, reads `data-track-event` / `data-track-location` from `event.target.closest("[data-track-event]")`, calls `track()`, and removes the listener on unmount. Renders `null`. Export it from the layout barrel and mount it next to `<Analytics />` — groundwork for AC 3–6. Verify: lint, `tsc` and build pass; no events fire yet since no element has the attribute.
3. WhatsApp CTAs — add `data-track-event="whatsapp_click"` with location `fab` (`components/layout/whatsapp-fab.tsx`), `hero` (`components/sections/hero-section.tsx`), `convenios` (`components/sections/convenios-section.tsx`), `footer` (`components/layout/footer.tsx`) — satisfies AC 3. Verify: in dev, click each one and see `whatsapp_click` with the right `location` in the console log.
4. Phone CTAs — `data-track-event="phone_click"` with location `hero`, `footer`, `termos-uso` (`app/termos-uso/page.tsx`), `politica-privacidade` (`app/politica-privacidade/page.tsx`) — satisfies AC 4. Verify: same console check for each.
5. Directions links — `data-track-event="directions_click"` with location `localizacao` (address link) and `localizacao-mapa` (map overlay) in `components/sections/localizacao-section.tsx`, and `footer` in `components/layout/footer.tsx` — satisfies AC 5. Verify: same console check for each.
6. Email links — `data-track-event="email_click"` with location `termos-uso` and `politica-privacidade` — satisfies AC 6. Verify: same console check for each.

### Files affected

| File | Change |
|------|--------|
| `package.json`, `package-lock.json` | modify — add `@vercel/analytics`, `@vercel/speed-insights` |
| `app/layout.tsx` | modify — mount `Analytics`, `SpeedInsights`, `CtaClickTracker` |
| `components/layout/cta-click-tracker.tsx` | create — document click listener that calls `track()` |
| `components/layout/index.ts` | modify — export `CtaClickTracker` |
| `components/layout/whatsapp-fab.tsx` | modify — tracking attributes on the FAB |
| `components/layout/footer.tsx` | modify — tracking attributes on directions, phone, WhatsApp links |
| `components/sections/hero-section.tsx` | modify — tracking attributes on WhatsApp and phone CTAs |
| `components/sections/convenios-section.tsx` | modify — tracking attributes on "Dúvidas? Fale conosco" |
| `components/sections/localizacao-section.tsx` | modify — tracking attributes on both directions links |
| `app/termos-uso/page.tsx` | modify — tracking attributes on email and phone links |
| `app/politica-privacidade/page.tsx` | modify — tracking attributes on email and phone links |

### Verification

- `npm run lint`, `npx tsc --noEmit`, `npm run build`.
- Dev: `npm run dev`, load `/`, `/termos-uso` and `/politica-privacidade`, click all 13 CTAs, and check the console logs one event per click with the right name and `location`.
- Vercel preview (from the PR): DevTools Network shows requests to `/_vercel/insights/view`, `/_vercel/insights/event` on a CTA click, and `/_vercel/speed-insights/vitals`. This only works once Analytics and Speed Insights are on in the Vercel project settings.

### AC mapping

- AC 1 → step 1
- AC 2 → step 1
- AC 3 → steps 2, 3
- AC 4 → steps 2, 4
- AC 5 → steps 2, 5
- AC 6 → steps 2, 6

### Assumptions

- Vercel plan: not confirmed. The code is the same either way. On Hobby, page views and Web Vitals still show up, but the AC 3–6 events won't appear in the dashboard until the project is on Pro.
