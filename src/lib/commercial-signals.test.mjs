import test from "node:test";
import assert from "node:assert/strict";
import { validateCommercialSignal, ALLOWED_SOLUTION_SLUGS } from "./commercial-signals.ts";

test("commercial-signals: validates valid solution_view payload", () => {
  const result = validateCommercialSignal({
    event_type: "solution_view",
    solution_slug: "tradesquote",
    source: "home",
    utm_source: "linkedin",
    utm_medium: "organic_post",
    utm_campaign: "commercial_validation_2026",
    utm_content: "tradesquote",
  });

  assert.equal(result.valid, true);
  if (result.valid) {
    assert.equal(result.payload.event_type, "solution_view");
    assert.equal(result.payload.solution_slug, "tradesquote");
    assert.equal(result.payload.source, "home");
    assert.equal(result.payload.utm_source, "linkedin");
    assert.equal(result.payload.utm_campaign, "commercial_validation_2026");
  }
});

test("commercial-signals: validates valid solution_cta_click payload", () => {
  const result = validateCommercialSignal({
    event_type: "solution_cta_click",
    solution_slug: "checklist-rapido",
    source: "solutions_index_whatsapp",
    utm_source: "whatsapp",
  });

  assert.equal(result.valid, true);
  if (result.valid) {
    assert.equal(result.payload.event_type, "solution_cta_click");
    assert.equal(result.payload.solution_slug, "checklist-rapido");
    assert.equal(result.payload.source, "solutions_index_whatsapp");
    assert.equal(result.payload.utm_source, "whatsapp");
    assert.equal(result.payload.utm_medium, undefined);
  }
});

test("commercial-signals: rejects invalid event_type", () => {
  const result = validateCommercialSignal({
    event_type: "page_scroll",
    solution_slug: "tradesquote",
  });

  assert.equal(result.valid, false);
  if (!result.valid) {
    assert.match(result.error, /event_type/i);
  }
});

test("commercial-signals: rejects invalid or arbitrary solution_slug", () => {
  const result = validateCommercialSignal({
    event_type: "solution_view",
    solution_slug: "unknown-hacker-slug",
  });

  assert.equal(result.valid, false);
  if (!result.valid) {
    assert.match(result.error, /solution_slug/i);
  }
});

test("commercial-signals: allows all whitelisted solution slugs", () => {
  for (const slug of ALLOWED_SOLUTION_SLUGS) {
    const result = validateCommercialSignal({
      event_type: "solution_view",
      solution_slug: slug,
    });
    assert.equal(result.valid, true, `Should accept allowed slug: ${slug}`);
  }
});

test("commercial-signals: defaults source to direct if omitted", () => {
  const result = validateCommercialSignal({
    event_type: "solution_view",
    solution_slug: "cleanroute",
  });

  assert.equal(result.valid, true);
  if (result.valid) {
    assert.equal(result.payload.source, "direct");
  }
});
