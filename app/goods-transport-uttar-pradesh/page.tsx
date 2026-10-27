import { LocationPage } from "@/components/location-page";
import { getLocationBySlug } from "@/data/locations";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { notFound } from "next/navigation";

const location = getLocationBySlug("uttar-pradesh");

export const metadata = location
  ? createPageMetadata({
      title: `Goods Transport to Uttar Pradesh | ${siteConfig.companyName}`,
      description: location.description,
      path: "/goods-transport-uttar-pradesh",
    })
  : {};

export default function UttarPradeshTransportPage() {
  if (!location) notFound();
  return <LocationPage location={location} />;
}
