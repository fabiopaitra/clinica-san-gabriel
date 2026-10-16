import type { MetadataRoute } from "next";
import { CLINIC } from "@/lib/clinic-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/ingest/" },
    sitemap: `${CLINIC.domain}/sitemap.xml`,
  };
}
