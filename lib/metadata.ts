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
  const socialImage = new URL(
    "/goods-transport-social-share.png",
    siteConfig.productionDomain,
  ).toString();

  return {
    title: { absolute: title },
    description,
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: {
      title,
      description,
      ...(url ? { url } : {}),
      siteName: siteConfig.companyName,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.companyName} goods transport and part load services`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
