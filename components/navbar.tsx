"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Truck, X } from "lucide-react";
import { useRef, useState } from "react";
import { navigation } from "@/data/navigation";
import { siteConfig } from "@/lib/site-config";
import { Button } from "./button";
import { Container } from "./container";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  function isActive(href: string) {
    return href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header
      className="relative z-20 border-b border-slate-200 bg-white"
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
          className="flex min-w-0 items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-amber-400">
            <Truck aria-hidden="true" size={25} />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-extrabold tracking-tight text-slate-950 sm:text-lg">
              {siteConfig.companyName}
            </span>
            <span className="hidden text-xs font-medium text-slate-500 sm:block">
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
                className={`rounded-sm border-b-2 pb-1 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900 ${
                  active
                    ? "border-amber-500 font-semibold text-amber-700 hover:text-amber-800"
                    : "border-transparent font-medium text-slate-700 hover:border-amber-500 hover:text-amber-700"
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
                ? "ring-2 ring-amber-500 ring-offset-2"
                : ""
            }
          >
            Get a Quote
          </Button>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-lg text-slate-900 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 lg:hidden"
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
        hidden={!isMenuOpen}
        className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden sm:px-8"
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
                  className={`block rounded-lg border-b-2 px-3 py-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 ${
                    active
                      ? "border-amber-500 font-semibold text-amber-700 hover:bg-amber-50 hover:text-amber-800"
                      : "border-transparent font-medium text-slate-800 hover:border-amber-500 hover:bg-slate-50 hover:text-amber-700"
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
                  ? "ring-2 ring-amber-500 ring-offset-2"
                  : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Get a Quote
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
