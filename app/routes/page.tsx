import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/card";
import { CtaBanner } from "@/components/cta-banner";
import { PageIntro } from "@/components/page-intro";
import { Section } from "@/components/section";
import { getLocationHref, locations } from "@/data/locations";
import { routes } from "@/data/routes";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: `Goods Transport Routes | ${siteConfig.companyName}`,
  description:
    `Browse goods transport locations accepting enquiries. Share pickup and delivery points with ${siteConfig.companyName} to check availability for your shipment.`,
  path: "/routes",
});

export default function RoutesPage() {
  return (
    <main id="main-content" className="flex-1">
      <PageIntro
        title="Locations & Route Enquiries"
        description="Explore the locations you can enquire about. A location listing is not a promise that every origin and destination pair is currently served."
        path="/routes"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Routes" },
        ]}
      />
      <Section
        eyebrow="Target locations"
        title="Ask about a specific movement"
        description="Share the exact pickup and delivery points to check availability for your goods transport enquiry."
      >
        <div className="reveal-stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <Card key={location.slug} className="flex flex-col">
              <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
                {location.name}
              </h2>
              <p className="mt-3 flex-1 leading-7 text-muted">
                Enquire about {location.keyword} with pickup and delivery
                details for your shipment.
              </p>
              <Link
                href={getLocationHref(location)}
                className="group mt-5 inline-flex items-center gap-2 font-bold text-foreground underline decoration-accent underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Location details
                <ArrowRight
                  aria-hidden="true"
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </Card>
          ))}
        </div>
      </Section>
      <Section className="section-muted" title="Confirmed transport routes">
        {routes.length > 0 ? (
          <ul className="reveal-stagger grid gap-4 sm:grid-cols-2">
            {routes.map((route) => (
              <li
                key={route.slug}
                className="surface-card p-5 font-semibold text-foreground"
              >
                {route.origin} to {route.destination}
              </li>
            ))}
          </ul>
        ) : (
          <p className="max-w-3xl leading-7 text-slate-600 dark:text-slate-300">
            No individual transport routes have been confirmed for publication
            yet. Contact us with your origin and destination so the specific
            movement can be checked.
          </p>
        )}
      </Section>
      <CtaBanner
        title="Check your pickup and delivery route"
        description="Send your shipment details and both locations for a route availability enquiry."
      />
    </main>
  );
}
