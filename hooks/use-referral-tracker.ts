"use client";

import { useCallback, useState } from "react";
import { fetchReferralStats } from "@/lib/api";
import type { TrackerResponse } from "@/lib/types";

type TrackerState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: TrackerResponse }
  | { status: "error"; error: string };

export function useReferralTracker() {
  const [state, setState] = useState<TrackerState>({ status: "idle" });

  const lookup = useCallback(async (code: string) => {
    setState({ status: "loading" });
    try {
      const data = await fetchReferralStats(code);
      setState({ status: "success", data });
    } catch (err) {
      setState({
        status: "error",
        error: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  }, []);

  const reset = useCallback(() => {
    setState({ status: "idle" });
  }, []);

  return { state, lookup, reset };
}
