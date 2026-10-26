import type { Metadata } from "next";
import { siteConfig } from "./site-config";

interface PageMetadataOptions {
  title: string;
  description: string;
  path?: string;
}

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataOptions): Metadata {
  const canonicalPath = path
    ? path === "/"
      ? "/"
      : path.replace(/\/+$/, "")
    : undefined;
  const url = canonicalPath
    ? new URL(canonicalPath, siteConfig.productionDomain).toString()
    : undefined;
  const socialTitle = title.endsWith(`| ${siteConfig.companyName}`)
    ? title
    : `${title} | ${siteConfig.companyName}`;

  return {
    title,
    description,
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: {
      title: socialTitle,
      description,
      ...(url ? { url } : {}),
      siteName: siteConfig.companyName,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: socialTitle,
      description,
    },
  };
}
