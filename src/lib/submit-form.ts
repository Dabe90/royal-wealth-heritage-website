import { company } from "./content";

const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${encodeURIComponent(company.email)}`;

async function submitToFormSubmit(
  payload: Record<string, string>
): Promise<boolean> {
  try {
    const response = await fetch(FORMSUBMIT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _template: "table",
        ...payload,
      }),
    });

    if (!response.ok) return false;

    const data = (await response.json()) as { success?: string | boolean };
    return data.success === true || data.success === "true";
  } catch {
    return false;
  }
}

function stringifyFields(
  data: Record<string, string | boolean>
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(data)) {
    out[key] =
      typeof value === "boolean" ? (value ? "Yes" : "No") : String(value ?? "");
  }
  return out;
}

export async function submitContactForm(payload: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  subject: string;
}): Promise<"success" | "error"> {
  const ok = await submitToFormSubmit({
    _subject: payload.subject,
    name: payload.name,
    email: payload.email,
    phone: payload.phone || "Not provided",
    service: payload.service,
    message: payload.message,
  });

  return ok ? "success" : "error";
}

export async function submitEnrollmentForm(
  formTitle: string,
  replyTo: string,
  formType: string,
  data: Record<string, string | boolean>,
  emailBody: string
): Promise<"success" | "mailto"> {
  const studentName =
    typeof data.studentName === "string" ? data.studentName : "Enrollment";

  const ok = await submitToFormSubmit({
    _subject: `${formTitle} — ${studentName}`,
    _replyto: replyTo || company.email,
    formType,
    formattedBody: emailBody,
    ...stringifyFields(data),
  });

  if (ok) return "success";

  const body = encodeURIComponent(emailBody);
  const subject = encodeURIComponent(`${formTitle} — ${studentName}`);
  window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
  return "mailto";
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
