"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  type PointerEvent,
  type ReactNode,
} from "react";

interface InteractiveSurfaceProps {
  children: ReactNode;
  className?: string;
  href?: string;
}

export function InteractiveSurface({
  children,
  className = "",
  href,
}: InteractiveSurfaceProps) {
  const surfaceRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    },
    [],
  );

  function setSurfaceRef(element: HTMLElement | null) {
    surfaceRef.current = element;
  }

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (
      event.pointerType === "touch" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const surface = surfaceRef.current;
    if (!surface) return;
    const pointerX = event.clientX;
    const pointerY = event.clientY;

    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      const bounds = surface.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (pointerX - bounds.left) / bounds.width));
      const y = Math.min(1, Math.max(0, (pointerY - bounds.top) / bounds.height));

      surface.style.setProperty("--pointer-x", `${x * 100}%`);
      surface.style.setProperty("--pointer-y", `${y * 100}%`);
      surface.style.setProperty("--tilt-x", `${(0.5 - y) * 3}deg`);
      surface.style.setProperty("--tilt-y", `${(x - 0.5) * 3}deg`);
    });
  }

  function resetPointer() {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    const surface = surfaceRef.current;
    surface?.style.removeProperty("--pointer-x");
    surface?.style.removeProperty("--pointer-y");
    surface?.style.removeProperty("--tilt-x");
    surface?.style.removeProperty("--tilt-y");
  }

  const surfaceClassName = `interactive-surface ${className}`;
  const surfaceHandlers = {
    onPointerMove: handlePointerMove,
    onPointerLeave: resetPointer,
  };

  if (href) {
    return (
      <Link
        ref={setSurfaceRef}
        href={href}
        className={surfaceClassName}
        {...surfaceHandlers}
      >
        {children}
      </Link>
    );
  }

  return (
    <div
      ref={setSurfaceRef}
      className={surfaceClassName}
      {...surfaceHandlers}
    >
      {children}
    </div>
  );
}
