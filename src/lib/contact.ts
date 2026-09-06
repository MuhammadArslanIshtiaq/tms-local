export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
};

export const CONTACT_EMAIL = "hello@tmsdigitalhub.com";

/**
 * Sends the enquiry to the server, which emails it to CONTACT_EMAIL.
 *
 * Posts to `/api/contact` by default; set `NEXT_PUBLIC_CONTACT_ENDPOINT` to
 * use a third-party handler (Formspree and similar) instead. Surfaces the
 * server's message so the form can explain what went wrong.
 */
export const submitContact = async (payload: ContactPayload): Promise<void> => {
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response
      .json()
      .then((body: { error?: string }) => body?.error)
      .catch(() => undefined);

    throw new Error(detail ?? `Request failed with status ${response.status}`);
  }
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
