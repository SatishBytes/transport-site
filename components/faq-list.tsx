import type { FAQ } from "@/data/faqs";
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
      <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
        {items.map((item) => (
          <details key={item.question} className="group p-5 sm:p-6">
            <summary className="cursor-pointer list-none rounded-sm pr-8 text-left text-base font-bold text-slate-950 marker:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900 [&::-webkit-details-marker]:hidden">
              <span className="relative block">
                <span role="heading" aria-level={3} className="pr-8 font-bold">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-0 text-xl leading-6 text-amber-700 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-4 max-w-3xl leading-7 text-slate-600">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </>
  );
}
