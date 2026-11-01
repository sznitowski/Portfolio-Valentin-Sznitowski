"use client";

import { useEffect, useRef } from "react";

interface SolutionViewTrackerProps {
  solutionSlug: string;
}

export function SolutionViewTracker({ solutionSlug }: SolutionViewTrackerProps) {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const utm_source = urlParams.get("utm_source") || undefined;
      const utm_medium = urlParams.get("utm_medium") || undefined;
      const utm_campaign = urlParams.get("utm_campaign") || undefined;
      const utm_content = urlParams.get("utm_content") || undefined;
      const explicitSource = urlParams.get("source") || undefined;

      let source = explicitSource;
      if (!source) {
        const referrer = document.referrer;
        if (!referrer) {
          source = "direct";
        } else {
          try {
            const refUrl = new URL(referrer);
            if (refUrl.origin === window.location.origin) {
              if (refUrl.pathname === "/" || refUrl.pathname === "") {
                source = "home";
              } else if (refUrl.pathname.startsWith("/soluciones")) {
                source = "solutions_index";
              } else {
                source = "direct";
              }
            } else {
              source = "external";
            }
          } catch {
            source = "external";
          }
        }
      }

      const payload = {
        event: "solution_view",
        solution_slug: solutionSlug,
        source,
        timestamp: new Date().toISOString(),
        ...(utm_source && { utm_source }),
        ...(utm_medium && { utm_medium }),
        ...(utm_campaign && { utm_campaign }),
        ...(utm_content && { utm_content }),
      };

      // 1. Session Deduplication Guard (prevent inflation on re-renders/back-nav in same tab session)
      if (typeof window !== "undefined") {
        const sessionKey = `viewed_solution_${solutionSlug}`;
        const lastViewedTs = sessionStorage.getItem(sessionKey);
        const now = Date.now();
        // Allow re-track only if more than 30 minutes in same session, otherwise skip server view
        if (lastViewedTs && now - Number(lastViewedTs) < 1800000) {
          return;
        }
        sessionStorage.setItem(sessionKey, now.toString());
      }

      // 2. Server-side Persistence
      const serverPayload = {
        event_type: "solution_view",
        solution_slug: solutionSlug,
        source,
        ...(utm_source && { utm_source }),
        ...(utm_medium && { utm_medium }),
        ...(utm_campaign && { utm_campaign }),
        ...(utm_content && { utm_content }),
      };

      fetch("/api/commercial-signals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serverPayload),
        keepalive: true,
      }).catch(() => {
        // Non-blocking telemetry
      });

      // 3. Local buffer for offline inspection
      if (typeof window !== "undefined") {
        const existing = JSON.parse(localStorage.getItem("solution_views") || "[]");
        existing.push(payload);
        localStorage.setItem("solution_views", JSON.stringify(existing.slice(-50)));
      }

      // 4. Client console signal for verification
      console.info("[COMMERCIAL SIGNAL]: solution_view", payload);
    } catch {
      // Non-blocking telemetry
    }
  }, [solutionSlug]);

  return null;
}
