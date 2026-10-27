import { LocationPage } from "@/components/location-page";
import { getLocationBySlug } from "@/data/locations";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { notFound } from "next/navigation";

const location = getLocationBySlug("thane");

export const metadata = location
  ? createPageMetadata({
      title: `Goods Transport in Thane | ${siteConfig.companyName}`,
      description: location.description,
      path: "/goods-transport-thane",
    })
  : {};

export default function ThaneTransportPage() {
  if (!location) notFound();
  return <LocationPage location={location} />;
}
