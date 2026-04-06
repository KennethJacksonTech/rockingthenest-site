"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.delete("_hp");
    try {
      const res = await fetch("https://formspree.io/f/mvzvdeao", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) { setStatus("success"); form.reset(); }
      else { setStatus("error"); }
    } catch { setStatus("error"); }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" name="_hp" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="block font-body font-semibold text-sm text-text-primary mb-1">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 rounded-md border border-border-light bg-white font-body text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-body font-semibold text-sm text-text-primary mb-1">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          className="w-full px-4 py-3 rounded-md border border-border-light bg-white font-body text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block font-body font-semibold text-sm text-text-primary mb-1">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full px-4 py-3 rounded-md border border-border-light bg-white font-body text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary"
        />
      </div>

      <div>
        <label htmlFor="message" className="block font-body font-semibold text-sm text-text-primary mb-1">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 rounded-md border border-border-light bg-white font-body text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary resize-y"
        />
      </div>

      {status === "success" && (
        <p className="text-accent-secondary font-body font-semibold">
          Thank you! We&apos;ll be in touch soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-accent-primary font-body font-semibold">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-accent-primary text-text-light font-heading font-semibold text-[0.9375rem] uppercase tracking-[0.05em] rounded-md px-7 py-3 hover:brightness-90 hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
