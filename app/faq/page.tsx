import { CtaBanner } from "@/components/cta-banner";
import { FAQList } from "@/components/faq-list";
import { PageIntro } from "@/components/page-intro";
import { Section } from "@/components/section";
import { faqs } from "@/data/faqs";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "Goods Transport FAQs",
  description:
    `Answers to common questions about part load transport, transport quote enquiries, and ${siteConfig.companyName} target locations.`,
  path: "/faq",
});

export default function FAQPage() {
  return (
    <main id="main-content" className="flex-1">
      <PageIntro
        title="Frequently Asked Questions"
        description="Find out what part load transport means, what to include in a quote enquiry, and how to ask about service locations."
        path="/faq"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FAQs" },
        ]}
      />
      <Section title="Goods transport and part load questions">
        <FAQList items={faqs} />
      </Section>
      <CtaBanner
        title="Still have a transport question?"
        description="Share your shipment details or contact us to discuss your requirements."
      />
    </main>
  );
}
