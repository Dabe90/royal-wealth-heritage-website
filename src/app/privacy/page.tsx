import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/SectionHeading";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Royal Wealth Heritage LLC website and services.",
};

export default function PrivacyPage() {
  const updated = "June 23, 2026";

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated: ${updated}`}
      />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose-rwh space-y-8 text-sm leading-relaxed text-muted">
          <section>
            <h2 className="font-serif text-xl font-semibold text-magenta-dark">Introduction</h2>
            <p className="mt-3">
              {company.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your
              privacy. This Privacy Policy explains how we collect, use, and protect information
              when you visit our website or contact us about our financial consulting or educational
              support services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-magenta-dark">
              Information We Collect
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-foreground">Contact information</strong> — name, email
                address, phone number, and message content submitted through our contact form.
              </li>
              <li>
                <strong className="text-foreground">Enrollment information</strong> — for Academy
                services, we may collect student and parent/guardian information through intake
                forms (provided separately during enrollment).
              </li>
              <li>
                <strong className="text-foreground">Usage data</strong> — standard web analytics
                such as pages visited, browser type, and device information if analytics are
                enabled.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-magenta-dark">
              How We Use Your Information
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Respond to inquiries and schedule consultations or sessions</li>
              <li>Process enrollment and provide educational support services</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-magenta-dark">
              Children&apos;s Privacy
            </h2>
            <p className="mt-3">
              Our Life Skills & Learning Academy serves students who may be minors. We collect
              student information only from parents or legal guardians during the enrollment
              process. We do not knowingly collect personal information directly from children
              under 13 through this website without parental consent.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-magenta-dark">
              Information Sharing
            </h2>
            <p className="mt-3">
              We do not sell your personal information. We may share information only with trusted
              service providers who assist in operating our business (such as email or hosting
              providers), when required by law, or with your consent.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-magenta-dark">Data Security</h2>
            <p className="mt-3">
              We take reasonable measures to protect your information. However, no method of
              transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-magenta-dark">Your Rights</h2>
            <p className="mt-3">
              You may request access to, correction of, or deletion of your personal information
              by contacting us at{" "}
              <a href={`mailto:${company.email}`} className="text-magenta underline">
                {company.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-magenta-dark">Contact Us</h2>
            <p className="mt-3">
              Questions about this Privacy Policy? Contact {company.name} at{" "}
              <a href={`mailto:${company.email}`} className="text-magenta underline">
                {company.email}
              </a>{" "}
              or visit our{" "}
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
