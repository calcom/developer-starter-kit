"use client";

import { useMemo } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FALLBACK_TIMEZONES = [
  "America/Sao_Paulo",
  "America/New_York",
  "America/Los_Angeles",
  "America/Chicago",
  "America/Mexico_City",
  "America/Buenos_Aires",
  "America/Toronto",
  "Europe/London",
  "Europe/Berlin",
  "Europe/Paris",
  "Europe/Madrid",
  "Europe/Lisbon",
  "Europe/Amsterdam",
  "Europe/Zurich",
  "Europe/Istanbul",
  "Africa/Cairo",
  "Africa/Johannesburg",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Asia/Seoul",
  "Australia/Sydney",
  "Pacific/Auckland",
  "UTC",
];

function getSupportedTimeZones(): string[] {
  const intl = Intl as typeof Intl & {
    supportedValuesOf?: (key: "timeZone") => string[];
  };
  if (typeof intl.supportedValuesOf === "function") {
    try {
      return intl.supportedValuesOf("timeZone");
    } catch {
      return FALLBACK_TIMEZONES;
    }
  }
  return FALLBACK_TIMEZONES;
}

type TimezonePickerProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function TimezonePicker({ value, onChange, className }: TimezonePickerProps) {
  const timezones = useMemo(() => getSupportedTimeZones(), []);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={`h-7 w-auto gap-1 border-0 bg-transparent px-1 text-sm font-medium shadow-none focus:ring-0 ${className ?? ""}`}
      >
        <SelectValue placeholder="Timezone" />
      </SelectTrigger>
      <SelectContent className="max-h-72">
        {timezones.map((tz) => (
          <SelectItem key={tz} value={tz}>
            {tz}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
