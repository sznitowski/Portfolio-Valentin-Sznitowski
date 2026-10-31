import test from "node:test";
import assert from "node:assert/strict";

// Validation helper replicating server-side logic
function validateLeadInput({ email, honeypot, trade, variant, source, medium, campaign, content }) {
  // 1. Honeypot check
  if (honeypot && honeypot.trim().length > 0) {
    return { isBot: true, success: true, isDuplicate: false };
  }

  // 2. Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const cleanEmail = (email || "").trim().toLowerCase();
  if (!cleanEmail || !emailRegex.test(cleanEmail)) {
    return { error: "Por favor ingresá un email válido." };
  }

  // 3. Variant normalization
  const validVariants = ["a", "b", "c"];
  const cleanVariant = validVariants.includes((variant || "").toLowerCase()) ? variant.toLowerCase() : "a";

  // 4. Trade normalization
  const validTrades = ["electrician", "plumber", "other"];
  const cleanTrade = validTrades.includes(trade) ? trade : "other";

  const leadRecord = {
    email: cleanEmail,
    trade: cleanTrade,
    variant: cleanVariant,
    source: source || "meta",
    medium: medium || "paid_social",
    campaign: campaign || "tradesquote_probe_01",
    content: content || "money_loss",
    created_at: new Date().toISOString(),
  };

  return { success: true, data: leadRecord };
}

test("Lead Validation - Valid email succeeds", () => {
  const res = validateLeadInput({
    email: "contractor@pro-trades.com",
    trade: "electrician",
    variant: "a",
  });
  assert.equal(res.success, true);
  assert.equal(res.data.email, "contractor@pro-trades.com");
  assert.equal(res.data.trade, "electrician");
  assert.equal(res.data.variant, "a");
});

test("Lead Validation - Invalid email rejected with error", () => {
  const invalidEmails = ["bademail", "bad@", "@domain.com", "bad@domain", ""];
  for (const email of invalidEmails) {
    const res = validateLeadInput({ email });
    assert.equal(res.success, undefined);
    assert.equal(res.error, "Por favor ingresá un email válido.");
  }
});

test("Lead Validation - Honeypot bot protection triggers silent success without saving", () => {
  const res = validateLeadInput({
    email: "bot@spammer.org",
    honeypot: "spam_fax_123",
  });
  assert.equal(res.isBot, true);
  assert.equal(res.success, true);
  assert.equal(res.data, undefined);
});

test("Lead Validation - Normalizes variants A, B, C correctly with fallback to A", () => {
  const resA = validateLeadInput({ email: "a@trade.com", variant: "a" });
  assert.equal(resA.data.variant, "a");

  const resB = validateLeadInput({ email: "b@trade.com", variant: "b" });
  assert.equal(resB.data.variant, "b");

  const resC = validateLeadInput({ email: "c@trade.com", variant: "c" });
  assert.equal(resC.data.variant, "c");

  const resUnknown = validateLeadInput({ email: "d@trade.com", variant: "unknown_xyz" });
  assert.equal(resUnknown.data.variant, "a");
});

test("Lead Validation - Stores UTM campaign parameters accurately", () => {
  const res = validateLeadInput({
    email: "plumber.joe@fastpipe.com",
    trade: "plumber",
    variant: "c",
    source: "meta",
    medium: "paid_social",
    campaign: "tradesquote_probe_01",
    content: "proof",
  });
  assert.equal(res.data.source, "meta");
  assert.equal(res.data.medium, "paid_social");
  assert.equal(res.data.campaign, "tradesquote_probe_01");
  assert.equal(res.data.content, "proof");
});

test("Tracking Event - Normalizes telemetry payload", () => {
  function formatEventPayload(event, metadata) {
    return {
      event,
      variant: metadata?.variant || "a",
      campaign: metadata?.campaign || "tradesquote_probe_01",
      source: metadata?.source || "meta",
      medium: metadata?.medium || "paid_social",
      content: metadata?.content || "",
      timestamp: new Date().toISOString(),
    };
  }

  const viewEvent = formatEventPayload("landing_view", { variant: "b", content: "paperwork" });
  assert.equal(viewEvent.event, "landing_view");
  assert.equal(viewEvent.variant, "b");
  assert.equal(viewEvent.content, "paperwork");

  const clickEvent = formatEventPayload("cta_click", { variant: "a", content: "money_loss" });
  assert.equal(clickEvent.event, "cta_click");
  assert.equal(clickEvent.variant, "a");
});

test("Production Config Validation - Inspects storage and auth variables", () => {
  function validateEnvConfig(env) {
    const issues = [];
    if (!env.ADMIN_SESSION_SECRET || env.ADMIN_SESSION_SECRET.length < 16) {
      issues.push("ADMIN_SESSION_SECRET should be a strong random secret.");
    }
    const hasStorage = Boolean(
      env.EXPERIMENT_LEADS_WEBHOOK_URL ||
      (env.SUPABASE_URL && env.SUPABASE_ANON_KEY) ||
      env.RADAR_API_URL
    );
    return { isValid: issues.length === 0, hasStorage, issues };
  }

  const prodEnv = {
    ADMIN_SESSION_SECRET: "abcdef1234567890abcdef1234567890",
    SUPABASE_URL: "https://xyz.supabase.co",
    SUPABASE_ANON_KEY: "anon_secret_key",
  };
  const check = validateEnvConfig(prodEnv);
  assert.equal(check.isValid, true);
  assert.equal(check.hasStorage, true);
});
