import { company } from "./content";

const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ENROLLMENT_ID;

export async function submitEnrollmentForm(
  formTitle: string,
  replyTo: string,
  formType: string,
  data: Record<string, string | boolean>,
  emailBody: string
): Promise<"success" | "mailto"> {
  if (formspreeId) {
    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `${formTitle} — ${data.studentName ?? "Enrollment"}`,
          _replyto: replyTo || company.email,
          formType,
          ...data,
          formattedBody: emailBody,
        }),
      });

      if (response.ok) return "success";
    } catch {
      // fall through
    }
  }

  const body = encodeURIComponent(emailBody);
  const subject = encodeURIComponent(`${formTitle} — ${data.studentName ?? "Submission"}`);
  window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
  return "mailto";
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
