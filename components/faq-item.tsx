"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import type { FAQ } from "@/data/faqs";

interface FAQItemProps {
  item: FAQ;
}

export function FAQItem({ item }: FAQItemProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  function handleSummaryClick(event: MouseEvent<HTMLElement>) {
    const details = detailsRef.current;
    if (!details?.open) return;

    event.preventDefault();
    if (details.classList.contains("is-closing")) {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      closeTimer.current = null;
      details.classList.remove("is-closing");
      return;
    }

    details.classList.add("is-closing");
    closeTimer.current = setTimeout(() => {
      details.open = false;
      details.classList.remove("is-closing");
      closeTimer.current = null;
    }, 240);
  }

  return (
    <details
      ref={detailsRef}
      className="group border-b border-slate-200 p-5 last:border-b-0 sm:p-6"
    >
      <summary
        onClick={handleSummaryClick}
        className="cursor-pointer list-none rounded-sm pr-8 text-left text-base font-bold text-slate-950 marker:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900 [&::-webkit-details-marker]:hidden"
      >
        <span className="relative block">
          <span role="heading" aria-level={3} className="pr-8 font-bold">
            {item.question}
          </span>
          <span
            aria-hidden="true"
            className="absolute right-0 top-0 text-xl leading-6 text-amber-700 transition-transform duration-200 group-open:rotate-45"
          >
            +
          </span>
        </span>
      </summary>
      <p className="faq-answer mt-4 max-w-3xl leading-7 text-slate-600">
        {item.answer}
      </p>
    </details>
  );
}
