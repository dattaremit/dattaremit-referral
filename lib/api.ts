import type { APIResponse, TrackerResponse } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function fetchReferralStats(
  referCode: string
): Promise<TrackerResponse> {
  const res = await fetch(
    `${API_URL}/api/referral/tracker/${encodeURIComponent(referCode)}`
  );

  const json: APIResponse<TrackerResponse> = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.message || "Failed to fetch referral stats");
  }

  return json.data!;
}
