import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ClipboardList,
  FileCheck,
  FileText,
  Shield,
} from "lucide-react";
import { PageHero, SectionHeading } from "@/components/SectionHeading";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { enrollmentForms } from "@/lib/forms-registry";
import { academy } from "@/lib/content";

export const metadata: Metadata = {
  title: "Enrollment Forms & Documents",
  description:
    "Complete all RWH Life Skills & Learning Academy enrollment forms online — intake, emergency contact, medical information, waivers, and agreements.",
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
        description="Click any form below to open, complete, and submit online. All documents are required before services begin."
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

          <div className="mt-10 rounded-2xl border border-border bg-white p-5">
            <div className="flex gap-3">
              <FileCheck className="mt-0.5 h-5 w-5 shrink-0 text-burnt-orange" />
              <p className="text-sm leading-relaxed text-muted">
                <strong className="text-foreground">Enrollment checklist:</strong> Complete all{" "}
                {sorted.length} forms below. You may complete them in any order. We recommend
                starting with the Parent Intake Form.
              </p>
            </div>
          </div>

          <div className="mt-10 space-y-4">
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
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-burnt-orange/10 px-2.5 py-0.5 text-xs font-semibold text-burnt-orange">
                        <Icon className="h-3 w-3" />
                        {kindLabels[form.kind]}
                      </span>
                    </div>
                    <h2 className="font-serif text-xl font-semibold text-magenta-dark group-hover:text-magenta">
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
