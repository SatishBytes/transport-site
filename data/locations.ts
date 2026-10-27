import type { FAQ } from "./faqs";

export interface Location {
  name: string;
  slug: string;
  keyword: string;
  title: string;
  description: string;
  intro: string;
  planningNotes: string;
  shipmentExamples: string[];
  faqs: FAQ[];
  relatedLocations: string[];
}

export const locations: Location[] = [
  {
    name: "Mumbai",
    slug: "mumbai",
    keyword: "transport services in Mumbai",
    title: "Goods Transport in Mumbai",
    description:
      "Ask about goods and part load transport in Mumbai. Share the pickup locality, destination, shipment details and loading notes so availability can be checked.",
    intro:
      "Planning a goods movement to or from Mumbai? Tell us where the consignment starts and ends, what it contains, and how it is packed. We can review the details and confirm whether a suitable transport arrangement is available.",
    planningNotes:
      "Mumbai consignments can involve different pickup and receiving conditions across a large urban area. Include the specific locality, access or loading notes, and receiving contact when you enquire.",
    shipmentExamples: [
      "Cartons or packaged business goods",
      "A partial consignment that may suit shared transport",
      "Goods requiring a dedicated arrangement, subject to confirmation",
    ],
    faqs: [
      {
        question: "Can I request a goods transport quote for Mumbai?",
        answer:
          "Yes. Share the Mumbai pickup or delivery locality, the other end of the movement, and your shipment details. Serviceability and an arrangement must be confirmed before booking.",
      },
      {
        question: "What Mumbai pickup details should I provide?",
        answer:
          "Provide the locality, pickup contact, goods description, approximate weight and dimensions, and any access or loading instructions that could affect collection.",
      },
    ],
    relatedLocations: ["thane", "vadodara"],
  },
  {
    name: "Thane",
    slug: "thane",
    keyword: "transport services in Thane",
    title: "Goods Transport in Thane",
    description:
      "Enquire about goods and part load transport in Thane. Include collection and delivery points, shipment details and access notes for an availability review.",
    intro:
      "For a Thane goods movement, the exact pickup and delivery points help shape a useful enquiry. Share the shipment type and handling context so the transport requirement can be reviewed before you make plans.",
    planningNotes:
      "If your consignment is collected from or delivered within Thane, mention the relevant locality, building or site access, loading arrangements, and a contact person at each end.",
    shipmentExamples: [
      "Business cartons and packaged inventory",
      "Part consignments that do not fill a truck",
      "Goods with a specified collection or receiving window",
    ],
    faqs: [
      {
        question: "Do you arrange transport enquiries for Thane?",
        answer:
          "You can submit a Thane enquiry with both locations and shipment details. The route and transport arrangement are subject to confirmation.",
      },
      {
        question: "Can I ask about part load transport from Thane?",
        answer:
          "Yes. Include the approximate shipment size, weight, packaging, pickup point, and destination so part load suitability can be assessed.",
      },
    ],
    relatedLocations: ["mumbai", "ahmedabad"],
  },
  {
    name: "Vadodara (Baroda)",
    slug: "vadodara",
    keyword: "goods transport in Vadodara",
    title: "Goods Transport in Vadodara (Baroda)",
    description:
      "Ask about goods and part load transport in Vadodara or Baroda. Share both locations, goods details and handling needs to review possible transport arrangements.",
    intro:
      "Whether your enquiry calls the city Vadodara or Baroda, include the name used at the pickup and delivery points. Clear location details help us understand the movement you need and review the available transport options.",
    planningNotes:
      "For Vadodara-area consignments, specify the exact origin and destination rather than only the city name. Add packaging, approximate dimensions, weight, and any site-specific loading instructions.",
    shipmentExamples: [
      "Packaged stock moving between business locations",
      "Smaller loads for which shared transport may be suitable",
      "Larger consignments that need a separately reviewed arrangement",
    ],
    faqs: [
      {
        question: "Is Vadodara also listed as Baroda?",
        answer:
          "This page uses both names to make the location clear. In your enquiry, provide the full pickup and delivery addresses or localities.",
      },
      {
        question: "How can I check transport availability for Vadodara?",
        answer:
          "Send the origin, destination, goods type, approximate weight and dimensions. Availability and the appropriate option will need to be confirmed.",
      },
    ],
    relatedLocations: ["ahmedabad", "mumbai"],
  },
  {
    name: "Ahmedabad",
    slug: "ahmedabad",
    keyword: "goods transport in Ahmedabad",
    title: "Goods Transport in Ahmedabad",
    description:
      "Enquire about goods and part load transport involving Ahmedabad. Provide both locations, shipment dimensions, handling notes and pickup date for review.",
    intro:
      "Use this page to enquire about a goods movement involving Ahmedabad. A clear description of the shipment, its packaging, and the precise locations at both ends helps make the initial discussion more useful.",
    planningNotes:
      "Ahmedabad enquiries should include the relevant locality or site at each end, goods handling notes, approximate dimensions and weight, and the preferred pickup date.",
    shipmentExamples: [
      "Packed goods for commercial delivery",
      "A smaller consignment to assess for part load movement",
      "A shipment with particular site access or receiving instructions",
    ],
    faqs: [
      {
        question: "Can I enquire about goods transport in Ahmedabad?",
        answer:
          "Yes. Provide both locations, shipment details, and your preferred pickup date. We can review the request and confirm whether service is available.",
      },
      {
        question: "What details help assess an Ahmedabad part load enquiry?",
        answer:
          "Share the goods type, packaging, approximate weight and dimensions, collection point, destination, and any handling requirements.",
      },
    ],
    relatedLocations: ["vadodara", "thane"],
  },
  {
    name: "Uttar Pradesh",
    slug: "uttar-pradesh",
    keyword: "goods transport to Uttar Pradesh",
    title: "Goods Transport to Uttar Pradesh",
    description:
      "Ask about goods transport to or from Uttar Pradesh. Include the destination city or district, pickup point and shipment details so the route can be reviewed.",
    intro:
      "An enquiry for Uttar Pradesh needs more than a state name: include the destination city or district and the pickup location. With those details and a description of the goods, the request can be reviewed for an appropriate arrangement.",
    planningNotes:
      "Uttar Pradesh covers many possible delivery points. Name the destination city or district, provide a receiving contact, and share any delivery-site or unloading instructions with your enquiry.",
    shipmentExamples: [
      "Packaged goods going to a named city or district",
      "Part consignments for which shared transport can be assessed",
      "Business shipments with a specified receiving contact",
    ],
    faqs: [
      {
        question: "Can I request transport to any city in Uttar Pradesh?",
        answer:
          "Share the exact destination city or district and pickup point. Availability for the specific movement must be checked and confirmed before booking.",
      },
      {
        question: "What should an Uttar Pradesh delivery enquiry include?",
        answer:
          "Include the destination city or district, full pickup location, goods description, approximate weight and dimensions, and receiving contact details.",
      },
    ],
    relatedLocations: ["mumbai", "vadodara"],
  },
  {
    name: "Rajasthan",
    slug: "rajasthan",
    keyword: "goods transport to Rajasthan",
    title: "Goods Transport to Rajasthan",
    description:
      "Enquire about goods and part load transport to or from Rajasthan. Share the destination city, pickup details and shipment requirements to check availability.",
    intro:
      "For a Rajasthan movement, identify the destination city as well as the pickup point. Different delivery locations have different practical requirements, so the shipment description and contact details are useful from the start.",
    planningNotes:
      "Include the specific Rajasthan city or district, delivery-site access information, receiving contact, and any preferred collection date rather than relying on the state name alone.",
    shipmentExamples: [
      "Boxed commercial goods for a named Rajasthan destination",
      "Smaller shipments to evaluate for part load transport",
      "Shipments where the recipient needs advance coordination",
    ],
    faqs: [
      {
        question: "How do I enquire about transport to Rajasthan?",
        answer:
          "Submit the pickup location, Rajasthan destination city or district, goods type, approximate weight, and preferred date. The movement is subject to serviceability confirmation.",
      },
      {
        question: "Can a smaller shipment go to Rajasthan as part load?",
        answer:
          "Part load suitability depends on the shipment and confirmed availability. Provide dimensions, packaging, weight, and both locations for review.",
      },
    ],
    relatedLocations: ["ahmedabad", "mumbai"],
  },
];

export function getLocationHref(location: Pick<Location, "slug">) {
  return `/goods-transport-${location.slug}`;
}

export function getLocationBySlug(slug: string) {
  return locations.find((location) => location.slug === slug);
}
