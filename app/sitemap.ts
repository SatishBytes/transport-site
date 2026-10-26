import type { MetadataRoute } from "next";
import { getLocationHref, locations } from "@/data/locations";
import { siteConfig } from "@/lib/site-config";

const staticPaths = [
  "/",
  "/about",
  "/services",
  "/part-load-transport",
  "/routes",
  "/get-a-quote",
  "/contact",
  "/faq",
  "/privacy-policy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...staticPaths, ...locations.map(getLocationHref)].map((path) => ({
    url: new URL(path, siteConfig.productionDomain).toString(),
  }));
}
