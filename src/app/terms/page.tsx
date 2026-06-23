import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/SectionHeading";
import { company, educationalDisclaimer, financialDisclaimer } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Royal Wealth Heritage LLC website and services.",
};

export default function TermsPage() {
  const updated = "June 23, 2026";

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description={`Last updated: ${updated}`}
      />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose-rwh space-y-8 text-sm leading-relaxed text-muted">
          <section>
            <h2 className="font-serif text-xl font-semibold text-magenta-dark">Agreement</h2>
            <p className="mt-3">
              By accessing or using the website of {company.name}, you agree to these Terms of
              Service. If you do not agree, please do not use this website.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-magenta-dark">Services</h2>
            <p className="mt-3">
              {company.name} provides financial consulting services and educational support
              through the RWH Life Skills & Learning Academy. Specific services, fees, and
              schedules are defined in separate agreements or enrollment documents.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-magenta-dark">
              Financial Services Disclaimer
            </h2>
            <p className="mt-3">{financialDisclaimer}</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-magenta-dark">
              Educational Services Disclaimer
            </h2>
            <p className="mt-3">{educationalDisclaimer}</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-magenta-dark">
              Academy Policies
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>24-hour cancellation notice is required for all scheduled sessions.</li>
              <li>
                Enrollment requires completion of all intake forms, waivers, and agreements
                before services begin.
              </li>
              <li>
                Payment terms are outlined in the Payment Agreement provided during enrollment.
              </li>
              <li>
                Parents/guardians are responsible for providing accurate student information
                during enrollment.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-magenta-dark">
              Limitation of Liability
            </h2>
            <p className="mt-3">
              To the fullest extent permitted by Texas law, {company.name} shall not be liable
              for any indirect, incidental, or consequential damages arising from use of this
              website or our services. Our total liability shall not exceed the amount paid for
              the specific service giving rise to the claim.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-magenta-dark">
              Intellectual Property
            </h2>
            <p className="mt-3">
              All content on this website — including text, logos, and design — is the property
              of {company.name} and may not be reproduced without written permission.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-magenta-dark">Governing Law</h2>
            <p className="mt-3">
              These terms are governed by the laws of the State of Texas. Any disputes shall be
              resolved in courts located in Texas.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-magenta-dark">Contact</h2>
            <p className="mt-3">
              Questions about these terms? Contact us at{" "}
              <a href={`mailto:${company.email}`} className="text-magenta underline">
                {company.email}
              </a>{" "}
              or via our{" "}
              <Link href="/contact" className="text-magenta underline">
                contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
