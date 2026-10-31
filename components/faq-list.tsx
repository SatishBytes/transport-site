import type { FAQ } from "@/data/faqs";
import { FAQItem } from "./faq-item";
import { JsonLd } from "./json-ld";

interface FAQListProps {
  items: FAQ[];
}

export function FAQList({ items }: FAQListProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <div className="reveal-stagger surface-card overflow-hidden">
        {items.map((item) => (
          <FAQItem key={item.question} item={item} />
        ))}
      </div>
    </>
  );
}
