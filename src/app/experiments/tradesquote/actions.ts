"use server";

import { processLeadSubmission, LeadSubmissionState } from "@/lib/experiment-leads";
import { trackProbeEvent } from "@/lib/radar-client";

export type { LeadSubmissionState };

export interface TrackingMetadata {
  variant?: string;
  campaign?: string;
  source?: string;
  medium?: string;
  content?: string;
}

/**
 * Server Action for capturing TradesQuote experiment leads.
 * Wraps canonical processLeadSubmission and supports both useActionState and direct FormData invocation.
 */
export async function submitLeadAction(
  stateOrFormData?: LeadSubmissionState | FormData,
  maybeFormData?: FormData
): Promise<LeadSubmissionState> {
  let formData: FormData | null = null;
  if (maybeFormData && typeof (maybeFormData as FormData).get === "function") {
    formData = maybeFormData;
  } else if (stateOrFormData && typeof (stateOrFormData as FormData).get === "function") {
    formData = stateOrFormData as FormData;
  }

  if (!formData) {
    return { error: "No se recibieron datos del formulario." };
  }

  const payload = {
    email: (formData.get("email") as string)?.trim() || "",
    trade: (formData.get("trade") as string)?.trim() || "other",
    variant: (formData.get("variant") as string)?.trim() || "a",
    source: (formData.get("source") as string)?.trim() || "direct",
    medium: (formData.get("medium") as string)?.trim() || "none",
    campaign: (formData.get("campaign") as string)?.trim() || "tradesquote_probe_01",
    content: (formData.get("content") as string)?.trim() || "",
    honeypot: (formData.get("b_company_fax") as string)?.trim(),
  };

  return processLeadSubmission(payload);
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
    source: metadata?.source || "direct",
    medium: metadata?.medium || "none",
    content: metadata?.content || "",
    timestamp: new Date().toISOString(),
  };

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

  try {
    await trackProbeEvent("contractors-quote_to_invoice", event);
  } catch {
    // Non-blocking telemetry
  }
}
