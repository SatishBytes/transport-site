import Link from "next/link";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { CtaBanner } from "@/components/cta-banner";
import { FAQList } from "@/components/faq-list";
import { PageIntro } from "@/components/page-intro";
import { Section } from "@/components/section";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { faqs } from "@/data/faqs";
import { getLocationHref, locations } from "@/data/locations";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: `Part Load Transport | ${siteConfig.companyName}`,
  description:
    "Learn how part load transport works and what details to share. Ask Bachan Road Carriers about shipment suitability and availability for your exact route.",
  path: "/part-load-transport",
});

const partLoadFaqs = [
  faqs[0],
  {
    question: "What kinds of shipments may suit part load transport?",
    answer:
      "Packaged cartons, smaller business consignments, or other goods that do not require a full truck may be considered. Suitability depends on the shipment, handling needs, route, and confirmed availability.",
  },
  {
    question: "Does shared transport guarantee a lower price?",
    answer:
      "No. Shared transport does not guarantee savings. Any quote depends on the goods, shipment size, handling requirements, locations, and the transport arrangement confirmed for your enquiry.",
  },
  {
    question: "What information should I provide?",
    answer:
      "Share the pickup and delivery locations, goods type, packaging, approximate weight and dimensions, preferred pickup date, and any loading, unloading, or handling notes.",
  },
];

export default function PartLoadPage() {
  return (
    <main id="main-content" className="flex-1">
      <PageIntro
        title="Part Load Transport"
        description="A part load is a consignment that uses only some of a truck's available capacity. It can be considered when your shipment does not need a whole truck, subject to route, handling and availability checks."
        path="/part-load-transport"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Part Load Transport" },
        ]}
      />
      <Section
        eyebrow="In simple terms"
        title="What does part load transport mean?"
        description="Instead of arranging an entire truck for one consignment, a suitable smaller shipment may travel with other compatible goods. The arrangement depends on practical shipment and route requirements."
      >
        <div className="reveal-stagger grid gap-5 md:grid-cols-3">
          <Card>
            <h3 className="font-bold text-slate-950">Shared capacity</h3>
            <p className="mt-2 leading-7 text-slate-600">
              The shipment uses part of the truck rather than requiring its
              full capacity by itself.
            </p>
          </Card>
          <Card>
            <h3 className="font-bold text-slate-950">Checked for suitability</h3>
            <p className="mt-2 leading-7 text-slate-600">
              Compatibility, handling, and the requested pickup and delivery
              points are reviewed before confirming an arrangement.
            </p>
          </Card>
          <Card>
            <h3 className="font-bold text-slate-950">No assumed savings</h3>
            <p className="mt-2 leading-7 text-slate-600">
              Shared transport does not guarantee a lower price. Request a
              quote based on your actual shipment.
            </p>
          </Card>
        </div>
      </Section>
      <Section className="bg-slate-50" title="Shipments you can ask us about">
        <div className="reveal-stagger grid gap-4 sm:grid-cols-2">
          {[
            "A few packaged cartons for a business delivery",
            "A small or partial stock movement between locations",
            "Goods with specific pickup or receiving arrangements",
            "A consignment where you want to compare available options",
          ].map((example) => (
            <Card key={example}>
              <p className="leading-7 text-slate-700">{example}</p>
            </Card>
          ))}
        </div>
        <p className="mt-5 max-w-3xl leading-7 text-slate-600">
          These are examples for discussion, not a guarantee of acceptance.
          Shipment size, goods type, packaging, handling, and availability all
          matter.
        </p>
      </Section>
      <Section title="What to include in your enquiry">
        <ol className="reveal-stagger grid gap-4 sm:grid-cols-2">
          {[
            "Pickup and delivery city or full location",
            "Goods description and packaging",
            "Approximate weight and dimensions",
            "Preferred pickup date and any handling notes",
          ].map((detail, index) => (
            <li
              key={detail}
              className="flex gap-4 rounded-xl border border-slate-200 p-5"
            >
              <span className="font-extrabold text-amber-700">
                0{index + 1}
              </span>
              <span className="leading-7 text-slate-700">{detail}</span>
            </li>
          ))}
        </ol>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button href="/get-a-quote">Get a Quote</Button>
          <WhatsAppButton label="Ask about part load on WhatsApp" />
        </div>
      </Section>
      <Section
        className="bg-slate-50"
        title="Locations for part load enquiries"
        description="Ask about movements involving these locations. Availability for the exact route must be confirmed."
      >
        <div className="flex flex-wrap gap-3">
          {locations.map((location) => (
            <Link
              key={location.slug}
              href={getLocationHref(location)}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:border-amber-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              {location.name}
            </Link>
          ))}
        </div>
      </Section>
      <Section title="Part load transport FAQs">
        <FAQList items={partLoadFaqs} />
      </Section>
      <CtaBanner
        title="Have a smaller consignment?"
        description="Share the shipment and route details to check whether part load transport may be suitable."
      />
    </main>
  );
}
