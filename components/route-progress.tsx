"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type ProgressStage = "idle" | "loading" | "completing";

export function RouteProgress() {
  const pathname = usePathname();
  const [stage, setStage] = useState<ProgressStage>("idle");
  const stageRef = useRef<ProgressStage>("idle");
  const previousPathname = useRef(pathname);
  const safetyTimer = useRef<number | null>(null);

  useEffect(() => {
    const clearTimers = () => {
      if (safetyTimer.current !== null) {
        window.clearTimeout(safetyTimer.current);
        safetyTimer.current = null;
      }
    };

    const setProgressStage = (nextStage: ProgressStage) => {
      stageRef.current = nextStage;
      setStage(nextStage);
      document.documentElement.classList.toggle(
        "route-progress-active",
        nextStage !== "idle",
      );
    };

    const finish = () => {
      if (stageRef.current === "idle") return;
      if (safetyTimer.current !== null) {
        window.clearTimeout(safetyTimer.current);
        safetyTimer.current = null;
      }
      setProgressStage("completing");
    };

    const handleClick = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (
        !anchor ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        (destination.pathname === window.location.pathname &&
          destination.search === window.location.search)
      ) {
        return;
      }

      clearTimers();
      setProgressStage("loading");
      window.requestAnimationFrame(() => {
        if (stageRef.current === "loading") {
          document
            .querySelector(".route-progress")
            ?.classList.add("route-progress-running");
        }
      });
      safetyTimer.current = window.setTimeout(finish, 6000);
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      clearTimers();
      document.documentElement.classList.remove("route-progress-active");
    };
  }, []);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    if (stageRef.current !== "idle") {
      if (safetyTimer.current !== null) {
        window.clearTimeout(safetyTimer.current);
        safetyTimer.current = null;
      }
      stageRef.current = "completing";
      setStage("completing");
      document
        .querySelector(".route-progress")
        ?.classList.remove("route-progress-running");
    }
  }, [pathname]);

  useEffect(() => {
    if (stage !== "completing") return;
    const timer = window.setTimeout(() => {
      stageRef.current = "idle";
      setStage("idle");
      document.documentElement.classList.remove("route-progress-active");
    }, 280);
    return () => window.clearTimeout(timer);
  }, [stage]);

  return (
    <div
      aria-hidden="true"
      className={`route-progress${stage === "loading" ? " route-progress-running" : ""}${stage === "completing" ? " route-progress-completing" : ""}`}
    />
  );
}
