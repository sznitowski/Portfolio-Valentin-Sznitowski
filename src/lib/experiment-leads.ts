export interface LeadSubmissionState {
  success?: boolean;
  error?: string;
  isDuplicate?: boolean;
}

export interface LeadSubmissionPayload {
  email: string;
  trade?: string;
  variant?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  honeypot?: string;
}

// In-memory cache for recent submissions to prevent rapid double-clicks
const recentSubmissionCache = new Map<string, number>();

/**
 * Canonical processor for experiment leads across Server Actions and Route Handlers.
 */
export async function processLeadSubmission(
  payload: LeadSubmissionPayload
): Promise<LeadSubmissionState> {
  // 1. Bot Honeypot Protection
  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    return { success: true, isDuplicate: false };
  }

  // 2. Validate Email
  const cleanEmail = (payload.email || "").trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cleanEmail || !emailRegex.test(cleanEmail)) {
    return { error: "Por favor ingresá un email válido." };
  }

  // 3. Debounce rapid repeat clicks (5 seconds)
  const now = Date.now();
  const lastSubmitted = recentSubmissionCache.get(cleanEmail);
  if (lastSubmitted && now - lastSubmitted < 5000) {
    return { success: true, isDuplicate: true };
  }
  recentSubmissionCache.set(cleanEmail, now);

  if (recentSubmissionCache.size > 200) {
    for (const [key, ts] of recentSubmissionCache.entries()) {
      if (now - ts > 3600000) recentSubmissionCache.delete(key);
    }
  }

  // 4. Strict Database Contract Record
  const leadRecord = {
    email: cleanEmail,
    trade: payload.trade || "other",
    opportunity_slug: "contractors-quote_to_invoice",
    variant: payload.variant || "a",
    utm_source: payload.source || "direct",
    utm_medium: payload.medium || "none",
    utm_campaign: payload.campaign || "tradesquote_probe_01",
    utm_content: payload.content || "",
    created_at: new Date().toISOString(),
  };

  // 5. Supabase Persistence
  const supabaseUrl = process.env.SUPABASE_URL || process.env.EXPERIMENT_STORAGE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.EXPERIMENT_STORAGE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    let rawUrl = supabaseUrl.trim();
    if (rawUrl.startsWith("SUPABASE_URL=")) {
      rawUrl = rawUrl.replace(/^SUPABASE_URL=/, "").trim();
    }
    const cleanUrl = rawUrl.replace(/\/$/, "");
    const primaryTable = process.env.SUPABASE_TABLE || "experiment_leads";

    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      apikey: supabaseKey.trim(),
      Prefer: "return=minimal",
    };

    try {
      let res = await fetch(`${cleanUrl}/rest/v1/${primaryTable}`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(leadRecord),
      });

      // Fallback if table name is tradesquote_leads
      if (res.status === 404 && primaryTable === "experiment_leads") {
        res = await fetch(`${cleanUrl}/rest/v1/tradesquote_leads`, {
          method: "POST",
          headers: requestHeaders,
          body: JSON.stringify(leadRecord),
        });
      }

      if (res.status === 409) {
        return { success: true, isDuplicate: true };
      }

      if (!res.ok) {
        const errorText = await res.text();
        console.error(`[SUPABASE STORAGE ERROR ${res.status}]:`, errorText);
        return {
          error: "No pudimos registrar tu solicitud en este momento. Por favor intentá nuevamente en unos minutos.",
        };
      }

      console.info(`[LEAD STORED IN SUPABASE]: ${cleanEmail} (${leadRecord.trade}) - Variant: ${leadRecord.variant}`);
      return { success: true, isDuplicate: false };
    } catch (err) {
      console.error("[SUPABASE CONNECTION ERROR]:", err);
      return {
        error: "Error de conexión temporal al registrar tu solicitud. Por favor intentá nuevamente.",
      };
    }
  }

  // 6. Webhook Fallback
  const webhookUrl = process.env.EXPERIMENT_LEADS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "lead_submission", data: leadRecord }),
      });
      if (res.ok) {
        return { success: true, isDuplicate: false };
      }
      return {
        error: "No pudimos registrar tu solicitud en este momento. Por favor intentá nuevamente en unos minutos.",
      };
    } catch (err) {
      console.error("[WEBHOOK STORAGE ERROR]:", err);
      return {
        error: "Error de conexión temporal al registrar tu solicitud. Por favor intentá nuevamente.",
      };
    }
  }

  // 7. No storage configured in production
  console.warn("[LEAD STORAGE NOT CONFIGURED]: SUPABASE_URL / SUPABASE_ANON_KEY missing.");
  return {
    error: "El servicio de registro se encuentra temporalmente en configuración. Por favor contactanos directamente vía WhatsApp o email.",
  };
}
