"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

function subscribeToTheme(onThemeChange: () => void) {
  window.addEventListener("theme-change", onThemeChange);
  return () => window.removeEventListener("theme-change", onThemeChange);
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerThemeSnapshot() {
  return null;
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  function toggleTheme() {
    const nextIsDark = !isDark;
    document.documentElement.classList.toggle("dark", nextIsDark);

    try {
      window.localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    } catch {
      // The current page can still use the selected theme when storage is unavailable.
    }

    window.dispatchEvent(new Event("theme-change"));
  }

  const className =
    "inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-foreground hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  if (isDark === null) {
    return <span aria-hidden="true" className={className} />;
  }

  return (
    <button
      type="button"
      className={className}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      onClick={toggleTheme}
    >
      {isDark ? (
        <Sun aria-hidden="true" size={20} />
      ) : (
        <Moon aria-hidden="true" size={20} />
      )}
    </button>
  );
}
