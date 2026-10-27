import Link from "next/link";
import { ArrowRight, CircleCheck } from "lucide-react";
import type { Location } from "@/data/locations";
import { getLocationHref, locations } from "@/data/locations";
import { Button } from "./button";
import { Card } from "./card";
import { Container } from "./container";
import { FAQList } from "./faq-list";
import { PageIntro } from "./page-intro";
import { Section } from "./section";

interface LocationPageProps {
  location: Location;
}

export function LocationPage({ location }: LocationPageProps) {
  const relatedLocations = locations.filter((item) =>
    location.relatedLocations.includes(item.slug),
  );

  return (
    <main id="main-content" className="flex-1">
      <PageIntro
        title={location.title}
        description={location.intro}
        path={getLocationHref(location)}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/routes" },
          { label: location.name },
        ]}
      />

      <Section
        eyebrow="Plan your shipment"
        title={`Transport planning for ${location.name}`}
        description={location.planningNotes}
      >
        <div className="reveal-stagger grid gap-4 md:grid-cols-3">
          {location.shipmentExamples.map((example) => (
            <Card key={example} className="flex gap-3">
              <CircleCheck
                aria-hidden="true"
                className="mt-1 shrink-0 text-amber-700"
                size={20}
              />
              <p className="leading-7 text-slate-700">{example}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        className="bg-slate-50"
        eyebrow="Transport options"
        title={`Discuss a ${location.name} goods movement`}
        description="Tell us the origin and destination, shipment type, approximate weight and dimensions, and preferred pickup date. We will review the information with you; availability and arrangements must be confirmed before booking."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/get-a-quote">
            Request a transport quote <ArrowRight aria-hidden="true" size={18} />
          </Button>
          <Button href="/part-load-transport" variant="outline">
            Explore part load transport
          </Button>
        </div>
      </Section>

      <Section
        eyebrow="Helpful answers"
        title={`${location.name} transport FAQs`}
      >
        <FAQList items={location.faqs} />
      </Section>

      {relatedLocations.length > 0 && (
        <Section className="bg-slate-50" title="Explore other locations">
          <div className="reveal-stagger grid gap-4 sm:grid-cols-2">
            {relatedLocations.map((related) => (
              <Link
                key={related.slug}
                href={getLocationHref(related)}
                className="rounded-xl border border-slate-200 bg-white p-5 font-bold text-slate-900 transition-transform duration-300 hover:-translate-y-0.5 hover:border-amber-500 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
              >
                {related.name} goods transport
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Container className="pb-16">
        <p className="text-sm text-slate-600">
          Need a different destination?{" "}
          <Link
            href="/routes"
            className="font-bold text-slate-900 underline decoration-amber-500 underline-offset-4"
          >
            View locations and route enquiries
          </Link>
          .
        </p>
      </Container>
    </main>
  );
}
