import type { MetadataRoute } from "next";
import { businessData } from "@/data/business";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${businessData.urls.portfolio}/sitemap.xml`,
  };
}
