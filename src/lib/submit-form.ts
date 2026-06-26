import { siteUrl } from "./content";

export type FormSubmitResult = "success" | "pending_activation" | "error";

async function submitToFormSubmit(
  payload: Record<string, string>,
  formPath: string
): Promise<FormSubmitResult> {
  try {
    const response = await fetch("/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        _url: `${siteUrl}${formPath}`,
      }),
    });

    const data = (await response.json()) as {
      ok?: boolean;
      result?: FormSubmitResult;
    };

    if (data.result === "pending_activation") return "pending_activation";
    if (data.ok) return "success";
    return "error";
  } catch {
    return "error";
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
}): Promise<FormSubmitResult> {
  return submitToFormSubmit(
    {
      _subject: payload.subject,
      name: payload.name,
      email: payload.email,
      phone: payload.phone || "Not provided",
      service: payload.service,
      message: payload.message,
    },
    "/contact"
  );
}

export async function submitEnrollmentForm(
  formTitle: string,
  replyTo: string,
  formType: string,
  data: Record<string, string | boolean>,
  emailBody: string,
  formPath = "/academy/enrollment"
): Promise<FormSubmitResult> {
  const studentName =
    typeof data.studentName === "string" ? data.studentName : "Enrollment";

  return submitToFormSubmit(
    {
      _subject: `${formTitle} — ${studentName}`,
      _replyto: replyTo || "",
      formType,
      formattedBody: emailBody,
      ...stringifyFields(data),
    },
    formPath
  );
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
