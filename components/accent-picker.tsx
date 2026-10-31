"use client";

import { Check, Palette } from "lucide-react";
import { useRef, useSyncExternalStore } from "react";

const accents = [
  { value: "amber", label: "Amber" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "violet", label: "Violet" },
] as const;

type Accent = (typeof accents)[number]["value"];

function isAccent(value: string | undefined): value is Accent {
  return accents.some((accent) => accent.value === value);
}

function subscribeToAccent(onAccentChange: () => void) {
  window.addEventListener("accent-change", onAccentChange);
  return () => window.removeEventListener("accent-change", onAccentChange);
}

function getAccentSnapshot(): Accent {
  const accent = document.documentElement.dataset.accent;
  return isAccent(accent) ? accent : "amber";
}

function getServerAccentSnapshot(): Accent {
  return "amber";
}

function applyAccent(accent: Accent) {
  document.documentElement.dataset.accent = accent;
  try {
    window.localStorage.setItem("accent", accent);
  } catch {
    // The selected accent still applies for this page when storage is unavailable.
  }
  window.dispatchEvent(new Event("accent-change"));
}

export function AccentPicker() {
  const selectedAccent = useSyncExternalStore(
    subscribeToAccent,
    getAccentSnapshot,
    getServerAccentSnapshot,
  );
  const detailsRef = useRef<HTMLDetailsElement>(null);

  function chooseAccent(accent: Accent) {
    applyAccent(accent);

    if (detailsRef.current) {
      detailsRef.current.open = false;
      detailsRef.current.querySelector("summary")?.focus();
    }
  }

  return (
    <details ref={detailsRef} className="accent-picker">
      <summary
        aria-label="Choose accent colour"
        className="inline-flex size-11 cursor-pointer items-center justify-center rounded-xl border border-line bg-surface text-foreground hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <Palette aria-hidden="true" size={20} />
      </summary>
      <div
        role="group"
        aria-label="Accent colour theme"
        className="accent-picker-panel"
      >
        {accents.map((accent) => {
          const isSelected = selectedAccent === accent.value;
          return (
            <button
              key={accent.value}
              type="button"
              aria-label={`Use ${accent.label} accent theme`}
              aria-pressed={isSelected}
              className="accent-swatch"
              onClick={() => chooseAccent(accent.value)}
            >
              <span
                aria-hidden="true"
                className={`accent-swatch-dot accent-swatch-dot-${accent.value}`}
              />
              {accent.label}
              {isSelected && (
                <Check
                  aria-hidden="true"
                  size={17}
                  className="accent-swatch-check"
                />
              )}
            </button>
          );
        })}
      </div>
    </details>
  );
}
