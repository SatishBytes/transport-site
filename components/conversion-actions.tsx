"use client";

import { MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getWhatsAppHref, isConfiguredValue, siteConfig } from "@/lib/site-config";

export function ConversionActions() {
  const [isNearImportantContent, setIsNearImportantContent] = useState(false);
  const pathname = usePathname();
  const phoneHref = isConfiguredValue(siteConfig.phone)
    ? `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`
    : null;
  const whatsappHref = getWhatsAppHref();

  useEffect(() => {
    const importantContent = document.querySelectorAll(
      "#site-footer, #quote-submit",
    );

    if (!("IntersectionObserver" in window) || importantContent.length === 0) {
      return;
    }

    const intersectingTargets = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingTargets.add(entry.target);
          } else {
            intersectingTargets.delete(entry.target);
          }
        });
        setIsNearImportantContent(intersectingTargets.size > 0);
      },
      { rootMargin: "0px 0px -96px 0px" },
    );

    importantContent.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      <nav
        aria-label="Quick contact"
        className="mobile-action-bar fixed inset-x-0 bottom-0 z-30 flex gap-3 border-t border-line bg-surface/95 pt-3 shadow-[0_-8px_24px_-18px_rgba(9,23,43,0.65)] backdrop-blur-md md:hidden"
        hidden={isNearImportantContent}
      >
        {phoneHref && (
          <a
            href={phoneHref}
            aria-label={`Call ${siteConfig.companyName}`}
            className="mobile-action-link inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-sm font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Phone aria-hidden="true" size={18} />
            Call
          </a>
        )}
        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Message ${siteConfig.companyName} on WhatsApp`}
            className="mobile-action-link inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#176b45] px-4 py-3 text-sm font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <MessageCircle aria-hidden="true" size={18} />
            WhatsApp
          </a>
        )}
      </nav>

      {whatsappHref && (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Message ${siteConfig.companyName} on WhatsApp`}
          className="desktop-whatsapp fixed bottom-6 right-6 z-30 hidden size-14 items-center justify-center rounded-full bg-[#176b45] text-white shadow-xl ring-1 ring-white/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:flex"
          hidden={isNearImportantContent}
        >
          <MessageCircle aria-hidden="true" size={25} />
          <span className="sr-only">WhatsApp</span>
        </a>
      )}
    </>
  );
}
