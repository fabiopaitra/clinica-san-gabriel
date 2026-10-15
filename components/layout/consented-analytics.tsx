"use client";

import { useEffect, useSyncExternalStore } from "react";
import Hotjar from "@hotjar/browser";
import { GoogleAnalytics } from "@next/third-parties/google";

import { GA_MEASUREMENT_ID, HOTJAR_SITE_ID } from "@/lib/analytics";
import {
  deleteAnalyticsCookies,
  getConsentChoice,
  hasAnalyticsConsent,
  subscribeToConsent,
} from "@/lib/consent";

const HOTJAR_SNIPPET_VERSION = 6;

export function ConsentedAnalytics() {
  const consented = useSyncExternalStore(
    subscribeToConsent,
    hasAnalyticsConsent,
    () => false
  );

  useEffect(() => {
    if (getConsentChoice() === "denied") deleteAnalyticsCookies();
  }, []);

  useEffect(() => {
    if (consented && HOTJAR_SITE_ID && !Hotjar.isReady()) {
      Hotjar.init(HOTJAR_SITE_ID, HOTJAR_SNIPPET_VERSION);
    }
  }, [consented]);

  if (!consented || !GA_MEASUREMENT_ID) return null;
  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
