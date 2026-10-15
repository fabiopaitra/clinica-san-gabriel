---
ticket: add-unimed
status: implemented
source: free text
updated: 2026-10-15T12:35:33Z
pr: https://github.com/fabiopaitra/clinica-san-gabriel/pull/2
---
# add-unimed: Add Unimed Curitiba to the convênios list

## Description

The clinic now accepts Unimed Curitiba, the Unimed cooperative that covers Colombo. Add it to the accepted convênios on the home page, and name it in the section's highlight sentence, since it's one of the best-known plans in the region. The label is "Unimed Curitiba", not plain "Unimed", so patients from other Unimed cooperatives don't read it as accepted.

## Acceptance Criteria

1. Given the home page, when the convênios section renders, should show "Unimed Curitiba" in the scrolling list and in the screen-reader list of accepted convênios.
2. Given the home page, when the convênios section renders, should name "Unimed Curitiba" in the highlight sentence alongside Amil, Bradesco Saúde, Sul América and Porto Seguro Saúde.

## Decisions

- Label: "Unimed", "Unimed Curitiba" or "Unimed (intercâmbio)" → "Unimed Curitiba"; only the local cooperative is accepted (user answer)
- Highlight sentence at `components/sections/convenios-section.tsx:28` → add Unimed Curitiba to it, using the same label as the list (user answer)
- Brand colour → not a question: the list renders every name in `text-neutral-400` (`components/sections/convenios-section.tsx:58`), so `color` / `textColor` in `CONVENIOS` don't show on the page (code)
- Other places → none: the FAQ, metadata and the JSON-LD in `components/sections/localizacao-section.tsx` don't list convênios (code)

## Plan

Two edits. Add one entry to `CONVENIOS` in `lib/clinic-data.ts`, which already feeds both the scrolling list and the screen-reader list in `ConveniosSection`. Then add the name to the hardcoded highlight sentence. The last convênios update (`1b1dc8d`) shows the pattern: one `{ name, color, textColor }` entry per plan.

### Steps

1. `lib/clinic-data.ts` — add `{ name: "Unimed Curitiba", color: "#00A651", textColor: "#ffffff" }` to `CONVENIOS`, between "Sul América" and "Voam" to keep the list's roughly alphabetical order. `#00A651` is the colour the old "Unimed" entry used before `1b1dc8d` removed it — satisfies AC 1. Verify: `npx tsc --noEmit` passes; the section shows the new name.
2. `components/sections/convenios-section.tsx:28` — change the sentence to "Trabalhamos com Amil, Bradesco Saúde, Sul América, Porto Seguro Saúde, Unimed Curitiba e outros. Confira a lista completa abaixo e tire dúvidas sobre sua cobertura." — satisfies AC 2. Verify: the sentence renders with the new name.

### Files affected

| File | Change |
|------|--------|
| `lib/clinic-data.ts` | modify — one new `CONVENIOS` entry |
| `components/sections/convenios-section.tsx` | modify — highlight sentence names Unimed Curitiba |

### Verification

- `npm run lint`, `npx tsc --noEmit`, `npm run build`
- On the Vercel preview, `/#convenios` shows "Unimed Curitiba" in the highlight sentence and in the scrolling list, and the screen-reader paragraph ("Convênios aceitos: …") includes it.

### AC mapping

- AC 1 → step 1
- AC 2 → step 2
