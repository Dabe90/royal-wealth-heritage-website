import Image from "next/image";
import { Quote } from "lucide-react";
import { founder, company } from "@/lib/content";

interface FounderProfileProps {
  variant?: "about" | "academy" | "compact";
  showBio?: boolean;
}

export function FounderProfile({ variant = "about", showBio = true }: FounderProfileProps) {
  const title = founder.title;

  return (
    <aside className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
      <div className="relative aspect-[4/5] w-full bg-cream-dark sm:aspect-[3/4]">
        <Image
          src={founder.image}
          alt={founder.imageAlt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 400px"
          priority={variant === "about"}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-magenta-dark/80 to-transparent" />
      </div>
      <div className="p-6 sm:p-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-burnt-orange uppercase">
          Meet Our Founder
        </p>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-magenta-dark">
          {founder.name}
        </h2>
        <p className="mt-1 text-sm font-medium text-magenta">{title}</p>
        {showBio && (
          <>
            <p className="mt-4 text-sm leading-relaxed text-muted">{founder.summary}</p>
            {variant === "academy" && (
              <blockquote className="mt-4 border-l-2 border-gold pl-3 text-sm italic text-magenta-dark">
                &ldquo;{founder.motto}&rdquo;
              </blockquote>
            )}
            {variant === "about" && (
              <p className="mt-3 text-xs text-muted">
                Fluent in {founder.languages}
              </p>
            )}
          </>
        )}
      </div>
    </aside>
  );
}

export function FounderBioFull() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        {founder.bioParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
      </div>

      <blockquote className="rounded-2xl border border-gold/30 bg-gradient-to-r from-magenta/5 to-burnt-orange/5 p-6 sm:p-8">
        <Quote className="mb-3 h-8 w-8 text-gold" aria-hidden="true" />
        <p className="font-serif text-xl font-medium italic text-magenta-dark sm:text-2xl">
          &ldquo;{founder.motto}&rdquo;
        </p>
        <footer className="mt-3 text-sm font-medium text-burnt-orange">
          — {founder.name}, {company.shortName}
        </footer>
      </blockquote>

      <div>
        <h3 className="font-serif text-xl font-semibold text-magenta-dark">
          Credentials & Areas of Expertise
        </h3>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {founder.credentials.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 rounded-lg border border-border bg-white px-4 py-3 text-sm text-muted"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-magenta" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
