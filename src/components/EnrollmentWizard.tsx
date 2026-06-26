"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { EnrollmentStepFields } from "@/components/EnrollmentStepFields";
import {
  formatCompleteEnrollment,
  getWizardFieldValue,
  sortedEnrollmentForms,
  validateStepFields,
} from "@/lib/forms-registry";
import { submitEnrollmentForm } from "@/lib/submit-form";
import { company, educationalDisclaimer } from "@/lib/content";

export function EnrollmentWizard() {
  const totalSteps = sortedEnrollmentForms.length + 1; // + review
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string | boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const isReview = step === sortedEnrollmentForms.length;
  const currentForm = isReview ? null : sortedEnrollmentForms[step];
  const progress = Math.round(((step + 1) / totalSteps) * 100);

  function setField(key: string, value: string | boolean) {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function goNext() {
    if (!currentForm) return;
    const stepErrors = validateStepFields(currentForm, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    setStatus("submitting");
    const emailBody = formatCompleteEnrollment(data);
    const replyTo = getWizardFieldValue(data, "parent-intake", "parentEmail");

    const result = await submitEnrollmentForm(
      "Complete Enrollment Packet",
      replyTo,
      "Complete Enrollment Packet",
      { ...data, formattedBody: emailBody },
      emailBody
    );

    setStatus(result === "success" ? "success" : "error");
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
        <h3 className="mt-4 font-serif text-2xl font-semibold text-green-900">
          Enrollment Submitted
        </h3>
        <p className="mt-2 text-green-800">
          Thank you! We received your complete enrollment packet and will contact you within 1–2
          business days.
        </p>
        <Link href="/academy" className="mt-6 inline-block text-sm font-medium text-green-700 underline">
          Back to Academy
        </Link>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <h3 className="font-serif text-2xl font-semibold text-red-900">
          Could Not Submit
        </h3>
        <p className="mt-2 text-red-800">
          Something went wrong sending your enrollment. Please try again or email us at{" "}
          <a href={`mailto:${company.email}`} className="font-semibold underline">
            {company.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-red-700 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress */}
      <div>
        <div className="mb-2 flex items-center justify-between gap-2 text-sm">
          <span className="min-w-0 font-medium text-magenta-dark">
            {isReview ? (
              "Review & Submit"
            ) : (
              <>
                <span className="sm:hidden">{currentForm?.shortTitle}</span>
                <span className="hidden sm:inline">
                  Step {step + 1} of {sortedEnrollmentForms.length}
                </span>
              </>
            )}
          </span>
          <span className="shrink-0 text-muted">{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-cream-dark">
          <div
            className="h-full rounded-full bg-gradient-to-r from-magenta to-burnt-orange transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3 hidden gap-1 sm:flex">
          {sortedEnrollmentForms.map((form, i) => (
            <button
              key={form.slug}
              type="button"
              onClick={() => i < step && setStep(i)}
              disabled={i > step}
              className={`flex-1 truncate rounded-lg px-2 py-1.5 text-xs font-medium transition ${
                i === step
                  ? "bg-magenta text-white"
                  : i < step
                    ? "bg-magenta/15 text-magenta hover:bg-magenta/25"
                    : "bg-cream-dark text-muted"
              }`}
              title={form.shortTitle}
            >
              {form.shortTitle}
            </button>
          ))}
          <div
            className={`flex-1 truncate rounded-lg px-2 py-1.5 text-center text-xs font-medium ${
              isReview ? "bg-burnt-orange text-white" : "bg-cream-dark text-muted"
            }`}
          >
            Review
          </div>
        </div>
      </div>

      <p className="rounded-lg border border-magenta/15 bg-magenta/5 px-4 py-3 text-xs leading-relaxed text-muted">
        {educationalDisclaimer}
      </p>

      {isReview ? (
        <div className="space-y-6">
          <h2 className="font-serif text-2xl font-semibold text-magenta-dark">
            Review Your Enrollment
          </h2>
          <p className="text-sm text-muted">
            Please confirm all information below is correct before submitting your complete
            enrollment packet.
          </p>
          {sortedEnrollmentForms.map((form) => (
            <section key={form.slug} className="rounded-xl border border-border bg-cream-dark/20 p-5">
              <h3 className="font-serif text-lg font-semibold text-magenta-dark">{form.title}</h3>
              <dl className="mt-3 space-y-2">
                {form.fields?.map((field) => {
                  const val = getWizardFieldValue(data, form.slug, field.id);
                  if (!val) return null;
                  return (
                    <div key={field.id} className="text-sm">
                      <dt className="font-medium text-foreground">{field.label}</dt>
                      <dd className="text-muted">{val}</dd>
                    </div>
                  );
                })}
                {form.kind === "agreement" && (
                  <p className="text-sm font-medium text-green-700">✓ Agreement accepted</p>
                )}
              </dl>
              <button
                type="button"
                onClick={() => setStep(form.order - 1)}
                className="mt-3 text-xs font-semibold text-magenta underline"
              >
                Edit this section
              </button>
            </section>
          ))}
        </div>
      ) : currentForm ? (
        <div>
          <h2 className="font-serif text-xl font-semibold text-magenta-dark sm:text-2xl">
            {currentForm.title}
          </h2>
          <p className="mt-2 text-sm text-muted">{currentForm.description}</p>
          <div className="mt-6">
            <EnrollmentStepFields
              definition={currentForm}
              data={data}
              errors={errors}
              onChange={setField}
              readOnlyShared
            />
          </div>
        </div>
      ) : null}

      {/* Navigation — sticky on mobile for long forms */}
      <div className="sticky bottom-0 z-10 -mx-6 flex flex-col-reverse gap-3 border-t border-border bg-white/95 px-6 py-4 backdrop-blur-sm safe-bottom sm:static sm:mx-0 sm:flex-row sm:justify-between sm:bg-transparent sm:px-0 sm:py-0 sm:pt-6 sm:backdrop-blur-none">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className="btn-touch inline-flex w-full items-center justify-center gap-2 rounded-full border border-magenta/30 px-6 py-3 text-sm font-semibold text-magenta disabled:opacity-40 sm:w-auto"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        {isReview ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={status === "submitting"}
            className="btn-touch inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-magenta to-burnt-orange px-6 py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-60 sm:w-auto sm:px-8"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <span className="sm:hidden">Submit Enrollment</span>
                <span className="hidden sm:inline">Submit Complete Enrollment</span>
                <CheckCircle2 className="h-4 w-4" />
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            className="btn-touch inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-magenta to-burnt-orange px-6 py-3 text-sm font-semibold text-white shadow-lg sm:w-auto sm:px-8"
          >
            Continue
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>

      <p className="text-center text-xs text-muted">
        Prefer separate forms?{" "}
        <Link href="/academy/forms" className="font-medium text-magenta underline">
          Open individual documents
        </Link>
      </p>
    </div>
  );
}
