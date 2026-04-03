"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot check
    if (formData.get("_hp")) return;

    setStatus("sending");

    try {
      const res = await fetch("https://forms.kennethjackson.tech/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site_id: "rockingthenest",
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone") || "",
          message: formData.get("message"),
        }),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-surface-inverse py-16 px-4 text-center">
        <h1 className="font-heading font-bold text-[2.5rem] leading-[1.2] tracking-[-0.01em] text-text-light mb-3">
          Get In Touch
        </h1>
        <p className="text-text-light/80 font-body text-lg">
          We&apos;d love to hear from you
        </p>
      </section>

      {/* Contact Section */}
      <section className="bg-surface-primary py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <input
                type="text"
                name="_hp"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block font-body font-semibold text-sm text-text-primary mb-1"
              >
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
              <label
                htmlFor="email"
                className="block font-body font-semibold text-sm text-text-primary mb-1"
              >
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
              <label
                htmlFor="phone"
                className="block font-body font-semibold text-sm text-text-primary mb-1"
              >
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
              <label
                htmlFor="message"
                className="block font-body font-semibold text-sm text-text-primary mb-1"
              >
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

            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-accent-primary text-text-light font-heading font-semibold text-[0.9375rem] uppercase tracking-[0.05em] rounded-md px-7 py-3 hover:brightness-90 hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

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
          </form>

          {/* Info Card */}
          <div className="bg-surface-secondary rounded-lg p-8">
            <h2 className="font-heading font-semibold text-[1.5rem] leading-[1.4] text-text-primary mb-6">
              Say Hello
            </h2>
            <div className="space-y-3 mb-8">
              <p className="font-body text-text-primary">
                <span className="font-semibold">Maggie:</span>{" "}
                <a
                  href="mailto:maggie@rockingthenest.com"
                  className="text-accent-primary hover:underline"
                >
                  maggie@rockingthenest.com
                </a>
              </p>
              <p className="font-body text-text-primary">
                <span className="font-semibold">Brad:</span>{" "}
                <a
                  href="mailto:brad@rockingthenest.com"
                  className="text-accent-primary hover:underline"
                >
                  brad@rockingthenest.com
                </a>
              </p>
            </div>
            <img
              src="/images/IMG_4751.jpg"
              alt="Maggie and Brad"
              className="rounded-lg w-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
