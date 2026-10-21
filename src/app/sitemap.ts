import type { MetadataRoute } from "next";
import { businessData } from "@/data/business";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = businessData.urls.portfolio;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/proyectos/custom-commerce`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
