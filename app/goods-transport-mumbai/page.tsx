import { LocationPage } from "@/components/location-page";
import { getLocationBySlug } from "@/data/locations";
import { createPageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

const location = getLocationBySlug("mumbai");

export const metadata = location
  ? createPageMetadata({
      title: location.title,
      description: location.description,
      path: "/goods-transport-mumbai",
    })
  : {};

export default function MumbaiTransportPage() {
  if (!location) notFound();
  return <LocationPage location={location} />;
}
