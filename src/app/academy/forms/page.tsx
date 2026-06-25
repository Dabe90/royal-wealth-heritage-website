import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ClipboardList,
  FileCheck,
  FileText,
  Layers,
  Shield,
} from "lucide-react";
import { PageHero, SectionHeading } from "@/components/SectionHeading";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { enrollmentForms } from "@/lib/forms-registry";
import { academy } from "@/lib/content";

export const metadata: Metadata = {
  title: "Enrollment Forms & Documents",
  description:
    "Complete RWH Life Skills & Learning Academy enrollment online — unified wizard or individual forms.",
};

const kindIcons = {
  application: ClipboardList,
  information: FileText,
  agreement: Shield,
};

const kindLabels = {
  application: "Application",
  information: "Information",
  agreement: "Agreement",
};

export default function FormsHubPage() {
  const sorted = [...enrollmentForms].sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHero
        eyebrow={academy.subtitle}
        title="Enrollment Forms & Documents"
        description="Industry-standard enrollment: complete everything in one guided process, or open individual documents if needed."
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/academy"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-magenta transition hover:gap-3"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Academy
          </Link>

          <DisclaimerBanner />

          {/* Primary: unified wizard */}
          <Link
            href="/academy/enrollment"
            className="group mt-10 flex items-center gap-5 rounded-2xl border-2 border-magenta bg-gradient-to-r from-magenta/5 to-burnt-orange/5 p-6 shadow-md transition hover:border-magenta-light hover:shadow-lg"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-magenta to-burnt-orange text-white">
              <Layers className="h-7 w-7" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold tracking-wider text-burnt-orange uppercase">
                Recommended
              </p>
              <h2 className="font-serif text-2xl font-semibold text-magenta-dark group-hover:text-magenta">
                Complete All Forms — One Process
              </h2>
              <p className="mt-1 text-sm text-muted">
                Step-by-step wizard with {sorted.length} sections, progress tracking, review screen,
                and one submission. This is how most professional programs handle enrollment online.
              </p>
            </div>
            <ArrowRight className="h-6 w-6 shrink-0 text-magenta transition group-hover:translate-x-1" />
          </Link>

          <div className="mt-10 rounded-2xl border border-border bg-white p-5">
            <div className="flex gap-3">
              <FileCheck className="mt-0.5 h-5 w-5 shrink-0 text-burnt-orange" />
              <p className="text-sm leading-relaxed text-muted">
                <strong className="text-foreground">Individual forms:</strong> Need to complete or
                update just one document? Use the links below.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {sorted.map((form, index) => {
              const Icon = kindIcons[form.kind];
              return (
                <Link
                  key={form.slug}
                  href={form.href}
                  className="group flex items-center gap-5 rounded-2xl border border-border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-magenta/30 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-magenta/10 font-serif text-lg font-bold text-magenta">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="inline-flex items-center gap-1 rounded-full bg-burnt-orange/10 px-2.5 py-0.5 text-xs font-semibold text-burnt-orange">
                      <Icon className="h-3 w-3" />
                      {kindLabels[form.kind]}
                    </span>
                    <h2 className="mt-1 font-serif text-xl font-semibold text-magenta-dark group-hover:text-magenta">
                      {form.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted">{form.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-magenta transition group-hover:translate-x-1" />
                </Link>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <SectionHeading
              eyebrow="Questions?"
              title="Need Help With Enrollment?"
              description="Contact us if you have questions about any form or need assistance completing enrollment."
            />
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-magenta px-6 py-3 text-sm font-semibold text-white"
            >
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
