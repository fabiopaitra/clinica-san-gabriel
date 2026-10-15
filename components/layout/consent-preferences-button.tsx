"use client";

import { NEEDS_CONSENT } from "@/lib/analytics";
import { openConsentPreferences } from "@/lib/consent";

export function ConsentPreferencesButton({ className }: { className?: string }) {
  if (!NEEDS_CONSENT) return null;

  return (
    <button type="button" onClick={openConsentPreferences} className={className}>
      Preferências de cookies
    </button>
  );
}
