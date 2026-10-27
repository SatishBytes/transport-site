import { PageIntro } from "@/components/page-intro";
import { Section } from "@/components/section";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: `Terms of Use | ${siteConfig.companyName}`,
  description:
    `Review terms for using the ${siteConfig.companyName} website, including the limits of route, service and price information and the need to confirm an arrangement.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main id="main-content" className="flex-1">
      <PageIntro
        title="Terms & Conditions"
        description="These general terms apply to use of this website and its transport enquiry information."
        path="/terms"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms & Conditions" },
        ]}
      />
      <Section>
        <div className="max-w-3xl space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-950">
              Website information and enquiries
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              Website content describes transport options for discussion. A
              location listing or enquiry form does not confirm that a specific
              route, shipment, date, or service is available.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-950">
              Quotes and arrangements
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              Shipment details are needed to review an enquiry. Price, timing,
              goods acceptance, handling, and other arrangements must be
              discussed and confirmed directly before a booking is made. Part
              load transport does not guarantee a particular saving.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-950">
              Contact details
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              Contact information shown as a placeholder is not a working
              contact channel. Verify and update the business details in the
              central site configuration before publishing the website.
            </p>
          </section>
          <p className="text-sm leading-6 text-slate-600">
            These website terms are general information and should be reviewed
            for the business&apos;s requirements before launch.
          </p>
        </div>
      </Section>
    </main>
  );
}
