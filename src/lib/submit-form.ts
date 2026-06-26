import { company } from "./content";

export type FormSubmitResult = "success" | "error" | "not_configured";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

async function submitToWeb3Forms(
  payload: Record<string, string>
): Promise<FormSubmitResult> {
  if (!accessKey) return "not_configured";

  try {
    const response = await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        botcheck: "",
        from_name: "Royal Wealth Heritage Website",
        ...payload,
      }),
    });

    const data = (await response.json()) as { success?: boolean; message?: string };
    return data.success ? "success" : "error";
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
  return submitToWeb3Forms({
    subject: payload.subject,
    name: payload.name,
    email: payload.email,
    phone: payload.phone || "Not provided",
    service: payload.service,
    message: payload.message,
  });
}

export async function submitEnrollmentForm(
  formTitle: string,
  replyTo: string,
  formType: string,
  data: Record<string, string | boolean>,
  emailBody: string
): Promise<FormSubmitResult> {
  const studentName =
    typeof data.studentName === "string" ? data.studentName : "Enrollment";

  return submitToWeb3Forms({
    subject: `${formTitle} — ${studentName}`,
    replyto: replyTo || company.email,
    formType,
    formattedBody: emailBody,
    message: emailBody,
    ...stringifyFields(data),
  });
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
