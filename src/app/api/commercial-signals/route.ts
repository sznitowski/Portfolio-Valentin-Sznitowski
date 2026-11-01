import { NextResponse } from "next/server";
import {
  validateCommercialSignal,
  persistCommercialSignal,
  getCommercialSignalsSummary,
} from "@/lib/commercial-signals";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    let body: unknown;
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      body = await req.json();
    } else {
      // Support text/plain or sendBeacon payloads
      const text = await req.text();
      body = text ? JSON.parse(text) : {};
    }

    const validation = validateCommercialSignal(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const result = await persistCommercialSignal(validation.payload);
    if (!result.success) {
      return NextResponse.json({ error: result.error || "Failed to persist signal." }, { status: 502 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[COMMERCIAL SIGNALS API ERROR]:", err);
    return NextResponse.json({ error: "Internal processing error." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const summary = await getCommercialSignalsSummary();
    return NextResponse.json({ status: "ok", data: summary }, { status: 200 });
  } catch (err) {
    console.error("[COMMERCIAL SIGNALS GET ERROR]:", err);
    return NextResponse.json({ error: "Failed to retrieve summary." }, { status: 500 });
  }
}
