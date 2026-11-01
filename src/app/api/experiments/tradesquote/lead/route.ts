import { NextResponse } from "next/server";
import { processLeadSubmission } from "@/lib/experiment-leads";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    let payload;
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      payload = await req.json();
    } else if (contentType.includes("form") || contentType.includes("multipart")) {
      const formData = await req.formData();
      payload = {
        email: formData.get("email") as string,
        trade: formData.get("trade") as string,
        variant: formData.get("variant") as string,
        source: formData.get("source") as string,
        medium: formData.get("medium") as string,
        campaign: formData.get("campaign") as string,
        content: formData.get("content") as string,
        honeypot: formData.get("b_company_fax") as string,
      };
    } else {
      payload = await req.json().catch(() => ({}));
    }

    const result = await processLeadSubmission(payload);
    const status = result.error ? 400 : 200;
    return NextResponse.json(result, { status });
  } catch (err) {
    console.error("[LEAD API ROUTE ERROR]:", err);
    return NextResponse.json(
      { error: "Error procesando la solicitud." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const supabaseKeys = Object.keys(process.env).filter(k => k.toLowerCase().includes("supabase") || k.toLowerCase().includes("storage"));
  const hasUrl = Boolean(process.env.SUPABASE_URL || process.env.EXPERIMENT_STORAGE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL);
  const hasKey = Boolean(process.env.SUPABASE_ANON_KEY || process.env.EXPERIMENT_STORAGE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  return NextResponse.json({
    status: "ok",
    detected_keys: supabaseKeys,
    has_supabase_url: hasUrl,
    has_supabase_anon_key: hasKey,
    has_admin_email: Boolean(process.env.ADMIN_EMAIL),
    has_admin_password: Boolean(process.env.ADMIN_PASSWORD),
    has_admin_session_secret: Boolean(process.env.ADMIN_SESSION_SECRET),
  });
}
