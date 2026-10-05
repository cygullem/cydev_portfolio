"use client";

import { useActionState, type InputHTMLAttributes } from "react";
import { sendMessage, type ContactState, type Field } from "@/app/actions";

const input =
  "mt-2 block w-full rounded-lg border border-line bg-background px-3.5 py-2.5 text-base outline-none transition-colors placeholder:text-muted/70 focus:border-accent aria-[invalid=true]:border-red-500";

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendMessage, { status: "idle" });

  if (state.status === "success")
    return (
      <div role="status" className="rounded-xl border border-line bg-surface p-8">
        <p className="text-lg font-semibold tracking-tight">Message sent.</p>
        <p className="mt-2 text-muted">Thanks for reaching out — I&apos;ll reply to your email soon.</p>
      </div>
    );

  const field = (name: Field, label: string, props: InputHTMLAttributes<HTMLInputElement> = {}) => {
    const error = state.errors?.[name];
    const shared = {
      id: name,
      name,
      required: true,
      defaultValue: state.fields?.[name],
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `${name}-error` : undefined,
      className: input,
    };
    return (
      <div>
        <label htmlFor={name} className="text-sm font-medium">
          {label}
        </label>
        {name === "message" ? (
          <textarea {...shared} rows={5} minLength={10} maxLength={5000} className={`${input} resize-y`} />
        ) : (
          <input {...shared} {...props} />
        )}
        {error && (
          <p id={`${name}-error`} className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <form action={action} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", "Name", { autoComplete: "name", maxLength: 100 })}
        {field("email", "Email", { type: "email", autoComplete: "email", maxLength: 254 })}
      </div>
      {field("message", "Message")}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity disabled:opacity-60"
        >
          {pending && <span aria-hidden className="size-3.5 animate-spin rounded-full border-2 border-background/30 border-t-background" />}
          {pending ? "Sending…" : "Send message"}
        </button>
        <p aria-live="polite" className="text-sm text-red-600 dark:text-red-400">
          {state.message}
        </p>
      </div>
    </form>
  );
}
