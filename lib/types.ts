export interface ReferrerInfo {
  firstName: string;
  referCode: string;
  referValue: number;
}

export interface ReferralStats {
  totalReferrals: number;
  totalValue: number;
  byStatus: Record<string, number>;
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
