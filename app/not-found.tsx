import Link from "next/link";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  ...createPageMetadata({
    title: `Page Not Found | ${siteConfig.companyName}`,
    description: `The requested page could not be found. Browse ${siteConfig.companyName} goods and part load services or return to the homepage to find route and contact information.`,
  }),
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main-content" className="flex flex-1 items-center py-20">
      <Container className="max-w-3xl text-center">
        <p className="font-bold uppercase tracking-[0.16em] text-amber-700">
          Error 404
        </p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-600">
          The address may be incorrect or the page may have moved. Browse the
          transport services or return to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">Back to Home</Button>
          <Link
            href="/services"
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            Explore Services
          </Link>
        </div>
      </Container>
    </main>
  );
}
