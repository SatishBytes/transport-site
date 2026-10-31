import Link from "next/link";
import { Mail, MapPin, Phone, Truck } from "lucide-react";
import { footerLegalNavigation, navigation } from "@/data/navigation";
import { getLocationHref, locations } from "@/data/locations";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/site-config";
import { Container } from "./container";

export function Footer() {
  const footerServices = services.filter(
    (service) => !service.optional || siteConfig.showFullTruckLoadService,
  );

  return (
    <footer id="site-footer" className="bg-navy text-slate-200">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-16">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-sm text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-bright"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-accent-bright text-[#172033]">
              <Truck aria-hidden="true" size={22} />
            </span>
            <span className="font-extrabold tracking-tight">
              {siteConfig.companyName}
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
            {siteConfig.tagline}. Contact us to confirm shipment requirements
            and service availability.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            Explore
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-sm hover:text-accent-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-bright"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            Services & locations
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {footerServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={
                    service.slug === "part-load-transport"
                      ? "/part-load-transport"
                      : "/services"
                  }
                  className="rounded-sm hover:text-accent-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-bright"
                >
                  {service.title}
                </Link>
              </li>
            ))}
            {locations.map((location) => (
              <li key={location.slug}>
                <Link
                  href={getLocationHref(location)}
                  className="rounded-sm hover:text-accent-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-bright"
                >
                  {location.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/get-a-quote"
                className="font-semibold text-white underline decoration-accent-bright underline-offset-4 hover:text-accent-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-bright"
              >
                Get a transport quote
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            Contact
          </h2>
          <address className="mt-4 space-y-4 text-sm not-italic">
            <p className="flex items-start gap-3">
              <Phone
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-accent-bright"
                size={17}
              />
              <span>{siteConfig.phone}</span>
            </p>
            <p className="flex items-start gap-3">
              <Mail
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-accent-bright"
                size={17}
              />
              <span>{siteConfig.email}</span>
            </p>
            <p className="flex items-start gap-3">
              <MapPin
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-accent-bright"
                size={17}
              />
              <span>{siteConfig.address}</span>
            </p>
          </address>
        </div>
      </Container>

      <div className="border-t border-slate-800">
        <Container className="flex flex-col items-center gap-4 py-5 text-center text-xs text-slate-400 sm:flex-row sm:justify-between sm:text-left">
          <p>
            © {siteConfig.copyrightYear} {siteConfig.companyName}. All rights
            reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {footerLegalNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-sm hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-bright"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <p>
              Developed by{" "}
              <span className="font-medium text-slate-200">
                {siteConfig.developer.name}
              </span>
            </p>
            <div className="flex items-center gap-2">
              {siteConfig.developer.linkedinUrl && (
                <a
                  href={siteConfig.developer.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${siteConfig.developer.name} on LinkedIn`}
                  className="rounded-sm text-slate-400 hover:text-accent-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-bright"
                >
                  <svg
                    aria-hidden="true"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14Zm-11.7 7H4.5v9h2.8v-9Zm8.1-.2c-1.4 0-2.2.8-2.6 1.5V10h-2.8v9h2.8v-5c0-1.3.3-2.5 1.8-2.5s1.5 1.4 1.5 2.6V19h2.8v-5.6c0-2.8-.6-4.6-3.5-4.6ZM5.9 5.5a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z" />
                  </svg>
                </a>
              )}
              {siteConfig.developer.githubUrl && (
                <a
                  href={siteConfig.developer.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${siteConfig.developer.name} on GitHub`}
                  className="rounded-sm text-slate-400 hover:text-accent-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-bright"
                >
                  <svg
                    aria-hidden="true"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.6-1.3-1.6-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.4-5.5-6.1 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.7-2.8 5.8-5.5 6.1.4.3.8 1 .8 2v3c0 .3.2.7.8.6A11.1 11.1 0 0 0 12 .9Z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
