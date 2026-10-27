import { LocationPage } from "@/components/location-page";
import { getLocationBySlug } from "@/data/locations";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { notFound } from "next/navigation";

const location = getLocationBySlug("rajasthan");

export const metadata = location
  ? createPageMetadata({
      title: `Goods Transport to Rajasthan | ${siteConfig.companyName}`,
      description: location.description,
      path: "/goods-transport-rajasthan",
    })
  : {};

export default function RajasthanTransportPage() {
  if (!location) notFound();
  return <LocationPage location={location} />;
}
