export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
};

export const CONTACT_EMAIL = "hr@tmsdigitalhub.com";

/**
 * Posts to `NEXT_PUBLIC_CONTACT_ENDPOINT` when one is configured (e.g. a
 * Formspree or Resend handler). Without an endpoint it falls back to opening
 * the visitor's mail client with the enquiry pre-filled, so the form still
 * does something useful out of the box.
 */
export const submitContact = async (payload: ContactPayload): Promise<void> => {
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

  if (endpoint) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return;
  }

  const subject = payload.service
    ? `New enquiry — ${payload.service}`
    : `New enquiry from ${payload.name}`;

  const body = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.company ? `Company: ${payload.company}` : null,
    payload.service ? `Interested in: ${payload.service}` : null,
    "",
    payload.message,
  ]
    .filter(Boolean)
    .join("\n");

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
};

export const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

export const validateContact = (payload: ContactPayload): FieldErrors => {
  const errors: FieldErrors = {};

  if (payload.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!isValidEmail(payload.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (payload.message.trim().length < 10) {
    errors.message = "Tell us a little more — at least 10 characters.";
  }

  return errors;
};
