"use client";

/**
 * GonzoForm — universal form renderer for SiteKit.
 *
 * Fetches its schema from Gonzo via getForm() and submits to the Gonzo public
 * form-submission endpoint. Styled with SiteKit's CSS-variable design tokens
 * so it picks up whatever palette the site's design tokens resolve to.
 *
 * Usage (in a Server Component):
 *
 *   import { getForm, GONZO_API_BASE, GONZO_ORG_SLUG } from "@/lib/gonzo";
 *   import GonzoForm from "@/components/gonzo-form";
 *
 *   const form = await getForm("contact");
 *   return form ? (
 *     <GonzoForm form={form} orgSlug={GONZO_ORG_SLUG} apiBase={GONZO_API_BASE} />
 *   ) : <p>Form unavailable.</p>;
 */

import { useState } from "react";
import type { GonzoFormDef, GonzoFormField } from "@/lib/gonzo";

const INPUT =
  "mt-1.5 w-full rounded-md border border-[var(--color-form-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] outline-none focus:border-[var(--color-form-border-focus)]";
const LABEL =
  "block text-xs font-semibold text-[var(--color-text-secondary)]";
const ERROR_TEXT =
  "mt-1 text-[13px] font-semibold text-[var(--color-error)]";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "sending" | "success" | "error";

interface Props {
  form: GonzoFormDef;
  orgSlug: string;
  apiBase: string;
}

type FieldValue = string | boolean | string[];

function isSubmittable(type: string): boolean {
  return !["heading", "paragraph", "file"].includes(type);
}

function initialValues(fields: GonzoFormField[]): Record<string, FieldValue> {
  const vals: Record<string, FieldValue> = {};
  for (const f of fields) {
    if (!isSubmittable(f.type)) continue;
    if (f.type === "checkbox") vals[f.slug] = false;
    else if (f.type === "checkbox_group") vals[f.slug] = [];
    else vals[f.slug] = f.default_value ?? "";
  }
  return vals;
}

function validate(
  fields: GonzoFormField[],
  values: Record<string, FieldValue>,
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const f of fields) {
    if (!isSubmittable(f.type)) continue;
    const v = values[f.slug];
    const isEmpty =
      v === undefined ||
      v === null ||
      (typeof v === "string" && v.trim() === "") ||
      (typeof v === "boolean" && !v && f.type === "checkbox") ||
      (Array.isArray(v) && v.length === 0);
    if (f.required && isEmpty) {
      errors[f.slug] = `${f.label} is required`;
      continue;
    }
    if (isEmpty) continue;
    if (f.type === "email" && typeof v === "string" && !EMAIL_RE.test(v.trim())) {
      errors[f.slug] = "Please enter a valid email address";
    }
  }
  return errors;
}

export default function GonzoForm({ form, orgSlug, apiBase }: Props) {
  const [values, setValues] = useState<Record<string, FieldValue>>(() =>
    initialValues(form.fields),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function setValue(slug: string, v: FieldValue) {
    setValues((prev) => ({ ...prev, [slug]: v }));
    if (errors[slug]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[slug];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const hp =
      (e.currentTarget.elements.namedItem("_hp") as HTMLInputElement | null)
        ?.value || "";
    if (hp.trim() !== "") return;

    const nextErrors = validate(form.fields, values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus("sending");
    setServerError(null);

    const submitData: Record<string, FieldValue> = {};
    for (const f of form.fields) {
      if (!isSubmittable(f.type)) continue;
      submitData[f.slug] = values[f.slug];
    }

    try {
      const res = await fetch(
        `${apiBase}/api/public/forms/${orgSlug}/${form.slug}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: submitData, _hp: "" }),
        },
      );
      const result = await res.json();
      if (result?.success) {
        setStatus("success");
        if (form.settings.success_redirect) {
          window.location.href = form.settings.success_redirect;
        }
        return;
      }
      if (result?.errors && typeof result.errors === "object") {
        setErrors(result.errors);
      }
      setServerError(
        typeof result?.error === "string"
          ? result.error
          : "Submission failed. Please try again.",
      );
      setStatus("error");
    } catch {
      setServerError("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-8 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center">
        <h3 className="text-lg font-bold text-[var(--color-text)]">
          {form.settings.success_message ||
            "Thank you! Your submission has been received."}
        </h3>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
      {form.settings.honeypot && (
        <input
          type="text"
          name="_hp"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {form.fields.map((field) => (
          <div
            key={field.id}
            className={
              field.width === "half"
                ? "sm:col-span-1"
                : "sm:col-span-2"
            }
          >
            <FieldRenderer
              field={field}
              value={values[field.slug]}
              error={errors[field.slug]}
              onChange={setValue}
            />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-md bg-[var(--color-primary)] px-6 py-2.5 text-sm font-semibold text-[var(--color-bg)] transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "sending"
            ? "Sending..."
            : form.settings.submit_label || "Submit"}
        </button>
        {status === "error" && serverError && (
          <p className={ERROR_TEXT}>{serverError}</p>
        )}
      </div>
    </form>
  );
}

function FieldRenderer({
  field,
  value,
  error,
  onChange,
}: {
  field: GonzoFormField;
  value: FieldValue | undefined;
  error?: string;
  onChange: (slug: string, v: FieldValue) => void;
}) {
  if (field.type === "heading") {
    return (
      <h3 className="mt-2 text-lg font-bold text-[var(--color-text)]">
        {field.default_value || field.label}
      </h3>
    );
  }
  if (field.type === "paragraph") {
    return (
      <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {field.default_value || field.label}
      </p>
    );
  }
  if (field.type === "hidden") {
    return (
      <input
        type="hidden"
        name={field.slug}
        value={typeof value === "string" ? value : ""}
      />
    );
  }

  const commonInputProps = {
    id: field.slug,
    name: field.slug,
    placeholder: field.placeholder || "",
    required: field.required,
    "aria-invalid": error ? true : undefined,
  };

  const labelNode = (
    <label htmlFor={field.slug} className={LABEL}>
      {field.label}
      {field.required && " *"}
    </label>
  );

  const errorNode = error ? <p className={ERROR_TEXT}>{error}</p> : null;
  const strVal = typeof value === "string" ? value : "";

  switch (field.type) {
    case "textarea":
      return (
        <div>
          {labelNode}
          <textarea
            {...commonInputProps}
            rows={4}
            value={strVal}
            onChange={(e) => onChange(field.slug, e.target.value)}
            className={INPUT}
          />
          {errorNode}
        </div>
      );
    case "select":
      return (
        <div>
          {labelNode}
          <select
            {...commonInputProps}
            value={strVal}
            onChange={(e) => onChange(field.slug, e.target.value)}
            className={INPUT}
          >
            <option value="">{field.placeholder || "— Select —"}</option>
            {(field.options || []).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errorNode}
        </div>
      );
    case "radio":
      return (
        <div>
          <div className={LABEL}>
            {field.label}
            {field.required && " *"}
          </div>
          <div className="mt-2 space-y-2">
            {(field.options || []).map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2 text-sm text-[var(--color-text)]"
              >
                <input
                  type="radio"
                  name={field.slug}
                  value={opt}
                  checked={strVal === opt}
                  onChange={(e) => onChange(field.slug, e.target.value)}
                  className="accent-[var(--color-primary)]"
                />
                {opt}
              </label>
            ))}
          </div>
          {errorNode}
        </div>
      );
    case "checkbox":
      return (
        <div>
          <label className="flex items-start gap-2 text-sm text-[var(--color-text)]">
            <input
              type="checkbox"
              id={field.slug}
              name={field.slug}
              checked={typeof value === "boolean" ? value : false}
              onChange={(e) => onChange(field.slug, e.target.checked)}
              className="mt-1 accent-[var(--color-primary)]"
            />
            <span>
              {field.label}
              {field.required && " *"}
            </span>
          </label>
          {errorNode}
        </div>
      );
    case "checkbox_group": {
      const arrVal = Array.isArray(value) ? value : [];
      return (
        <div>
          <div className={LABEL}>
            {field.label}
            {field.required && " *"}
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {(field.options || []).map((opt) => {
              const checked = arrVal.includes(opt);
              return (
                <label
                  key={opt}
                  className="flex items-center gap-2 text-sm text-[var(--color-text)]"
                >
                  <input
                    type="checkbox"
                    value={opt}
                    checked={checked}
                    onChange={(e) =>
                      onChange(
                        field.slug,
                        e.target.checked
                          ? [...arrVal, opt]
                          : arrVal.filter((x) => x !== opt),
                      )
                    }
                    className="accent-[var(--color-primary)]"
                  />
                  {opt}
                </label>
              );
            })}
          </div>
          {errorNode}
        </div>
      );
    }
    case "email":
    case "phone":
    case "text":
    case "number":
    case "date":
    case "time": {
      const typeMap: Record<string, string> = {
        phone: "tel",
        email: "email",
        number: "number",
        date: "date",
        time: "time",
        text: "text",
      };
      return (
        <div>
          {labelNode}
          <input
            {...commonInputProps}
            type={typeMap[field.type] || "text"}
            value={strVal}
            onChange={(e) => onChange(field.slug, e.target.value)}
            className={INPUT}
          />
          {errorNode}
        </div>
      );
    }
    default:
      return null;
  }
}
