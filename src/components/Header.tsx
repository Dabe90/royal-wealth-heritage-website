"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/nav";
import { company } from "@/lib/content";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const closeMenu = useCallback(() => setOpen(false), []);
  const enrollActive =
    pathname.startsWith("/academy/enrollment") || pathname.startsWith("/academy/forms");

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, closeMenu]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-cream/90 backdrop-blur-xl safe-top">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-magenta focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3" onClick={closeMenu}>
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/40 sm:h-12 sm:w-12">
            <Image
              src="/images/logo.png"
              alt={`${company.name} logo`}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="min-w-0">
            <p className="truncate font-serif text-base font-semibold leading-tight text-magenta-dark sm:text-lg">
              <span className="sm:hidden">RWH LLC</span>
              <span className="hidden sm:inline">Royal Wealth Heritage</span>
            </p>
            <p className="hidden text-xs tracking-widest text-muted uppercase sm:block">
              Texas Registered
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition xl:px-4 ${
                  active
                    ? "bg-magenta text-white shadow-md shadow-magenta/20"
                    : "text-foreground hover:bg-magenta/8 hover:text-magenta"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/academy/enrollment"
            className={`btn-touch ml-1 inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold xl:ml-2 xl:px-5 xl:py-2.5 ${
              enrollActive
                ? "bg-burnt-orange text-white shadow-md shadow-burnt-orange/25"
                : "border-2 border-burnt-orange bg-burnt-orange/10 text-burnt-orange hover:bg-burnt-orange hover:text-white"
            }`}
            aria-current={enrollActive ? "page" : undefined}
          >
            Enroll Now
          </Link>
          <Link
            href="/contact"
            className="btn-touch inline-flex items-center rounded-full bg-gradient-to-r from-magenta to-burnt-orange px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-magenta/25 xl:px-5 xl:py-2.5"
          >
            Get Started
          </Link>
        </nav>

        <button
          type="button"
          className="btn-touch -mr-1 flex shrink-0 items-center justify-center rounded-lg p-2.5 text-magenta lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 top-[57px] z-40 bg-black/20 lg:hidden"
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <nav
            id="mobile-nav"
            className="relative z-50 max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-t border-border bg-cream px-4 py-3 safe-bottom lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={`btn-touch flex items-center rounded-xl px-4 text-base font-medium ${
                      active ? "bg-magenta text-white" : "text-foreground active:bg-magenta/8"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/academy/enrollment"
                onClick={closeMenu}
                className={`btn-touch mt-1 flex items-center justify-center rounded-xl px-4 text-base font-semibold ${
                  enrollActive
                    ? "bg-burnt-orange text-white"
                    : "border-2 border-burnt-orange bg-burnt-orange/10 text-burnt-orange"
                }`}
                aria-current={enrollActive ? "page" : undefined}
              >
                Enroll Now
              </Link>
              <Link
                href="/contact"
                onClick={closeMenu}
                className="btn-touch flex items-center justify-center rounded-xl bg-gradient-to-r from-magenta to-burnt-orange px-4 text-base font-semibold text-white"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
