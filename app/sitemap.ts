import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const urls = [
    "",
    "/services/tax-preparation",
    "/services/real-estate",
    "/services/notary",
    "/services/immigration",
    "/services/dr-investments",
  ];
  return urls.map((u) => ({ url: `${base}${u}`, changeFrequency: "weekly", priority: u === "" ? 1 : 0.8 }));
}
