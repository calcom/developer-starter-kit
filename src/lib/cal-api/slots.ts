import "server-only";

import { calApi } from "./client";
import type { AvailableSlots } from "./types";

type GetSlotsParams = {
  eventTypeId: number;
  start: string;
  end: string;
  timeZone?: string;
  duration?: number;
  format?: "time" | "range";
};

export async function getAvailableSlots(params: GetSlotsParams): Promise<AvailableSlots> {
  return calApi<AvailableSlots>("/slots", {
    apiVersion: "2024-09-04",
    query: {
      eventTypeId: params.eventTypeId,
      start: params.start,
      end: params.end,
      timeZone: params.timeZone,
      duration: params.duration,
      format: params.format ?? "time",
    },
    cache: "no-store",
  });
}

export async function reserveSlot(params: {
  eventTypeId: number;
  slotStart: string;
  slotDuration?: number;
  reservationDuration?: number;
}): Promise<{ uid: string; eventTypeId: number; slotStart: string; slotEnd: string }> {
  return calApi("/slots/reservations", {
    method: "POST",
    apiVersion: "2024-09-04",
    body: params,
  });
}
