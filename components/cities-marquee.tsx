"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

interface CityLink {
  name: string;
  href: string;
}

interface CitiesMarqueeProps {
  cities: CityLink[];
}

export function CitiesMarquee({ cities }: CitiesMarqueeProps) {
  const marqueeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (mediaQuery.matches) return;

    let isVisible = false;
    const updateMotion = () => {
      marquee.classList.toggle(
        "is-active",
        isVisible && !document.hidden && !mediaQuery.matches,
      );
    };
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      updateMotion();
    });
    const handleVisibility = () => updateMotion();
    const handleMotionPreference = () => updateMotion();

    observer.observe(marquee);
    document.addEventListener("visibilitychange", handleVisibility);
    mediaQuery.addEventListener("change", handleMotionPreference);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      mediaQuery.removeEventListener("change", handleMotionPreference);
      marquee.classList.remove("is-active");
    };
  }, []);

  function renderCities(hidden = false) {
    return (
      <div
        className="cities-marquee-row"
        aria-hidden={hidden || undefined}
        inert={hidden}
      >
        {cities.map((city) => (
          <Link
            key={city.href}
            href={city.href}
            tabIndex={hidden ? -1 : undefined}
            className="cities-marquee-item focus-visible:outline-accent"
          >
            {city.name}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <section
      ref={marqueeRef}
      aria-label="Service locations"
      className="cities-marquee"
    >
      <div className="cities-marquee-track">
        {renderCities()}
        {renderCities(true)}
      </div>
    </section>
  );
}
