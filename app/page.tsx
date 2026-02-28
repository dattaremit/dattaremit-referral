"use client";

import { ReferCodeForm } from "@/components/refer-code-form";
import { StatsDisplay } from "@/components/stats-display";
import { useReferralTracker } from "@/hooks/use-referral-tracker";
import { AlertCircle } from "lucide-react";

export default function Home() {
  const { state, lookup, reset } = useReferralTracker();

  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 px-4 py-16 font-sans dark:bg-black">
      <main className="w-full max-w-xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Referral Tracker
          </h1>
          <p className="text-muted-foreground">
            Enter your referral code to view your referral stats
          </p>
        </div>

        <ReferCodeForm
          onSubmit={lookup}
          isLoading={state.status === "loading"}
        />

        {state.status === "error" && (
          <div className="flex items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            <AlertCircle className="size-4 shrink-0" />
            <p>{state.error}</p>
            <button
              onClick={reset}
              className="ml-auto text-xs underline hover:no-underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {state.status === "success" && <StatsDisplay data={state.data} />}
      </main>
    </div>
  );
}
