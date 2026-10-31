import Image from "next/image";
import { Button } from "./button";
import { Card } from "./card";
import { Section } from "./section";
import { vehicles } from "@/data/vehicles";

export function VehicleFleet() {
  return (
    <Section
      className="section-muted"
      id="vehicle-sizes"
      eyebrow="Vehicle options"
      title="Vehicle Sizes for Goods Transport"
      description="Explore 14 feet, 16 feet, 17 feet and 20 feet vehicles for goods transport, with options considered against your shipment details. Open body and closed body vehicles for goods transport can also be discussed."
    >
      <div className="reveal-stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {vehicles.map((vehicle) => (
          <Card
            key={vehicle.id}
            className="fleet-vehicle-card flex min-w-0 flex-col"
          >
            <Image
              src={vehicle.image}
              alt={vehicle.alt}
              width={640}
              height={320}
              unoptimized
              loading="lazy"
              className="mb-5 h-auto w-full rounded-xl bg-background object-contain"
            />
            <h3 className="text-xl font-bold text-foreground">
              {vehicle.title}
            </h3>
            <p className="mt-2 text-sm font-semibold text-accent">
              Open and closed body options
            </p>
            <p className="mt-3 flex-1 leading-7 text-muted">
              {vehicle.description}
            </p>
            <div className="mt-5">
              <p className="font-semibold text-foreground">Best for</p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm leading-6 text-muted">
                {vehicle.suitableFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <Button href="/get-a-quote" className="mt-6 w-full">
              Get a Quote
            </Button>
          </Card>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted">
        Body type and availability are confirmed at quote time.
      </p>
    </Section>
  );
}
