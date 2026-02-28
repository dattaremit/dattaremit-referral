"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface ReferCodeFormProps {
  onSubmit: (code: string) => void;
  isLoading: boolean;
}

export function ReferCodeForm({ onSubmit, isLoading }: ReferCodeFormProps) {
  const [code, setCode] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) {
      setValidationError("Please enter a referral code");
      return;
    }
    setValidationError("");
    onSubmit(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          placeholder="Enter referral code (e.g. DATTA-XXXX)"
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            if (validationError) setValidationError("");
          }}
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          <Search className="size-4" />
          {isLoading ? "Looking up..." : "Look Up"}
        </Button>
      </div>
      {validationError && (
        <p className="text-sm text-destructive">{validationError}</p>
      )}
    </form>
  );
}
