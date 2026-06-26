import { academy, company, educationalDisclaimer } from "./content";

export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "date"
  | "textarea"
  | "select"
  | "checkbox";

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  fullWidth?: boolean;
  helpText?: string;
}

export interface LegalSection {
  title: string;
  paragraphs: string[];
}

export interface EnrollmentFormDefinition {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  order: number;
  href: string;
  kind: "application" | "information" | "agreement";
  fields?: FormField[];
  legalSections?: LegalSection[];
  agreementLabel?: string;
  submitLabel?: string;
  successMessage?: string;
}

export const enrollmentForms: EnrollmentFormDefinition[] = [
  {
    slug: "parent-intake",
    title: "Parent Intake Form",
    shortTitle: "Parent Intake",
    description:
      "Tell us about your student, communication style, strengths, and goals for services.",
    order: 1,
    href: "/academy/forms/parent-intake",
    kind: "application",
    submitLabel: "Submit Parent Intake Form",
    successMessage:
      "Thank you! We received your parent intake form and will contact you within 1–2 business days.",
    fields: [
      { id: "studentName", label: "Student Name", type: "text", required: true },
      { id: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
      { id: "parentGuardian", label: "Parent/Guardian Name", type: "text", required: true, fullWidth: true },
      { id: "parentEmail", label: "Parent/Guardian Email", type: "email", required: true },
      { id: "parentPhone", label: "Parent/Guardian Phone", type: "tel", required: true },
      {
        id: "communicationMethod",
        label: "Student's Communication Method",
        type: "textarea",
        required: true,
        fullWidth: true,
        placeholder: "How does your student communicate? (verbal, AAC, sign language, gestures, etc.)",
      },
      {
        id: "strengths",
        label: "Student's Strengths",
        type: "textarea",
        required: true,
        fullWidth: true,
        placeholder: "Interests, talents, and areas where your student excels",
      },
      {
        id: "goals",
        label: "Goals for Services",
        type: "textarea",
        required: true,
        fullWidth: true,
        placeholder: "What would you like your student to achieve?",
      },
      {
        id: "medicalConcerns",
        label: "Medical Concerns (if any)",
        type: "textarea",
        fullWidth: true,
        placeholder: "Optional — we provide educational support only, not medical services",
      },
    ],
  },
  {
    slug: "emergency-contact",
    title: "Emergency Contact Form",
    shortTitle: "Emergency Contact",
    description:
      "Provide emergency contacts and authorized individuals who may pick up your student.",
    order: 2,
    href: "/academy/forms/emergency-contact",
    kind: "information",
    submitLabel: "Submit Emergency Contact Form",
    fields: [
      { id: "studentName", label: "Student Name", type: "text", required: true },
      { id: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
      { id: "parentGuardian", label: "Primary Parent/Guardian", type: "text", required: true, fullWidth: true },
      { id: "parentPhone", label: "Primary Phone", type: "tel", required: true },
      { id: "parentEmail", label: "Primary Email", type: "email", required: true },
      { id: "homeAddress", label: "Home Address", type: "textarea", required: true, fullWidth: true },
      { id: "emergencyContact1Name", label: "Emergency Contact #1 — Name", type: "text", required: true },
      { id: "emergencyContact1Relation", label: "Relationship", type: "text", required: true },
      { id: "emergencyContact1Phone", label: "Phone", type: "tel", required: true },
      { id: "emergencyContact2Name", label: "Emergency Contact #2 — Name", type: "text" },
      { id: "emergencyContact2Relation", label: "Relationship", type: "text" },
      { id: "emergencyContact2Phone", label: "Phone", type: "tel" },
      {
        id: "authorizedPickup",
        label: "Authorized Pickup Persons",
        type: "textarea",
        required: true,
        fullWidth: true,
        helpText: "List full names of anyone authorized to pick up your student from sessions.",
      },
    ],
  },
  {
    slug: "medical-information",
    title: "Medical Information Form",
    shortTitle: "Medical Information",
    description:
      "Share health information needed for your student's safety during educational sessions.",
    order: 3,
    href: "/academy/forms/medical-information",
    kind: "information",
    submitLabel: "Submit Medical Information Form",
    fields: [
      { id: "studentName", label: "Student Name", type: "text", required: true },
      { id: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
      { id: "parentGuardian", label: "Parent/Guardian Name", type: "text", required: true, fullWidth: true },
      { id: "parentPhone", label: "Parent/Guardian Phone", type: "tel", required: true },
      { id: "physicianName", label: "Primary Care Physician", type: "text" },
      { id: "physicianPhone", label: "Physician Phone", type: "tel" },
      {
        id: "allergies",
        label: "Known Allergies",
        type: "textarea",
        fullWidth: true,
        placeholder: "Food, medication, environmental, or other allergies",
      },
      {
        id: "medications",
        label: "Current Medications",
        type: "textarea",
        fullWidth: true,
        placeholder: "List medications taken at home or school (we do not administer medication)",
      },
      {
        id: "medicalConditions",
        label: "Medical Conditions / Diagnoses",
        type: "textarea",
        fullWidth: true,
      },
      {
        id: "dietaryNeeds",
        label: "Special Dietary Needs",
        type: "textarea",
        fullWidth: true,
      },
      {
        id: "emergencyInstructions",
        label: "Emergency Medical Instructions",
        type: "textarea",
        fullWidth: true,
        placeholder: "Steps to take in a medical emergency, if applicable",
      },
      {
        id: "insuranceInfo",
        label: "Health Insurance (optional)",
        type: "text",
        fullWidth: true,
        helpText: "Optional — for emergency reference only",
      },
    ],
  },
  {
    slug: "liability-waiver",
    title: "Liability Waiver & Release",
    shortTitle: "Liability Waiver",
    description:
      "Acknowledge the nature of educational services and release of liability for participation.",
    order: 4,
    href: "/academy/forms/liability-waiver",
    kind: "agreement",
    submitLabel: "Sign & Submit Liability Waiver",
    agreementLabel:
      "I have read, understand, and agree to this Liability Waiver and Release on behalf of the student named below. I confirm I am the parent or legal guardian authorized to sign.",
    legalSections: [
      {
        title: "Nature of Services",
        paragraphs: [
          `${company.name} operates the RWH Life Skills & Learning Academy, which provides educational support services only. ${educationalDisclaimer}`,
          "Services may include instruction in communication, academic skills, social skills, life skills, and community readiness in home, virtual, or community-based settings as agreed upon.",
        ],
      },
      {
        title: "Assumption of Risk",
        paragraphs: [
          "I understand that participation in educational activities may involve inherent risks, including those associated with community outings, physical activities, and interaction with others. I voluntarily assume all risks associated with my student's participation in services.",
        ],
      },
      {
        title: "Release of Liability",
        paragraphs: [
          `In consideration of ${company.name} providing educational support services, I, on behalf of myself and the student, hereby release, waive, and discharge ${company.name}, its owner, employees, contractors, and agents from any and all claims, demands, or causes of action arising from ordinary educational activities, except those caused by gross negligence or willful misconduct as permitted by Texas law.`,
        ],
      },
      {
        title: "Indemnification",
        paragraphs: [
          "I agree to indemnify and hold harmless Royal Wealth Heritage LLC from any claims brought by third parties arising from the student's conduct or misrepresentation of information provided during enrollment.",
        ],
      },
      {
        title: "Governing Law",
        paragraphs: [
          "This agreement shall be governed by the laws of the State of Texas. Any disputes shall be resolved in courts located in Texas.",
        ],
      },
    ],
    fields: [
      { id: "studentName", label: "Student Name", type: "text", required: true },
      { id: "dateOfBirth", label: "Student Date of Birth", type: "date", required: true },
      { id: "parentGuardian", label: "Parent/Guardian Name (Print)", type: "text", required: true },
      { id: "parentEmail", label: "Parent/Guardian Email", type: "email", required: true },
      { id: "parentPhone", label: "Parent/Guardian Phone", type: "tel", required: true },
      { id: "signatureDate", label: "Date Signed", type: "date", required: true },
    ],
  },
  {
    slug: "photo-release",
    title: "Photo & Media Release",
    shortTitle: "Photo Release",
    description:
      "Grant or decline permission for use of your student's image in marketing and educational materials.",
    order: 5,
    href: "/academy/forms/photo-release",
    kind: "agreement",
    submitLabel: "Submit Photo Release",
    agreementLabel:
      "I confirm the media consent selection below and that I am the parent or legal guardian authorized to provide this consent.",
    legalSections: [
      {
        title: "Purpose",
        paragraphs: [
          `${company.name} may document educational activities through photographs or video recordings for program records, parent communication, and promotional purposes.`,
        ],
      },
      {
        title: "Consent Options",
        paragraphs: [
          "You may grant or decline permission below. Declining permission will not affect your student's eligibility for educational services.",
          "If granted, images may be used on the company website, social media, brochures, and other marketing materials without compensation. Names will not be published without separate written consent unless you indicate otherwise.",
          "You may revoke this consent at any time in writing by contacting the company. Revocation applies to future use only.",
        ],
      },
    ],
    fields: [
      { id: "studentName", label: "Student Name", type: "text", required: true },
      { id: "parentGuardian", label: "Parent/Guardian Name", type: "text", required: true },
      { id: "parentEmail", label: "Parent/Guardian Email", type: "email", required: true },
      {
        id: "mediaConsent",
        label: "Media Consent",
        type: "select",
        required: true,
        fullWidth: true,
        options: [
          { value: "grant", label: "I GRANT permission to use photos/videos of my student" },
          { value: "deny", label: "I DO NOT grant permission to use photos/videos of my student" },
        ],
      },
      {
        id: "nameConsent",
        label: "Name Publication (optional)",
        type: "select",
        fullWidth: true,
        options: [
          { value: "first-name-only", label: "First name only may be used with images" },
          { value: "no-name", label: "Do not use student's name with images" },
          { value: "full-name", label: "Full name may be used with images" },
        ],
      },
      { id: "signatureDate", label: "Date Signed", type: "date", required: true },
    ],
  },
  {
    slug: "attendance-agreement",
    title: "Attendance & Cancellation Agreement",
    shortTitle: "Attendance Agreement",
    description:
      "Review session attendance, cancellation, and punctuality policies.",
    order: 6,
    href: "/academy/forms/attendance-agreement",
    kind: "agreement",
    submitLabel: "Sign & Submit Attendance Agreement",
    agreementLabel:
      "I have read and agree to the Attendance and Cancellation policies of RWH Life Skills & Learning Academy.",
    legalSections: [
      {
        title: "Scheduling & Attendance",
        paragraphs: [
          "Sessions are scheduled in advance by mutual agreement. Parents/guardians are responsible for ensuring the student is prepared and available at the scheduled start time.",
          `${academy.sessionInfo.format}. ${academy.sessionInfo.duration}.`,
        ],
      },
      {
        title: "Cancellation Policy",
        paragraphs: [
          "A minimum of 24 hours' notice is required to cancel or reschedule a session. Cancellations with less than 24 hours' notice may be charged the full session fee.",
          "If the student is ill or an emergency occurs, contact us as soon as possible. Make-up sessions may be offered at our discretion but are not guaranteed.",
        ],
      },
      {
        title: "Late Arrival & No-Show",
        paragraphs: [
          "Sessions end at the scheduled time regardless of late arrival. Repeated late arrivals or no-shows may result in review of continued enrollment.",
          "If we must cancel a session, we will provide as much notice as possible and offer rescheduling at no additional charge.",
        ],
      },
      {
        title: "Educational Services Only",
        paragraphs: [educationalDisclaimer],
      },
    ],
    fields: [
      { id: "studentName", label: "Student Name", type: "text", required: true },
      { id: "parentGuardian", label: "Parent/Guardian Name", type: "text", required: true },
      { id: "parentEmail", label: "Parent/Guardian Email", type: "email", required: true },
      { id: "parentPhone", label: "Parent/Guardian Phone", type: "tel", required: true },
      { id: "signatureDate", label: "Date Signed", type: "date", required: true },
    ],
  },
  {
    slug: "payment-agreement",
    title: "Payment Agreement",
    shortTitle: "Payment Agreement",
    description:
      "Acknowledge session rates, payment terms, and billing policies.",
    order: 7,
    href: "/academy/forms/payment-agreement",
    kind: "agreement",
    submitLabel: "Sign & Submit Payment Agreement",
    agreementLabel:
      "I agree to the payment terms and rates listed below on behalf of the enrolled student.",
    legalSections: [
      {
        title: "Session Rates",
        paragraphs: academy.pricing.map(
          (p) =>
            `${p.name}: ${"pricePrefix" in p && p.pricePrefix ? `${p.pricePrefix} ` : ""}${p.price} ${p.unit}. ${p.description}`
        ),
      },
      {
        title: "Payment Terms",
        paragraphs: [
          academy.paymentInfo,
          "Invoices or payment reminders may be sent by email or text. A signed Payment Agreement is required before services begin.",
        ],
      },
      {
        title: "Missed Sessions & Refunds",
        paragraphs: [
          "Sessions cancelled with less than 24 hours' notice are billable in full.",
          "Prepaid packages or deposits, if applicable, are non-refundable except where required by law or agreed in writing.",
          "There are no refunds for partial session time due to student late arrival, early pickup, or behavioral disruption.",
        ],
      },
      {
        title: "Rate Changes",
        paragraphs: [
          "Rates may be updated with 30 days' written notice to enrolled families. Existing scheduled sessions before the effective date remain at the prior rate.",
        ],
      },
    ],
    fields: [
      { id: "studentName", label: "Student Name", type: "text", required: true },
      { id: "parentGuardian", label: "Parent/Guardian Name", type: "text", required: true },
      { id: "parentEmail", label: "Billing Email", type: "email", required: true },
      { id: "parentPhone", label: "Billing Phone", type: "tel", required: true },
      {
        id: "preferredPayment",
        label: "Preferred Payment Method",
        type: "select",
        required: true,
        options: [
          { value: "cash", label: "Cash" },
          { value: "check", label: "Check" },
          { value: "electronic", label: "Electronic payment (Zelle, Venmo, etc.)" },
          { value: "other", label: "Other (specify in notes)" },
        ],
      },
      {
        id: "paymentNotes",
        label: "Additional Notes",
        type: "textarea",
        fullWidth: true,
      },
      { id: "signatureDate", label: "Date Signed", type: "date", required: true },
    ],
  },
];

export function getFormBySlug(slug: string): EnrollmentFormDefinition | undefined {
  return enrollmentForms.find((f) => f.slug === slug);
}

export const sortedEnrollmentForms = [...enrollmentForms].sort((a, b) => a.order - b.order);

/** Namespaced key prevents field collisions across steps in the unified wizard */
export function fieldKey(formSlug: string, fieldId: string): string {
  return `${formSlug}::${fieldId}`;
}

export function agreementKey(formSlug: string): string {
  return `${formSlug}::agreementAccepted`;
}

const sharedFieldIds = [
  "studentName",
  "dateOfBirth",
  "parentGuardian",
  "parentEmail",
  "parentPhone",
];

export function getWizardFieldValue(
  data: Record<string, string | boolean>,
  formSlug: string,
  fieldId: string
): string {
  const own = data[fieldKey(formSlug, fieldId)];
  if (typeof own === "string" && own.trim()) return own;

  if (formSlug !== "parent-intake" && sharedFieldIds.includes(fieldId)) {
    const shared = data[fieldKey("parent-intake", fieldId)];
    if (typeof shared === "string") return shared;
  }

  return "";
}

export function validateStepFields(
  definition: EnrollmentFormDefinition,
  data: Record<string, string | boolean>
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const field of definition.fields ?? []) {
    const key = fieldKey(definition.slug, field.id);
    const value =
      field.type === "checkbox"
        ? data[key]
        : getWizardFieldValue(data, definition.slug, field.id);

    if (field.required) {
      if (field.type === "checkbox" && !value) {
        errors[key] = "This field is required.";
      } else if (typeof value === "string" && !value.trim()) {
        errors[key] = `Please complete ${field.label.toLowerCase()}.`;
      }
    }

    if (
      field.type === "email" &&
      typeof value === "string" &&
      value &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      errors[key] = "Please enter a valid email address.";
    }
  }

  if (definition.kind === "agreement") {
    const aKey = agreementKey(definition.slug);
    if (!data[aKey]) {
      errors[aKey] = "You must agree before continuing.";
    }
  }

  return errors;
}

export function formatFormSubmission(
  definition: EnrollmentFormDefinition,
  data: Record<string, string | boolean>,
  namespaced = false
): string {
  const lines = [
    `${definition.title.toUpperCase()} — RWH Life Skills & Learning Academy`,
    `${company.name}`,
    "",
  ];

  if (definition.legalSections) {
    lines.push("--- AGREEMENT ACKNOWLEDGED ---", "");
  }

  for (const field of definition.fields ?? []) {
    const value = namespaced
      ? getWizardFieldValue(data, definition.slug, field.id)
      : data[field.id];
    if (field.type === "checkbox") {
      const raw = namespaced ? data[fieldKey(definition.slug, field.id)] : data[field.id];
      lines.push(`${field.label}: ${raw ? "Yes" : "No"}`);
    } else if (value !== undefined && value !== "") {
      lines.push(`${field.label}: ${value}`);
    }
  }

  const agreed = namespaced
    ? data[agreementKey(definition.slug)]
    : data.agreementAccepted;
  if (agreed) {
    lines.push("", "Agreement Accepted: Yes");
  }

  lines.push("");
  return lines.join("\n");
}

export function formatCompleteEnrollment(data: Record<string, string | boolean>): string {
  const lines = [
    "COMPLETE ENROLLMENT PACKET — RWH Life Skills & Learning Academy",
    company.name,
    `Submitted: ${new Date().toLocaleString()}`,
    "=".repeat(60),
    "",
  ];

  for (const form of sortedEnrollmentForms) {
    lines.push(formatFormSubmission(form, data, true));
    lines.push("-".repeat(40), "");
  }

  return lines.join("\n");
}
