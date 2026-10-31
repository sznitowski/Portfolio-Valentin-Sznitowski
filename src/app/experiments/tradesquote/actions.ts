"use server";

import { submitProbeLead, trackProbeEvent } from "@/lib/radar-client";

export interface LeadSubmissionState {
  success?: boolean;
  error?: string;
  isDuplicate?: boolean;
}

export interface TrackingMetadata {
  variant?: string;
  campaign?: string;
  source?: string;
  medium?: string;
  content?: string;
}

// In-memory cache for recent submissions to prevent rapid double-clicks and debounce duplicates
const recentSubmissionCache = new Map<string, number>();

/**
 * Server Action for capturing TradesQuote experiment leads.
 * Decoupled from local PC: Can store directly in Supabase / Cloud Webhook in production,
 * or fall back seamlessly to local Radar FastAPI / SQLite when available.
 */
export async function submitLeadAction(
  _prevState: LeadSubmissionState | undefined,
  formData: FormData
): Promise<LeadSubmissionState> {
  // 1. Bot Honeypot Protection (Hidden input; bots typically fill it out)
  const honeypot = (formData.get("b_company_fax") as string)?.trim();
  if (honeypot) {
    // Silently succeed for bots without recording anything
    return { success: true, isDuplicate: false };
  }

  // 2. Extract and sanitize input fields
  const rawEmail = (formData.get("email") as string)?.trim() || "";
  const email = rawEmail.toLowerCase();
  const trade = (formData.get("trade") as string)?.trim() || "other";
  const variant = (formData.get("variant") as string)?.trim() || "a";
  const source = (formData.get("source") as string)?.trim() || "meta";
  const medium = (formData.get("medium") as string)?.trim() || "paid_social";
  const campaign = (formData.get("campaign") as string)?.trim() || "tradesquote_probe_01";
  const content = (formData.get("content") as string)?.trim() || "";

  // 3. Server-side Email Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { error: "Por favor ingresá un email válido." };
  }

  // 4. Rate-limiting & Rapid Double-submit debounce (5 seconds threshold)
  const now = Date.now();
  const lastSubmitted = recentSubmissionCache.get(email);
  if (lastSubmitted && now - lastSubmitted < 5000) {
    return { success: true, isDuplicate: true };
  }
  recentSubmissionCache.set(email, now);

  // Clean old entries (> 1 hour)
  if (recentSubmissionCache.size > 200) {
    for (const [key, ts] of recentSubmissionCache.entries()) {
      if (now - ts > 3600000) recentSubmissionCache.delete(key);
    }
  }

  const leadRecord = {
    email,
    trade,
    variant,
    source,
    medium,
    campaign,
    content,
    created_at: new Date().toISOString(),
  };

  // 5. Decoupled Persistence Layer
  let isDuplicate = false;

  // Option A: Supabase Free Tier REST Storage (Zero NPM Dependencies)
  const supabaseUrl = process.env.SUPABASE_URL || process.env.EXPERIMENT_STORAGE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.EXPERIMENT_STORAGE_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/tradesquote_leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify(leadRecord),
      });

      if (response.status === 409) {
        // Unique violation (email already registered)
        return { success: true, isDuplicate: true };
      }
    } catch (err) {
      console.error("[EXPERIMENT STORAGE WARNING]: Failed to write lead to Supabase:", err);
    }
  }

  // Option B: Generic Serverless Webhook / Cloudflare Worker (Zero Cost)
  const webhookUrl = process.env.EXPERIMENT_LEADS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "lead_submission", data: leadRecord }),
      });
    } catch (err) {
      console.error("[EXPERIMENT STORAGE WARNING]: Failed to write lead to Webhook:", err);
    }
  }

  // Option C: Local Development with Radar API (FastAPI + SQLite)
  try {
    const res = await submitProbeLead("contractors-quote_to_invoice", {
      email,
      trade,
      source,
      campaign,
      variant,
    });
    if (res.success && res.data.is_duplicate) {
      isDuplicate = true;
    }
  } catch {
    // If Radar is offline (e.g. running in production serverless without local PC), ignore
  }

  // Log in server output for monitoring
  console.info(`[TRADESQUOTE LEAD CAPTURED]: ${email} (${trade}) - Variant: ${variant} - Campaign: ${campaign}`);

  return {
    success: true,
    isDuplicate,
  };
}

/**
 * Server Action for recording anonymous telemetric probe events (landing views and CTA clicks).
 */
export async function trackEventAction(
  event: "landing_view" | "cta_click",
  metadata?: TrackingMetadata
): Promise<void> {
  const eventPayload = {
    event,
    variant: metadata?.variant || "a",
    campaign: metadata?.campaign || "tradesquote_probe_01",
    source: metadata?.source || "meta",
    medium: metadata?.medium || "paid_social",
    content: metadata?.content || "",
    timestamp: new Date().toISOString(),
  };

  // Option A: Generic Serverless Webhook
  const webhookUrl = process.env.EXPERIMENT_LEADS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "tracking_event", data: eventPayload }),
      });
    } catch {
      // Non-blocking telemetry
    }
  }

  // Option B: Local Radar Engine
  try {
    await trackProbeEvent("contractors-quote_to_invoice", event);
  } catch {
    // Non-blocking telemetry
  }
}
