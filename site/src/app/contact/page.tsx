import type { Metadata } from "next";
import { getForm, GONZO_API_BASE, GONZO_ORG_SLUG } from "@/lib/gonzo";
import GonzoForm from "@/components/gonzo-form";

export const metadata: Metadata = {
  title: "Contact | Rocking the Nest",
  description: "Get in touch with Rocking the Nest.",
};

export default async function ContactPage() {
  const form = await getForm("contact");

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
          {form ? (
            <GonzoForm
              form={form}
              apiBase={GONZO_API_BASE}
              orgSlug={GONZO_ORG_SLUG}
            />
          ) : (
            <p className="font-body text-text-primary leading-relaxed">
              Our online form is temporarily unavailable. Please email{" "}
              <a href="mailto:maggie@rockingthenest.com" className="text-accent-primary hover:underline">
                maggie@rockingthenest.com
              </a>{" "}or{" "}
              <a href="mailto:brad@rockingthenest.com" className="text-accent-primary hover:underline">
                brad@rockingthenest.com
              </a>
              {" "}and we&rsquo;ll get back to you.
            </p>
          )}

          {/* Info Card */}
          <div className="bg-surface-secondary rounded-lg p-8">
            <h2 className="font-heading font-semibold text-[1.5rem] leading-[1.4] text-text-primary mb-6">
              Say Hello
            </h2>
            <div className="space-y-3 mb-8">
              <p className="font-body text-text-primary">
                <span className="font-semibold">Maggie:</span>{" "}
                <a href="mailto:maggie@rockingthenest.com" className="text-accent-primary hover:underline">
                  maggie@rockingthenest.com
                </a>
              </p>
              <p className="font-body text-text-primary">
                <span className="font-semibold">Brad:</span>{" "}
                <a href="mailto:brad@rockingthenest.com" className="text-accent-primary hover:underline">
                  brad@rockingthenest.com
                </a>
              </p>
            </div>
            <img src="/images/IMG_4751.jpg" alt="Maggie and Brad" className="rounded-lg w-full object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}
