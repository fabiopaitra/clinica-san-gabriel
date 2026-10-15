---
ticket: add-analytics-stack
status: implemented
source: free text
updated: 2026-10-15T13:24:31Z
---
# add-analytics-stack: Add PostHog, GA4 and Hotjar with a lead funnel

## Description

Vercel Hobby doesn't show custom events, so we can't see which CTA brings WhatsApp leads in. Add PostHog (cookieless, the funnel's source of truth for every visitor), plus GA4 and Hotjar loaded only after the visitor accepts a pt-BR cookie banner, as LGPD requires. Track the funnel page view → section viewed → contact click, and document the tracking rules so every future feature ships with its analytics. Each tool stays off until its env var is set in Vercel (Production only).

## Acceptance Criteria

1. Given `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` is set, when any page loads, should send a PostHog `$pageview` through `/ingest` without setting cookies or storage.
2. Given GA4 or Hotjar is configured and no choice is stored, when a page loads, should show the cookie banner with "Aceitar" and "Recusar" given equal weight, and not load GA4 or Hotjar.
3. Given the visitor clicks "Aceitar", should load GA4 and Hotjar and remember the choice across visits; given "Recusar", should load neither and remember the choice.
4. Given a stored choice, when the visitor clicks "Preferências de cookies" in the footer, should reopen the banner; revoking consent should stop GA4 and Hotjar.
5. Given any contact CTA (the 13 existing plus the WhatsApp CTAs in the header and mobile menu), when clicked, should send its event with `location` to PostHog, and to GA4 and Hotjar when consented.
6. Given the home page, when a section (`especialidades`, `exames`, `convenios`, `localizacao`, `faq`) reaches the middle of the viewport, should send `section_view` once per page view.
7. Given a header or mobile-menu nav link, when clicked, should send `nav_click` with `location` and `target`.
8. Given the FAQ, when a question opens, should send `faq_open` with the question; closing it sends nothing.
9. Given the privacy policy, should list the analytics tools, which use cookies, and how to change the choice.
10. Given a developer starting a feature, should find the tracking rules in `docs/ANALYTICS.md`, the project `CLAUDE.md` and `.claude/ticket-process.md`.

## Decisions

- Tools → PostHog + GA4 + Hotjar, keep Vercel Analytics and Speed Insights (user answer)
- Session recordings → Hotjar only; PostHog recording off (user answer: default)
- Environments → IDs set in Vercel for Production only (user answer: default)
- Vercel `track()` calls → removed; they do nothing on Hobby (user answer: default)
- PostHog consent mode → `cookieless_mode: "always"`, so the funnel counts visitors who ignore the banner. `on_reject` would capture nothing until a choice is made (code: posthog-js types)
- Header WhatsApp CTAs → tracked; missed by add-vercel-analytics (code: `components/layout/header.tsx`)

## Plan

`trackEvent()` in `lib/analytics.ts` sends to PostHog, plus GA4 and Hotjar when consented. `CtaClickTracker` keeps using `data-track-*` attributes and now forwards every `data-track-*` as a property. PostHog starts from `instrumentation-client.ts` behind an `/ingest` rewrite. GA4 (`@next/third-parties`) and Hotjar (`@hotjar/browser`) mount from `ConsentedAnalytics` only after consent, stored in `localStorage` by `lib/consent.ts`.

### Steps

1. `lib/analytics.ts`, `components/layout/cta-click-tracker.tsx`, `components/layout/header.tsx` — `trackEvent()`, generic properties, header CTAs and nav links tagged — AC 5, 7. Verify: dev console `[analytics]` logs.
2. `lib/consent.ts`, `consent-banner.tsx`, `consent-preferences-button.tsx`, `footer.tsx` — banner and preferences — AC 2, 4. Verify: dev with test IDs.
3. `instrumentation-client.ts`, `next.config.ts` — PostHog cookieless + `/ingest` rewrites — AC 1. Verify: build; preview once the token is set.
4. `consented-analytics.tsx`, `app/layout.tsx` — GA4 and Hotjar after consent — AC 3. Verify: network before/after Aceitar.
5. `section-view-tracker.tsx`, `faq-section.tsx` — `section_view`, `faq_open` — AC 6, 8. Verify: dev console.
6. `app/politica-privacidade/page.tsx` — section 5 — AC 9. Verify: page renders.
7. `docs/ANALYTICS.md`, `CLAUDE.md`, `.claude/ticket-process.md`, `.env.example` — AC 10. Verify: review.

### Verification

- `npm run lint`, `npx tsc --noEmit`, `npm run build`.
- Dev with test IDs: banner, Aceitar/Recusar, preferences, every event in the console.
- Preview, after the real IDs are set: PostHog Live events, GA4 DebugView/Realtime, Hotjar install check.

### AC mapping

- AC 1 → step 3
- AC 2 → step 2
- AC 3 → step 4
- AC 4 → step 2
- AC 5 → step 1
- AC 6 → step 5
- AC 7 → step 1
- AC 8 → step 5
- AC 9 → step 6
- AC 10 → step 7
