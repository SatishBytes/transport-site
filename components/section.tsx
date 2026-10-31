import type { ReactNode } from "react";
import { Container } from "./container";
import { Reveal } from "./reveal";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function Section({
  children,
  className = "",
  id,
  eyebrow,
  title,
  description,
}: SectionProps) {
  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${className}`}>
      <Reveal>
        <Container>
          {(eyebrow || title || description) && (
            <div className="mb-10 max-w-3xl sm:mb-12">
              {eyebrow && (
                <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-accent sm:text-sm">
                  {eyebrow}
                </p>
              )}
              {title && (
                <h2 className="gradient-heading text-3xl font-extrabold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-[2.75rem]">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                  {description}
                </p>
              )}
            </div>
          )}
          {children}
        </Container>
      </Reveal>
    </section>
  );
}
