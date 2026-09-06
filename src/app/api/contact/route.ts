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

  const to = readAddress(process.env.CONTACT_TO_EMAIL) ?? CONTACT_EMAIL;
  const from =
    readAddress(process.env.CONTACT_FROM_EMAIL) ??
    "TMS Website <onboarding@resend.dev>";

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
      console.error(
        `[contact] Resend rejected the message (from=${JSON.stringify(from)} ` +
          `to=${JSON.stringify(to)}):`,
        error
      );
      return NextResponse.json(
        { error: describeSendError(error) },
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

/**
 * Normalises an address from an environment variable.
 *
 * Values pasted into a hosting dashboard often carry invisible characters
 * (zero-width spaces, BOMs, non-breaking spaces) or smart quotes from a rich
 * text source. None are valid in an address, but several are easy to miss by
 * eye and survive a naive regex, so strip them explicitly. Returns null when
 * the value is unusable so the caller falls back to a known-good default.
 */
const readAddress = (raw: string | undefined): string | null => {
  if (!raw) return null;

  let cleaned = raw
    /* Zero-width and word-joiner characters carry no meaning here. */
    .replace(/[\u200b-\u200d\u2060\ufeff]/g, "")
    /* Non-breaking and exotic spaces behave as separators. */
    .replace(/[\u00a0\u1680\u2000-\u200a\u202f\u205f\u3000]/g, " ")
    /* Smart quotes, so the stripping below catches them. */
    .replace(/[\u2018\u2019\u201a\u201b]/g, "'")
    .replace(/[\u201c\u201d\u201e\u201f]/g, '"')
    .replace(/\s+/g, " ")
    .trim();

  while (
    cleaned.length > 1 &&
    ((cleaned.startsWith('"') && cleaned.endsWith('"')) ||
      (cleaned.startsWith("'") && cleaned.endsWith("'")))
  ) {
    cleaned = cleaned.slice(1, -1).trim();
  }

  /* `<addr>` with no display name is valid RFC but Resend wants it bare. */
  const bare = cleaned.match(/^<\s*([^<>]+?)\s*>$/);
  if (bare) cleaned = bare[1];

  if (!cleaned) return null;

  /* Accept `email@example.com` and `Name <email@example.com>`. */
  const plain = /^[^\s@<>",;]+@[^\s@<>",;]+\.[A-Za-z]{2,}$/;
  const named = /^[^<>]+<\s*([^\s@<>",;]+@[^\s@<>",;]+\.[A-Za-z]{2,})\s*>$/;

  if (plain.test(cleaned)) return cleaned;

  const match = cleaned.match(named);
  if (match) {
    const name = cleaned.slice(0, cleaned.indexOf("<")).trim().replace(/^["']|["']$/g, "");
    return `${name} <${match[1]}>`;
  }

  console.error(
    `[contact] Ignoring malformed address ${JSON.stringify(raw)} ` +
      `(codepoints: ${[...raw].map((c) => c.codePointAt(0)?.toString(16)).join(" ")})`
  );
  return null;
};

/**
 * Resend's rejection reasons are configuration guidance rather than
 * sensitive data, so pass them through — otherwise a misconfigured sender
 * looks identical to an outage and can only be diagnosed from server logs.
 */
const describeSendError = (error: { name?: string; message?: string }) => {
  const message = error?.message ?? "";

  if (/not verified|domain is not/i.test(message)) {
    return "The sending domain isn't verified in Resend yet. Verify it, then check CONTACT_FROM_EMAIL uses that domain.";
  }
  if (/testing emails|own email address|verify a domain/i.test(message)) {
    return "Resend is in testing mode and will only deliver to your own account address. Verify a domain to send to anyone else.";
  }
  if (/API key|unauthorized|invalid.*key/i.test(message)) {
    return "The Resend API key was rejected. Check RESEND_API_KEY is correct and has send permission.";
  }
  if (/from|sender/i.test(message)) {
    return `Resend rejected the sender address: ${message}`;
  }

  return message
    ? `Couldn't send your message: ${message}`
    : "We couldn't send your message. Please email us directly.";
};
