import { ArrowRight } from "lucide-react";
import { Button } from "./button";
import { Container } from "./container";
import { Reveal } from "./reveal";

interface CtaBannerProps {
  title: string;
  description: string;
  className?: string;
}

export function CtaBanner({
  title,
  description,
  className = "",
}: CtaBannerProps) {
  return (
    <section className={`cta-surface py-14 text-white sm:py-18 lg:py-20 ${className}`}>
      <Reveal>
        <Container className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold leading-tight tracking-[-0.035em] sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 leading-7 text-slate-200">{description}</p>
          </div>
          <Button href="/get-a-quote" className="group shrink-0">
            Get a Quote{" "}
            <ArrowRight
              aria-hidden="true"
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Button>
        </Container>
      </Reveal>
    </section>
  );
}
