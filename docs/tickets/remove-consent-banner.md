---
ticket: remove-consent-banner
status: implemented
source: free text
updated: 2026-10-15T18:34:16Z
---
# remove-consent-banner: Load GA4 and Hotjar for every visitor, without a cookie banner

## Description

Remove the cookie banner and "Preferências de cookies", and load GA4 and Hotjar for every visitor, so GA4 isn't limited to visitors who click "Aceitar". The privacy policy moves GA4 and Hotjar to legitimate interest and explains how to opt out. This goes against the ANPD's guidance that consent-based cookies should be off by default, so it needs the clinic's sign-off before merging.

## Acceptance Criteria

1. Given GA4 and Hotjar are configured, when any page loads, should load both with no cookie banner.
2. Given the footer, should no longer show "Preferências de cookies".
3. Given the privacy policy, should say GA4 and Hotjar use cookies on the basis of legitimate interest, and how to block them or object.

## Decisions

- Auto-accept and remove preferences → yes (user answer)
- Merge → left to the user because of the LGPD risk (raised to the user)
- Opt-out path → browser settings, the GA opt-out add-on, and the clinic's contact details (code: policy already lists the LGPD rights)
