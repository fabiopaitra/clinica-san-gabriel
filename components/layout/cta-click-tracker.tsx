"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

function trackCtaClick(event: MouseEvent) {
  if (!(event.target instanceof Element)) return;

  const cta = event.target.closest<HTMLElement>("[data-track-event]");
  if (!cta) return;

  const { trackEvent, trackLocation } = cta.dataset;
  if (!trackEvent) return;

  track(trackEvent, { location: trackLocation ?? null });
}

export function CtaClickTracker() {
  useEffect(() => {
    document.addEventListener("click", trackCtaClick);
    return () => document.removeEventListener("click", trackCtaClick);
  }, []);

  return null;
}
