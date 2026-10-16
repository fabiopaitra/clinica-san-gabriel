import type { MetadataRoute } from "next";
import { CLINIC } from "@/lib/clinic-data";
import { EXAM_PAGES, SPECIALTY_PAGES, examPath, specialtyPath } from "@/lib/service-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, CLINIC.domain).toString();

  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    ...SPECIALTY_PAGES.map((page) => ({
      url: url(specialtyPath(page.slug)),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    ...EXAM_PAGES.map((page) => ({
      url: url(examPath(page.slug)),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    { url: url("/politica-privacidade"), changeFrequency: "yearly", priority: 0.1 },
    { url: url("/termos-uso"), changeFrequency: "yearly", priority: 0.1 },
  ];
}
