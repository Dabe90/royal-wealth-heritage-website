import { NextResponse } from "next/server";
import { company } from "@/lib/content";

export async function POST(request: Request) {
  let payload: Record<string, string>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const formUrl = payload._url || `https://royalwealthheritage.com/contact`;

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${company.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: formUrl,
        Origin: new URL(formUrl).origin,
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

    const message = String(data.message ?? "").toLowerCase();

    if (message.includes("activation") || message.includes("activate")) {
      return NextResponse.json({
        ok: true,
        result: "pending_activation",
        message: data.message,
      });
    }

    if (data.success === false || data.success === "false") {
      return NextResponse.json(
        { ok: false, message: data.message ?? "FormSubmit rejected the submission." },
        { status: 400 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, message: data.message ?? "FormSubmit request failed." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, result: "success" });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Could not reach FormSubmit." },
      { status: 502 }
    );
  }
}
