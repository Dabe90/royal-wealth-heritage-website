import { company } from "./content";

const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${company.email}`;

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

    const data = (await response.json()) as {
      success?: string | boolean;
      message?: string;
    };

    if (data.success === false || data.success === "false") return false;
    return response.ok;
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
): Promise<"success" | "error"> {
  const studentName =
    typeof data.studentName === "string" ? data.studentName : "Enrollment";

  const ok = await submitToFormSubmit({
    _subject: `${formTitle} — ${studentName}`,
    _replyto: replyTo || company.email,
    formType,
    formattedBody: emailBody,
    ...stringifyFields(data),
  });

  return ok ? "success" : "error";
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
