"use client";

import { useEffect } from "react";
import Hotjar from "@hotjar/browser";
import { GoogleAnalytics } from "@next/third-parties/google";

import { GA_MEASUREMENT_ID, HOTJAR_SITE_ID } from "@/lib/analytics";

const HOTJAR_SNIPPET_VERSION = 6;

export function ThirdPartyAnalytics() {
  useEffect(() => {
    if (HOTJAR_SITE_ID && !Hotjar.isReady()) {
      Hotjar.init(HOTJAR_SITE_ID, HOTJAR_SNIPPET_VERSION);
    }
  }, []);

  if (!GA_MEASUREMENT_ID) return null;
  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
