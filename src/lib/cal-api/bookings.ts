import "server-only";

import { calApi } from "./client";
import type { Booking, CreateBookingInput } from "./types";

export async function createBooking(input: CreateBookingInput): Promise<Booking> {
  return calApi<Booking>("/bookings", {
    method: "POST",
    body: input,
  });
}

export async function getBooking(uid: string): Promise<Booking> {
  return calApi<Booking>(`/bookings/${uid}`, {
    cache: "no-store",
  });
}

export async function cancelBooking(uid: string, reason?: string): Promise<Booking> {
  return calApi<Booking>(`/bookings/${uid}/cancel`, {
    method: "POST",
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
    body: {
      start: params.start,
      reschedulingReason: params.reschedulingReason,
      rescheduledBy: params.rescheduledBy,
    },
  });
}
