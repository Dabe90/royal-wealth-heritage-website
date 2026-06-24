import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/SectionHeading";
import { EnrollmentFormRenderer } from "@/components/EnrollmentFormRenderer";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { enrollmentForms, getFormBySlug } from "@/lib/forms-registry";
import { academy } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return enrollmentForms.map((form) => ({ slug: form.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const form = getFormBySlug(slug);
  if (!form) return { title: "Form Not Found" };

  return {
    title: form.title,
    description: form.description,
  };
}

export default async function FormPage({ params }: PageProps) {
  const { slug } = await params;
  const form = getFormBySlug(slug);
  if (!form) notFound();

  const sorted = [...enrollmentForms].sort((a, b) => a.order - b.order);
  const currentIndex = sorted.findIndex((f) => f.slug === slug);
  const nextForm = sorted[currentIndex + 1];

  return (
    <>
      <PageHero
        eyebrow={`${academy.subtitle} · Form ${currentIndex + 1} of ${sorted.length}`}
        title={form.title}
        description={form.description}
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/academy/forms"
              className="inline-flex items-center gap-2 text-sm font-medium text-magenta"
            >
              <ArrowLeft className="h-4 w-4" />
              All enrollment forms
            </Link>
            {nextForm && (
              <Link
                href={nextForm.href}
                className="inline-flex items-center gap-2 text-sm font-medium text-burnt-orange"
              >
                Next: {nextForm.shortTitle}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          <div className="mb-8">
            <DisclaimerBanner variant="compact" />
          </div>

          <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <EnrollmentFormRenderer definition={form} />
          </div>

          {nextForm && (
            <div className="mt-8 text-center print:hidden">
              <Link
                href={nextForm.href}
                className="inline-flex items-center gap-2 rounded-full border-2 border-magenta/30 px-6 py-3 text-sm font-semibold text-magenta transition hover:bg-magenta/5"
              >
                Continue to {nextForm.title}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
