"use client";

import { useActionState, type InputHTMLAttributes } from "react";
import { sendMessage, type ContactState, type Field } from "@/app/actions";

const input =
  "mt-2 block w-full border border-[#ddd] bg-white px-4 py-3 text-base outline-none transition-colors placeholder:text-muted/70 focus:border-hero-orange aria-[invalid=true]:border-red-600";

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendMessage, { status: "idle" });

  if (state.status === "success")
    return (
      <div role="status" className="bg-[#e8e8e8] p-8">
        <p className="font-display text-xl font-semibold uppercase tracking-tight">Message sent.</p>
        <p className="mt-2 text-muted">Thanks — I&apos;ll reply to your email soon.</p>
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
        <label htmlFor={name} className="font-mono text-xs uppercase tracking-widest text-muted">
          {label}
        </label>
        {name === "message" ? (
          <textarea {...shared} rows={5} minLength={10} maxLength={5000} className={`${input} resize-y`} />
        ) : (
          <input {...shared} {...props} />
        )}
        {error && (
          <p id={`${name}-error`} className="mt-1.5 text-sm text-red-600">
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
      <div aria-hidden className="absolute left-[-9999px]">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex cursor-pointer overflow-hidden disabled:opacity-60"
        >
          <span className="flex items-center bg-[#e8e8e8] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] transition-colors group-hover:bg-[#dedede] group-disabled:group-hover:bg-[#e8e8e8]">
            {pending ? "Sending…" : "Send message"}
          </span>
          <span className="grid w-12 place-items-center bg-hero-orange text-white">
            {pending ? (
              <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <span aria-hidden>→</span>
            )}
          </span>
        </button>
        <p aria-live="polite" className="text-sm text-red-600">
          {state.message}
        </p>
      </div>
    </form>
  );
}
