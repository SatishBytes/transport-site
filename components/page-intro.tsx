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
      <section className="border-b border-slate-200 bg-slate-50 py-10 sm:py-14">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {description}
          </p>
        </Container>
      </section>
    </>
  );
}
