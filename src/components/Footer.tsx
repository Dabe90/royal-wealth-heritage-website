import Link from "next/link";
import Image from "next/image";
import { company, educationalDisclaimer, financialDisclaimer } from "@/lib/content";
import { legalLinks, navLinks } from "@/lib/nav";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-magenta-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-gold/50">
                <Image
                  src="/images/logo.png"
                  alt={`${company.name} logo`}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-serif text-xl font-semibold">{company.name}</p>
                <p className="text-sm text-white/70">{company.tagline}</p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/75">
              A Texas-registered business dedicated to financial stewardship and educational
              empowerment. Building legacies of stability, independence, and opportunity.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold text-gold-light">Explore</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold text-gold-light">Contact</h3>
            <ul className="space-y-2 text-sm text-white/75">
              <li>{company.location}</li>
              <li>{company.serviceArea}</li>
              <li>
                <a href={`mailto:${company.email}`} className="transition hover:text-white">
                  {company.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${company.phone.replace(/\D/g, "")}`}
                  className="transition hover:text-white"
                >
                  {company.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-line my-10" />

        <div className="space-y-4">
          <p className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-white/70">
            <strong className="text-white/90">Educational Notice:</strong> {educationalDisclaimer}
          </p>
          <p className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-white/70">
            <strong className="text-white/90">Financial Notice:</strong> {financialDisclaimer}
          </p>

          <div className="flex flex-col gap-3 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {company.name}. All rights reserved. Registered in the State of Texas.
            </p>
            <div className="flex gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-white/80"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
