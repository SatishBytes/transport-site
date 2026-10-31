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
                className="mt-1 shrink-0 text-accent"
                size={20}
              />
              <p className="leading-7 text-foreground">{example}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        className="section-muted"
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
        <Section className="section-muted" title="Explore other locations">
          <div className="reveal-stagger grid gap-4 sm:grid-cols-2">
            {relatedLocations.map((related) => (
              <Link
                key={related.slug}
                href={getLocationHref(related)}
                className="location-card surface-card flex items-center justify-between gap-3 p-5 font-bold text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {related.name} goods transport
                <ArrowRight aria-hidden="true" size={18} className="shrink-0 text-accent" />
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Container className="pb-16">
        <p className="text-sm text-muted">
          Need a different destination?{" "}
          <Link
            href="/routes"
            className="font-bold text-foreground underline decoration-accent underline-offset-4"
          >
            View locations and route enquiries
          </Link>
          .
        </p>
      </Container>
    </main>
  );
}
