"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Send, CheckCircle2, Loader2, Printer } from "lucide-react";
import {
  EnrollmentFormDefinition,
  formatFormSubmission,
} from "@/lib/forms-registry";
import { submitEnrollmentForm, validateEmail } from "@/lib/submit-form";
import { company, educationalDisclaimer } from "@/lib/content";

interface EnrollmentFormRendererProps {
  definition: EnrollmentFormDefinition;
}

export function EnrollmentFormRenderer({ definition }: EnrollmentFormRendererProps) {
  const initialState: Record<string, string | boolean> = {
    agreementAccepted: false,
  };

  for (const field of definition.fields ?? []) {
    initialState[field.id] = field.type === "checkbox" ? false : "";
  }

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function setField(id: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  function validate(): boolean {
    const next: Record<string, string> = {};

    for (const field of definition.fields ?? []) {
      const value = form[field.id];
      if (field.required) {
        if (field.type === "checkbox" && !value) {
          next[field.id] = "This field is required.";
        } else if (typeof value === "string" && !value.trim()) {
          next[field.id] = `Please complete ${field.label.toLowerCase()}.`;
        }
      }
      if (field.type === "email" && typeof value === "string" && value && !validateEmail(value)) {
        next[field.id] = "Please enter a valid email address.";
      }
    }

    if (definition.kind === "agreement" && !form.agreementAccepted) {
      next.agreementAccepted = "You must agree before submitting.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    const emailBody = formatFormSubmission(definition, form);
    const replyTo =
      (typeof form.parentEmail === "string" && form.parentEmail) ||
      (typeof form.parentGuardian === "string" ? "" : company.email);

    const result = await submitEnrollmentForm(
      definition.title,
      typeof form.parentEmail === "string" ? form.parentEmail : "",
      definition.title,
      form,
      emailBody
    );

    setStatus(result === "success" ? "success" : "error");
    if (result === "success") setForm(initialState);
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
        <h3 className="mt-4 font-serif text-2xl font-semibold text-green-900">Submitted</h3>
        <p className="mt-2 text-green-800">
          {definition.successMessage ??
            `Thank you! Your ${definition.shortTitle} has been received.`}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/academy/forms" className="text-sm font-medium text-green-700 underline">
            View all enrollment forms
          </Link>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-sm font-medium text-green-700 underline"
          >
            Submit another
          </button>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <h3 className="font-serif text-2xl font-semibold text-red-900">Could Not Submit</h3>
        <p className="mt-2 text-red-800">
          Something went wrong sending your form. Please try again or email us at{" "}
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
          Edit and resubmit
        </button>
      </div>
    );
  }

  return (
    <div className="print-form">
      <div className="mb-6 flex justify-end print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-magenta"
        >
          <Printer className="h-4 w-4" />
          Print Form
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <p className="rounded-lg border border-magenta/15 bg-magenta/5 px-4 py-3 text-xs leading-relaxed text-muted print:border-gray-300 print:bg-white">
          {educationalDisclaimer}
        </p>

        {definition.legalSections?.map((section) => (
          <section
            key={section.title}
            className="rounded-xl border border-border bg-cream-dark/30 p-5 print:border-gray-300"
          >
            <h3 className="font-serif text-lg font-semibold text-magenta-dark">{section.title}</h3>
            <div className="mt-3 space-y-3">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}

        <fieldset className="space-y-5">
          <legend className="font-serif text-lg font-semibold text-magenta-dark">
            {definition.kind === "agreement" ? "Signature Information" : "Form Details"}
          </legend>

          <div className="grid gap-5 sm:grid-cols-2">
            {definition.fields?.map((field) => (
              <div
                key={field.id}
                className={field.fullWidth ? "sm:col-span-2" : undefined}
              >
                {field.type === "checkbox" ? (
                  <label className="flex items-start gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={!!form[field.id]}
                      onChange={(e) => setField(field.id, e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-border text-magenta"
                      aria-invalid={!!errors[field.id]}
                    />
                    <span>{field.label}</span>
                  </label>
                ) : field.type === "select" ? (
                  <>
                    <label htmlFor={field.id} className="mb-1.5 block text-sm font-medium">
                      {field.label}
                      {field.required && <span className="text-magenta"> *</span>}
                    </label>
                    <select
                      id={field.id}
                      value={String(form[field.id] ?? "")}
                      onChange={(e) => setField(field.id, e.target.value)}
                      className="field-input"
                      aria-invalid={!!errors[field.id]}
                    >
                      <option value="">Select...</option>
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </>
                ) : field.type === "textarea" ? (
                  <>
                    <label htmlFor={field.id} className="mb-1.5 block text-sm font-medium">
                      {field.label}
                      {field.required && <span className="text-magenta"> *</span>}
                    </label>
                    <textarea
                      id={field.id}
                      rows={4}
                      value={String(form[field.id] ?? "")}
                      onChange={(e) => setField(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className="field-input resize-y"
                      aria-invalid={!!errors[field.id]}
                    />
                  </>
                ) : (
                  <>
                    <label htmlFor={field.id} className="mb-1.5 block text-sm font-medium">
                      {field.label}
                      {field.required && <span className="text-magenta"> *</span>}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      value={String(form[field.id] ?? "")}
                      onChange={(e) => setField(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className="field-input"
                      aria-invalid={!!errors[field.id]}
                    />
                  </>
                )}
                {field.helpText && (
                  <p className="mt-1 text-xs text-muted">{field.helpText}</p>
                )}
                {errors[field.id] && (
                  <p className="field-error">{errors[field.id]}</p>
                )}
              </div>
            ))}
          </div>
        </fieldset>

        {definition.agreementLabel && (
          <div className="rounded-xl border border-magenta/20 bg-white p-4">
            <label className="flex items-start gap-3 text-sm leading-relaxed">
              <input
                type="checkbox"
                checked={!!form.agreementAccepted}
                onChange={(e) => setField("agreementAccepted", e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-border text-magenta"
                aria-invalid={!!errors.agreementAccepted}
              />
              <span>{definition.agreementLabel}</span>
            </label>
            {errors.agreementAccepted && (
              <p className="field-error mt-2">{errors.agreementAccepted}</p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-magenta to-burnt-orange px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-magenta/25 transition hover:opacity-90 disabled:opacity-60 print:hidden sm:w-auto"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {definition.submitLabel ?? "Submit Form"}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
