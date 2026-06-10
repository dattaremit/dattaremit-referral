"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TrackerResponse } from "@/lib/types";
import { Users } from "lucide-react";

interface StatsDisplayProps {
  data: TrackerResponse;
}

export function StatsDisplay({ data }: StatsDisplayProps) {
  const { referrer, stats } = data;

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
          <p className="text-3xl font-bold">{stats.totalReferrals}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {stats.totalReferrals === 1
              ? "person has signed up with this code"
              : "people have signed up with this code"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
