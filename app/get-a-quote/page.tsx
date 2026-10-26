import { PageIntro } from "@/components/page-intro";
import { QuoteForm } from "@/components/quote-form";
import { Container } from "@/components/container";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "Get a Transport Quote",
  description:
    `Prepare a goods transport or part load enquiry for ${siteConfig.companyName}. Your quote details open in WhatsApp and are not saved to a company server.`,
  path: "/get-a-quote",
});

export default function GetAQuotePage() {
  return (
    <main id="main-content" className="flex-1">
      <PageIntro
        title="Get a Transport Quote"
        description={`Tell us about your shipment and its route. Review the details before sending your enquiry to ${siteConfig.companyName} through WhatsApp.`}
        path="/get-a-quote"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Get a Quote" },
        ]}
      />
      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <QuoteForm />
        </div>
      </Container>
    </main>
  );
}
