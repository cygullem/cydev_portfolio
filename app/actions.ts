"use server";

export type Field = "name" | "email" | "message";
export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<Field, string>>;
  fields?: Partial<Record<Field, string>>;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function sendMessage(_: ContactState, data: FormData): Promise<ContactState> {
  const get = (k: string) => String(data.get(k) ?? "").trim();
  if (get("company")) return { status: "success" };

  const fields = { name: get("name").replace(/[\r\n\t]+/g, " "), email: get("email"), message: get("message") };
  const errors: ContactState["errors"] = {};
  if (!fields.name || fields.name.length > 100) errors.name = "Enter your name (up to 100 characters).";
  if (fields.email.length > 254 || !EMAIL.test(fields.email)) errors.email = "Enter a valid email address.";
  if (fields.message.length < 10 || fields.message.length > 5000) errors.message = "Write a message between 10 and 5,000 characters.";
  if (Object.keys(errors).length) return { status: "error", errors, fields };

  const { RESEND_API_KEY: key, CONTACT_TO_EMAIL: to, CONTACT_FROM_EMAIL: from = "Portfolio <onboarding@resend.dev>" } = process.env;
  const failed: ContactState = { status: "error", message: "Your message wasn't sent. Try again, or email me directly.", fields };
  if (!key || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set");
    return failed;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: fields.email,
        subject: `Portfolio message from ${fields.name}`,
        text: `From: ${fields.name} <${fields.email}>\n\n${fields.message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
  } catch (e) {
    console.error("Contact form:", e);
    return failed;
  }

  return { status: "success" };
}
