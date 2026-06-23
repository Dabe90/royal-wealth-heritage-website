import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, GraduationCap, Landmark } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/SectionHeading";
import { company, financialMission, founder } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Royal Wealth Heritage LLC, founder Helena Puati, and our mission to empower growth through financial consulting and educational support.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Royal Wealth Heritage"
        title="Building Legacies of Stability & Independence"
        description={company.tagline}
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Our Story"
              title="More Than Money — A Heritage of Wisdom"
              align="left"
            />
            <p className="mt-6 leading-relaxed text-muted">{financialMission.description}</p>
            <p className="mt-4 leading-relaxed text-muted">{financialMission.commitment}</p>
            <p className="mt-4 leading-relaxed text-muted">{company.serviceArea}.</p>
          </div>

          <aside className="rounded-3xl border border-border bg-white p-8 shadow-sm">
            <div className="mb-4 inline-flex rounded-xl bg-magenta/10 p-3 text-magenta">
              <Award className="h-6 w-6" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-magenta-dark">{founder.name}</h2>
            <p className="mt-1 text-sm font-medium text-burnt-orange">Founder, {company.name}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{founder.bio}</p>
          </aside>
        </div>
      </section>

      <section className="bg-white/60 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Our Divisions"
            title="Two Services, One Commitment to You"
            description="Royal Wealth Heritage LLC operates two focused divisions — each designed to help individuals and families build confidence, independence, and lasting opportunity."
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <article className="rounded-3xl border border-border bg-white p-8">
              <Landmark className="mb-4 h-8 w-8 text-magenta" />
              <h3 className="font-serif text-xl font-semibold text-magenta-dark">
                Financial Consulting
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Personalized guidance for individuals, families, and small businesses seeking
                financial stability and legacy building.
              </p>
              <Link
                href="/financial-services"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-magenta"
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </article>

            <article className="rounded-3xl border border-border bg-white p-8">
              <GraduationCap className="mb-4 h-8 w-8 text-burnt-orange" />
              <h3 className="font-serif text-xl font-semibold text-magenta-dark">
                RWH Life Skills & Learning Academy
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Structured educational support for students with autism, communication challenges,
                and diverse learning needs — led by {founder.name}.
              </p>
              <Link
                href="/academy"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange"
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
