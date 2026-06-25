export const dynamic = "force-static";
import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ntu-gpa-calculator.vercel.app/";

export default function robots(): MetadataRoute.Robots {
  return {
    host: SITE_URL,
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
