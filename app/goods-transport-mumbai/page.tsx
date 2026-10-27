import { LocationPage } from "@/components/location-page";
import { getLocationBySlug } from "@/data/locations";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { notFound } from "next/navigation";

const location = getLocationBySlug("mumbai");

export const metadata = location
  ? createPageMetadata({
      title: `Goods Transport in Mumbai | ${siteConfig.companyName}`,
      description: location.description,
      path: "/goods-transport-mumbai",
    })
  : {};

export default function MumbaiTransportPage() {
  if (!location) notFound();
  return <LocationPage location={location} />;
}
