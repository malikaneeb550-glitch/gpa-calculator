export const dynamic = "force-static";
import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ntu-gpa-calculator.vercel.app/";
const ROUTES = ["", "calculator"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: route === "" ? SITE_URL : `${SITE_URL}/${route}`,
    lastModified: new Date(),
    images: [
      {
        url: `${SITE_URL}/ntu-logo.png`,
        title: "NTU GPA Calculator",
        caption: "NTU logo for the GPA calculator site",
      },
    ],
  }));
}
