import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow && (
        <p
          className={`mb-3 text-sm font-semibold tracking-[0.2em] uppercase ${
            light ? "text-gold-light" : "text-burnt-orange"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-serif text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-magenta-dark"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            light ? "text-white/80" : "text-muted"
          }`}
        >
          {description}
        </p>
      )}
      <div className={`gold-line mt-6 w-24 ${align === "center" ? "mx-auto" : ""}`} />
    </div>
  );
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-magenta-dark via-magenta to-burnt-orange px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-gold blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-96 w-96 rounded-full bg-burnt-orange-light blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-4xl text-center">
        {eyebrow && (
          <p className="mb-4 text-sm font-semibold tracking-[0.25em] text-gold-light uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
