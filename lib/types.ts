// Mirrors the server's public endpoint GET /api/referral/tracker/:referCode
// (server: services/referral.service.ts → getReferralTrackerStats). The endpoint
// is unauthenticated, so it deliberately exposes only the code and a count — no
// referrer PII, value, or per-status breakdown.
export interface ReferrerInfo {
  referCode: string;
}

export interface ReferralStats {
  totalReferrals: number;
}

export interface TrackerResponse {
  referrer: ReferrerInfo;
  stats: ReferralStats;
}

export interface APIResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
