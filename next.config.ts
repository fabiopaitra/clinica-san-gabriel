import type { NextConfig } from "next";

const POSTHOG_REGION = process.env.NEXT_PUBLIC_POSTHOG_REGION ?? "us";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: `https://${POSTHOG_REGION}-assets.i.posthog.com/static/:path*`,
      },
      {
        source: "/ingest/array/:path*",
        destination: `https://${POSTHOG_REGION}-assets.i.posthog.com/array/:path*`,
      },
      {
        source: "/ingest/:path*",
        destination: `https://${POSTHOG_REGION}.i.posthog.com/:path*`,
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
