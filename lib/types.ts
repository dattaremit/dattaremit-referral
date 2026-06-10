// Mirrors the server's public endpoint GET /api/referral/tracker/:referCode
// (server: services/referral.service.ts → getReferralTrackerStats). The endpoint
// is unauthenticated, so it deliberately exposes only the referrer's code and
// anonymized COUNTS for the referred cohort — never referrer PII or individual
// referred-user identities/rows.
export interface ReferrerInfo {
  referCode: string;
}

export interface ReferralStats {
  // Total users who signed up with this code.
  totalReferrals: number;
  // Of those, how many have reached each milestone. Counts only — no identities.
  completedKyc: number;
  connectedBank: number;
  addedRecipient: number;
  completedTransfer: number;
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
