import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { PageHero } from "@/components/SectionHeading";
import { ParentIntakeForm } from "@/components/ParentIntakeForm";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { academy } from "@/lib/content";

export const metadata: Metadata = {
  title: "Parent Intake Form",
  description:
    "Register your student with RWH Life Skills & Learning Academy. Complete the parent intake form to begin enrollment.",
};

export default function EnrollmentPage() {
  return (
    <>
      <PageHero
        eyebrow={academy.subtitle}
        title="Parent Intake Form"
        description="Complete this form to begin enrollment. We'll review your student's information and contact you about next steps and remaining enrollment documents."
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/academy"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-magenta transition hover:gap-3"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Academy
          </Link>

          <div className="mb-8">
            <DisclaimerBanner />
          </div>

          <div className="mb-8 rounded-2xl border border-border bg-white p-5">
            <div className="flex gap-3">
              <FileText className="mt-0.5 h-5 w-5 shrink-0 text-burnt-orange" />
              <div className="text-sm text-muted">
                <p className="font-semibold text-foreground">After submitting this form</p>
                <p className="mt-1 leading-relaxed">
                  You will also receive the remaining enrollment documents: Emergency Contact Form,
                  Medical Information Form, Liability Waiver, Photo Release, Attendance Agreement,
                  and Payment Agreement.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <ParentIntakeForm />
          </div>
        </div>
      </section>
    </>
  );
}
