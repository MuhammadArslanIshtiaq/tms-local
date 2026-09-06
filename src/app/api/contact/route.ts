import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_EMAIL, validateContact } from "@/lib/contact";

/**
 * Receives contact form submissions and emails them to CONTACT_EMAIL.
 *
 * Requires RESEND_API_KEY. `CONTACT_FROM_EMAIL` must be an address on a
 * domain verified in Resend; `CONTACT_TO_EMAIL` overrides the recipient.
 */
export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Email delivery is not configured on the server." },
      { status: 500 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, company, service, message } = (payload ?? {}) as Record<
    string,
    unknown
  >;

  const enquiry = {
    name: typeof name === "string" ? name.trim() : "",
    email: typeof email === "string" ? email.trim() : "",
    company: typeof company === "string" ? company.trim() : "",
    service: typeof service === "string" ? service.trim() : "",
    message: typeof message === "string" ? message.trim() : "",
  };

  /* Re-validate on the server — client checks are a convenience, not a guard. */
  const errors = validateContact(enquiry);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: Object.values(errors)[0] ?? "Please check your details." },
      { status: 400 }
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || CONTACT_EMAIL;
  const from =
    process.env.CONTACT_FROM_EMAIL || "TMS Website <onboarding@resend.dev>";

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: enquiry.email,
      subject: enquiry.service
        ? `New enquiry — ${enquiry.service}`
        : `New enquiry from ${enquiry.name}`,
      text: [
        `Name: ${enquiry.name}`,
        `Email: ${enquiry.email}`,
        enquiry.company ? `Company: ${enquiry.company}` : null,
        enquiry.service ? `Interested in: ${enquiry.service}` : null,
        "",
        enquiry.message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("[contact] Resend rejected the message:", error);
      return NextResponse.json(
        { error: "We couldn't send your message. Please email us directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (cause) {
    console.error("[contact] send failed:", cause);
    return NextResponse.json(
      { error: "We couldn't send your message. Please email us directly." },
      { status: 500 }
    );
  }
}
