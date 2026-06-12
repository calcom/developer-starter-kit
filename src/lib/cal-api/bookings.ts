import "server-only";

import { calApi } from "./client";
import type { Booking, CreateBookingInput } from "./types";

const BOOKINGS_API_VERSION = "2026-02-25";

export async function createBooking(input: CreateBookingInput): Promise<Booking> {
  return calApi<Booking>("/bookings", {
    method: "POST",
    apiVersion: BOOKINGS_API_VERSION,
    body: input,
  });
}

export async function getBooking(uid: string): Promise<Booking> {
  return calApi<Booking>(`/bookings/${uid}`, {
    apiVersion: BOOKINGS_API_VERSION,
    cache: "no-store",
  });
}

export async function cancelBooking(uid: string, reason?: string): Promise<Booking> {
  return calApi<Booking>(`/bookings/${uid}/cancel`, {
    method: "POST",
    apiVersion: BOOKINGS_API_VERSION,
    body: { cancellationReason: reason },
  });
}

export async function rescheduleBooking(params: {
  uid: string;
  start: string;
  reschedulingReason?: string;
  rescheduledBy?: string;
}): Promise<Booking> {
  return calApi<Booking>(`/bookings/${params.uid}/reschedule`, {
    method: "POST",
    apiVersion: BOOKINGS_API_VERSION,
    body: {
      start: params.start,
      reschedulingReason: params.reschedulingReason,
      rescheduledBy: params.rescheduledBy,
    },
  });
}
