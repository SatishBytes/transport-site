import Image from "next/image";
import { bodyTypes } from "@/data/body-types";
import { Button } from "./button";
import { Card } from "./card";
import { InteractiveSurface } from "./interactive-surface";

export function BodyTypeOptions() {
  return (
    <div className="mt-10">
      <p className="mb-5 text-lg font-bold tracking-tight text-foreground">
        Choose a body type
      </p>
      <div className="reveal-stagger grid items-start gap-5 md:grid-cols-2">
        {bodyTypes.map((bodyType) => (
          <InteractiveSurface
            key={bodyType.id}
            className="min-w-0 rounded-2xl"
          >
            <Card className="body-type-card flex flex-col">
              <div className="relative mb-5 aspect-[2/1] w-full overflow-hidden rounded-xl bg-background">
                <Image
                  src={bodyType.image}
                  alt={bodyType.alt}
                  width={640}
                  height={320}
                  unoptimized
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {bodyType.title}
              </h3>
              <p className="mt-3 leading-7 text-muted">
                {bodyType.description}
              </p>
              <div className="mt-5">
                <p className="font-semibold text-foreground">Best for</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm leading-6 text-muted">
                  {bodyType.suitableFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <Button href="/get-a-quote" className="mt-6 w-full">
                Get a Quote
              </Button>
            </Card>
          </InteractiveSurface>
        ))}
      </div>
      <p className="mt-5 text-sm leading-6 text-muted">
        Body type and availability are confirmed when you request a quote.
      </p>
    </div>
  );
}
