import { PageIntro } from "@/components/page-intro";
import { Section } from "@/components/section";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: `Privacy Policy | ${siteConfig.companyName}`,
  description:
    `Read how the ${siteConfig.companyName} website handles information entered into its transport enquiry form and what happens when you choose to send it via WhatsApp.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" className="flex-1">
      <PageIntro
        title="Privacy Policy"
        description="This policy explains what happens when you use the transport enquiry form on this website."
        path="/privacy-policy"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />
      <Section>
        <div className="max-w-3xl space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-950">
              Information you enter
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              The quote form asks for your name, phone number, pickup and
              delivery cities, goods type, approximate weight, preferred pickup
              date, and optional additional details. The form is processed in
              your browser and does not submit this information to a{" "}
              {siteConfig.companyName} server or save it on this website.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-950">
              WhatsApp enquiries
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              When configured, submitting the form opens a prepared message in
              WhatsApp. You can review and choose whether to send it. If the
              WhatsApp contact is not configured, the form displays a message
              and keeps your entered details in the page; it does not send or
              store them. Any information you send through WhatsApp is subject
              to WhatsApp&apos;s own terms and privacy practices.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-950">
              Contact and updates
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              Business contact details on this site must be verified and
              configured before launch. This policy should be reviewed and
              updated if the website&apos;s data handling changes.
            </p>
          </section>
        </div>
      </Section>
    </main>
  );
}
