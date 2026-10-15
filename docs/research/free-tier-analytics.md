# Free-tier analytics for WhatsApp leads

Researched 2026-10-15. Pricing and limits change often, so check the vendor pages before signing up.

**Decision (2026-10-15):** we went with PostHog (cookieless, funnel source of truth) plus GA4 and Hotjar behind a cookie banner, instead of Umami. The setup is in `docs/ANALYTICS.md`.

## Problem

The site is a landing page with one job: get patients to open a WhatsApp conversation. We already tag every contact CTA with `data-track-event` / `data-track-location`, and `CtaClickTracker` sends them through Vercel's `track()`. On Vercel Hobby, custom events don't show up in the dashboard, so we can see page views but not which CTA brings leads in.

**The click tracking is already built. We only need a free tool that accepts custom events.**

Constraints:

- **Free.** No monthly cost for a single small site.
- **No cookie banner.** The site has none today. Under LGPD, cookie-based analytics pushes us toward a consent banner, and the ANPD guidance puts the burden of proving consent on the clinic. A cookieless tool avoids all of it.
- **Custom events with a property.** We need `whatsapp_click` plus `location` (`hero`, `fab`, `footer`, …).
- **No health data in analytics.** A CTA click says nothing about a patient's health, but session replay and free-form event data could. Keep both out.

## Suggestion

**Use Umami Cloud's free Hobby plan.** It's cookieless, supports custom events with properties, and the swap is one line in `CtaClickTracker`. Keep Vercel Analytics for page views and Speed Insights for Web Vitals.

| Tool | Free tier | Custom events | Cookies / banner | Fit |
| --- | --- | --- | --- | --- |
| **Umami Cloud** (recommended) | 100K events/mo, 1 website, 6 months retention | Yes, with properties | Cookieless, no banner | Does exactly what we need, nothing more |
| PostHog Cloud | ~1M events/mo, plus funnels and replay | Yes, with properties | Cookies by default. `cookieless_mode: "always"` removes them | More power than a landing page needs, and a heavier script. Good runner-up if we want funnels later |
| Google Analytics 4 | Free | Yes | Cookies, so banner + Consent Mode | Only worth it if the clinic runs Google Ads and wants to import conversions |
| Microsoft Clarity | Free | Yes | Cookies; consent enforced in EU/UK since Oct 2025 | Heatmaps and session replay. Replay on a clinic site is a privacy risk we don't need |
| Rybbit Cloud | 3K–10K events/mo (sources disagree) | Yes, with properties | Cookieless | Free tier too small, and the numbers aren't stable |
| Cloudflare Web Analytics | Free | **No** | Cookieless | Ruled out: page views only |
| Plausible, Simple Analytics | No hosted free tier | — | Cookieless | Ruled out: paid (Plausible is free only self-hosted) |
| GoatCounter | Free for non-commercial use only | Limited | Cookieless | Ruled out: a clinic is commercial |

### Why Umami over PostHog

Both are free and both can run without cookies. For this site, Umami wins on simplicity:

- One small script, one dashboard, nothing to configure on the server side.
- PostHog's cookieless mode only works after turning on "Cookieless server hash mode" in project settings. Without it, PostHog discards cookieless events.
- PostHog's extras (funnels, replay, feature flags, surveys) don't earn their weight on a single-page site with one conversion.

If we ever want a funnel (landed → scrolled to convênios → clicked WhatsApp), PostHog is the move.

### Event budget

Umami counts each page view, each custom event, **and each event property** as one event. A CTA click with `location` costs 2 events. 100K events a month covers roughly 30K page views plus 35K clicks. Vercel Analytics already shows real traffic, so we can check the margin before switching.

## Technical details

### What changes in the code

Only `components/layout/cta-click-tracker.tsx` and the layout script tag. The 13 tagged CTAs stay as they are.

| Piece | Today | With Umami |
| --- | --- | --- |
| Script | `<Analytics />` from `@vercel/analytics/next` | Add Umami's `<script>` via `next/script` (keep `<Analytics />` for page views) |
| Click call | `track(trackEvent, { location })` | `window.umami?.track(trackEvent, { location })` |
| CTA markup | `data-track-event`, `data-track-location` | Unchanged |

Umami also supports `data-umami-event` / `data-umami-event-*` attributes with no JS. We shouldn't switch to those: Umami's docs say other click listeners on the element won't fire, and our own attributes already work with any provider.

### Track the conversation, not just the click

A click on a WhatsApp CTA isn't a lead. The patient can open WhatsApp and never send anything. No analytics tool can see inside WhatsApp, but the pre-filled message can carry the source for us:

- `CLINIC.whatsappMessage(text)` already exists in `lib/clinic-data.ts` and the convênios CTA already uses it.
- Give each WhatsApp CTA its own natural message, e.g. hero: "Olá! Vim pelo site e gostaria de agendar uma consulta." Whoever answers can tell where the patient came from by the opening line.
- Keep the text human. Codes like `[REF-HERO]` look odd to a patient, and they can delete the text anyway.

This is free, works on any analytics tool, and is the only way to count real conversations instead of clicks. It's worth doing even if we stay on Vercel only.

### LGPD

- Cookieless tools (Umami, Vercel, PostHog in `always` mode) don't store anything on the device, so they don't need consent for cookies. We should still mention anonymous usage statistics in `politica-privacidade`.
- Event properties stay limited to CTA type and location. Never send convênio names, specialties or anything a patient types.
- No session replay. Sources disagree on whether GA4 can rely on legitimate interest instead of consent. For a health business, that's a question for a lawyer, not something to decide in code.

## Next steps and outstanding questions

### Next steps

- **Fabio:** check monthly page views in the Vercel Analytics dashboard to confirm we fit Umami's 100K events.
- **Fabio:** create an Umami Cloud account and the site, and get the website ID.
- **Ticket:** switch `CtaClickTracker` to Umami and add the script, via `/ticket-refine`.
- **Ticket (optional):** one pre-filled WhatsApp message per CTA, so conversations show their source.
- **Ticket (optional):** a line about anonymous usage statistics in the privacy policy.

### Outstanding questions

- Does the clinic run, or plan to run, Google or Meta ads? If yes, GA4 or the Meta Pixel come back into play, together with a consent banner.
- Umami's website limit: the official pricing page says 1 site on Hobby, some reviews say 3. One is enough for us either way.
- Keep Vercel Analytics after Umami is live, or drop it? Umami covers page views too. Keeping both costs nothing, but two dashboards is one too many.

## Sources

- [Umami pricing](https://umami.is/pricing), [Umami: track events](https://docs.umami.is/docs/track-events)
- [PostHog: cookieless tracking](https://posthog.com/tutorials/cookieless-tracking), [PostHog: data collection](https://posthog.com/docs/privacy/data-collection), [PostHog free tier summary (AgentDeals)](https://agentdeals.dev/vendor/posthog)
- [Microsoft Clarity consent mode](https://learn.microsoft.com/en-us/clarity/consent-mode)
- [Cloudflare Web Analytics FAQ](https://developers.cloudflare.com/web-analytics/faq/)
- [Rybbit comparison](https://rybbit.com/docs/comparison), [Rybbit free tier (freetier.co)](https://freetier.co/directory/products/rybbit)
- [GoatCounter vs Plausible (Toolradar)](https://toolradar.com/compare/goatcounter-vs-plausible), [Best free web analytics (Toolradar)](https://toolradar.com/guides/best-free-web-analytics)
- [LGPD cookie consent requirements (CookieChimp)](https://cookiechimp.com/guides/regulations/br_lgpd), [Banner de cookies, LGPD e Consent Mode v2 (Incuca)](https://incuca.net/medicao/modo-de-consentimento/), [GA4 cookieless e LGPD (E-Commerce Brasil)](https://www.ecommercebrasil.com.br/artigos/ga4-cookieless-lgpd-nao-e-desculpa-para-analytics-ruim)
- [Rastreando leads do WhatsApp (TabNews)](https://www.tabnews.com.br/gmasson/como-rastrear-seus-leads-do-whatsapp-com-utmtrackjs), [Atribuição de vendas pelo WhatsApp (SocialHub)](https://www.socialhub.pro/blog/atribuicao-vendas-whatsapp-roi-roas/)
