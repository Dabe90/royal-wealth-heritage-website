import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { PageHero } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Royal Wealth Heritage LLC for financial consulting or RWH Life Skills & Learning Academy enrollment.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="We'd Love to Hear From You"
        description="Reach out for financial consulting, academy enrollment, or general inquiries. We'll respond as soon as possible."
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-semibold text-magenta-dark">
              Contact Information
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Select your area of interest in the form and we&apos;ll route your inquiry to the
              right team member.
            </p>

            <ul className="mt-8 space-y-6">
              <li className="flex gap-4">
                <div className="rounded-xl bg-magenta/10 p-3 text-magenta">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Location</p>
                  <p className="text-sm text-muted">{company.location}</p>
                  <p className="text-xs text-muted">Texas Registered Business</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="rounded-xl bg-magenta/10 p-3 text-magenta">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Email</p>
                  <a
                    href={`mailto:${company.email}`}
                    className="text-sm text-magenta transition hover:underline"
                  >
                    {company.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="rounded-xl bg-magenta/10 p-3 text-magenta">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Phone</p>
                  <a
                    href={`tel:${company.phone.replace(/\D/g, "")}`}
                    className="text-sm text-magenta transition hover:underline"
                  >
                    {company.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="rounded-xl bg-magenta/10 p-3 text-magenta">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Business Hours</p>
                  <p className="text-sm text-muted">{company.businessHours}</p>
                  <p className="mt-1 text-xs text-muted">{company.responseTime}</p>
                </div>
              </li>
            </ul>

            <div className="mt-10">
              <DisclaimerBanner variant="compact" />
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8 lg:col-span-3">
            <h2 className="font-serif text-2xl font-semibold text-magenta-dark">
              Send a Message
            </h2>
            <p className="mt-2 text-sm text-muted">
              Fill out the form below and your default email app will open with your message
              ready to send.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
