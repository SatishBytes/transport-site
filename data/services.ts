export interface Service {
  title: string;
  slug: string;
  summary: string;
  keyword: string;
  optional?: boolean;
}

export const services: Service[] = [
  {
    title: "Part Load Transport",
    slug: "part-load-transport",
    summary:
      "Transport for consignments that do not require an entire truck, subject to confirmed availability.",
    keyword: "part load transport",
  },
  {
    title: "Goods Transportation",
    slug: "goods-transportation",
    summary:
      "Road transportation services for business goods, with shipment details confirmed before booking.",
    keyword: "goods transport services",
  },
  {
    title: "Road Transport",
    slug: "road-transport",
    summary:
      "Road transportation arrangements for business consignments, based on confirmed requirements.",
    keyword: "road transportation services",
  },
  {
    title: "Full Truck Load",
    slug: "full-truck-load",
    summary:
      "A dedicated-truck transport option for eligible goods and confirmed routes.",
    keyword: "truck transport services",
    optional: true,
  },
];
