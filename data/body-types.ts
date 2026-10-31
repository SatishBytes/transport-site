export interface VehicleBodyType {
  id: "open-body" | "closed-body";
  title: string;
  label: string;
  description: string;
  suitableFor: string[];
  image: string;
  alt: string;
}

export const bodyTypes: VehicleBodyType[] = [
  {
    id: "open-body",
    title: "Open Body Vehicle",
    label: "Open body",
    description:
      "For bulky or oversized goods that do not need an enclosed body.",
    suitableFor: [
      "Bulky or oversized goods",
      "Goods that do not need an enclosed body",
    ],
    image: "/vehicles/open-body-vehicle.svg",
    alt: "Illustration of an open body goods vehicle with low side rails",
  },
  {
    id: "closed-body",
    title: "Closed Body Vehicle",
    label: "Closed body",
    description:
      "For goods that should be kept in an enclosed cargo area.",
    suitableFor: ["Goods that should be kept in an enclosed cargo area"],
    image: "/vehicles/closed-body-vehicle.svg",
    alt: "Illustration of a closed body goods vehicle with an enclosed cargo area",
  },
];
