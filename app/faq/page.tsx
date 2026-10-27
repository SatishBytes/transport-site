import { CtaBanner } from "@/components/cta-banner";
import { FAQList } from "@/components/faq-list";
import { PageIntro } from "@/components/page-intro";
import { Section } from "@/components/section";
import { faqs } from "@/data/faqs";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: `Goods Transport FAQs | ${siteConfig.companyName}`,
  description:
    `Find answers about part load transport, quote enquiries and service locations. Learn which shipment details to share with ${siteConfig.companyName} before booking.`,
  path: "/faq",
});

export default function FAQPage() {
  return (
    <main id="main-content" className="flex-1">
      <PageIntro
        title="Frequently Asked Questions"
        description="Find out what load transport means, what to include in a quote enquiry, and how to ask about service locations."
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
