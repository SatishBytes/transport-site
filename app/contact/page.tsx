import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Card } from "@/components/card";
import { CtaBanner } from "@/components/cta-banner";
import { PageIntro } from "@/components/page-intro";
import { Section } from "@/components/section";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { createPageMetadata } from "@/lib/metadata";
import { isConfiguredValue, siteConfig } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: `Contact ${siteConfig.companyName}`,
  description:
    `Contact ${siteConfig.companyName} by phone, email or WhatsApp to discuss goods transport, part load options and shipment requirements before confirming a booking.`,
  path: "/contact",
});

function getPhoneHref(phone: string) {
  if (!isConfiguredValue(phone)) return null;
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : null;
}

export default function ContactPage() {
  const phoneHref = getPhoneHref(siteConfig.phone);
  const emailHref = isConfiguredValue(siteConfig.email)
    ? `mailto:${siteConfig.email}`
    : null;
  const hasAddress = isConfiguredValue(siteConfig.address);
  const mapHref = hasAddress
    ? `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&output=embed`
    : null;

  return (
    <main id="main-content" className="flex-1">
      <PageIntro
        title={`Contact ${siteConfig.companyName}`}
        description="Get in touch to discuss goods transport, part load options, and shipment requirements. Confirm specific service availability before booking."
        path="/contact"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />
      <Section
        eyebrow="Start a conversation"
        title="Contact details"
        description="Use the listed business contact details to discuss a shipment and confirm service availability."
      >
        <div className="reveal-stagger grid gap-5 md:grid-cols-2">
          <Card>
            <Phone aria-hidden="true" className="text-amber-700 dark:text-amber-300" size={22} />
            <h2 className="mt-4 font-bold text-slate-950 dark:text-slate-100">Phone number</h2>
            {phoneHref ? (
              <a
                href={phoneHref}
                className="mt-2 inline-block underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:focus-visible:outline-amber-300"
              >
                {siteConfig.phone}
              </a>
            ) : (
              <p className="mt-2 text-slate-700 dark:text-slate-300">{siteConfig.phone}</p>
            )}
          </Card>
          <Card>
            <Mail aria-hidden="true" className="text-amber-700 dark:text-amber-300" size={22} />
            <h2 className="mt-4 font-bold text-slate-950 dark:text-slate-100">Email address</h2>
            {emailHref ? (
              <a
                href={emailHref}
                className="mt-2 inline-block break-all underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:focus-visible:outline-amber-300"
              >
                {siteConfig.email}
              </a>
            ) : (
              <p className="mt-2 break-all text-slate-700 dark:text-slate-300">{siteConfig.email}</p>
            )}
          </Card>
          <Card>
            <MapPin aria-hidden="true" className="text-amber-700 dark:text-amber-300" size={22} />
            <h2 className="mt-4 font-bold text-slate-950 dark:text-slate-100">Business address</h2>
            <address className="mt-2 leading-7 not-italic text-slate-700 dark:text-slate-300">
              {siteConfig.address}
            </address>
          </Card>
          <Card>
            <h2 className="font-bold text-slate-950 dark:text-slate-100">WhatsApp</h2>
            <p className="mt-2 mb-4 leading-7 text-slate-600 dark:text-slate-300">
              Send a transport enquiry directly through WhatsApp.
            </p>
            <WhatsAppButton />
          </Card>
        </div>
        <p className="mt-6 text-sm leading-6 text-slate-600 dark:text-slate-300">
          Prefer to start online?{" "}
          <Link
            href="/get-a-quote"
            className="font-bold text-slate-900 underline decoration-amber-500 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-100 dark:focus-visible:outline-amber-300"
          >
            Prepare a transport enquiry
          </Link>
          .
        </p>
      </Section>
      {mapHref && (
        <Section
          className="bg-slate-50 dark:bg-slate-900"
          title="Find our business address"
          description={siteConfig.address}
        >
          <iframe
            title={`Map for ${siteConfig.companyName} business address`}
            src={mapHref}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full rounded-2xl border-0"
          />
        </Section>
      )}
      <CtaBanner
        title="Ready to discuss a shipment?"
        description="Send the pickup, delivery and goods details for an enquiry."
      />
    </main>
  );
}
