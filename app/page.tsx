import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Boxes, Headset, Route, ShieldCheck } from "lucide-react";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { CtaBanner } from "@/components/cta-banner";
import { FAQList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { Section } from "@/components/section";
import { createPageMetadata } from "@/lib/metadata";
import { locations, getLocationHref } from "@/data/locations";
import { faqs } from "@/data/faqs";
import { services } from "@/data/services";
import { isConfiguredValue, siteConfig } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: `Reliable Goods & Part Load Transport Services | ${siteConfig.companyName}`,
  description:
    `Explore goods transport services and part load transport with ${siteConfig.companyName}. Enquire about Mumbai, Thane, Vadodara, Ahmedabad, Uttar Pradesh and Rajasthan.`,
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
  "Pickup and delivery requirements are clarified before an arrangement is confirmed.",
  "Service availability is checked for the specific places and dates in your enquiry.",
];

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
const localBusinessSchema = isConfiguredValue(siteConfig.address)
  ? {
      "@type": "LocalBusiness",
      name: siteConfig.companyName,
      url: siteConfig.productionDomain,
      address: siteConfig.address,
      ...(isConfiguredValue(siteConfig.phone)
        ? { telephone: siteConfig.phone }
        : {}),
      ...(isConfiguredValue(siteConfig.email)
        ? { email: siteConfig.email }
        : {}),
    }
  : null;
const organizationStructuredData = {
  "@context": "https://schema.org",
  ...(localBusinessSchema
    ? { "@graph": [organizationSchema, localBusinessSchema] }
    : organizationSchema),
};

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <JsonLd data={organizationStructuredData} />

      <section className="overflow-hidden bg-slate-950 text-white">
        <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:py-20">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-amber-300">
              {siteConfig.tagline}
            </p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Reliable Goods &amp; Part Load Transport Services
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Looking for goods transport services for your business shipment?
              Share the pickup, delivery and goods details to discuss part load
              transport and other road transport options.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/get-a-quote">Get a Transport Quote</Button>
              <Button
                href="/services"
                variant="outline"
                className="border-slate-600 bg-transparent text-white hover:bg-slate-800"
              >
                Explore Our Services
              </Button>
            </div>
          </div>
          <div className="relative aspect-[1.5/1] overflow-hidden rounded-2xl border border-white/10 bg-slate-800 shadow-2xl">
            <Image
              src="/goods-transport-truck.svg"
              alt="Goods transport truck carrying a freight shipment on the road"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <Section
        eyebrow="A practical transport partner"
        title="Support for your goods movement"
        description="Start with a clear conversation about your shipment and the arrangement you need."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {trustHighlights.map(({ title, description, icon: Icon }) => (
            <Card key={title}>
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                <Icon aria-hidden="true" size={23} />
              </span>
              <h3 className="mt-5 text-xl font-bold text-slate-950">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        className="bg-slate-50"
        id="our-services"
        eyebrow="Transport options"
        title="Our Services"
        description="Choose an option to discuss, then share your shipment information for an availability check."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {homeServices.map((service) => (
            <Card key={service.slug} className="flex flex-col">
              <h3 className="text-xl font-bold text-slate-950">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 leading-7 text-slate-600">
                {service.summary}
              </p>
              <Link
                href={
                  service.slug === "part-load-transport"
                    ? "/part-load-transport"
                    : `/services#${service.slug}`
                }
                className="mt-5 inline-flex w-fit items-center gap-2 font-bold text-slate-900 underline decoration-amber-500 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900"
              >
                Learn about {service.title}
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Where you can enquire"
        title="Popular Service Locations"
        description="Ask about a shipment involving one of these locations. Confirm availability for your exact pickup and delivery points."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <Link
              key={location.slug}
              href={getLocationHref(location)}
              className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-amber-500 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              <span className="flex items-center justify-between gap-3 font-bold text-slate-950">
                {location.name}
                <ArrowRight
                  aria-hidden="true"
                  size={18}
                  className="text-amber-700 transition-transform group-hover:translate-x-1"
                />
              </span>
              <span className="mt-2 block text-sm leading-6 text-slate-600">
                {location.keyword}
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-6">
          <Link
            href="/routes"
            className="font-bold text-slate-900 underline decoration-amber-500 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            View location and route enquiries
          </Link>
        </p>
      </Section>

      <Section
        className="bg-slate-50"
        eyebrow="From enquiry to coordination"
        title="How It Works"
        description="A straightforward process begins with accurate shipment information."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <Card key={step.number}>
              <p className="text-sm font-extrabold tracking-widest text-amber-700">
                {step.number}
              </p>
              <h3 className="mt-4 text-lg font-bold text-slate-950">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Clear expectations"
        title={`Why Choose ${siteConfig.companyName}`}
        description="We focus on practical information and clear communication rather than unverified promises."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {whyChooseUs.map((reason) => (
            <div key={reason} className="flex gap-3 rounded-xl bg-amber-50 p-5">
              <Route
                aria-hidden="true"
                className="mt-1 shrink-0 text-amber-800"
                size={19}
              />
              <p className="leading-7 text-slate-800">{reason}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        className="bg-slate-50"
        eyebrow="Frequently asked questions"
        title="Goods transport questions"
        description="A few details about part load transport and making an enquiry."
      >
        <FAQList items={homeFaqs} />
        <p className="mt-5">
          <Link
            href="/faq"
            className="font-bold text-slate-900 underline decoration-amber-500 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
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
