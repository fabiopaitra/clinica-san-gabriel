import posthog from "posthog-js";
import Hotjar from "@hotjar/browser";
import { sendGAEvent } from "@next/third-parties/google";

import { hasAnalyticsConsent } from "@/lib/consent";

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
export const HOTJAR_SITE_ID = Number(process.env.NEXT_PUBLIC_HOTJAR_SITE_ID) || undefined;

export const NEEDS_CONSENT = Boolean(GA_MEASUREMENT_ID || HOTJAR_SITE_ID);

export type EventProperties = Record<string, string>;

export function trackEvent(name: string, properties: EventProperties = {}) {
  if (process.env.NODE_ENV === "development") console.debug("[analytics]", name, properties);
  if (posthog.__loaded) posthog.capture(name, properties);

  if (!hasAnalyticsConsent()) return;
  if (GA_MEASUREMENT_ID) sendGAEvent("event", name, properties);
  if (Hotjar.isReady()) Hotjar.event(name);
}
