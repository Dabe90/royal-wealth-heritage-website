import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Monitor, MapPin } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/SectionHeading";
import { FounderProfile } from "@/components/FounderProfile";
import { ServiceCard } from "@/components/ServiceCard";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FAQAccordion } from "@/components/FAQAccordion";
import { academy } from "@/lib/content";
import { enrollmentForms } from "@/lib/forms-registry";

export const metadata: Metadata = {
  title: "Life Skills & Learning Academy",
  description:
    "RWH Life Skills & Learning Academy — structured educational support for students with autism, communication challenges, and diverse learning needs.",
};

export default function AcademyPage() {
  return (
    <>
      <PageHero
        eyebrow={academy.subtitle}
        title={academy.name}
        description={academy.tagline}
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <SectionHeading
                eyebrow="Educational Mission"
                title="Building Skills for Life"
                description={academy.mission}
                align="left"
              />
              <div className="mt-8">
                <DisclaimerBanner />
              </div>
            </div>

            <FounderProfile variant="academy" />
          </div>
        </div>
      </section>

      <section className="bg-white/60 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Programs & Services"
            title="Comprehensive Educational Support"
            description="Individualized instruction designed to build independence, confidence, and real-world readiness."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {academy.services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Investment"
            title="Transparent Pricing"
            description="Flexible session options designed to meet the needs of students and families."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {academy.pricing.map((plan) => (
              <article
                key={plan.name}
                className={`rounded-3xl border p-8 ${
                  plan.featured
                    ? "border-magenta bg-gradient-to-b from-magenta/5 to-white shadow-lg shadow-magenta/10"
                    : "border-border bg-white"
                }`}
              >
                {plan.featured && (
                  <span className="mb-4 inline-block rounded-full bg-magenta px-3 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="font-serif text-xl font-semibold text-magenta-dark">{plan.name}</h3>
                <p className="mt-3">
                  <span className="font-serif text-4xl font-bold text-magenta">{plan.price}</span>
                  <span className="ml-1 text-sm text-muted">{plan.unit}</span>
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{plan.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Session Details"
            title="How Sessions Work"
            description="Flexible options designed to meet each student and family where they are."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { icon: Monitor, label: "Format", value: academy.sessionInfo.format },
              { icon: Clock, label: "Duration", value: academy.sessionInfo.duration },
              { icon: MapPin, label: "Service Area", value: academy.sessionInfo.area },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-2xl border border-border bg-white p-6">
                <Icon className="mb-3 h-6 w-6 text-magenta" />
                <p className="text-xs font-semibold tracking-wider text-burnt-orange uppercase">
                  {label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 rounded-xl border border-border bg-white p-5 text-sm leading-relaxed text-muted">
            <strong className="text-magenta-dark">Payment:</strong> {academy.paymentInfo}
          </p>
        </div>
      </section>

      <section className="bg-cream-dark/50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Enrollment"
                title="Getting Started"
                description="Our enrollment process ensures we understand your student's needs and align on goals before services begin."
                align="left"
              />
              <ul className="mt-8 space-y-2">
                {[...enrollmentForms]
                  .sort((a, b) => a.order - b.order)
                  .map((form) => (
                    <li key={form.slug}>
                      <Link
                        href={form.href}
                        className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm text-muted transition hover:border-magenta/20 hover:bg-white hover:text-magenta"
                      >
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-magenta" />
                        {form.title}
                        <ArrowRight className="ml-auto h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
              </ul>
              <Link
                href="/academy/enrollment"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-magenta px-5 py-2.5 text-sm font-semibold text-white"
              >
                Start Enrollment Wizard <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/academy/forms"
                className="mt-3 inline-flex text-sm font-medium text-magenta underline"
              >
                Or open individual forms
              </Link>
            </div>

            <div>
              <SectionHeading
                eyebrow="Policies"
                title="Program Guidelines"
                align="left"
              />
              <ul className="mt-8 space-y-4">
                {academy.policies.map((policy) => (
                  <li
                    key={policy}
                    className="flex gap-3 rounded-xl border border-border bg-white p-4 text-sm leading-relaxed text-muted"
                  >
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-burnt-orange" />
                    {policy}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="FAQ"
            title="Common Questions"
            description="Find answers to frequently asked questions about our educational support services."
          />

          <div className="mt-10">
            <FAQAccordion items={academy.faqs} />
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-magenta-dark">
            Enroll Your Student Today
          </h2>
          <p className="mt-4 text-muted">
            Contact us to begin the enrollment process and learn how we can support your
            student&apos;s growth and independence.
          </p>
          <Link
            href="/academy/enrollment"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-magenta to-burnt-orange px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
          >
            Enroll Your Student <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
