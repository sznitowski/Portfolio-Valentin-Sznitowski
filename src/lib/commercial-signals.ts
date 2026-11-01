export type CommercialEventType = "solution_view" | "solution_cta_click";
export type ValidSolutionSlug = "tradesquote" | "checklist-rapido" | "cleanroute" | "truckstock-lite";

export const ALLOWED_SOLUTION_SLUGS: readonly ValidSolutionSlug[] = [
  "tradesquote",
  "checklist-rapido",
  "cleanroute",
  "truckstock-lite",
] as const;

export interface CommercialSignalPayload {
  event_type: CommercialEventType;
  solution_slug: ValidSolutionSlug;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
}

export interface CommercialSignalSummaryRow {
  solution_slug: ValidSolutionSlug;
  views: number;
  cta_clicks: number;
  ctr: number;
}

/**
 * Validates whether incoming payload conforms to strict whitelist constraints.
 */
export function validateCommercialSignal(
  raw: unknown
): { valid: true; payload: CommercialSignalPayload } | { valid: false; error: string } {
  if (!raw || typeof raw !== "object") {
    return { valid: false, error: "Invalid payload format." };
  }

  const p = raw as Record<string, unknown>;

  const event_type = String(p.event_type || "").trim();
  if (event_type !== "solution_view" && event_type !== "solution_cta_click") {
    return { valid: false, error: "Invalid or unsupported event_type." };
  }

  const solution_slug = String(p.solution_slug || "").trim().toLowerCase();
  if (!ALLOWED_SOLUTION_SLUGS.includes(solution_slug as ValidSolutionSlug)) {
    return { valid: false, error: "Invalid or unsupported solution_slug." };
  }

  const cleanString = (val: unknown, maxLen = 100): string | undefined => {
    if (typeof val !== "string") return undefined;
    const trimmed = val.trim();
    return trimmed.length > 0 ? trimmed.slice(0, maxLen) : undefined;
  };

  return {
    valid: true,
    payload: {
      event_type: event_type as CommercialEventType,
      solution_slug: solution_slug as ValidSolutionSlug,
      source: cleanString(p.source, 50) || "direct",
      utm_source: cleanString(p.utm_source, 100),
      utm_medium: cleanString(p.utm_medium, 100),
      utm_campaign: cleanString(p.utm_campaign, 100),
      utm_content: cleanString(p.utm_content, 100),
    },
  };
}

/**
 * Persists a validated commercial signal to Supabase solution_events.
 */
export async function persistCommercialSignal(
  payload: CommercialSignalPayload
): Promise<{ success: boolean; error?: string }> {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.EXPERIMENT_STORAGE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.EXPERIMENT_STORAGE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return { success: false, error: "Storage credentials not configured." };
  }

  let rawUrl = supabaseUrl.trim();
  if (rawUrl.startsWith("SUPABASE_URL=")) {
    rawUrl = rawUrl.replace(/^SUPABASE_URL=/, "").trim();
  }
  const cleanUrl = rawUrl.replace(/\/$/, "");

  try {
    const res = await fetch(`${cleanUrl}/rest/v1/solution_events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey.trim(),
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        event_type: payload.event_type,
        solution_slug: payload.solution_slug,
        source: payload.source || "direct",
        utm_source: payload.utm_source || null,
        utm_medium: payload.utm_medium || null,
        utm_campaign: payload.utm_campaign || null,
        utm_content: payload.utm_content || null,
        created_at: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`[COMMERCIAL SIGNAL STORAGE ERROR ${res.status}]:`, errText);
      return { success: false, error: `Supabase status ${res.status}` };
    }

    return { success: true };
  } catch (err) {
    console.error("[COMMERCIAL SIGNAL CONNECTION ERROR]:", err);
    return { success: false, error: "Connection error." };
  }
}

/**
 * Fetches commercial signals summary aggregated by solution slug.
 * Excludes internal QA traffic (utm_campaign = 'internal_test').
 */
export async function getCommercialSignalsSummary(): Promise<CommercialSignalSummaryRow[]> {
  const defaultFallback: CommercialSignalSummaryRow[] = ALLOWED_SOLUTION_SLUGS.map((slug) => ({
    solution_slug: slug,
    views: 0,
    cta_clicks: 0,
    ctr: 0.0,
  }));

  const supabaseUrl = process.env.SUPABASE_URL || process.env.EXPERIMENT_STORAGE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.EXPERIMENT_STORAGE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return defaultFallback;
  }

  let rawUrl = supabaseUrl.trim();
  if (rawUrl.startsWith("SUPABASE_URL=")) {
    rawUrl = rawUrl.replace(/^SUPABASE_URL=/, "").trim();
  }
  const cleanUrl = rawUrl.replace(/\/$/, "");

  try {
    const res = await fetch(`${cleanUrl}/rest/v1/rpc/get_commercial_signals_summary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey.trim(),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return defaultFallback;
    }

    const rows = await res.json();
    if (!Array.isArray(rows) || rows.length === 0) {
      return defaultFallback;
    }

    return rows.map((r) => ({
      solution_slug: r.solution_slug as ValidSolutionSlug,
      views: Number(r.views || 0),
      cta_clicks: Number(r.cta_clicks || 0),
      ctr: Number(r.ctr || 0.0),
    }));
  } catch {
    return defaultFallback;
  }
}
