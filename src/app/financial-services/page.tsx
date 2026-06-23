import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { financialMission, financialServices, financialDisclaimer } from "@/lib/content";

export const metadata: Metadata = {
  title: "Financial Services",
  description:
    "Personal financial guidance, family legacy planning, and small business consulting from Royal Wealth Heritage LLC — a Texas-registered business.",
};

export default function FinancialServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Royal Wealth Heritage LLC"
        title="Financial Consulting & Legacy Building"
        description="Clear guidance and practical solutions that empower clients to rise above financial limitations and build enduring wealth."
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Our Story"
                title={financialMission.title}
                align="left"
              />
              <p className="mt-6 leading-relaxed text-muted">{financialMission.description}</p>
              <p className="mt-4 leading-relaxed text-muted">{financialMission.commitment}</p>
            </div>

            <div className="rounded-3xl border border-border bg-white p-8 shadow-sm">
              <h3 className="font-serif text-xl font-semibold text-magenta-dark">
                What We Believe
              </h3>
              <ul className="mt-6 space-y-4">
                {[
                  "Wealth is more than money — it is wisdom, discipline, and stewardship.",
                  "Every family deserves accessible, personalized financial guidance.",
                  "Integrity is the foundation of every client relationship.",
                  "Legacy building creates opportunity for generations to come.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-burnt-orange" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/60 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Services"
            title="How We Help You Succeed"
            description="From personal finance to small business consulting, our services are designed to meet you where you are."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {financialServices.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 rounded-2xl border border-magenta/15 bg-magenta/5 p-5 text-left text-sm leading-relaxed text-muted">
            <strong className="text-magenta-dark">Disclaimer:</strong> {financialDisclaimer}
          </div>
          <h2 className="font-serif text-3xl font-semibold text-magenta-dark">
            Start Your Financial Journey
          </h2>
          <p className="mt-4 text-muted">
            Schedule a consultation to discuss your goals and discover how Royal Wealth Heritage
            LLC can support your path to financial confidence.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-magenta to-burnt-orange px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
          >
            Request a Consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
