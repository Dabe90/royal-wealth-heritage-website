"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-20 sm:px-6">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl font-bold text-magenta-dark">Something went wrong</h1>
        <p className="mt-4 text-muted">
          We encountered an unexpected error. Please try again or contact us if the problem
          persists.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-magenta px-6 py-3 text-sm font-semibold text-white"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-full border border-magenta/30 px-6 py-3 text-sm font-semibold text-magenta"
          >
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
}
