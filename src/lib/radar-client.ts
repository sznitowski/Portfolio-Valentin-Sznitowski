import "server-only";

const RADAR_API_URL = process.env.RADAR_API_URL || "http://127.0.0.1:8000";
const RADAR_API_KEY = process.env.RADAR_API_KEY || "";

export interface OverviewData {
  runs_today: number;
  api_cost_today: number;
  opportunities: {
    total: number;
    observed: number;
    promising: number;
    validation_required: number;
    kill_test_approved?: number;
    kill_test_running?: number;
    kill_test_passed?: number;
    kill_test_failed?: number;
    build_candidate: number;
    rejected: number;
  };
  last_run: {
    id: number;
    created_at: string;
    run_type: string;
    status: string;
    duration_seconds: number;
    estimated_cost: number;
    ideas_saved: number;
    ideas_received: number;
    error: string | null;
  } | null;
}

export interface OpportunitySummary {
  slug: string;
  title: string;
  category: string;
  target_user: string;
  canonical_score: number;
  best_score: number;
  evidence_confidence: number;
  independent_signal_rounds: number;
  status: string;
  last_seen: string;
  distribution_probe_status: string;
}

export interface SignalItem {
  id: number;
  signal_type: string;
  source_url: string;
  normalized_url: string;
  source_domain: string;
  observed_at: string;
  summary: string;
  strength: string;
}

export interface AuditItem {
  audited_at: string;
  model: string;
  verdict: string;
  verdict_reasons: string[];
  cost_usd: number;
}

export interface DistributionProbeItem {
  id: number;
  status: string;
  channel: string;
  audience: string;
  budget: number;
  spend: number;
  impressions: number;
  clicks: number;
  landing_views: number;
  cta_clicks: number;
  leads: number;
  ctr: number;
  cpc: number;
  landing_conversion: number;
  cpl: number;
  result: string;
  notes: string | null;
}

export interface KillTestItem {
  id: number;
  started_at: string;
  finished_at: string | null;
  status: string;
  spend: number;
  impressions: number;
  clicks: number;
  leads: number;
  conversions: number;
  notes: string | null;
}

export interface OpportunityDetail {
  opportunity: {
    id: number;
    slug: string;
    title: string;
    category: string;
    target_user: string;
    core_problem: string;
    first_seen: string;
    last_seen: string;
    times_seen: number;
    times_generated: number;
    independent_signal_rounds: number;
    canonical_score: number;
    best_score: number;
    evidence_confidence: number;
    unique_domains_count: number;
    unique_source_types_count: number;
    evidence_strength: string;
    status: string;
    distribution_probe_status: string;
    manual_status: string | null;
    manual_notes: string | null;
    reason_codes: string[];
  };
  signals: SignalItem[];
  latest_audit: AuditItem | null;
  distribution_probe: DistributionProbeItem | null;
  kill_test: KillTestItem | null;
}

export interface RunItem {
  id: number;
  created_at: string;
  run_type: string;
  status: string;
  duration_seconds: number;
  input_tokens: number;
  output_tokens: number;
  reasoning_tokens: number;
  estimated_cost: number;
  ideas_received: number;
  ideas_saved: number;
  error: string | null;
}

export interface RunsResponse {
  page: number;
  page_size: number;
  total: number;
  items: RunItem[];
}

export type RadarResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; isOffline?: boolean };

async function fetchFromRadar<T>(endpoint: string, options: RequestInit = {}): Promise<RadarResponse<T>> {
  const url = `${RADAR_API_URL}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "X-Radar-Key": RADAR_API_KEY,
        ...(options.headers || {}),
      },
      cache: "no-store", // Always fresh data for admin control center
    });

    if (!res.ok) {
      if (res.status === 404) {
        return { success: false, error: "Not found (404)" };
      }
      if (res.status === 401 || res.status === 403) {
        return { success: false, error: "Radar API Authentication error (401/403)" };
      }
      return { success: false, error: `Radar API error: ${res.statusText} (${res.status})` };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Connection failed";
    return {
      success: false,
      error: `Radar unavailable: ${message}`,
      isOffline: true,
    };
  }
}

export async function getRadarOverview(): Promise<RadarResponse<OverviewData>> {
  return fetchFromRadar<OverviewData>("/api/v1/overview");
}

export async function getRadarOpportunities(status?: string): Promise<RadarResponse<OpportunitySummary[]>> {
  const query = status ? `?status=${encodeURIComponent(status)}` : "";
  return fetchFromRadar<OpportunitySummary[]>(`/api/v1/opportunities${query}`);
}

export async function getRadarOpportunityDetail(slug: string): Promise<RadarResponse<OpportunityDetail>> {
  return fetchFromRadar<OpportunityDetail>(`/api/v1/opportunities/${encodeURIComponent(slug)}`);
}

export async function getRadarRuns(page: number = 1, pageSize: number = 25): Promise<RadarResponse<RunsResponse>> {
  return fetchFromRadar<RunsResponse>(`/api/v1/runs?page=${page}&page_size=${pageSize}`);
}

export interface ProbeLeadRecord {
  id: number;
  created_at: string;
  email: string;
  trade: string | null;
  source: string;
  campaign: string;
  variant: string;
}

export async function startDistributionProbe(slug: string): Promise<RadarResponse<{ slug: string; status: string }>> {
  return fetchFromRadar<{ slug: string; status: string }>(`/api/v1/probes/${encodeURIComponent(slug)}/start`, {
    method: "POST",
  });
}

export async function recordDistributionProbeResult(
  slug: string,
  data: {
    spend: number;
    impressions: number;
    clicks: number;
    landing_views?: number;
    cta_clicks?: number;
    leads?: number;
    notes?: string;
  }
): Promise<RadarResponse<any>> {
  return fetchFromRadar<any>(`/api/v1/probes/${encodeURIComponent(slug)}/result`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getDistributionProbeLeads(slug: string): Promise<RadarResponse<ProbeLeadRecord[]>> {
  return fetchFromRadar<ProbeLeadRecord[]>(`/api/v1/probes/${encodeURIComponent(slug)}/leads`);
}

export async function trackProbeEvent(slug: string, event: "landing_view" | "cta_click"): Promise<RadarResponse<any>> {
  return fetchFromRadar<any>(`/api/v1/probes/${encodeURIComponent(slug)}/track`, {
    method: "POST",
    body: JSON.stringify({ event }),
  });
}

export async function submitProbeLead(
  slug: string,
  data: { email: string; trade?: string; source?: string; campaign?: string; variant?: string }
): Promise<RadarResponse<{ success: boolean; lead_id?: number; is_duplicate?: boolean; message?: string }>> {
  return fetchFromRadar<any>(`/api/v1/probes/${encodeURIComponent(slug)}/lead`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
