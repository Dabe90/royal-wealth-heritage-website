import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/content";
import { enrollmentForms } from "@/lib/forms-registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/financial-services",
    "/academy",
    "/academy/forms",
    ...enrollmentForms.map((f) => f.href),
    "/contact",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.includes("forms") ? "monthly" : route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/academy/forms" ? 0.9 : 0.8,
  }));
}
