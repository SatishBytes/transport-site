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
    <section className={`bg-slate-950 py-12 text-white sm:py-16 ${className}`}>
      <Reveal>
        <Container className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 leading-7 text-slate-300">{description}</p>
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
