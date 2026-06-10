"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ReferralStats, TrackerResponse } from "@/lib/types";
import {
  ArrowLeftRight,
  Landmark,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatsDisplayProps {
  data: TrackerResponse;
}

// Anonymized funnel rows. The public endpoint returns counts only, so we show
// "X of Y" progress — never who. Keys map 1:1 to ReferralStats milestone fields.
const MILESTONES: {
  key: keyof Omit<ReferralStats, "totalReferrals">;
  label: string;
  icon: LucideIcon;
}[] = [
  { key: "completedKyc", label: "Completed KYC", icon: ShieldCheck },
  { key: "connectedBank", label: "Connected a bank", icon: Landmark },
  { key: "addedRecipient", label: "Added a recipient", icon: UserPlus },
  { key: "completedTransfer", label: "Completed a transfer", icon: ArrowLeftRight },
];

export function StatsDisplay({ data }: StatsDisplayProps) {
  const { referrer, stats } = data;
  const total = stats.totalReferrals;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold">Referral code</h2>
        <Badge variant="outline" className="font-mono">
          {referrer.referCode}
        </Badge>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Referrals
          </CardTitle>
          <Users className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{total}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {total === 1
              ? "person has signed up with this code"
              : "people have signed up with this code"}
          </p>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">
          What they&apos;ve done so far
        </h3>

        {total === 0 ? (
          <Card>
            <CardContent className="py-6 text-sm text-muted-foreground">
              No activity yet — milestones appear here as referred users get
              started.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {MILESTONES.map(({ key, label, icon: Icon }) => {
              const count = stats[key];
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <Card key={key}>
                  <CardContent className="space-y-3 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Icon className="size-4 text-muted-foreground" />
                        {label}
                      </div>
                      <span className="text-sm font-semibold tabular-nums">
                        {count}
                        <span className="text-muted-foreground">
                          {" "}
                          / {total}
                        </span>
                      </span>
                    </div>
                    <div
                      className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
                      role="progressbar"
                      aria-valuenow={pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={label}
                    >
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
