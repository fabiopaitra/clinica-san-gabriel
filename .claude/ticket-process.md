# Ticket process

- **Source:** free text
- **Tickets dir:** `docs/tickets/`
- **Verify:** `npm run lint`, `npx tsc --noEmit`, `npm run build`
- **Delivery:** branch + PR into `main` via `gh pr create`. Vercel builds a preview deployment for every PR. After opening the PR, wait for the Vercel check (`gh pr checks <pr> --watch`), then put the preview URL in the wrap-up so the change can be tested there.
- **Notes:** site copy is in Portuguese (pt-BR). Clinic data (convênios, services, contact) lives in `lib/clinic-data.ts`. Every user-facing ticket gets an analytics AC: which events or `location` values it adds, per `docs/ANALYTICS.md`. `/ticket-plan` includes the tracking step and the `docs/ANALYTICS.md` event-table update.
