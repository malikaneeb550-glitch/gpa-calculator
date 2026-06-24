import { NextResponse } from "next/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://apnagpa.surge.sh";
const ROUTES = ["", "calculator"];

export const dynamic = "force-static";

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map((route) => {
    const path = route === "" ? SITE_URL : `${SITE_URL}/${route}`;
    return `  <url>
    <loc>${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === "" ? "1.0" : "0.8"}</priority>
  </url>`;
  }).join("\n")}
</urlset>`;
}

export function GET() {
  return new NextResponse(generateSiteMap(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
