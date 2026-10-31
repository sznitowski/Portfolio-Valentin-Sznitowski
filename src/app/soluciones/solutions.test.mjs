import test from "node:test";
import assert from "node:assert/strict";
import { PORTFOLIO_SOLUTIONS, getSolutionBySlug } from "../../data/solutions/catalog.ts";

test("Solutions Catalog - Contains all 4 Radar-selected solutions", () => {
  assert.equal(PORTFOLIO_SOLUTIONS.length, 4);
  const slugs = PORTFOLIO_SOLUTIONS.map((s) => s.slug);
  assert.deepEqual(slugs, [
    "tradesquote",
    "checklist-rapido",
    "cleanroute",
    "truckstock-lite",
  ]);
});

test("Solutions Catalog - Every solution has valid commercial classifications", () => {
  for (const sol of PORTFOLIO_SOLUTIONS) {
    assert.ok(sol.commercialClassification.length > 0);
    assert.ok(sol.commercialClassification.includes("PORTFOLIO_SOLUTION"));
    assert.ok(sol.radarSlug.length > 0);
  }
});

test("Solutions Catalog - Disclaimers & Status labels do not make false claims", () => {
  for (const sol of PORTFOLIO_SOLUTIONS) {
    // Cannot claim ready-to-use off the shelf
    assert.notEqual(sol.statusLabel.toLowerCase(), "disponible ahora");
    assert.ok(
      sol.statusLabel.includes("CONCEPTO") ||
      sol.statusLabel.includes("VALIDACIÓN") ||
      sol.statusLabel.includes("PERSONALIZABLE")
    );
  }
});

test("Solutions Catalog - Each solution has 5 workflow steps", () => {
  for (const sol of PORTFOLIO_SOLUTIONS) {
    assert.equal(sol.workflow.length, 5);
    for (let i = 0; i < 5; i++) {
      assert.equal(sol.workflow[i].step, i + 1);
      assert.ok(sol.workflow[i].title.length > 0);
      assert.ok(sol.workflow[i].subtitle.length > 0);
      assert.ok(sol.workflow[i].description.length > 0);
    }
  }
});

test("Solutions Catalog - Query helper getSolutionBySlug returns expected solution", () => {
  const tq = getSolutionBySlug("tradesquote");
  assert.ok(tq);
  assert.equal(tq.name, "TradesQuote");
  assert.equal(tq.mockupType, "mobile-quote");

  const cr = getSolutionBySlug("cleanroute");
  assert.ok(cr);
  assert.equal(cr.name, "CleanRoute");
  assert.equal(cr.mockupType, "route-dispatcher");

  const unknown = getSolutionBySlug("non-existent-solution");
  assert.equal(unknown, undefined);
});
