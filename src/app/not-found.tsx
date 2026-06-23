import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-20 sm:px-6">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-burnt-orange uppercase">404</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-magenta-dark">Page Not Found</h1>
        <p className="mt-4 text-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-magenta to-burnt-orange px-6 py-3 text-sm font-semibold text-white"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-magenta/30 px-6 py-3 text-sm font-semibold text-magenta"
          >
            <ArrowLeft className="h-4 w-4" />
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
