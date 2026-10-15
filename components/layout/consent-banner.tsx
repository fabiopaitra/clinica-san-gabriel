"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { NEEDS_CONSENT } from "@/lib/analytics";
import {
  getConsentChoice,
  getServerConsentChoice,
  isPreferencesOpen,
  saveConsentChoice,
  subscribeToConsent,
} from "@/lib/consent";

function useBannerVisible() {
  const choice = useSyncExternalStore(
    subscribeToConsent,
    getConsentChoice,
    getServerConsentChoice
  );
  const preferencesOpen = useSyncExternalStore(
    subscribeToConsent,
    isPreferencesOpen,
    () => false
  );
  const hydrated = useSyncExternalStore(
    subscribeToConsent,
    () => true,
    () => false
  );
  return NEEDS_CONSENT && hydrated && (choice === null || preferencesOpen);
}

export function ConsentBanner() {
  if (!useBannerVisible()) return null;

  return (
    <section
      role="dialog"
      aria-labelledby="consent-title"
      aria-describedby="consent-description"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-2xl rounded-lg border bg-background p-4 shadow-lg sm:p-6"
    >
      <h2 id="consent-title" className="text-base font-semibold text-foreground">
        Cookies e privacidade
      </h2>
      <p id="consent-description" className="mt-2 text-sm text-muted-foreground">
        Usamos cookies do Google Analytics e do Hotjar para entender como o site
        é usado e melhorar seu atendimento. Você pode aceitar ou recusar, e mudar
        de ideia quando quiser.{" "}
        <Link href="/politica-privacidade" className="text-primary hover:underline">
          Saiba mais na Política de Privacidade
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="outline" size="lg" onClick={() => saveConsentChoice("denied")}>
          Recusar
        </Button>
        <Button size="lg" onClick={() => saveConsentChoice("granted")}>
          Aceitar
        </Button>
      </div>
    </section>
  );
}
