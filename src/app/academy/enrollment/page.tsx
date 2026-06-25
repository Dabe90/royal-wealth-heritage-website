import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/SectionHeading";
import { EnrollmentWizard } from "@/components/EnrollmentWizard";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { academy } from "@/lib/content";

export const metadata: Metadata = {
  title: "Student Enrollment",
  description:
    "Complete your full RWH Life Skills & Learning Academy enrollment online — all forms in one guided process.",
};

export default function EnrollmentPage() {
  return (
    <>
      <PageHero
        eyebrow={academy.subtitle}
        title="Student Enrollment"
        description="Complete all enrollment documents in one guided process. Move through each section, review everything, and submit once."
      />

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/academy"
            className="btn-touch mb-6 inline-flex items-center gap-2 py-1 text-sm font-medium text-magenta sm:mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Academy
          </Link>

          <div className="mb-8">
            <DisclaimerBanner variant="compact" />
          </div>

          <div className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 lg:p-8">
            <EnrollmentWizard />
          </div>
        </div>
      </section>
    </>
  );
}
