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

      // 1. Google Analytics 4 (if configured)
      if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: Function }).gtag === "function") {
        (window as unknown as { gtag: Function }).gtag("event", "solution_view", payload);
      }

      // 2. Local buffer for offline/local commercial signal logging
      if (typeof window !== "undefined") {
        const existing = JSON.parse(localStorage.getItem("solution_views") || "[]");
        const last = existing[existing.length - 1];
        // Deduplicate rapid reloads (within 5 seconds for the same slug)
        if (!last || last.solution_slug !== solutionSlug || Date.now() - new Date(last.timestamp).getTime() > 5000) {
          existing.push(payload);
          localStorage.setItem("solution_views", JSON.stringify(existing.slice(-50)));
        }
      }

      // 3. Client console signal for easy dev/staging verification
      console.info("[COMMERCIAL SIGNAL]: solution_view", payload);
    } catch {
      // Non-blocking telemetry
    }
  }, [solutionSlug]);

  return null;
}
