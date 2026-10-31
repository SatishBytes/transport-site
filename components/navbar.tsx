"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Truck, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/navigation";
import { siteConfig } from "@/lib/site-config";
import { Button } from "./button";
import { Container } from "./container";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const updateScrollState = () => setHasScrolled(window.scrollY > 8);

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  function isActive(href: string) {
    return href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header
      className={`relative z-20 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 ${hasScrolled ? "shadow-md" : ""}`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && isMenuOpen) {
          setIsMenuOpen(false);
          menuButtonRef.current?.focus();
        }
      }}
    >
      <Container className="flex min-h-20 items-center justify-between gap-6">
        <Link
          href="/"
          aria-label={`${siteConfig.companyName} home`}
          className="flex min-w-0 items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900 dark:focus-visible:outline-amber-300"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-amber-400">
            <Truck aria-hidden="true" size={25} />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-extrabold tracking-tight text-slate-950 dark:text-slate-100 sm:text-lg">
              {siteConfig.companyName}
            </span>
            <span className="hidden text-xs font-medium text-slate-500 dark:text-slate-400 sm:block">
              {siteConfig.tagline}
            </span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-sm pb-1 text-sm after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:bg-amber-500 after:transition-transform after:duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900 dark:focus-visible:outline-amber-300 ${
                  active
                    ? "font-semibold text-amber-700 after:scale-x-100 hover:text-amber-800 dark:text-amber-300 dark:hover:text-amber-200"
                      : "font-medium text-slate-700 after:scale-x-0 hover:text-amber-700 hover:after:scale-x-100 dark:text-slate-200 dark:hover:text-amber-300"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Button
            href="/get-a-quote"
            className={
              pathname === "/get-a-quote"
                ? "ring-2 ring-amber-700 ring-offset-2 dark:ring-amber-300"
                : ""
            }
          >
            Get a Quote
          </Button>
          <ThemeToggle />
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-lg text-slate-900 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus-visible:outline-amber-300 lg:hidden"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? (
            <X aria-hidden="true" size={23} />
          ) : (
            <Menu aria-hidden="true" size={23} />
          )}
        </button>
      </Container>

      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
        className={`absolute left-0 right-0 top-full border-t border-slate-200 bg-white px-5 py-4 shadow-lg transition-[transform,opacity] duration-300 ease-out dark:border-slate-800 dark:bg-slate-950 lg:hidden sm:px-8 ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <ul className="mx-auto flex w-full max-w-7xl flex-col gap-1">
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={`relative block rounded-lg border-b-2 px-3 py-3 after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:origin-left after:bg-amber-500 after:transition-transform after:duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:focus-visible:outline-amber-300 ${
                    active
                      ? "border-amber-500 font-semibold text-amber-700 after:scale-x-100 hover:bg-amber-50 hover:text-amber-800 dark:text-amber-300 dark:hover:bg-slate-900 dark:hover:text-amber-200"
                      : "border-transparent font-medium text-slate-800 after:scale-x-0 hover:bg-slate-50 hover:text-amber-700 hover:after:scale-x-100 dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-amber-300"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="pt-2">
            <Button
              href="/get-a-quote"
              className={`w-full ${
                pathname === "/get-a-quote"
                  ? "ring-2 ring-amber-700 ring-offset-2 dark:ring-amber-300"
                  : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Get a Quote
            </Button>
          </li>
          <li className="flex justify-end pt-2">
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
