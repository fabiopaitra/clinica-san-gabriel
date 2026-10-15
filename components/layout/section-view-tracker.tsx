"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { trackEvent } from "@/lib/analytics";

export function SectionViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    const seen = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const section = entry.target.id;
          if (!entry.isIntersecting || seen.has(section)) continue;
          seen.add(section);
          trackEvent("section_view", { section, path: pathname });
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
