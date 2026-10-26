import { Card } from "@/components/card";
import { CtaBanner } from "@/components/cta-banner";
import { PageIntro } from "@/components/page-intro";
import { Section } from "@/components/section";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "About Us",
  description:
    `Learn about ${siteConfig.companyName} and our approach to goods transport and part load enquiries. Share shipment details to discuss an arrangement.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="main-content" className="flex-1">
      <PageIntro
        title={`About ${siteConfig.companyName}`}
        description="We help businesses start a clear conversation about moving goods by road, from the first shipment details to a confirmed transport arrangement."
        path="/about"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />
      <Section
        eyebrow="Our approach"
        title="Transport planning starts with the details"
        description={`${siteConfig.companyName} focuses on understanding what is being shipped, where it needs to go, and what the pickup and receiving arrangements require. We discuss available options only after reviewing those details.`}
      >
        <div className="grid gap-5 md:grid-cols-3">
          <Card>
            <h3 className="text-lg font-bold text-slate-950">
              Understand the shipment
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              Goods type, packaging, approximate weight, and dimensions help
              frame a useful transport enquiry.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-bold text-slate-950">
              Review the locations
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              Exact pickup and delivery points matter. Serviceability is
              checked for the movement you describe.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-bold text-slate-950">
              Confirm before booking
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              Transport options, timing, and handling arrangements need to be
              discussed and confirmed before proceeding.
            </p>
          </Card>
        </div>
      </Section>
      <Section className="bg-slate-50" title="Our transport focus">
        <div className="max-w-3xl space-y-5 leading-8 text-slate-700">
          <p>
            Our focus is goods transportation and part load transport enquiries.
            A part load may suit a consignment that does not need an entire
            truck, depending on shipment requirements and availability.
          </p>
          <p>
            We avoid making assumptions about a shipment. Share your own
            timeline, loading notes, and receiving requirements so they can be
            considered when discussing a suitable arrangement.
          </p>
          <p>
            You can enquire about movements involving Mumbai, Thane, Vadodara,
            Ahmedabad, Uttar Pradesh, and Rajasthan. A particular route is not
            confirmed until it has been checked with the business.
          </p>
        </div>
      </Section>
      <CtaBanner
        title="Tell us what you need to move"
        description="Share your shipment and location details to begin an enquiry."
      />
    </main>
  );
}
