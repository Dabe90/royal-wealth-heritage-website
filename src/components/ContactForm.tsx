"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle2, Mail } from "lucide-react";
import { company } from "@/lib/content";

type ServiceType = "financial" | "academy" | "general";

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: ServiceType;
  message: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "general",
  message: "",
};

const serviceLabels: Record<ServiceType, string> = {
  financial: "Financial Services",
  academy: "Life Skills Academy",
  general: "General Inquiry",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) next.message = "Please tell us how we can help.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const subject = encodeURIComponent(
      `RWH Inquiry — ${serviceLabels[form.service]}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || "Not provided"}\nService Interest: ${form.service}\n\nMessage:\n${form.message}`
    );

    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
        <h3 className="mt-4 font-serif text-2xl font-semibold text-green-900">
          Opening Your Email App
        </h3>
        <p className="mt-2 text-green-800">
          Your message has been prepared. Please send the email from your mail app to complete
          your inquiry.
        </p>
        <p className="mt-4 text-sm text-green-700">
          If your email app didn&apos;t open, contact us directly:
        </p>
        <a
          href={`mailto:${company.email}`}
          className="mt-2 inline-flex items-center gap-2 font-semibold text-green-900 underline"
        >
          <Mail className="h-4 w-4" />
          {company.email}
        </a>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setForm(initialState);
          }}
          className="mt-6 block w-full text-sm font-medium text-green-700 underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <p className="rounded-lg border border-border bg-cream-dark/50 px-4 py-3 text-xs text-muted">
        Submitting this form will open your email app with your message pre-filled. You&apos;ll
        need to press send in your mail app to complete the inquiry.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
            Full Name <span className="text-magenta">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="field-input"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-xs text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            Email Address <span className="text-magenta">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="field-input"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-red-600">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="field-input"
          />
        </div>

        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-foreground">
            I&apos;m interested in
          </label>
          <select
            id="service"
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value as ServiceType })}
            className="field-input"
            aria-describedby="service-help"
          >
            <option value="general">General Inquiry</option>
            <option value="financial">Financial Services</option>
            <option value="academy">Life Skills & Learning Academy</option>
          </select>
          <p id="service-help" className="mt-1 text-xs text-muted">
            Helps us route your inquiry to the right team.
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
          Message <span className="text-magenta">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us about your goals or questions..."
          className="field-input resize-y"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="btn-touch inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-magenta to-burnt-orange px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-magenta/25 transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta sm:w-auto"
      >
        <Send className="h-4 w-4" />
        Send Message
      </button>
    </form>
  );
}
