import { format } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";

import type { Slot } from "@/lib/cal-api/types";

export function detectBrowserTimeZone(): string {
  if (typeof Intl === "undefined") return "UTC";
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
}

export function detectTimeFormat(): "12h" | "24h" {
  if (typeof Intl === "undefined") return "24h";
  const sample = new Intl.DateTimeFormat(undefined, { hour: "numeric" }).format(
    new Date(2024, 0, 1, 13, 0),
  );
  return /AM|PM/i.test(sample) ? "12h" : "24h";
}

export function formatSlotTime(
  isoString: string,
  timeZone: string,
  timeFormat: "12h" | "24h",
): string {
  return formatInTimeZone(new Date(isoString), timeZone, timeFormat === "12h" ? "h:mm a" : "HH:mm");
}

export function formatDayKey(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function formatLongDate(date: Date | string, timeZone: string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return formatInTimeZone(d, timeZone, "EEEE, LLLL d, yyyy");
}

export function groupSlotsByDay(slotsByDay: Record<string, Slot[]>): Map<string, Slot[]> {
  const map = new Map<string, Slot[]>();
  for (const [day, slots] of Object.entries(slotsByDay)) {
    map.set(day, slots);
  }
  return map;
}

export function getMonthBounds(date: Date, timeZone: string) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);
  return {
    start: formatInTimeZone(start, timeZone, "yyyy-MM-dd'T'HH:mm:ssXXX"),
    end: formatInTimeZone(end, timeZone, "yyyy-MM-dd'T'HH:mm:ssXXX"),
  };
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function toLocalDate(isoString: string, timeZone: string): Date {
  return toZonedTime(new Date(isoString), timeZone);
}

export function buildLocationDescription(type: string): string {
  switch (type) {
    case "integrations:daily":
    case "integrations:zoom":
    case "integrations:google:meet":
    case "integrations:office365_video":
      return "Web conferencing";
    case "inPerson":
      return "In person";
    case "phone":
      return "Phone call";
    case "userPhone":
    case "attendeeInPerson":
      return "Phone or in person";
    case "link":
      return "Custom link";
    default:
      return "Online";
  }
}
