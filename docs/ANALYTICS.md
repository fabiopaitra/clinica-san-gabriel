# Analytics

The site has one goal: get patients to start a WhatsApp conversation. Analytics tells us which pages, sections and CTAs lead there.

**Every user-facing feature ships with its tracking.** A feature without events is not done.

## Tools

**PostHog is the funnel's source of truth. GA4 and Hotjar add traffic sources and recordings.** All of them load for every visitor; there's no cookie banner.

| Tool | What it's for | Cookies | Loads |
| --- | --- | --- | --- |
| PostHog | Funnels, events, autocapture. **Source of truth for the funnel** | None (`cookieless_mode: "always"`) | Always, from `instrumentation-client.ts` |
| GA4 | Traffic sources, Google Ads conversions | Yes | Always, from `ThirdPartyAnalytics` |
| Hotjar | Heatmaps and session recordings | Yes | Always, from `ThirdPartyAnalytics` |
| Vercel Analytics | Page views | None | Always |
| Vercel Speed Insights | Core Web Vitals | None | Always |

`trackEvent()` in `lib/analytics.ts` sends one event to PostHog, GA4 and Hotjar (Hotjar only gets the event name). Every tool is off when its env var is missing, so dev and preview send nothing unless you configure them.

## Configuration

Set these in Vercel for **Production only**, so preview and dev traffic stays out of the data. See `.env.example`.

| Env var | Where to find it |
| --- | --- |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 → Admin → Data streams → Measurement ID (`G-XXXXXXX`) |
| `NEXT_PUBLIC_HOTJAR_SITE_ID` | Hotjar → Sites & Organizations → Site ID |
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | PostHog → Project settings → Project token (`phc_…`) |
| `NEXT_PUBLIC_POSTHOG_REGION` | `us` or `eu`, matching the PostHog Cloud region. Defaults to `us` |

In PostHog, turn on **Cookieless server hash mode** (Project settings → Web analytics). Without it, PostHog drops every event from this site.

PostHog traffic goes through the `/ingest` rewrite in `next.config.ts`, so ad blockers don't drop it.

## Cookies and LGPD

- There's no cookie banner. GA4 and Hotjar set cookies for every visitor, on the basis of legitimate interest. This is a deliberate choice: the ANPD guidance favours consent for analytics cookies, so get legal sign-off before changing what we collect.
- Visitors opt out through their browser settings or the GA opt-out add-on, and can object through the clinic's contact details. The privacy policy (`app/politica-privacidade/page.tsx`, section 5) says so.
- **Adding a new tool means updating that section of the privacy policy.**

## Events

| Event | Properties | Fired from |
| --- | --- | --- |
| `whatsapp_click` | `location`: `header`, `mobile-menu`, `hero`, `convenios`, `convenios-lista`, `footer`, `fab`; `convenio`: the plan's slug, only on `convenios-lista` | `data-track-*` attributes |
| `phone_click` | `location`: `hero`, `footer`, `termos-uso`, `politica-privacidade` | `data-track-*` attributes |
| `directions_click` | `location`: `localizacao`, `localizacao-mapa`, `footer` | `data-track-*` attributes |
| `email_click` | `location`: `termos-uso`, `politica-privacidade` | `data-track-*` attributes |
| `nav_click` | `location`: `header`, `mobile-menu`; `target`: the link's `href` | `data-track-*` attributes |
| `section_view` | `section`: the section `id`; `path` | `SectionViewTracker`, once per section per page view |
| `faq_open` | `question` | `FAQSection` |
| `generate_lead` | `method`: `whatsapp`, `phone`, `directions`; `location`: same as the click | `CtaClickTracker`, after every `whatsapp_click`, `phone_click` and `directions_click` |
| `exam_carousel_navigate` | `exam`: the exam's slug | `ExamsSection`, when the visitor swipes or taps a dot. Autoplay doesn't fire it |

On top of these, PostHog captures `$pageview` and autocaptures every click, and GA4 captures `page_view` and its enhanced measurement events.

## The funnel

**Page view → section viewed → contact click.**

### PostHog

1. Data management → Actions → New action **Contato**, matching any of `whatsapp_click`, `phone_click`, `directions_click`, `email_click`.
2. Product analytics → New insight → Funnels, with these steps:
   1. `$pageview`
   2. `section_view`
   3. `whatsapp_click` (or the **Contato** action for every contact channel)
3. Break down by `location` to compare CTAs, or by `section` on step 2 to see which section leads to clicks.
4. Save it to a dashboard named **Leads WhatsApp**.

`generate_lead` fires on the same clicks as the **Contato** action, minus `email_click`. Build a funnel on one or the other, not both.

### GA4

**Admin setup (once):**

1. Admin → Data display → Events → turn on **Mark as key event** for `generate_lead`. It covers WhatsApp, phone and directions clicks, and it's the event to import into Google Ads. It's only listed once it has fired in production.
2. Admin → Data display → Custom definitions → **Create custom dimension**, scope **Event**, one per property. GA4 hides event properties in reports until you register them, and dimensions aren't retroactive: they only fill in from the day you create them.

| Dimension name | Event parameter |
| --- | --- |
| Location | `location` |
| Method | `method` |
| Section | `section` |
| Exam | `exam` |
| Convênio | `convenio` |
| Question | `question` |

**Funnel exploration:**

1. Explore → **Funnel exploration**.
2. Steps (pencil icon):
   1. **Visitou o site:** event `page_view`
   2. **Viu uma seção:** event `section_view`
   3. **Lead:** event `generate_lead`
3. Keep the defaults: **closed funnel**, with **Indirectly followed by** between steps.
4. Breakdown: **Method** to compare WhatsApp, phone and directions, or **Location** to compare CTAs.
5. Date range: from 2026-10-16 onward. Older dates have no `generate_lead`.

Variations:

- **Section → lead:** set step 2 to `section_view` with the condition `section = convenios` (or `faq`, `exames`).
- **Show next action:** what people do after each step, like `faq_open` or `exam_carousel_navigate`.
- **Show elapsed time:** how long a visitor takes from page view to lead.

Explorations take 24–48h to show new data; use Reports → Realtime to confirm events arrive. They're private until you click **Share**.

Ad blockers drop GA4 more often than PostHog, which goes through `/ingest`, so GA4's numbers will be lower. Use PostHog for the funnel, and GA4 for traffic sources and ads.

## Adding tracking to a feature

1. **Link or button that leaves the site, or a contact action:** add `data-track-event` and `data-track-location`. Every other `data-track-*` attribute becomes a property (`data-track-target` → `target`). `CtaClickTracker` does the rest, and it works in server components.
2. **New section on a page:** give it `<section id="…">` inside `<main>`. `section_view` picks it up automatically.
3. **Interaction that isn't a link** (accordion, carousel, form step): call `trackEvent()` from the client component.
4. **Naming:** events are `snake_case`, written as `<object>_<action>` (`faq_open`, `whatsapp_click`). Property values are lowercase `kebab-case` when they're identifiers.
5. **Never send** patient data, health data or anything a visitor types. CTA type, location and public page copy only.
6. **Document it:** add the event or the new `location` value to the table above, in the same PR.
7. **Check it:** in `npm run dev`, every `trackEvent()` call logs `[analytics] <event> {…}` to the browser console.
