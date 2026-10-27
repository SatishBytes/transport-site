import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { CtaBanner } from "@/components/cta-banner";
import { PageIntro } from "@/components/page-intro";
import { Section } from "@/components/section";
import { services } from "@/data/services";
import { JsonLd } from "@/components/json-ld";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: `Goods Transport Services | ${siteConfig.companyName}`,
  description:
    `Explore part load, goods and road transport services from ${siteConfig.companyName}. Share shipment details to discuss suitability, routes and availability.`,
  path: "/services",
});

const visibleServices = services.filter(
  (service) => !service.optional || siteConfig.showFullTruckLoadService,
);

export default function ServicesPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": visibleServices.map((service) => ({
      "@type": "Service",
      name: service.title,
      description: service.summary,
      provider: {
        "@type": "Organization",
        name: siteConfig.companyName,
        url: siteConfig.productionDomain,
      },
    })),
  };

  return (
    <main id="main-content" className="flex-1">
      <JsonLd data={serviceSchema} />
      <PageIntro
        title="Goods Transport Services"
        description="Explore part load transport, goods transportation, and truck transport services for business consignments. Share your route and shipment details to discuss suitable road transport options and confirm availability."
        path="/services"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />
      <Section
        eyebrow="Transport options"
        title="Choose a service to discuss"
        description="Service suitability depends on your goods, locations, handling needs, and confirmed availability."
      >
        <div className="reveal-stagger grid gap-5 md:grid-cols-2">
          {visibleServices.map((service) => (
            <Card id={service.slug} key={service.slug} className="flex flex-col">
              <h2 className="text-xl font-bold text-slate-950">
                {service.title}
              </h2>
              <p className="mt-3 flex-1 leading-7 text-slate-600">
                {service.summary}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {service.slug === "part-load-transport" && (
                  <Button href="/part-load-transport" variant="outline">
                    About part load
                  </Button>
                )}
                <Button href="/get-a-quote">
                  Ask about this service{" "}
                  <ArrowRight aria-hidden="true" size={17} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>
      <Section className="bg-slate-50" title="Locations to enquire about">
        <p className="max-w-3xl leading-7 text-slate-600">
          We welcome enquiries involving Mumbai, Thane, Vadodara, Ahmedabad,
          Uttar Pradesh, and Rajasthan. The business must confirm each specific
          pickup and delivery movement.
        </p>
        <Link
          href="/routes"
          className="mt-5 inline-flex rounded-sm font-bold text-slate-900 underline decoration-amber-500 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900"
        >
          Browse locations and route enquiries
        </Link>
      </Section>
      <CtaBanner
        title="Not sure which option fits?"
        description="Describe your shipment and we can review your transport enquiry."
      />
    </main>
  );
}
