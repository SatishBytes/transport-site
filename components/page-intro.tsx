import { Breadcrumbs, type BreadcrumbItem } from "./breadcrumbs";
import { Container } from "./container";
import { siteConfig } from "@/lib/site-config";
import { JsonLd } from "./json-ld";

interface PageIntroProps {
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  path: string;
}

export function PageIntro({
  title,
  description,
  breadcrumbs,
  path,
}: PageIntroProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: new URL(item.href ?? path, siteConfig.productionDomain).toString(),
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <section className="page-intro-surface border-b border-line py-12 sm:py-16 lg:py-20">
        <Container>
          <Breadcrumbs items={breadcrumbs} className="text-muted" />
          <h1 className="gradient-heading mt-6 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
            {description}
          </p>
        </Container>
      </section>
    </>
  );
}
