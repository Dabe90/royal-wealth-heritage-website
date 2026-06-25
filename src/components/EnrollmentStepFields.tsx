"use client";

import {
  EnrollmentFormDefinition,
  agreementKey,
  fieldKey,
  getWizardFieldValue,
} from "@/lib/forms-registry";

interface EnrollmentStepFieldsProps {
  definition: EnrollmentFormDefinition;
  data: Record<string, string | boolean>;
  errors: Record<string, string>;
  onChange: (key: string, value: string | boolean) => void;
  readOnlyShared?: boolean;
}

const sharedFieldIds = new Set([
  "studentName",
  "dateOfBirth",
  "parentGuardian",
  "parentEmail",
  "parentPhone",
]);

export function EnrollmentStepFields({
  definition,
  data,
  errors,
  onChange,
  readOnlyShared = false,
}: EnrollmentStepFieldsProps) {
  return (
    <div className="space-y-5">
      {definition.legalSections?.map((section) => (
        <section
          key={section.title}
          className="rounded-xl border border-border bg-cream-dark/30 p-5"
        >
          <h3 className="font-serif text-lg font-semibold text-magenta-dark">{section.title}</h3>
          <div className="mt-3 space-y-3">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="text-sm leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}

      <div className="grid gap-5 sm:grid-cols-2">
        {definition.fields?.map((field) => {
          const key = fieldKey(definition.slug, field.id);
          const isSharedReadOnly =
            readOnlyShared &&
            definition.slug !== "parent-intake" &&
            sharedFieldIds.has(field.id);
          const stringValue = isSharedReadOnly
            ? getWizardFieldValue(data, definition.slug, field.id)
            : field.type === "checkbox"
              ? ""
              : String(data[key] ?? getWizardFieldValue(data, definition.slug, field.id) ?? "");

          return (
            <div key={key} className={field.fullWidth ? "sm:col-span-2" : undefined}>
              {isSharedReadOnly ? (
                <>
                  <p className="mb-1 text-xs font-semibold tracking-wide text-burnt-orange uppercase">
                    From intake (Step 1)
                  </p>
                  <label className="mb-1.5 block text-sm font-medium">{field.label}</label>
                  <div className="field-input bg-cream-dark/50 text-muted">{stringValue || "—"}</div>
                </>
              ) : field.type === "checkbox" ? (
                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={!!data[key]}
                    onChange={(e) => onChange(key, e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-border text-magenta"
                    aria-invalid={!!errors[key]}
                  />
                  <span>{field.label}</span>
                </label>
              ) : field.type === "select" ? (
                <>
                  <label htmlFor={key} className="mb-1.5 block text-sm font-medium">
                    {field.label}
                    {field.required && <span className="text-magenta"> *</span>}
                  </label>
                  <select
                    id={key}
                    value={stringValue}
                    onChange={(e) => onChange(key, e.target.value)}
                    className="field-input"
                    aria-invalid={!!errors[key]}
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
                  <label htmlFor={key} className="mb-1.5 block text-sm font-medium">
                    {field.label}
                    {field.required && <span className="text-magenta"> *</span>}
                  </label>
                  <textarea
                    id={key}
                    rows={4}
                    value={stringValue}
                    onChange={(e) => onChange(key, e.target.value)}
                    placeholder={field.placeholder}
                    className="field-input resize-y"
                    aria-invalid={!!errors[key]}
                  />
                </>
              ) : (
                <>
                  <label htmlFor={key} className="mb-1.5 block text-sm font-medium">
                    {field.label}
                    {field.required && <span className="text-magenta"> *</span>}
                  </label>
                  <input
                    id={key}
                    type={field.type}
                    value={stringValue}
                    onChange={(e) => onChange(key, e.target.value)}
                    placeholder={field.placeholder}
                    className="field-input"
                    aria-invalid={!!errors[key]}
                  />
                </>
              )}
              {field.helpText && !isSharedReadOnly && (
                <p className="mt-1 text-xs text-muted">{field.helpText}</p>
              )}
              {errors[key] && <p className="field-error">{errors[key]}</p>}
            </div>
          );
        })}
      </div>

      {definition.agreementLabel && (
        <div className="rounded-xl border border-magenta/20 bg-white p-4 sm:col-span-2">
          <label className="flex items-start gap-3 text-sm leading-relaxed">
            <input
              type="checkbox"
              checked={!!data[agreementKey(definition.slug)]}
              onChange={(e) => onChange(agreementKey(definition.slug), e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-border text-magenta"
              aria-invalid={!!errors[agreementKey(definition.slug)]}
            />
            <span>{definition.agreementLabel}</span>
          </label>
          {errors[agreementKey(definition.slug)] && (
            <p className="field-error mt-2">{errors[agreementKey(definition.slug)]}</p>
          )}
        </div>
      )}
    </div>
  );
}
