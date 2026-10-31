import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Boxes,
  ClipboardCheck,
  Headset,
  MapPinned,
  Route,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { CtaBanner } from "@/components/cta-banner";
import { CitiesMarquee } from "@/components/cities-marquee";
import { FAQList } from "@/components/faq-list";
import { HeroAmbient } from "@/components/hero-ambient";
import { InteractiveSurface } from "@/components/interactive-surface";
import { JsonLd } from "@/components/json-ld";
import { Section } from "@/components/section";
import { createPageMetadata } from "@/lib/metadata";
import { locations, getLocationHref } from "@/data/locations";
import { faqs } from "@/data/faqs";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: `Goods & Part Load Transport | ${siteConfig.companyName}`,
  description:
    `${siteConfig.companyName} offers goods and part load transport with ${siteConfig.experienceLabel.toLowerCase()} of experience. Share shipment and route details to discuss road transport options.`,
  path: "/",
});

const trustHighlights = [
  {
    title: "Dependable service",
    description:
      "Clear shipment details and confirmed arrangements help set practical expectations.",
    icon: ShieldCheck,
  },
  {
    title: "Professional support",
    description:
      "Discuss your requirements with a team focused on the details of your enquiry.",
    icon: Headset,
  },
  {
    title: "Flexible options",
    description:
      "Ask about part load and other transport options to find an arrangement for your shipment.",
    icon: Boxes,
  },
  {
    title: `${siteConfig.experienceLabel} of Experience`,
    description:
      "Experience in goods and part load transport across India.",
    icon: Award,
  },
];

const processSteps = [
  {
    number: "01",
    title: "Share your details",
    description:
      "Tell us what you are sending, where it is going, and when you would like pickup.",
  },
  {
    number: "02",
    title: "Request a quote",
    description:
      "Send the shipment information so the requirements can be reviewed.",
  },
  {
    number: "03",
    title: "Confirm the arrangement",
    description:
      "Review and confirm the available transport option before making plans.",
  },
  {
    number: "04",
    title: "Coordinate transport",
    description:
      "Keep pickup and receiving details clear as the confirmed movement is coordinated.",
  },
];

const whyChooseUs = [
  "Transport enquiries are reviewed against the shipment details you provide.",
  "Part load options can be discussed when a consignment does not need a full truck.",
  `Experienced transport team with ${siteConfig.experienceLabel.toLowerCase()} of experience in goods transport.`,
  "Pickup and delivery requirements are clarified before an arrangement is confirmed.",
  "Service availability is checked for the specific places and dates in your enquiry.",
];

const serviceIcons = [Boxes, Truck, Route];
const whyChooseIcons = [ClipboardCheck, Boxes, Award, MapPinned, Headset];

const homeFaqs = faqs.slice(0, 2);
const homeServices = services.filter(
  (service) => !service.optional || siteConfig.showFullTruckLoadService,
);
const organizationSchema = {
  "@type": "Organization",
  name: siteConfig.companyName,
  description: siteConfig.tagline,
  url: siteConfig.productionDomain,
};
const organizationStructuredData = {
  "@context": "https://schema.org",
  ...organizationSchema,
};

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <JsonLd data={organizationStructuredData} />

      <section className="hero-mesh overflow-hidden text-white">
        <HeroAmbient />
        <Container className="relative z-10 grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:py-20">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.2em] text-accent-bright sm:text-sm">
              {siteConfig.tagline}
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              <span className="text-white">Reliable Goods &amp; </span>
              <span className="hero-heading-accent">Part Load Transport</span>
              <span className="text-white"> Services</span>
            </h1>
            <p className="hero-support mt-6 max-w-xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
              With {siteConfig.experienceLabel.toLowerCase()} of experience in
              goods transport, we help businesses discuss shipment details,
              part load transport and other road transport options.
            </p>
            <div className="hero-actions mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/get-a-quote">Get a Transport Quote</Button>
              <Button href="/services" variant="secondary">
                Explore Our Services
              </Button>
            </div>
          </div>
          <div className="relative aspect-[1.5/1] overflow-hidden rounded-3xl border border-white/15 bg-slate-800 shadow-[0_32px_70px_-35px_rgba(0,0,0,0.8)]">
            <Image
              src="/goods-transport-truck.svg"
              alt="Goods transport truck carrying a freight shipment on the road"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <span className="hero-badge absolute left-4 top-4 rounded-full border border-white/25 bg-slate-950/90 px-3 py-1.5 text-xs font-bold text-accent-bright shadow-lg">
              {siteConfig.experienceLabel} in Goods Transport
            </span>
            <div className="route-glass absolute bottom-3 left-3 right-3 rounded-2xl p-3 text-white sm:bottom-4 sm:left-auto sm:right-4 sm:w-64 sm:p-4">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-slate-200">
                Shipment route
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="min-w-0">
                  <span className="block size-2.5 rounded-full bg-accent-bright ring-4 ring-accent-bright/15" />
                  <span className="mt-2 block text-xs font-semibold">Pickup</span>
                </div>
                <div className="route-track mx-1">
                  <span className="route-track-line" />
                  <span aria-hidden="true" className="route-truck">
                    <Truck size={19} />
                  </span>
                </div>
                <div className="min-w-0 text-right">
                  <span className="ml-auto block size-2.5 rounded-full bg-accent-bright ring-4 ring-accent-bright/15" />
                  <span className="mt-2 block text-xs font-semibold">Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CitiesMarquee
        cities={locations.map((location) => ({
          name: location.name,
          href: getLocationHref(location),
        }))}
      />

      <Section
        eyebrow="A practical transport partner"
        title="Support for your goods movement"
        description="Start with a clear conversation about your shipment and the arrangement you need."
      >
        <div className="reveal-stagger grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {trustHighlights.map(({ title, description, icon: Icon }) => (
            <Card key={title}>
              <span className="accent-icon inline-flex size-12 items-center justify-center rounded-xl">
                <Icon aria-hidden="true" size={23} />
              </span>
              <h3 className="mt-5 text-xl font-bold text-foreground">{title}</h3>
              <p className="mt-3 leading-7 text-muted">{description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        className="section-muted"
        id="our-services"
        eyebrow="Transport options"
        title="Our Services"
        description="Choose an option to discuss, then share your shipment information for an availability check."
      >
        <div className="reveal-stagger grid gap-5 sm:grid-cols-2 lg:auto-rows-fr">
          {homeServices.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            return (
              <InteractiveSurface
                key={service.slug}
                className={`service-card surface-card p-6 flex flex-col ${index === 0 ? "lg:row-span-2 lg:min-h-80" : ""}`}
              >
                <span className="accent-icon inline-flex size-12 items-center justify-center rounded-xl">
                  <Icon aria-hidden="true" size={23} />
                </span>
                <h3 className="mt-5 text-xl font-bold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 leading-7 text-muted">
                  {service.summary}
                </p>
                <Link
                  href={
                    service.slug === "part-load-transport"
                      ? "/part-load-transport"
                      : `/services#${service.slug}`
                  }
                  className="group mt-5 inline-flex w-fit items-center gap-2 font-bold text-foreground underline decoration-accent underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  Learn about {service.title}
                  <ArrowRight
                    aria-hidden="true"
                    size={17}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </InteractiveSurface>
            );
          })}
        </div>
      </Section>

      <Section
        eyebrow="Where you can enquire"
        title="Popular Service Locations"
        description="Ask about a shipment involving one of these locations. Confirm availability for your exact pickup and delivery points."
      >
        <div className="reveal-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <InteractiveSurface
              key={location.slug}
              href={getLocationHref(location)}
              className="location-card group surface-card block rounded-2xl p-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-2xl font-extrabold tracking-tight text-foreground">
                  {location.name}
                </span>
                <ArrowRight
                  aria-hidden="true"
                  size={20}
                  className="shrink-0 text-accent transition-transform duration-200 group-hover:translate-x-1"
                />
              </span>
              <span className="mt-3 block text-sm leading-6 text-muted">
                {location.keyword}
              </span>
            </InteractiveSurface>
          ))}
        </div>
        <p className="mt-6">
          <Link
            href="/routes"
            className="font-bold text-foreground underline decoration-accent underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            View location and route enquiries
          </Link>
        </p>
      </Section>

      <Section
        className="section-muted"
        eyebrow="From enquiry to coordination"
        title="How It Works"
        description="A straightforward process begins with accurate shipment information."
      >
        <ol className="process-stepper reveal-stagger grid gap-5 lg:grid-cols-4">
          {processSteps.map((step) => (
            <li className="process-step" key={step.number}>
              <span className="process-step-number" aria-hidden="true">
                {step.number}
              </span>
              <Card className="h-full">
                <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {step.description}
                </p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        eyebrow="Clear expectations"
        title={`Why Choose ${siteConfig.companyName}`}
        description="We focus on practical information and clear communication rather than unverified promises."
      >
        <div className="reveal-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((reason, index) => {
            const Icon = whyChooseIcons[index % whyChooseIcons.length];
            return (
              <Card key={reason} className="flex gap-4">
                <span className="accent-icon inline-flex size-11 shrink-0 items-center justify-center rounded-xl">
                  <Icon aria-hidden="true" size={20} />
                </span>
                <p className="leading-7 text-foreground">{reason}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section
        className="section-muted"
        eyebrow="Frequently asked questions"
        title="Goods transport questions"
        description="A few details about part load transport and making an enquiry."
      >
        <FAQList items={homeFaqs} />
        <p className="mt-5">
          <Link
            href="/faq"
            className="font-bold text-foreground underline decoration-accent underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Read all frequently asked questions
          </Link>
        </p>
      </Section>

      <CtaBanner
        title="Have a shipment to discuss?"
        description="Share your pickup, delivery and goods details to start a transport enquiry."
      />
    </main>
  );
}
