"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Send, CheckCircle2, Mail, Loader2 } from "lucide-react";
import {
  formatIntakeForEmail,
  ParentIntakeFormData,
} from "@/lib/enrollment";
import { company, educationalDisclaimer } from "@/lib/content";

const initialState: ParentIntakeFormData = {
  studentName: "",
  dateOfBirth: "",
  parentGuardian: "",
  parentEmail: "",
  parentPhone: "",
  communicationMethod: "",
  strengths: "",
  goals: "",
  medicalConcerns: "",
};

const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ENROLLMENT_ID;

export function ParentIntakeForm() {
  const [form, setForm] = useState<ParentIntakeFormData>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof ParentIntakeFormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "mailto">("idle");

  function validate(): boolean {
    const next: Partial<Record<keyof ParentIntakeFormData, string>> = {};

    if (!form.studentName.trim()) next.studentName = "Please enter the student's name.";
    if (!form.dateOfBirth.trim()) next.dateOfBirth = "Please enter the student's date of birth.";
    if (!form.parentGuardian.trim()) next.parentGuardian = "Please enter a parent or guardian name.";
    if (!form.parentEmail.trim()) {
      next.parentEmail = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.parentEmail)) {
      next.parentEmail = "Please enter a valid email address.";
    }
    if (!form.communicationMethod.trim()) {
      next.communicationMethod = "Please describe the student's communication method.";
    }
    if (!form.strengths.trim()) next.strengths = "Please share the student's strengths.";
    if (!form.goals.trim()) next.goals = "Please describe your goals for services.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    if (formspreeId) {
      try {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: `Parent Intake — ${form.studentName}`,
            _replyto: form.parentEmail,
            ...form,
            formType: "Parent Intake Form",
          }),
        });

        if (response.ok) {
          setStatus("success");
          setForm(initialState);
          return;
        }
      } catch {
        // Fall through to mailto
      }
    }

    const body = encodeURIComponent(formatIntakeForEmail(form));
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(`Parent Intake — ${form.studentName}`)}&body=${body}`;
    setStatus("mailto");
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
        <h3 className="mt-4 font-serif text-2xl font-semibold text-green-900">
          Intake Form Submitted
        </h3>
        <p className="mt-2 text-green-800">
          Thank you! We&apos;ve received your parent intake form and will contact you within 1–2
          business days to discuss next steps and remaining enrollment documents.
        </p>
        <Link
          href="/academy"
          className="mt-6 inline-block text-sm font-medium text-green-700 underline"
        >
          Back to Academy
        </Link>
      </div>
    );
  }

  if (status === "mailto") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
        <h3 className="mt-4 font-serif text-2xl font-semibold text-green-900">
          Opening Your Email App
        </h3>
        <p className="mt-2 text-green-800">
          Your intake form has been prepared. Please send the email from your mail app to complete
          registration.
        </p>
        <a
          href={`mailto:${company.email}`}
          className="mt-4 inline-flex items-center gap-2 font-semibold text-green-900 underline"
        >
          <Mail className="h-4 w-4" />
          {company.email}
        </a>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 block w-full text-sm font-medium text-green-700 underline"
        >
          Edit and resubmit
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <p className="rounded-lg border border-magenta/15 bg-magenta/5 px-4 py-3 text-xs leading-relaxed text-muted">
        {educationalDisclaimer} Information submitted here is used only for enrollment and
        educational planning purposes.
      </p>

      {!formspreeId && (
        <p className="rounded-lg border border-border bg-cream-dark/50 px-4 py-3 text-xs text-muted">
          Submitting will open your email app with your responses pre-filled. Press send in your
          mail app to complete registration.
        </p>
      )}

      <fieldset className="space-y-5">
        <legend className="font-serif text-lg font-semibold text-magenta-dark">
          Student Information
        </legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="studentName" className="mb-1.5 block text-sm font-medium">
              Student Name <span className="text-magenta">*</span>
            </label>
            <input
              id="studentName"
              type="text"
              value={form.studentName}
              onChange={(e) => setForm({ ...form, studentName: e.target.value })}
              className="field-input"
              aria-invalid={!!errors.studentName}
              aria-describedby={errors.studentName ? "studentName-error" : undefined}
            />
            {errors.studentName && (
              <p id="studentName-error" className="field-error">{errors.studentName}</p>
            )}
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="mb-1.5 block text-sm font-medium">
              Date of Birth <span className="text-magenta">*</span>
            </label>
            <input
              id="dateOfBirth"
              type="date"
              value={form.dateOfBirth}
              onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
              className="field-input"
              aria-invalid={!!errors.dateOfBirth}
              aria-describedby={errors.dateOfBirth ? "dateOfBirth-error" : undefined}
            />
            {errors.dateOfBirth && (
              <p id="dateOfBirth-error" className="field-error">{errors.dateOfBirth}</p>
            )}
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="font-serif text-lg font-semibold text-magenta-dark">
          Parent / Guardian
        </legend>

        <div>
          <label htmlFor="parentGuardian" className="mb-1.5 block text-sm font-medium">
            Parent/Guardian Name <span className="text-magenta">*</span>
          </label>
          <input
            id="parentGuardian"
            type="text"
            autoComplete="name"
            value={form.parentGuardian}
            onChange={(e) => setForm({ ...form, parentGuardian: e.target.value })}
            className="field-input"
            aria-invalid={!!errors.parentGuardian}
            aria-describedby={errors.parentGuardian ? "parentGuardian-error" : undefined}
          />
          {errors.parentGuardian && (
            <p id="parentGuardian-error" className="field-error">{errors.parentGuardian}</p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="parentEmail" className="mb-1.5 block text-sm font-medium">
              Email Address <span className="text-magenta">*</span>
            </label>
            <input
              id="parentEmail"
              type="email"
              autoComplete="email"
              value={form.parentEmail}
              onChange={(e) => setForm({ ...form, parentEmail: e.target.value })}
              className="field-input"
              aria-invalid={!!errors.parentEmail}
              aria-describedby={errors.parentEmail ? "parentEmail-error" : undefined}
            />
            {errors.parentEmail && (
              <p id="parentEmail-error" className="field-error">{errors.parentEmail}</p>
            )}
          </div>

          <div>
            <label htmlFor="parentPhone" className="mb-1.5 block text-sm font-medium">
              Phone Number
            </label>
            <input
              id="parentPhone"
              type="tel"
              autoComplete="tel"
              placeholder="(832) 555-1234"
              value={form.parentPhone}
              onChange={(e) => setForm({ ...form, parentPhone: e.target.value })}
              className="field-input"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="font-serif text-lg font-semibold text-magenta-dark">
          Learning Profile
        </legend>

        <div>
          <label htmlFor="communicationMethod" className="mb-1.5 block text-sm font-medium">
            Communication Method <span className="text-magenta">*</span>
          </label>
          <textarea
            id="communicationMethod"
            rows={3}
            placeholder="How does your student communicate? (e.g., verbal, AAC device, sign language, gestures)"
            value={form.communicationMethod}
            onChange={(e) => setForm({ ...form, communicationMethod: e.target.value })}
            className="field-input resize-y"
            aria-invalid={!!errors.communicationMethod}
            aria-describedby={errors.communicationMethod ? "communicationMethod-error" : undefined}
          />
          {errors.communicationMethod && (
            <p id="communicationMethod-error" className="field-error">{errors.communicationMethod}</p>
          )}
        </div>

        <div>
          <label htmlFor="strengths" className="mb-1.5 block text-sm font-medium">
            Strengths <span className="text-magenta">*</span>
          </label>
          <textarea
            id="strengths"
            rows={3}
            placeholder="What are your student's strengths and interests?"
            value={form.strengths}
            onChange={(e) => setForm({ ...form, strengths: e.target.value })}
            className="field-input resize-y"
            aria-invalid={!!errors.strengths}
            aria-describedby={errors.strengths ? "strengths-error" : undefined}
          />
          {errors.strengths && (
            <p id="strengths-error" className="field-error">{errors.strengths}</p>
          )}
        </div>

        <div>
          <label htmlFor="goals" className="mb-1.5 block text-sm font-medium">
            Goals <span className="text-magenta">*</span>
          </label>
          <textarea
            id="goals"
            rows={3}
            placeholder="What would you like your student to achieve through our services?"
            value={form.goals}
            onChange={(e) => setForm({ ...form, goals: e.target.value })}
            className="field-input resize-y"
            aria-invalid={!!errors.goals}
            aria-describedby={errors.goals ? "goals-error" : undefined}
          />
          {errors.goals && (
            <p id="goals-error" className="field-error">{errors.goals}</p>
          )}
        </div>

        <div>
          <label htmlFor="medicalConcerns" className="mb-1.5 block text-sm font-medium">
            Medical Concerns
          </label>
          <textarea
            id="medicalConcerns"
            rows={3}
            placeholder="Any medical concerns we should be aware of? (Optional — we do not provide medical services)"
            value={form.medicalConcerns}
            onChange={(e) => setForm({ ...form, medicalConcerns: e.target.value })}
            className="field-input resize-y"
          />
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-magenta to-burnt-orange px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-magenta/25 transition hover:opacity-90 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Submit Parent Intake Form
          </>
        )}
      </button>
    </form>
  );
}
