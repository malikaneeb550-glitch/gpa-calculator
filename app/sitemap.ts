export const dynamic = "force-static";
import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://apnagpa.surge.sh";
const ROUTES = ["", "calculator"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: route === "" ? SITE_URL : `${SITE_URL}/${route}`,
    lastModified: new Date(),
  }));
}
