/**
 * Gonzo CMS API — forms subset.
 * Adapted from itK-SiteKit/src/lib/gonzo.ts.
 */

const API_URL = process.env.GONZO_API_URL || "https://gonzo.kennethjackson.tech";
const ORG_SLUG = process.env.GONZO_ORG_SLUG || "";

export const GONZO_API_BASE = API_URL;
export const GONZO_ORG_SLUG = ORG_SLUG;

export interface GonzoFormField {
  id: string;
  type: string;
  label: string;
  slug: string;
  placeholder?: string;
  required: boolean;
  width: "full" | "half";
  default_value?: string;
  options?: string[];
}

export interface GonzoFormDef {
  name: string;
  slug: string;
  fields: GonzoFormField[];
  settings: {
    submit_label?: string;
    success_message?: string;
    honeypot?: boolean;
    success_redirect?: string;
  };
}

export async function getForm(formSlug: string): Promise<GonzoFormDef | null> {
  try {
    const res = await fetch(
      `${API_URL}/api/public/forms/${ORG_SLUG}/${formSlug}`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { form?: GonzoFormDef };
    return data.form ?? null;
  } catch {
    return null;
  }
}
