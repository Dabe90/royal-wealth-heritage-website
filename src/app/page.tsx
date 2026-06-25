import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  GraduationCap,
  Landmark,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import {
  academy,
  academyMissionStatement,
  company,
  financialMission,
  financialServices,
} from "@/lib/content";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-magenta/10 to-transparent blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-magenta/20 bg-white/80 px-3 py-1.5 text-xs font-semibold tracking-wider text-magenta uppercase backdrop-blur sm:mb-4 sm:px-4">
              <Sparkles className="h-3.5 w-3.5" />
              Texas Registered Business
            </p>
            <h1 className="font-serif text-3xl font-bold leading-tight text-magenta-dark sm:text-5xl lg:text-6xl">
              Empowering Growth.{" "}
              <span className="gradient-text">Building Independence.</span>{" "}
              Creating Opportunity.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:mt-6 sm:text-lg">
              Royal Wealth Heritage LLC delivers trusted financial guidance and specialized
              educational support through our Life Skills & Learning Academy.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <Link
                href="/financial-services"
                className="btn-touch inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-magenta to-burnt-orange px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-magenta/25 transition hover:opacity-90 sm:w-auto"
              >
                Financial Services
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/academy"
                className="btn-touch inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-magenta/30 bg-white px-7 py-3.5 text-sm font-semibold text-magenta transition hover:border-magenta hover:bg-magenta/5 sm:w-auto"
              >
                Life Skills Academy
                <GraduationCap className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xs sm:max-w-md lg:max-w-none">
            <div className="relative mx-auto aspect-square max-w-[280px] sm:max-w-sm sm:animate-float">
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-magenta/20 to-burnt-orange/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-gold/30 bg-white p-4 shadow-2xl shadow-magenta/15 sm:rounded-3xl sm:p-6">
                <Image
                  src="/images/logo.png"
                  alt={`${company.name} — shield logo with crown`}
                  width={480}
                  height={480}
                  className="mx-auto h-auto w-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission strip */}
      <section className="border-y border-border bg-white/60 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-serif text-xl font-medium leading-relaxed text-magenta-dark sm:text-2xl lg:text-3xl">
            &ldquo;{academyMissionStatement}&rdquo;
          </p>
        </div>
      </section>

      {/* Two divisions */}
      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Our Divisions"
            title="Two Paths, One Mission of Empowerment"
            description="Whether you're building financial stability or supporting a student's growth, Royal Wealth Heritage LLC is here with integrity, clarity, and personalized care."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <article className="group relative overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:shadow-xl sm:rounded-3xl sm:p-8">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-magenta/5 transition group-hover:bg-magenta/10" />
              <div className="relative">
                <div className="mb-5 inline-flex rounded-2xl bg-magenta/10 p-4 text-magenta">
                  <Landmark className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-magenta-dark">
                  Financial Consulting
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{financialMission.description}</p>
                <Link
                  href="/financial-services"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-magenta transition hover:gap-3"
                >
                  Explore Financial Services <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:shadow-xl sm:rounded-3xl sm:p-8">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-burnt-orange/5 transition group-hover:bg-burnt-orange/10" />
              <div className="relative">
                <div className="mb-5 inline-flex rounded-2xl bg-burnt-orange/10 p-4 text-burnt-orange">
                  <GraduationCap className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-magenta-dark">
                  {academy.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-burnt-orange">{academy.subtitle}</p>
                <p className="mt-3 leading-relaxed text-muted">{academy.tagline}</p>
                <Link
                  href="/academy"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange transition hover:gap-3"
                >
                  Explore the Academy <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gradient-to-br from-magenta-dark to-magenta px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Why Choose RWH"
            title="Integrity. Access. Lasting Impact."
            description="We believe wealth is wisdom, discipline, and stewardship — and that every individual deserves the tools to thrive."
            light
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Target, label: "Personalized Approach", desc: "Solutions tailored to your unique goals and circumstances." },
              { icon: TrendingUp, label: "Practical Guidance", desc: "Clear, actionable strategies you can apply immediately." },
              { icon: Users, label: "Family-Centered", desc: "Supporting individuals, families, and small businesses alike." },
              { icon: Sparkles, label: "Legacy Building", desc: "Creating heritage that spans generations." },
            ].map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <Icon className="mb-4 h-8 w-8 text-gold-light" />
                <h3 className="font-serif text-lg font-semibold text-white">{label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Financial Services"
            title="Guidance Rooted in Integrity"
            description={financialMission.commitment}
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {financialServices.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Academy preview + disclaimer */}
      <section className="bg-cream-dark/50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Life Skills Academy"
            title="Individualized Instruction for Real Growth"
            description={academy.mission}
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {academy.services.slice(0, 4).map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-6">
            <Link
              href="/academy"
              className="btn-touch inline-flex w-full items-center justify-center gap-2 rounded-full bg-magenta px-6 py-3 text-sm font-semibold text-white transition hover:bg-magenta-dark sm:w-auto"
            >
              View All Academy Services <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="w-full max-w-3xl">
              <DisclaimerBanner />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-magenta via-magenta-light to-burnt-orange p-6 text-center shadow-2xl shadow-magenta/20 sm:rounded-3xl sm:p-10 lg:p-14">
          <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Ready to Take the Next Step?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            Whether you&apos;re seeking financial guidance or educational support for your student,
            we&apos;re here to help you move forward with confidence.
          </p>
          <Link
            href="/contact"
            className="btn-touch mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-magenta shadow-lg transition hover:bg-cream sm:mt-8 sm:w-auto"
          >
            Contact Us Today <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
