"use client";

import { useEffect } from "react";

import { trackEvent, type EventProperties } from "@/lib/analytics";

const LEAD_METHODS: Record<string, string> = {
  whatsapp_click: "whatsapp",
  phone_click: "phone",
  directions_click: "directions",
};

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

  const properties = eventPropertiesFrom(cta.dataset);
  trackEvent(cta.dataset.trackEvent, properties);

  const method = LEAD_METHODS[cta.dataset.trackEvent];
  if (method) trackEvent("generate_lead", { method, location: properties.location });
}

export function CtaClickTracker() {
  useEffect(() => {
    document.addEventListener("click", trackCtaClick);
    return () => document.removeEventListener("click", trackCtaClick);
  }, []);

  return null;
}
