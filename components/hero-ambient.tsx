"use client";

import { useEffect, useRef } from "react";

export function HeroAmbient() {
  const ambientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ambient = ambientRef.current;
    const hero = ambient?.closest(".hero-mesh");
    if (!ambient || !hero) return;

    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (mediaQuery.matches) return;

    let isVisible = false;
    const updateMotion = () => {
      hero.classList.toggle(
        "ambient-active",
        isVisible && !document.hidden && !mediaQuery.matches,
      );
    };
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      updateMotion();
    });
    const handleVisibility = () => updateMotion();
    const handleMotionPreference = () => updateMotion();

    observer.observe(hero);
    document.addEventListener("visibilitychange", handleVisibility);
    mediaQuery.addEventListener("change", handleMotionPreference);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      mediaQuery.removeEventListener("change", handleMotionPreference);
      hero.classList.remove("ambient-active");
    };
  }, []);

  return (
    <div ref={ambientRef} aria-hidden="true" className="hero-ambient">
      <span className="ambient-glow ambient-glow-one" />
      <span className="ambient-glow ambient-glow-two" />
    </div>
  );
}
