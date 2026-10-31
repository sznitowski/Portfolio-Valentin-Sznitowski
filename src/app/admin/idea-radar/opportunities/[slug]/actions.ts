"use server";

import { revalidatePath } from "next/cache";
import { startDistributionProbe, recordDistributionProbeResult } from "@/lib/radar-client";

export async function startProbeAction(slug: string) {
  const res = await startDistributionProbe(slug);
  revalidatePath(`/admin/idea-radar/opportunities/${slug}`);
  revalidatePath("/admin/idea-radar/decision-review");
  return res;
}

export async function recordProbeResultAction(
  slug: string,
  formData: FormData
) {
  const spend = parseFloat((formData.get("spend") as string) || "0.0");
  const impressions = parseInt((formData.get("impressions") as string) || "0", 10);
  const clicks = parseInt((formData.get("clicks") as string) || "0", 10);
  const notes = (formData.get("notes") as string)?.trim() || "";

  const res = await recordDistributionProbeResult(slug, {
    spend,
    impressions,
    clicks,
    notes: notes || undefined,
  });

  revalidatePath(`/admin/idea-radar/opportunities/${slug}`);
  revalidatePath("/admin/idea-radar/decision-review");
  return res;
}
