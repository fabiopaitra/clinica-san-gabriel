# Clínica San Gabriel

Landing page for an ophthalmology clinic in Colombo, PR. Its goal is to turn visits into WhatsApp conversations. Next.js App Router, deployed on Vercel. Site copy is in Portuguese (pt-BR).

- Clinic data (convênios, services, contact) lives in `lib/clinic-data.ts`.
- Ticket flow: `/ticket-refine` → `/ticket-plan` → `/ticket-implement`, configured in `.claude/ticket-process.md`.
- Verify: `npm run lint`, `npx tsc --noEmit`, `npm run build`.

## Analytics is part of every feature

Every user-facing feature ships with its tracking, following `docs/ANALYTICS.md`:

- Contact CTAs and outbound links get `data-track-event` / `data-track-location`.
- New page sections are `<section id="…">` inside `<main>`, so `section_view` covers them.
- Other interactions call `trackEvent()` from `lib/analytics.ts`.
- New events or `location` values go in the event table in `docs/ANALYTICS.md` in the same PR.
- A new analytics tool also means updating the privacy policy (`app/politica-privacidade/page.tsx`, section 5).
- Never send patient data, health data or anything a visitor types.
