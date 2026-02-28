"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TrackerResponse } from "@/lib/types";
import { CheckCircle, Clock, UserPlus, XCircle, Users, DollarSign } from "lucide-react";

const STATUS_CONFIG: Record<string, { label: string; icon: React.ReactNode; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  ACTIVE: { label: "Active", icon: <CheckCircle className="size-4 text-green-600" />, variant: "default" },
  PENDING: { label: "Pending", icon: <Clock className="size-4 text-yellow-600" />, variant: "secondary" },
  INITIAL: { label: "Initial", icon: <UserPlus className="size-4 text-blue-600" />, variant: "outline" },
  REJECTED: { label: "Rejected", icon: <XCircle className="size-4 text-red-600" />, variant: "destructive" },
};

interface StatsDisplayProps {
  data: TrackerResponse;
}

export function StatsDisplay({ data }: StatsDisplayProps) {
  const { referrer, stats } = data;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold">{referrer.firstName}</h2>
        <Badge variant="outline" className="font-mono">
          {referrer.referCode}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Referrals
            </CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalReferrals}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Value
            </CardTitle>
            <DollarSign className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${stats.totalValue}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Status Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(STATUS_CONFIG).map(([status, config]) => (
              <div
                key={status}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  {config.icon}
                  <span className="text-sm font-medium">{config.label}</span>
                </div>
                <Badge variant={config.variant}>
                  {stats.byStatus[status] ?? 0}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
