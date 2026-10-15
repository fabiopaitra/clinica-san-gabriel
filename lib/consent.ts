export type ConsentChoice = "granted" | "denied";

const STORAGE_KEY = "analytics-consent";
const listeners = new Set<() => void>();
let preferencesOpen = false;

function readChoice(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function writeChoice(choice: ConsentChoice) {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    return;
  }
}

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribeToConsent(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getConsentChoice() {
  return readChoice();
}

export function getServerConsentChoice(): ConsentChoice | null {
  return null;
}

export function hasAnalyticsConsent() {
  return typeof window !== "undefined" && readChoice() === "granted";
}

export function isPreferencesOpen() {
  return preferencesOpen;
}

export function openConsentPreferences() {
  preferencesOpen = true;
  notify();
}

const ANALYTICS_COOKIE = /^(_ga|_hj)/;

export function deleteAnalyticsCookies() {
  const rootDomain = window.location.hostname.replace(/^www\./, "");
  const domains = ["", `; domain=${window.location.hostname}`, `; domain=.${rootDomain}`];
  for (const cookie of document.cookie.split("; ")) {
    const name = cookie.split("=")[0];
    if (!ANALYTICS_COOKIE.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; max-age=0; path=/${domain}`;
    }
  }
}

export function saveConsentChoice(choice: ConsentChoice) {
  const revokingConsent = readChoice() === "granted" && choice === "denied";
  writeChoice(choice);
  preferencesOpen = false;
  notify();
  // GA4 and Hotjar can't be unloaded once running; a reload starts the page without them.
  if (revokingConsent) window.location.reload();
}
