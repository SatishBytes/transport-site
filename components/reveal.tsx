"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
}

export function Reveal({ children }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("motion-enabled");

    const element = elementRef.current;
    if (!element) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsReady(true);
        if (entry.isIntersecting) {
          observer.disconnect();
          animationFrame.current = window.requestAnimationFrame(() => {
            setIsVisible(true);
          });
        }
      },
      { rootMargin: "0px 0px -32px 0px", threshold: 0.05 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`reveal${isReady ? " reveal-ready" : ""}${isVisible ? " reveal-visible" : ""}`}
    >
      {children}
    </div>
  );
}
