"use client";

import { useEffect } from "react";

import { trackEvent, type EventProperties } from "@/lib/analytics";

function eventPropertiesFrom(dataset: DOMStringMap): EventProperties {
  const properties: EventProperties = {};
  for (const [key, value] of Object.entries(dataset)) {
    if (!key.startsWith("track") || key === "trackEvent" || value === undefined) continue;
    const name = key.slice("track".length);
    properties[name.charAt(0).toLowerCase() + name.slice(1)] = value;
  }
  return properties;
}

function trackCtaClick(event: MouseEvent) {
  if (!(event.target instanceof Element)) return;

  const cta = event.target.closest<HTMLElement>("[data-track-event]");
  if (!cta?.dataset.trackEvent) return;

  trackEvent(cta.dataset.trackEvent, eventPropertiesFrom(cta.dataset));
}

export function CtaClickTracker() {
  useEffect(() => {
    document.addEventListener("click", trackCtaClick);
    return () => document.removeEventListener("click", trackCtaClick);
  }, []);

  return null;
}
