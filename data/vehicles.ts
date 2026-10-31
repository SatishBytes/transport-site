export interface Vehicle {
  id: string;
  sizeFeet: number;
  title: string;
  description: string;
  image: string;
  alt: string;
  suitableFor: string[];
}

// Availability and suitability are confirmed by the business at quote time.
export const vehicles: Vehicle[] = [
  {
    id: "14-feet",
    sizeFeet: 14,
    title: "14 Feet Vehicle",
    description:
      "A smaller vehicle option for goods transport. Suitability depends on your shipment and route.",
    image: "/vehicles/goods-vehicle-14-feet.svg",
    alt: "Illustration of a 14 feet goods transport vehicle",
    suitableFor: ["Smaller shipments", "Compact consignments"],
  },
  {
    id: "16-feet",
    sizeFeet: 16,
    title: "16 Feet Vehicle",
    description:
      "A medium-size vehicle option for business goods, subject to shipment requirements.",
    image: "/vehicles/goods-vehicle-16-feet.svg",
    alt: "Illustration of a 16 feet goods transport vehicle",
    suitableFor: ["Medium loads", "Business consignments"],
  },
  {
    id: "17-feet",
    sizeFeet: 17,
    title: "17 Feet Vehicle",
    description:
      "A medium-size vehicle option to discuss for your goods and delivery route.",
    image: "/vehicles/goods-vehicle-17-feet.svg",
    alt: "Illustration of a 17 feet goods transport vehicle",
    suitableFor: ["Medium loads", "Consignments reviewed by shipment details"],
  },
  {
    id: "20-feet",
    sizeFeet: 20,
    title: "20 Feet Vehicle",
    description:
      "A larger vehicle option to discuss for goods that may need more loading space.",
    image: "/vehicles/goods-vehicle-20-feet.svg",
    alt: "Illustration of a 20 feet goods transport vehicle",
    suitableFor: ["Larger or bulkier goods", "Consignments reviewed by shipment details"],
  },
];
