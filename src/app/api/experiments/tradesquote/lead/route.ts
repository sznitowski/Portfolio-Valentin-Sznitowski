import { NextResponse } from "next/server";
import { processLeadSubmission } from "@/lib/experiment-leads";

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
